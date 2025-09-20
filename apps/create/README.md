# Create

A simple project generator with profile-based configuration for creating a monorepo.

## Overview

## Installation

```bash
pnpm install -g @baldeweg/create
```

## Usage

The CLI will prompt you to select one or more profiles to run. This will display a multi-select interface where you can choose any combination of the available profiles.

```bash
create
```

## Monorepo Structure

This structure organizes your codebase around self-contained modules, promoting code reuse.

- `apps/`: This directory contains all of your executable applications. These are typically the public-facing or end-user facing parts of your project, such as a web frontend, an API server, or a command-line tool. An app consumes packages from the `packages` directory.
- `packages/`: This directory holds all the reusable libraries that are shared across your applications. A package is a dependency that can be imported by one or more apps.
- `scripts/`: Shell scripts are the universal language for automating your build and test processes. They're natively supported on all major operating systems and CI/CD environments, ensuring your commands run everywhere.

### Testing

Tests are placed alongside the code they test. For Go, this means `*_test.go` files, and for JavaScript/VueJS, `.test.js` files.

### Dealing with Naming Conflicts

To deal with packages that have the same name in different languages (e.g. Go and JavaScript), the recommended approach is to use a language-specific subdirectory for each.

Example:

```bash
monorepo/
└── packages/
    ├── go/
    │   └── auth/
    │      ├── auth.go
    │      └── go.mod
    └── js/
        └── auth/
            ├── src/
            │   └── index.js
            └── package.json
```

## Profiles

### Write a profile

A Profile is a modular action or set of actions that can be executed to scaffold, configure, or modify a project. Each profile encapsulates specific tasks, such as creating a directory structure, generating configuration files, or merging dependencies.

Profiles are defined as objects implementing the `Profile` interface (see `src/types/types.ts`):

```typescript
export interface Profile {
    name: string;
    description: string;
    ask?: () => Promise<void | Record<string, any>>;
    run: (options: Record<string, any>) => Promise<void>;
}
```

- `name`: Unique identifier for the profile.
- `description`: Short description of what the profile does.
- `ask` (optional): An async function to prompt the user for input before running the profile.
- `run`: The main async function that performs the profile's action.

Here is a minimal example of a profile that creates a basic directory structure:

```typescript
import { createDirs } from '../../helpers/createDirs.js';
import { Profile } from '../../types/types';

export const baseAction: Profile = {
  name: 'base',
  description: 'Create basic directory structure with apps/ and packages/ directories',
  run: async (options) => {
    createDirs(['apps', 'packages']);
  }
};
```

To make your profile available add it to the `profiles` object in `src/profiles/registry.ts`.

### Helpers

The following helper functions are available for use in profiles.

#### `createDirs(dirs: string[]): void`

Creates directories if they do not exist.

**Usage:**

```typescript
import { createDirs } from './src/helpers';

createDirs(['apps', 'packages']);
```

#### `createFiles(files: FileObject[]): Promise<void>`

Creates files at the given paths, creating parent directories as needed. Skips files that already exist.

**Usage:**

```typescript
import { createFiles } from './src/helpers';

await createFiles([
    { path: 'apps/api/main.go', content: '' },
    { path: 'README.md', content: '# My Project' }
]);
```

#### `mergeJson(options: { filePath: string; data: object }): void`

Merges a JSON object into an existing JSON file at the specified path.

**Usage:**

```typescript
import { mergeJson } from './src/helpers';

mergeJson({
    filePath: 'package.json',
    data: { dependencies: { '@baldeweg/create': '1.0.0' } }
});
```

#### `mergeYaml(options: { filePath: string; data: object }): void`

Merges a JavaScript object into an existing YAML file at the specified path.

**Usage:**

```typescript
import { mergeYaml } from './src/helpers';

mergeYaml({
    filePath: 'config.yaml',
    data: { key: 'value' }
});
```

#### `copyTemplate(options: TemplateOptions): void`

Copies a template file to a target location with variable substitution using EJS.

**Usage:**

```typescript
import { copyTemplate } from './src/helpers';

copyTemplate({
    templateName: 'package/package.json',
    targetPath: 'package.json',
    variables: { name: 'my-package' }
});
```

#### `runCommand(options: CommandOptions): Promise<void>`

Runs a command in the repository directory.

**Usage:**

```typescript
import { runCommand } from './src/helpers';

await runCommand('pnpm', ['install']);
```

## Template Engine

This project uses EJS for template rendering. You can use EJS syntax in your templates, including variables and logic such as if statements and loops.

Example

```js
Hello <%= name %>!
```

See the [EJS documentation](https://ejs.co/#docs) for more details.
