import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { createRouter, createMemoryHistory } from "vue-router"
import BNavigationItem from "./BNavigationItem.vue"

/**
 * Creates a fresh in-memory router with common test routes.
 */
const createTestRouter = async (initialPath = "/") => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { name: "home", path: "/", component: { template: "<div />" } },
      { name: "inbox", path: "/inbox", component: { template: "<div />" } },
    ],
  })
  await router.push(initialPath)
  await router.isReady()
  return router
}

describe("BNavigationItem", () => {
  // general
  it("shows BNavigationItem", () => {
    expect(BNavigationItem).toBeTruthy()
  })

  // border
  it("does not apply a border class when border is none", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { border: "none" },
      global: { plugins: [router] },
    })
    expect(wrapper.classes()).not.toContain("border-primary-100")
    expect(wrapper.classes()).not.toContain("border-neutral-200")
  })

  it("applies border-primary-100 class", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { border: "primary" },
      global: { plugins: [router] },
    })
    expect(wrapper.classes()).toContain("border-primary-100")
  })

  it("applies border-neutral-200 class", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { border: "neutral" },
      global: { plugins: [router] },
    })
    expect(wrapper.classes()).toContain("border-neutral-200")
  })

  // background
  it("does not apply a background class when background is none", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { background: "none" },
      global: { plugins: [router] },
    })
    expect(wrapper.classes()).not.toContain("bg-primary-100")
    expect(wrapper.classes()).not.toContain("bg-neutral-200")
  })

  it("applies bg-primary-100 class", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { background: "primary" },
      global: { plugins: [router] },
    })
    expect(wrapper.classes()).toContain("bg-primary-100")
  })

  it("applies bg-neutral-200 class", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { background: "neutral" },
      global: { plugins: [router] },
    })
    expect(wrapper.classes()).toContain("bg-neutral-200")
  })

  // direction
  it("does not apply flex-col class for horizontal direction", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { direction: "horizontal" },
      global: { plugins: [router] },
    })
    expect(wrapper.find(".navigation_link").classes()).not.toContain("flex-col")
  })

  it("applies flex-col class for vertical direction", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { direction: "vertical" },
      global: { plugins: [router] },
    })
    expect(wrapper.find(".navigation_link").classes()).toContain("flex-col")
  })

  // route
  it("resolves a route object to an href", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { route: { path: "/inbox" } },
      global: { plugins: [router] },
    })
    expect(wrapper.find("a").attributes("href")).toBe("/inbox")
  })

  it("uses an external URL string directly as href", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { route: "https://localhost" },
      global: { plugins: [router] },
    })
    expect(wrapper.find("a").attributes("href")).toBe("https://localhost")
  })

  it("applies bg-neutral-200 class when the route matches the current path", async () => {
    const router = await createTestRouter("/inbox")
    const wrapper = mount(BNavigationItem, {
      props: { route: { path: "/inbox" } },
      global: { plugins: [router] },
    })
    expect(wrapper.classes()).toContain("bg-neutral-200")
  })

  it("does not apply bg-neutral-200 class when the route does not match", async () => {
    const router = await createTestRouter("/")
    const wrapper = mount(BNavigationItem, {
      props: { route: { path: "/inbox" } },
      global: { plugins: [router] },
    })
    const classes = wrapper.classes().join(" ")
    const hasActiveBg = /\sbg-neutral-200(?:\s|$)/.test(" " + classes)
    expect(hasActiveBg).toBe(false)
  })

  // icon
  it("does not render the icon wrapper when icon prop is not provided", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      global: { plugins: [router] },
    })
    expect(wrapper.find(".navigation_icon").exists()).toBe(false)
  })

  it("renders icon prop", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { icon: "inbox" },
      global: { plugins: [router] },
    })
    expect(wrapper.find(".navigation_icon").exists()).toBe(true)
  })

  // badge
  it("does not render the badge wrapper when badge prop is not provided", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      global: { plugins: [router] },
    })
    expect(wrapper.find(".navigation_badge").exists()).toBe(false)
  })

  it("renders badge content", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      props: { badge: "4" },
      global: { plugins: [router] },
    })
    expect(wrapper.find(".navigation_badge").exists()).toBe(true)
    expect(wrapper.find(".navigation_badge").text()).toBe("4")
  })

  // slots
  it("renders default slot content", async () => {
    const router = await createTestRouter()
    const wrapper = mount(BNavigationItem, {
      slots: { default: "Inbox" },
      global: { plugins: [router] },
    })
    expect(wrapper.find(".navigation_title").text()).toBe("Inbox")
  })
})
