package writer

import (
	"encoding/json"
	"os"
	"reflect"
	"testing"
)

func TestWrite(t *testing.T) {
	fielname := "packages.json"
	defer os.Remove(fielname)

	appIDs := []string{"app1", "app2", "app3"}
	err := Write(appIDs)
	if err != nil {
		t.Fatalf("Write() error = %v", err)
	}

	file, err := os.Open(fielname)
	if err != nil {
		t.Fatalf("Failed to open written file: %v", err)
	}
	defer file.Close()

	var got []string
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&got); err != nil {
		t.Fatalf("Failed to decode JSON: %v", err)
	}

	if !reflect.DeepEqual(got, appIDs) {
		t.Errorf("Written appIDs = %v, want %v", got, appIDs)
	}
}
