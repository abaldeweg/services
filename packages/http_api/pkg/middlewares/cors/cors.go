package cors

import (
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// CORS returns a Gin middleware for CORS handling configured
// with allowed origins and headers.
func CORS(allowOrigins, allowHeaders string) gin.HandlerFunc {
	config := cors.DefaultConfig()

	origins := trimAndSplit(allowOrigins)
	for i, o := range origins {
		origins[i] = normalizeOrigin(o)
	}

	if len(origins) > 0 {
		config.AllowOrigins = origins
		config.AllowAllOrigins = false
	} else {
		config.AllowOrigins = nil
		config.AllowAllOrigins = true
	}

	headers := trimAndSplit(allowHeaders)
	if len(headers) > 0 {
		config.AddAllowHeaders(headers...)
	}

	return cors.New(config)
}

// normalizeOrigin ensures an origin has a scheme or valid wildcard format.
// If missing, it defaults to "http://".
func normalizeOrigin(origin string) string {
	if strings.Contains(origin, "://") || strings.Contains(origin, "*") {
		return origin
	}
	return "http://" + origin
}

// trimAndSplit trims the input string and splits it by commas,
// returning a slice of cleaned strings.
func trimAndSplit(input string) []string {
	trimmed := strings.TrimSpace(input)
	if trimmed == "" {
		return nil
	}
	parts := strings.Split(trimmed, ",")
	cleaned := []string{}
	for _, p := range parts {
		if cp := strings.TrimSpace(p); cp != "" {
			cleaned = append(cleaned, cp)
		}
	}
	return cleaned
}
