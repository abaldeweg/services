package generator

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
)

type ODTGenerator struct {
	TemplatePath     string
	OutputPath       string
	ReplacementsPath string
	Replacements     map[string]string
}

// NewODTGenerator initializes a new ODTGenerator with the provided template, output, and replacements paths.
func NewODTGenerator(templatePath string, outputPath string, replacementsPath string) (*ODTGenerator, error) {
	odtGenerator := &ODTGenerator{
		TemplatePath:     templatePath,
		OutputPath:       outputPath,
		ReplacementsPath: replacementsPath,
	}
	if err := odtGenerator.fetchReplacements(); err != nil {
		return nil, err
	}
	return odtGenerator, nil
}

// GenerateODT generates an ODT file from a template and applies replacements.
func (odtGenerator *ODTGenerator) GenerateODT() error {
	ottReader, ottFile, err := odtGenerator.readFile()
	if err != nil {
		return err
	}
	defer func() {
		if err := ottFile.Close(); err != nil {
			// Handle the error, e.g., log it
			fmt.Printf("Error closing ottFile: %v\n", err)
		}
	}()

	if err := odtGenerator.createDir(); err != nil {
		return err
	}

	if err := odtGenerator.writeFile(ottReader); err != nil {
		return err
	}

	return nil
}

// readFile opens the OTT template file and returns a zip reader for its contents.
func (odtGenerator *ODTGenerator) readFile() (*zip.Reader, *os.File, error) {
	ottFile, err := os.Open(odtGenerator.TemplatePath)
	if err != nil {
		return nil, nil, err
	}

	ottInfo, err := ottFile.Stat()
	if err != nil {
		return nil, nil, err
	}

	ottReader, err := zip.NewReader(ottFile, ottInfo.Size())
	if err != nil {
		return nil, nil, err
	}

	return ottReader, ottFile, nil
}

// writeFile processes the OTT template and applies replacements to the content.xml file.
func (odtGenerator *ODTGenerator) writeFile(ottReader *zip.Reader) error {
	odtBuffer := new(bytes.Buffer)
	odtWriter := zip.NewWriter(odtBuffer)

	for _, file := range ottReader.File {
		rc, err := file.Open()
		if err != nil {
			return err
		}

		content, err := io.ReadAll(rc)
		defer func() {
			if err := rc.Close(); err != nil {
				// Handle the error, e.g., log it
				fmt.Printf("Error closing rc: %v\n", err)
			}
		}()
		if err != nil {
			return err
		}

		if file.Name == "content.xml" {
			contentStr := string(content)
			for k, v := range odtGenerator.Replacements {
				contentStr = strings.ReplaceAll(contentStr, k, v)
			}
			content = []byte(contentStr)
		}

		w, err := odtWriter.Create(file.Name)
		if err != nil {
			return err
		}

		_, err = w.Write(content)
		if err != nil {
			return err
		}
	}

	if err := odtWriter.Close(); err != nil {
		return err
	}

	if err := os.WriteFile(odtGenerator.OutputPath, odtBuffer.Bytes(), 0644); err != nil {
		return err
	}

	return nil
}

// fetchReplacements reads a JSON file and returns a map of replacements.
func (odtGenerator *ODTGenerator) fetchReplacements() error {
	jsonData, err := os.ReadFile(odtGenerator.ReplacementsPath)
	if err != nil {
		return err
	}

	odtGenerator.Replacements = make(map[string]string)
	if err = json.Unmarshal(jsonData, &odtGenerator.Replacements); err != nil {
		return err
	}

	return err
}

// createDir ensures that the output directory exists, creating it if necessary.
func (odtGenerator *ODTGenerator) createDir() error {
	if err := os.MkdirAll(filepath.Dir(odtGenerator.OutputPath), 0644); err != nil {
		return err
	}
	return nil
}
