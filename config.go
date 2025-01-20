package main

import (
	"log/slog"
	"os"
)

// global variable config
var Config appConfig

// global variable folder
var (
	AdsPath string
)

type appConfig struct {
	Port            string
	DataDir         string
	NomadConfigFile string

	// commonly will filled from nomad client configuration
	Province string
	District string
	City     string
	Client   string
}

func LoadConfiguration() {
	Config.Port = getConfigFromEnv("PORT", "8080")
	Config.DataDir = getConfigFromEnv("DATA_DIR", "./data")
	Config.NomadConfigFile = getConfigFromEnv("NOMAD_CONFIG_FILE", "./nomad.hcl")

	AdsPath = Config.DataDir + "/ads/"

	// check if data dir folder exists
	if _, err := os.Stat(Config.DataDir); os.IsNotExist(err) {
		slog.Error(WrapErr(err, "data dir not found").Error())
		os.Exit(1)
	}

	// check if nomad config file exists
	if _, err := os.Stat(Config.NomadConfigFile); os.IsNotExist(err) {
		slog.Error(WrapErr(err, "nomad config file not found").Error())
		os.Exit(1)
	}

	// TODO: parse nomad client HCL to get device location
}
