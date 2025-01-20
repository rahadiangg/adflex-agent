package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func WrapErr(e error, msg string) error {
	return fmt.Errorf("%s: %s", msg, e.Error())
}

func getConfigFromEnv(key string, fallback string) string {
	v, isExist := os.LookupEnv(key)
	if !isExist {
		return fallback
	}

	return v
}

func GetFileNameFromURL(url string) string {
	sp := strings.Split(url, "/")
	filename := sp[len(sp)-1]
	return filename
}

func FiberReturnFormatted(c *fiber.Ctx, code int, message string, data interface{}) error {
	return c.Status(code).JSON(fiber.Map{
		"code":    code,
		"message": message,
		"data":    data,
	})
}
