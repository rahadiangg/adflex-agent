package main

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/hashicorp/hcl/v2/gohcl"
	"github.com/hashicorp/hcl/v2/hclparse"
)

type ProvisionData struct {
	Title       string        `json:"title"`
	BusSchedule []BusSchedule `json:"bus_schedule"`
	Ads         []Ads         `json:"ads"`
}

type BusSchedule struct {
	Id          string    `json:"id"`
	ArrivalTime time.Time `json:"arrival_time"`
	Route       string    `json:"route"`
	Direction   string    `json:"direction"`
}

type Ads struct {
	Type     string `json:"type"`
	Source   string `json:"source"`
	Checksum string `json:"checksum"`
	Duration int    `json:"duration"`
}

type Provision interface {
	Provisioning() error
	Load() (ProvisionData, error)
}

type NomadConfig struct {
	Client NomadClient `hcl:"client,block"`
}

type NomadClient struct {
	Meta NomadMeta `hcl:"meta,block"`
}

type NomadMeta struct {
	Province   string `hcl:"province" json:"province" validate:"required"`
	District   string `hcl:"district" json:"district" validate:"required"`
	City       string `hcl:"city" json:"city" validate:"required"`
	ClientName string `hcl:"client_name" json:"client_name" validate:"required"`
}

type BackendProvisoing struct {
}

func NewBackendProvisoing() Provision {
	return &BackendProvisoing{}
}

func (p *BackendProvisoing) Provisioning() error {

	var n NomadConfig

	hclP := hclparse.NewParser()
	f, diags := hclP.ParseHCLFile(Config.NomadConfigFile)
	if diags.HasErrors() {
		slog.Error(WrapErr(diags, "failed to parse nomad config file").Error())
		os.Exit(1)
	}

	gohcl.DecodeBody(f.Body, nil, &n)

	v := validator.New()
	if err := v.Struct(&n); err != nil {
		slog.Error(WrapErr(err, "validation fail for nomad config file").Error())
		os.Exit(1)
	}

	// TODO: post provisioning request to backend

	return nil
}

func (p *BackendProvisoing) Load() (ProvisionData, error) {
	b, err := os.ReadFile(Config.DataDir + "/provision/last.json")
	if err != nil {
		return ProvisionData{}, WrapErr(err, "failed to read last provision file")
	}

	var prov ProvisionData
	if err := json.Unmarshal(b, &prov); err != nil {
		return ProvisionData{}, WrapErr(err, "failed to parse last provision file")
	}

	var adsVerified []Ads

	// download ads content
	g := NewGetterBuilder(NewNativeGetter())

	for _, a := range prov.Ads {

		filename := GetFileNameFromURL(a.Source)

		// check is file exist
		// if not exist, then download from source
		if _, err := os.Stat(AdsPath + filename); err != nil {
			slog.Info(fmt.Sprintf("ads file %s not exist in %s", filename, AdsPath+filename))

			if err := g.Get(a.Source, AdsPath); err != nil {
				slog.Error(WrapErr(err, "failed to download file").Error())
				continue
			}
			slog.Info(fmt.Sprintf("downloaded file %s from %s", filename, a.Source))
		} else {
			slog.Info(fmt.Sprintf("ads file %s already exist in %s", filename, AdsPath+filename))
		}

		// compare file md5 sum
		file, err := os.Open(AdsPath + filename)
		if err != nil {
			slog.Error(fmt.Sprintf("failed to open file %s will continue without this file", filename))
			continue
		}

		hasher := md5.New()

		if _, err := io.Copy(hasher, file); err != nil {
			return ProvisionData{}, WrapErr(err, fmt.Sprintf("failed to hash file content for file %s", filename))
		}
		file.Close()

		currentMD5 := hex.EncodeToString(hasher.Sum(nil))
		sourceMD5 := a.Checksum

		if currentMD5 != sourceMD5 {
			slog.Error(fmt.Sprintf("md5 sum not match for file %s delete this file", filename))
			if err := os.Remove(AdsPath + filename); err != nil {
				slog.Error(WrapErr(err, fmt.Sprintf("failed to delete file %s", filename)).Error())
			}
			continue
		}

		adsVerified = append(adsVerified, a)
	}

	prov.Ads = adsVerified
	return prov, nil
}
