import { describe, it, expect, afterEach } from "vitest"
import { writeFile, mkdir, rm, readFile } from "fs/promises"
import { join, dirname } from "path"
import { copyFile } from "./copyFile.js"

const templatesDir = "templates/__test_assets__"
const sourceRel = "__test_assets__/source.txt"
const targetRelBase = `__test_output__/target`

describe("copyFile", () => {
  afterEach(async () => {
    await rm(join(process.cwd(), `${targetRelBase}.txt`), {
      force: true,
      recursive: true,
    })
    await rm(join(templatesDir, "source.txt"), { force: true, recursive: true })
    await rm(templatesDir, { force: true, recursive: true })
  })

  it("copies file from templates to target path", async () => {
    await mkdir(templatesDir, { recursive: true })
    const srcPath = join(templatesDir, "source.txt")
    await writeFile(srcPath, "copy")

    const targetRel = `${targetRelBase}.txt`
    await copyFile(sourceRel, targetRel)

    const copied = await readFile(join(targetRel), "utf-8")
    expect(copied).toBe("copy")
  })

  it("does not overwrite an already existing target file", async () => {
    await mkdir(templatesDir, { recursive: true })
    const srcPath = join(templatesDir, "source.txt")
    await writeFile(srcPath, "new-content")

    const targetRel = `${targetRelBase}.txt`
    const absTarget = join(process.cwd(), targetRel)
    await mkdir(dirname(absTarget), { recursive: true })
    await writeFile(absTarget, "original-content")

    await copyFile(sourceRel, targetRel)

    const file = await readFile(absTarget, "utf-8")
    expect(file).toBe("original-content")
  })
})
