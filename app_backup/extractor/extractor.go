package extractor

import "strings"

// ListApps receives a string where each line contains an app, and returns a slice of package IDs.
func ListApps(data string) []string {
	lines := strings.Split(strings.TrimSpace(data), "\n")
	result := []string{}
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		if strings.HasPrefix(line, "package:") {
			result = append(result, strings.TrimPrefix(line, "package:"))
		} else {
			result = append(result, line)
		}
	}
	return result
}
