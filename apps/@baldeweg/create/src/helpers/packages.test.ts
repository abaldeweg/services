import { mkdir, rm } from "fs/promises"
import { describe, it, expect, afterAll } from "vitest"
import { listPackageDirs, canCreatePackage } from "./packages.js"
import { join } from "path"

describe("packages helper", () => {
  afterAll(async () => {
    await rm(join('.', '__test_output__'), { force: true, recursive: true })
  })

  it("listPackageDirs returns defaults plus matching packages-* dirs", async () => {
    await mkdir('./__test_output__/packages-private', { recursive: true })

    const results = await listPackageDirs('./__test_output__')
    expect(results).toContain('apps')
    expect(results).toContain('packages')
    expect(results).toContain('packages-private')
  })

  it("listPackageDirs returns defaults when dir missing", async () => {
    const results = await listPackageDirs('__this_dir_does_not_exist__')
    expect(results).toContain('apps')
    expect(results).toContain('packages')
  })

  it("canCreatePackage returns false for empty name", async () => {
    expect(await canCreatePackage('./__test_output__', '')).toBe(false)
  })

  it("canCreatePackage returns true when package does not exist", async () => {
    const ok = await canCreatePackage('./__test_output__', 'package')
    expect(ok).toBe(true)
  })

  it("canCreatePackage returns false when package already exists", async () => {
    await mkdir('./__test_output__/packages/package', { recursive: true })

    const ok = await canCreatePackage('./__test_output__', 'package')
    expect(ok).toBe(false)
  })
})

