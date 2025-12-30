import { describe, it, expect, afterEach } from "vitest"
import { writeFile, mkdir, rm, readFile } from "fs/promises"
import { join, dirname } from "path"
import { copyTemplate } from "./copyTemplate.js"

const templatesDir = join(__dirname, "..", "..", "templates", "__test_assets__")
const templateRel = "__test_assets__/test.ejs"
const targetRelBase = `__test_output__/test`

describe("copyTemplate", () => {
  afterEach(async () => {
    await rm(join(process.cwd(), `${targetRelBase}.txt`), {
      force: true,
      recursive: true,
    })
    await rm(templatesDir, { force: true, recursive: true })
  })

  it("renders template and writes to target path", async () => {
    await mkdir(templatesDir, { recursive: true })
    const srcPath = join(templatesDir, "test.ejs")
    await writeFile(srcPath, "Hello <%= name %>")

    const targetRel = `${targetRelBase}.txt`
    await copyTemplate(templateRel, targetRel, { name: "test" })

    const copied = await readFile(join(process.cwd(), targetRel), "utf-8")
    expect(copied).toBe("Hello test")
  })

  it("does not overwrite an already existing target file", async () => {
    await mkdir(templatesDir, { recursive: true })
    const srcPath = join(templatesDir, "test.ejs")
    await writeFile(srcPath, "Hello <%= name %>")

    const targetRel = `${targetRelBase}.txt`
    const absTarget = join(process.cwd(), targetRel)
    await mkdir(dirname(absTarget), { recursive: true })
    await writeFile(absTarget, "original")

    await copyTemplate(templateRel, targetRel, { name: "New" })

    const final = await readFile(absTarget, "utf-8")
    expect(final).toBe("original")
  })
})
