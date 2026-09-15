package config

import (
	"github.com/spf13/viper"
)

// Config struct holds the application's configuration using Viper.
type Config struct {
	Viper *viper.Viper
}

// NewConfig creates and returns a new Config instance
// with an initialized Viper object.
func NewConfig() *Config {
	c := &Config{
		Viper: viper.New(),
	}
	return c
}

// SetConfigFile sets the configuration file to the specified file,
// e. g. ".env" or "config.yaml".
func (c *Config) SetConfigFile(name string) {
	c.Viper.SetConfigFile(name)
}

// LoadEnv loads environment variables into the Viper configuration.
func (c *Config) LoadEnv() {
	c.Viper.AutomaticEnv()
}

// ReadConfig reads the configuration from the set configuration file.
func (c *Config) ReadConfig() error {
	return c.Viper.ReadInConfig()
}
