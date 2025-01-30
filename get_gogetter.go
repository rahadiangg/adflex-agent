//go:build gogetter

package main

import (
	"fmt"

	"github.com/hashicorp/go-getter"
)

type GoGetter struct {
}

func NewGoGetter() Getter {
	return &GoGetter{}
}

func (g *GoGetter) Get(source, _ string) error {

	filename := GetFileNameFromURL(source)

	// currently we only store in object storage
	detectors := []getter.Detector{
		&getter.S3Detector{},
		&getter.GCSDetector{},
	}

	s, err := getter.Detect(source, AdsPath, detectors)
	if err != nil {
		return WrapErr(err, fmt.Sprintf("failed to detect source for %s", filename))
	}

	// "?checksum="+a.Checksum
	if err := getter.Get(AdsPath, s,
		getter.WithDetectors(detectors),
		getter.WithMode(getter.ClientModeAny)); err != nil {
		return WrapErr(err, fmt.Sprintf("failed to download file %s", filename))
	}

	return nil
}
