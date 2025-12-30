import { describe, it, expect, afterEach } from "vitest"
import { mkdir, rm, stat } from "fs/promises"
import { join } from "path"
import { createDirs } from "./createDirs.js"

const targetRelBase = "__test_output__/createDirs"

describe("createDirs", () => {
  afterEach(async () => {
    await rm(join(process.cwd(), targetRelBase), {
      force: true,
      recursive: true,
    })
  })

  it("creates directories recursively when missing", async () => {
    const dirs = [`${targetRelBase}/dir/sub1`, `${targetRelBase}/dir/sub2`]

    await createDirs(dirs)

    await Promise.all(
      dirs.map(async (dir) => {
        const abs = join(process.cwd(), dir)
        const exists = await stat(abs)
        expect(exists.isDirectory()).toBe(true)
      }),
    )
  })

  it("does not throw when directory already exists", async () => {
    const targetRel = `${targetRelBase}/existing/dir`

    const abs = join(process.cwd(), targetRel)
    await mkdir(abs, { recursive: true })

    await expect(createDirs([targetRel])).resolves.toBeUndefined()

    const exists = await stat(abs)
    expect(exists.isDirectory()).toBe(true)
  })
})
