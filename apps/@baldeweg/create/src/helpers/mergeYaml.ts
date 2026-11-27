import { readFile, writeFile } from "node:fs/promises"
import { log } from "@clack/prompts"
import deepmerge from "deepmerge"
import { parse, stringify } from "yaml"
import { getTargetPath } from "./utils.js"

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

/**
 * Merges data into an existing YAML file.
 */
export async function mergeYaml(filePath: string, data: object): Promise<void> {
  const absFilePath = getTargetPath(filePath)

  let fileContent: Record<string, unknown> = {}
  try {
    const content = await readFile(absFilePath, "utf8")
    const parsed = content.trim() === "" ? undefined : parse(content)
    fileContent = isRecord(parsed) ? parsed : {}
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      log.warn(`File ${filePath} does not exist. Skipping merge.`)
    } else {
      throw err
    }
  }

  const merged = deepmerge(fileContent, data)

  await writeFile(absFilePath, stringify(merged))
}
