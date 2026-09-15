package docu

import (
	"fmt"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// Docu represents the documentation configuration for the API.
type Docu struct {
	Mode string
}

// NewRouter creates a new instance of Docu with the specified mode.
func NewRouter(mode string) *Docu {
	return &Docu{
		Mode: mode,
	}
}

// RegisterRoutes sets up the routes for the API documentation based on the mode.
func (d *Docu) RegisterRoutes(router *gin.Engine) {
	if d.isDebugMode() {
		router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}

// GenerateCLIMessage returns the URL for accessing the Swagger documentation
// based on the mode and port.
func (d *Docu) GenerateCLIMessage(port int) string {
	if d.isDebugMode() {
		return fmt.Sprintf("Swagger-Docs available at http://127.0.0.1:%d/swagger/index.html", port)
	}
	return ""
}

// isDebugMode checks if the current mode is debug mode or empty (defaulting to debug).
func (d *Docu) isDebugMode() bool {
	return d.Mode == gin.DebugMode || d.Mode == ""
}
