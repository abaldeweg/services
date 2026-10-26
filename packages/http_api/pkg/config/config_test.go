package config_test

import (
	"os"
	"path/filepath"
	"testing"
)

func TestNewConfig(t *testing.T) {
	cfg := NewConfig()
	if cfg == nil {
		t.Fatal("expected NewConfig to return a non-nil Config instance")
	}
	if cfg.Viper == nil {
		t.Fatal("expected Viper instance to be initialized")
	}
}

func TestSetConfigFileAndReadConfig_Success(t *testing.T) {
	tests := []struct {
		name          string
		filename      string
		content       string
		key           string
		expectedValue int
	}{
		{
			name:          "YAML file (.yaml)",
			filename:      "config.yaml",
			content:       "port: 8080\n",
			key:           "port",
			expectedValue: 8080,
		},
		{
			name:          "YAML file (.yml)",
			filename:      "config.yml",
			content:       "port: 8080\n",
			key:           "port",
			expectedValue: 8080,
		},
		{
			name:          "ENV file (.env)",
			filename:      ".env",
			content:       "PORT=8080\n",
			key:           "PORT",
			expectedValue: 8080,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tempDir := t.TempDir()
			configPath := filepath.Join(tempDir, tt.filename)

			if err := os.WriteFile(configPath, []byte(tt.content), 0644); err != nil {
				t.Fatalf("failed to create temporary config file %s: %v", tt.filename, err)
			}

			cfg := NewConfig()
			cfg.SetConfigFile(configPath)

			if err := cfg.ReadConfig(); err != nil {
				t.Fatalf("expected ReadConfig to succeed for %s, got: %v", tt.filename, err)
			}

			gotValue := cfg.Viper.GetInt(tt.key)
			if gotValue != tt.expectedValue {
				t.Errorf("expected key %q to be %d, got %d", tt.key, tt.expectedValue, gotValue)
			}
		})
	}
}

func TestReadConfig_FileNotFound(t *testing.T) {
	cfg := NewConfig()
	cfg.SetConfigFile("non_existent_file.yaml")

	err := cfg.ReadConfig()
	if err == nil {
		t.Error("expected ReadConfig to return an error for a non-existent file, got nil")
	}
}

func TestLoadEnv(t *testing.T) {
	envKey := "APP_PORT"
	envValue := "9090"

	t.Setenv(envKey, envValue)

	cfg := NewConfig()
	cfg.LoadEnv()

	gotValue := cfg.Viper.GetString(envKey)
	if gotValue != envValue {
		t.Errorf("expected environment variable %s to be %q, got %q", envKey, envValue, gotValue)
	}
}
