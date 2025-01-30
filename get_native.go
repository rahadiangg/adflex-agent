package main

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
)

type NativeGetter struct {
}

func NewNativeGetter() Getter {
	return &NativeGetter{}
}

func (g *NativeGetter) Get(source, destination string) error {

	if !g.checkValidURl(source) {
		return fmt.Errorf("invalid url %s", source)
	}

	filename := GetFileNameFromURL(source)
	file, err := os.Create(destination + filename)
	if err != nil {
		return err
	}

	defer file.Close()

	resp, err := http.Get(source)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("bad status %s", resp.Status)
	}

	_, err = io.Copy(file, resp.Body)
	if err != nil {
		return err
	}

	return nil
}

func (g *NativeGetter) checkValidURl(source string) bool {
	parsedUrl, err := url.Parse(source)
	if err != nil || parsedUrl.Scheme == "" || parsedUrl.Host == "" {
		return false
	}

	return true
}
