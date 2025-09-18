package cmd

import (
	"fmt"
	"os"

	"github.com/abaldeweg/services/letter/generator"
)

// Cmd is the command-line interface for generating ODT files.
func Cmd() {
	if len(os.Args) < 4 {
		fmt.Println("Usage: odtgen <templatePath> <outputPath> <replacementsPath>")
		os.Exit(1)
	}

	templatePath := os.Args[1]
	outputPath := os.Args[2]
	replacementsPath := os.Args[3]

	gen, err := generator.NewODTGenerator(templatePath, outputPath, replacementsPath)
	if err != nil {
		fmt.Printf("Error generating ODT: %v\n", err)
		os.Exit(1)
	}

	if err := gen.GenerateODT(); err != nil {
		fmt.Printf("Error generating ODT: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Successfully generated ODT file at %s\n", outputPath)
	os.Exit(0)
}
