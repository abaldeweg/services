import { text, select } from "@clack/prompts"
import {
  canCreatePackage,
  copyTemplate,
  createDirs,
  createFiles,
  listPackageDirs,
  mergeYaml,
  runCommand,
  writeJson,
  writeYaml,
} from "../helpers/index.js"
import { makeSlug } from "../helpers/makeSlug.js"
import type { Profile } from "../types/types.js"

/**
 * Create a typescript library.
 */
export const tsLibProfile: Profile = {
  id: "tsLibProfile",
  name: "TypeScript Library",
  description: "Creates a typescript library.",
  ask: async () => {
    const name = await text({
      message: "What's the name of the library?",
      placeholder: "Library Name",
      initialValue: "ts_library",
      validate(value) {
        if (value.length === 0) return `Value is required!`
        if (!/^[a-zA-Z0-9_@/-]+$/.test(value)) {
          return "Name must only contain letters, numbers, hyphens (-), underscores (_), at (@), and slash (/)."
        }
      },
    })

    const repo = await text({
      message: "What's the repository URL of the library?",
      placeholder: "Repository URL",
      initialValue: "https://github.com/abaldeweg/services.git",
      validate(value) {
        if (value.length === 0) return `Value is required!`
      },
    })

    const packageDirs = await listPackageDirs(".")
    const pkgDir = await select({
      message: "Which package directory should the module be created in?",
      options: packageDirs.map((d) => ({ value: d, label: d })),
    })

    return { name, repo, pkgDir }
  },
  run: async (options) => {
    const outputDir = options.pkgDir

    if ((await canCreatePackage(".", String(options.name))) === false) {
      throw new Error(
        `A package with the name ${String(options.name)} already exists! Can't have have a package with same name in any of the packages dirs.`,
      )
    }

    await createDirs([
      ".github",
      `${outputDir}/${options.name}`,
      `${outputDir}/${options.name}/src`,
    ])

    await writeJson(`${outputDir}/${options.name}/package.json`, {
      name: options.name,
      type: "module",
      version: "0.0.0",
      main: "dist/index.js",
      types: "dist/index.d.ts",
      scripts: {
        build: "tsc",
        test: "vitest",
        knip: "knip",
        lint: "eslint",
        "lint-fix": "eslint --fix",
        prettier: "prettier --check .",
        "prettier-fix": "prettier --write .",
      },
      devDependencies: {
        "@types/ejs": "3.1.5",
        "@types/js-yaml": "4.0.9",
        "@types/node": "24.8.1",
        knip: "5.82.0",
        prettier: "3.8.0",
        typescript: "5.9.3",
        vitest: "3.2.4",
      },
      repository: {
        type: "git",
        url: options.repo,
      },
    })

    await copyTemplate(
      "ts_lib/npmrc.ejs",
      `${outputDir}/${options.name}/.npmrc`,
    )

    await writeJson(`${outputDir}/${options.name}/tsconfig.json`, {
      compilerOptions: {
        outDir: "./dist",
        module: "nodenext",
        target: "esnext",
        types: ["vitest/globals"],
        sourceMap: true,
        declaration: true,
        declarationMap: true,
        noUncheckedIndexedAccess: true,
        exactOptionalPropertyTypes: true,
        strict: true,
        verbatimModuleSyntax: true,
        isolatedModules: true,
        noUncheckedSideEffectImports: true,
        moduleDetection: "force",
        skipLibCheck: true,
      },
    })

    await copyTemplate(
      "ts_lib/vitest.config.ts.ejs",
      `${outputDir}/${options.name}/vitest.config.ts`,
    )

    await createFiles([
      { path: `${outputDir}/${options.name}/src/index.ts`, content: null },
      { path: `${outputDir}/${options.name}/src/index.test.ts`, content: null },
    ])

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

    await copyTemplate(
      "ts_lib/release.yaml.ejs",
      `.github/workflows/release_${makeSlug(String(options.name))}.yaml`,
      { outputDir: outputDir, name: options.name },
    )

    await copyTemplate(
      "ts_lib/ci.yaml.ejs",
      `.github/workflows/ci_${makeSlug(String(options.name))}.yaml`,
      { name: options.name, outputDir: outputDir },
    )

    await writeYaml("pnpm-workspace.yaml", { packages: [] })
    await mergeYaml(`pnpm-workspace.yaml`, {
      packages: [`${outputDir}/${options.name}/`],
    })

    await runCommand("pnpm", ["install"])
  },
}
