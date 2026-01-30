import { existsSync } from "fs"
import { text, select } from "@clack/prompts"
import {
  canCreatePackage,
  copyTemplate,
  createDirs,
  createFiles,
  listPackageDirs,
  runCommand,
  writeYaml,
} from "../helpers/index.js"
import type { Profile } from "../types/types.js"

/**
 * Creates a go module.
 */
export const goModuleProfile: Profile = {
  id: "goModuleProfile",
  name: "Go",
  description: "Creates a go module.",
  ask: async () => {
    const name = await text({
      message: "What is the name of the module?",
      placeholder: "Name of the module",
      initialValue: "go_module",
      validate(value) {
        if (value.length === 0) return `Value is required!`
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return "Name must only contain letters, numbers, hyphens (-), and underscores (_)."
        }
      },
    })

    const importPath = await text({
      message: "What is the import path of the module?",
      placeholder: "Path",
      initialValue: "github.com/abaldeweg/services",
      validate(value) {
        if (value.length === 0) return `Value is required!`
      },
    })

    const packageDirs = await listPackageDirs('.')
    const pkgDir = await select({
      message:
        "Which package directory should the module be created in?",
      options: packageDirs.map((d) => ({ value: d, label: d })),
    })

    return { name, importPath, pkgDir }
  },
  run: async (options) => {
    const outputDir = options.pkgDir

    if (await canCreatePackage('.', String(options.name)) === false) {
      throw new Error(
        `A package with the name ${String(options.name)} already exists! Can't have have a package with same name in any of the packages dirs.`,
      )
    }

    await createDirs([
      ".github",
      `${outputDir}/${options.name}`,
      `${outputDir}/${options.name}/cmd`,
      `${outputDir}/${options.name}/internal`,
    ])

    await copyTemplate("go/main.go.ejs", `${outputDir}/${options.name}/main.go`)

    await createFiles([
      {
        path: `${outputDir}/${options.name}/README.md`,
        content: `# ${options.name}\n\n`,
      },
    ])

    await createFiles([
      {
        path: `${outputDir}/${options.name}/CHANGELOG.md`,
        content: `# Changelog\n\n`,
      },
    ])

    if (options.pkgDir === "apps") {
      await writeYaml(`${outputDir}/${options.name}/openapi.yaml`, {
        openapi: "3.0.0",
        info: {
          title: options.name,
          version: "v1",
          description: `OpenAPI specification for ${options.name}.`,
        },
        servers: [
          {
            url: "http://localhost:8080",
          },
        ],
        tags: [
          {
            name: "example",
            description: `Example`,
          },
        ],
        paths: {},
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
          schemas: {},
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      })
    }

    await runCommand(
      "go",
      ["mod", "init", String(options.importPath)],
      `${outputDir}/${options.name}`,
    )

    await createFiles([
      { path: `${outputDir}/${options.name}/go.sum`, content: null },
    ])

    if (options.pkgDir === "apps") {
      await copyTemplate(
        "go/Dockerfile.ejs",
        `${outputDir}/${options.name}/Dockerfile`,
        { name: options.name },
      )
    }

    await copyTemplate(
      "go/release.yaml.ejs",
      `.github/workflows/release_${options.name}.yaml`,
      { name: options.name },
    )

    await copyTemplate(
      "go/ci.yaml.ejs",
      `.github/workflows/ci_${options.name}.yaml`,
      { outputDir: outputDir, name: options.name },
    )

    if (options.pkgDir === "apps") {
      await copyTemplate(
        "go/cloudbuild.yaml.ejs",
        `${outputDir}/${options.name}/cloudbuild.yaml`,
        { name: options.name },
      )
    }

    if (!existsSync("go.work")) {
      await runCommand("go", ["work", "init", `${outputDir}/${options.name}`])
    }

    await runCommand("go", ["work", "use", `${outputDir}/${options.name}`])
  },
}
