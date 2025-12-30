import { describe, it, expect, afterEach } from "vitest"
import { writeFile, mkdir, rm, readFile } from "fs/promises"
import { join, dirname } from "path"
import { createFiles } from "./createFiles.js"

const targetRelBase = "__test_output__/create_test"

describe("createFiles", () => {
  afterEach(async () => {
    await rm(join(process.cwd(), targetRelBase), {
      force: true,
      recursive: true,
    })
  })

  it("creates a new file and parent directories when missing", async () => {
    const targetRel = `${targetRelBase}/dir/sub/file.txt`

    await createFiles([{ path: targetRel, content: "hello" }])

    const absTarget = join(process.cwd(), targetRel)
    const read = await readFile(absTarget, "utf-8")
    expect(read).toBe("hello")
  })

  it("does not overwrite an existing file", async () => {
    const targetRel = `${targetRelBase}/dir/sub/file.txt`
    const absTarget = join(process.cwd(), targetRel)

    await mkdir(dirname(absTarget), { recursive: true })
    await writeFile(absTarget, "original-content")

    await createFiles([{ path: targetRel, content: "new-content" }])

    const final = await readFile(absTarget, "utf-8")
    expect(final).toBe("original-content")
  })
})
