import { mkdir, rm, readFile, writeFile } from "fs/promises"
import { join, dirname } from "path"
import { describe, it, expect, afterEach } from "vitest"
import yaml from "yaml"
import { writeYaml } from "./writeYaml.js"

const targetRelBase = `__test_output__/file`

describe("writeYaml", () => {
  afterEach(async () => {
    await rm(join(process.cwd(), `${targetRelBase}.yaml`), {
      force: true,
      recursive: true,
    })
  })

  it("writes YAML file to target path", async () => {
    const targetRel = `${targetRelBase}.yaml`

    await writeYaml(targetRel, { a: "b" })

    const content = await readFile(join(process.cwd(), targetRel), "utf-8")
    expect(content).toBe(yaml.stringify({ a: "b" }) + "\n")
  })

  it("does not overwrite an already existing target file", async () => {
    const targetRel = `${targetRelBase}.yaml`
    const absTarget = join(process.cwd(), targetRel)
    await mkdir(dirname(absTarget), { recursive: true })
    await writeFile(absTarget, "original")

    await writeYaml(targetRel, { a: "new" })

    const final = await readFile(absTarget, "utf-8")
    expect(final).toBe("original")
  })
})
