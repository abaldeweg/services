import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BNavigation from "./BNavigation.vue"

describe("BNavigation", () => {
  // general
  it("shows BNavigation", () => {
    expect(BNavigation).toBeTruthy()
  })

  // border
  it("does not apply a border class when border is none", () => {
    const wrapper = mount(BNavigation, { props: { border: "none" } })
    expect(wrapper.classes()).not.toContain("border-primary-100")
    expect(wrapper.classes()).not.toContain("border-neutral-200")
  })

  it("applies border-primary-100 class when border is primary", () => {
    const wrapper = mount(BNavigation, { props: { border: "primary" } })
    expect(wrapper.classes()).toContain("border-primary-100")
  })

  it("applies border-neutral-200 class when border is neutral", () => {
    const wrapper = mount(BNavigation, { props: { border: "neutral" } })
    expect(wrapper.classes()).toContain("border-neutral-200")
  })

  // background
  it("does not apply a background class when background is none", () => {
    const wrapper = mount(BNavigation, { props: { background: "none" } })
    expect(wrapper.classes()).not.toContain("bg-primary-100")
    expect(wrapper.classes()).not.toContain("bg-neutral-200")
  })

  it("applies bg-primary-100 class when background is primary", () => {
    const wrapper = mount(BNavigation, { props: { background: "primary" } })
    expect(wrapper.classes()).toContain("bg-primary-100")
  })

  it("applies bg-neutral-200 class when background is neutral", () => {
    const wrapper = mount(BNavigation, { props: { background: "neutral" } })
    expect(wrapper.classes()).toContain("bg-neutral-200")
  })

  // direction
  it("applies navigation_horizontal class when direction is horizontal", () => {
    const wrapper = mount(BNavigation, { props: { direction: "horizontal" } })
    expect(wrapper.classes()).toContain("navigation_horizontal")
  })

  it("does not apply navigation_horizontal class when direction is vertical", () => {
    const wrapper = mount(BNavigation, { props: { direction: "vertical" } })
    expect(wrapper.classes()).not.toContain("navigation_horizontal")
  })
})
