package validation

import (
	"fmt"

	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

// Validator wraps the go-playground validator and provides methods
// to register custom validators.
type Validator struct {
	Engine *validator.Validate
}

// validators holds the map of custom validators added via AddValidator.
var validators = make(map[string]validator.Func)

// NewValidator creates a new Validator instance and initializes the validator engine.
func NewValidator() (*Validator, error) {
	engine, ok := binding.Validator.Engine().(*validator.Validate)
	if !ok {
		return nil, fmt.Errorf("validator engine is not *validator.Validate")
	}
	return &Validator{Engine: engine}, nil
}

// AddValidator adds a custom validator to the global validators map.
func AddValidator(name string, validatorFunc validator.Func) {
	if _, exists := validators[name]; exists {
		panic(fmt.Sprintf("validation: duplicate validator %q", name))
	}
	validators[name] = validatorFunc
}

// RegisterValidators registers all added validators with the validator engine.
func (v *Validator) RegisterValidators() error {
	for name, fn := range validators {
		if err := v.Engine.RegisterValidation(name, fn); err != nil {
			return fmt.Errorf("failed to register validator %q: %w", name, err)
		}
	}
	return nil
}
