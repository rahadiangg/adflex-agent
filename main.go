package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/joho/godotenv"
)

//go:embed ui/out/*
var staticFiles embed.FS

func main() {
	godotenv.Load(".env")
	LoadConfiguration()

	// provisioning
	p := NewBackendProvisoing()
	if err := p.Provisioning(); err != nil {
		slog.Error(err.Error())
	}

	pd, err := p.Load()
	if err != nil {
		slog.Error(err.Error())
	}

	h := NewCHandler(pd)

	// Create a new filesystem with `ui/out` as the root.
	subFS, err := fs.Sub(staticFiles, "ui/out")
	if err != nil {
		slog.Error(fmt.Sprintf("failed to create sub filesystem: %v", err))
	}

	app := fiber.New(
		fiber.Config{
			DisableStartupMessage: true,
		},
	)
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	app.Use("/", filesystem.New(filesystem.Config{
		Root: http.FS(subFS),
	}))
	app.Get("/api/bus-schedule", h.BusSchedule)
	app.Get("/api/ads", h.GetAds)
	app.Get("/ads/:filename", h.GetAdsContent)

	// Start the HTTP server
	port := fmt.Sprintf(":%s", Config.Port)
	slog.Info(fmt.Sprint("Server is running on ", port))
	if err := app.Listen(port); err != nil {
		slog.Error(fmt.Sprintf("server failed: %v", err))
	}
}
