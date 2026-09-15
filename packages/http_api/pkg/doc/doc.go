package doc

import (
	"fmt"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// Doc represents the documentation configuration for the API.
type Doc struct {
	Mode string
}

// NewDoc creates a new instance of Doc with the specified mode.
func NewDoc(mode string) *Doc {
	return &Doc{
		Mode: mode,
	}
}

// RegisterRoutes sets up the routes for the API documentation based on the mode.
func (d *Doc) RegisterRoutes(router *gin.Engine) {
	if d.isDevMode() {
		router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}

// GenerateCLIMessage returns the URL for accessing the Swagger documentation
// based on the mode and port.
func (d *Doc) GenerateCLIMessage(port int) string {
	if d.isDevMode() {
		return fmt.Sprintf("Swagger-Docs available at http://127.0.0.1:%d/swagger/index.html", port)
	}
	return ""
}

// isDevMode checks if the current mode is debug mode.
func (d *Doc) isDevMode() bool {
	return d.Mode == "dev" || d.Mode == ""
}
