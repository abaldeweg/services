import { readFile, writeFile, access } from "fs/promises"
import { log } from "@clack/prompts"
import deepmerge from "deepmerge"
import { getTargetPath } from "./utils.js"

/**
 * Merges data into an existing JSON file.
 */
export async function mergeJson(filePath: string, data: object): Promise<void> {
  const absFilePath = getTargetPath(filePath)

  let fileContent: object = {}
  try {
    await access(absFilePath)
    const raw = await readFile(absFilePath, "utf8")
    fileContent = JSON.parse(raw)
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
      log.warn(`File ${filePath} does not exist. Skipping merge.`)
    } else {
      throw err
    }
  }

  const merged = deepmerge(fileContent, data)

  await writeFile(absFilePath, JSON.stringify(merged, null, 2) + "\n", "utf8")
}
