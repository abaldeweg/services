package writer

import (
	"encoding/json"
	"os"
)

var packages = "packages.json"

// Write overwrites the JSON file with the given app ids as a JSON array.
func Write(appIDs []string) error {
	file, err := os.Create(packages)
	if err != nil {
		return err
	}
	defer file.Close()
	encoder := json.NewEncoder(file)
	return encoder.Encode(appIDs)
}
