# Create

A simple project generator with profile-based configuration for creating a monorepo.

## Overview

## Quick Start

```bash
npx @baldeweg/create
```

## Install

```bash
pnpm install -g @baldeweg/create
```

## Usage

The CLI will prompt you to select one or more profiles to run. This will display a multi-select interface where you can choose any combination of the available profiles.

```bash
baldeweg-create
```

## Profiles

### Write a profile

A Profile is a modular action or set of actions that can be executed to scaffold, configure, or modify a project. Each profile encapsulates specific tasks, such as creating a directory structure, generating configuration files, or merging dependencies.

Profiles are defined as objects implementing the `Profile` interface (see `src/types/types.ts`):

```typescript
export interface Profile {
    name: string
    description: string
    ask?: () => Promise<void | Record<string, any>>
    run: (options: Record<string, any>) => Promise<void>
}
```

- `name`: Unique identifier for the profile.
- `description`: Short description of what the profile does.
- `ask` (optional): An async function to prompt the user for input before running the profile.
- `run`: The main async function that performs the profile's action.

Here is a minimal example of a profile that creates a basic directory structure:

```typescript
import { createDirs } from "../../helpers/createDirs.js"
import { Profile } from "../../types/types"

export const baseAction: Profile = {
    name: "base",
    description:
        "Create basic directory structure with apps/ and packages/ directories",
    run: async (options) => {
        createDirs(["apps", "packages"])
    },
}
```

To make your profile available add it to the `profiles` object in `src/profiles/registry.ts`.

### Helpers

Helpers should create as much as possible (e.g., create parent directories when writing files).

Nothing should be overwritten. If a file already exists, it should be skipped with a notice.

The following helper functions are available for use in profiles.

#### `createDirs(dirs: string[]): Promise<void>`

Creates directories if they do not exist.

**Usage:**

```typescript
import { createDirs } from "./src/helpers"

await createDirs(["apps", "packages"])
```

#### `copyFile(sourcePath: string, targetPath: string): Promise<void>`

Copies a file from the templates directory to the specified target location. Useful for binary files, like images. If the target file already exists, it is skipped with a notice.

**Usage:**

```typescript
import { copyFile } from "./src/helpers"

await copyFile("base/image.png", "apps/web/public/image.png")
```

#### `createFiles(files: FileObject[]): Promise<void>`

Creates files at the given paths, creating parent directories as needed. Skips files that already exist.

**Usage:**

```typescript
import { createFiles } from "./src/helpers"

await createFiles([
    { path: "apps/api/main.go", content: null },
    { path: "README.md", content: "# My Project" },
])
```

#### `mergeJson(filePath: string, data: object): Promise<void>`

Merges a JSON object into an existing JSON file at the specified path.

**Usage:**

```typescript
import { mergeJson } from "./src/helpers"

await mergeJson("package.json", {
    dependencies: { "@baldeweg/create": "1.0.0" },
})
```

#### `mergeYaml(filePath: string, data: object): Promise<void>`

Merges a JavaScript object into an existing YAML file at the specified path.

**Usage:**

```typescript
import { mergeYaml } from "./src/helpers"

await mergeYaml("config.yaml", { key: "value" })
```

#### `copyTemplate(templateName: string, targetPath: string, variables?: Record<string, unknown>): Promise<void>`

Copies a template file to a target location with variable substitution using EJS.

**Usage:**

```typescript
import { copyTemplate } from "./src/helpers"

await copyTemplate("package/package.json", "package.json", { name: "package" })
```

#### `runCommand(command: string, args?: string[], workingDir?: string): Promise<void>`

Runs a command in the repository directory. The function accepts the command, optional args array, and an optional working directory (defaults to `.`).

**Usage:**

```typescript
import { runCommand } from "./src/helpers"

await runCommand("pnpm", ["install"])
```

#### `writeJson(path: string, data: unknown): Promise<void>`

Writes a JSON object to disk at the given path. If parent directories do not exist, they are created. Skips file creation if the target already exists.

**Usage:**

```typescript
import { writeJson } from "./src/helpers"

await writeJson("package.json", { name: "my-project" })
```

#### `writeYaml(path: string, data: unknown): Promise<void>`

Writes a YAML object to disk at the given path. If parent directories do not exist, they are created. Skips file creation if the target already exists.

**Usage:**

```typescript
import { writeYaml } from "./src/helpers"

await writeYaml(".github/workflows/ci.yaml", { name: "ci" })
```

#### `makeSlug(term: string): string`

Replaces special characters in a string to create a slug suitable for filenames. It replaces `/` with `_` and removes any other non-alphanumeric characters except underscores and hyphens.

**Usage:**

```typescript
import { makeSlug } from "./src/helpers"

const slug = makeSlug("my/project name") // 'my_project_name'
```

#### `listPackageDirs(rootDir: string): Promise<string[]>`

Lists top-level package directories found in the repository. The helper always includes `apps` and `packages` by default and adds any directories that start with `packages-` (e.g. `packages-private`).

**Usage:**

```typescript
import { listPackageDirs } from "./src/helpers"

const packageDirs = await listPackageDirs(".")
// e.g. ['apps', 'packages', 'packages-private']
```

#### `canCreatePackage(rootDir: string, packageName: string): Promise<boolean>`

Checks whether a package with the given name already exists inside any top-level package directory (`apps`, `packages`, or `packages-*`). Returns `true` when the name is available and `false` if a conflict is found. Note the `rootDir` parameter is required (use `"."` for the current project).

**Usage:**

```typescript
import { canCreatePackage } from "./src/helpers"

if (await canCreatePackage(".", "auth")) {
    // safe to create package 'auth'
}
```

## Template Engine

This project uses EJS for template rendering. You can use EJS syntax in your templates, including variables and logic such as if statements and loops.

Example

```js
Hello <%= name %>!
```

See the [EJS documentation](https://ejs.co/#docs) for more details.
