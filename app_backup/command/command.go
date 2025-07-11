package command

import (
	"os/exec"
	"strings"
)

// FetchPackages returns the output of the adb command as a single string.
func FetchPackages() (string, error) {
	cmd := exec.Command("adb", "shell", "pm", "list", "packages", "-e", "-3")
	output, err := cmd.Output()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(output)), nil
}
