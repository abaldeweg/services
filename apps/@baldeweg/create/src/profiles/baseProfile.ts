import { log, text } from "@clack/prompts"
import {
  copyTemplate,
  createDirs,
  createFiles,
  writeJson,
  writeYaml,
} from "../helpers/index.js"
import type { Profile } from "../types/types.js"

/**
 * Creates basic directory structure and files.
 */
export const baseProfile: Profile = {
  id: "baseProfile",
  name: "Base",
  description: "Creates basic directory structure and files.",
  ask: async () => {
    const name = await text({
      message: "What's the name of the project?",
      placeholder: "Name",
      initialValue: "My Project",
      validate(value) {
        if (value.length === 0) return `Value is required!`
      },
    })

    const description = await text({
      message: "What's the description of the project?",
      placeholder: "Description",
      initialValue: "",
    })

    const license = await text({
      message: "What license do you want to use?",
      placeholder: "License",
      initialValue: "",
    })

    return { name, description, license }
  },
  run: async (options) => {
    await createDirs(["apps", "packages", "notebooks", "scripts"])

    await copyTemplate("base/ci.yml.ejs", ".github/workflows/ci.yml")

    await createFiles([{ path: "README.md", content: `# ${options.name}` }])

    await writeJson("renovate.json", {
      extends: ["config:base", ":disableDependencyDashboard"],
      packageRules: [
        {
          updateTypes: ["patch"],
          automerge: true,
          requiredStatusChecks: ["ci/tests"],
        },
      ],
    })

    await writeJson("knip.json", {
      $schema: "https://unpkg.com/knip@5/schema.json",
      workspaces: {
        "apps/**": {},
        "packages/**": {},
      },
      ignoreDependencies: ["vue-tsc"],
      ignoreFiles: ["**/env.d.ts", "**/baldeweg-ui.d.ts"],
    })

    await createFiles([{ path: "LICENSE", content: null }])
    log.info(
      "Created LICENSE file, please update it with the correct license text. https://opensource.org/licenses",
    )

    await writeJson("package.json", {
      name: "root",
      version: "0.0.0",
      description: options.description,
      scripts: {
        lint: "eslint",
        "lint-fix": "eslint --fix",
        prettier: "prettier --check .",
        "prettier-fix": "prettier --write .",
      },
      license: options.license,
      devDependencies: {
        "@baldeweg/create": "0.3.0",
        "@eslint/js": "9.39.2",
        "@types/node": "24.10.4",
        "@vitest/eslint-plugin": "1.4.1",
        "@vue/eslint-config-typescript": "14.6.0",
        eslint: "9.39.2",
        "eslint-config-prettier": "10.1.8",
        "eslint-plugin-vue": "10.5.1",
        globals: "16.5.0",
        prettier: "3.7.4",
        typescript: "5.9.3",
        "typescript-eslint": "8.50.1",
      },
    })

    await copyTemplate("base/eslint.config.ts.ejs", `eslint.config.ts`)
    await copyTemplate("base/.prettierignore.ejs", `.prettierignore`)

    await writeJson(`.prettierrc.json`, {
      $schema: "https://json.schemastore.org/prettierrc",
      semi: false,
    })

    await copyTemplate("base/.gitignore.ejs", ".gitignore")

    await copyTemplate("base/.editorconfig.ejs", ".editorconfig")

    await writeYaml("pnpm-workspace.yaml", {
      packages: [],
    })
  },
}
