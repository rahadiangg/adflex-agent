package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type AdsResponse struct {
	Source   string `json:"source"`
	Duration int    `json:"duration"`
}

type CHandler struct {
	PD ProvisionData
}

func NewCHandler(pd ProvisionData) *CHandler {
	return &CHandler{PD: pd}
}

func (h *CHandler) BusSchedule(c *fiber.Ctx) error {

	if len(h.PD.BusSchedule) == 0 {
		return FiberReturnFormatted(c, fiber.StatusNotFound, "bus schedule not found", nil)
	}

	return FiberReturnFormatted(c, fiber.StatusOK, "success get list bus schedule", h.PD.BusSchedule)
}

func (h *CHandler) GetAds(c *fiber.Ctx) error {

	if len(h.PD.Ads) == 0 {
		return FiberReturnFormatted(c, fiber.StatusNotFound, "ads not found", nil)
	}

	var verifiedAds []AdsResponse

	for _, a := range h.PD.Ads {
		filename := GetFileNameFromURL(a.Source)

		verifiedAds = append(verifiedAds, AdsResponse{
			Source:   "/ads/" + filename,
			Duration: a.Duration,
		})
	}

	return FiberReturnFormatted(c, fiber.StatusOK, "success get list ads", verifiedAds)
}

func (h *CHandler) GetAdsContent(c *fiber.Ctx) error {

	filename := c.Params("filename")
	return c.Status(fiber.StatusOK).SendFile(AdsPath+filename, true)
}

// unused for now
func (h *CHandler) CsvHandler(w http.ResponseWriter, r *http.Request) {
	csvPath := "data.csv"
	if _, err := os.Stat(csvPath); err != nil {
		http.Error(w, "CSV file not found", http.StatusInternalServerError)
		return
	}

	file, err := os.Open(csvPath)
	if err != nil {
		http.Error(w, "Unable to open CSV file", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	reader := csv.NewReader(file)
	reader.Comma = ';' // Set the delimiter to `;`
	rows, err := reader.ReadAll()
	if err != nil {
		http.Error(w, "Error reading CSV file", http.StatusInternalServerError)
		return
	}

	// Ensure there is data
	if len(rows) < 2 {
		http.Error(w, "CSV file is empty or missing headers", http.StatusBadRequest)
		return
	}

	// Parse headers and rows
	headers := rows[0]
	var data []map[string]string
	for _, row := range rows[1:] {
		entry := make(map[string]string)
		for i, header := range headers {
			if i < len(row) {

				h := strings.ReplaceAll(strings.ToLower(header), " ", "_")
				entry[h] = row[i] // Use lowercase keys for consistency
			}
		}
		data = append(data, entry)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		http.Error(w, fmt.Sprintf("failed to encode JSON: %v", err), http.StatusInternalServerError)
	}
}
