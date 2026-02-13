import { readdir } from "fs/promises"
import { join } from "path"
import { getTargetPath } from "./utils.js"

// Lists all package directories in the given root directory.
export async function listPackageDirs(rootDir: string): Promise<string[]> {
  const dirPath = getTargetPath(rootDir)
  const results: string[] = ["apps", "packages"]
  try {
    const entries = await readdir(dirPath, { withFileTypes: true })
    const pkgPattern = /^packages-.+$/

    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      if (pkgPattern.test(entry.name)) results.push(entry.name)
    }

    return results
  } catch {
    return results
  }
}

// Checks if a package with the given name can be created.
export async function canCreatePackage(
  rootDir: string,
  packageName: string,
): Promise<boolean> {
  if (!packageName) return false

  try {
    const packageDirs = await listPackageDirs(getTargetPath(rootDir))
    for (const packageDir of packageDirs) {
      const dirPath = getTargetPath(join(rootDir, packageDir))
      try {
        const entries = await readdir(dirPath, { withFileTypes: true })
        for (const entry of entries) {
          if (!entry.isDirectory()) continue
          if (entry.name === packageName) return false
        }
      } catch {
        continue
      }
    }

    return true
  } catch {
    return false
  }
}
