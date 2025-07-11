package main

import (
	"github.com/abaldeweg/services/app_backup/command"
	"github.com/abaldeweg/services/app_backup/extractor"
	"github.com/abaldeweg/services/app_backup/writer"
)

func main() {
	commandOutput, err := command.FetchPackages()
	if err != nil {
		panic(err)
	}
	appIDs := extractor.ListApps(commandOutput)
	if len(appIDs) == 0 {
		panic("No packages found")
	}
	err = writer.Write(appIDs)
	if err != nil {
		panic(err)
	}
	println("Packages written to packages.json")
}
