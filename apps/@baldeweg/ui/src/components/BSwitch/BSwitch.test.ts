import { describe, it, expect } from "vitest"
import BSwitch from "./BSwitch.vue"
import { mount } from "@vue/test-utils"

describe("BSwitch", () => {
  it("shows BSwitch", () => {
    expect(BSwitch).toBeTruthy()
  })

  it("emits update:modelValue with toggled value on click", async () => {
    const { mount } = await import("@vue/test-utils")
    const wrapper = mount(BSwitch, {
      props: {
        modelValue: false,
        label: "Test Switch",
      },
    })

    await wrapper.find(".switch_indicator").trigger("click")
    const emitted = wrapper.emitted()
    expect(emitted).toHaveProperty("update:modelValue")
    expect(emitted["update:modelValue"]?.[0]).toEqual([true])
  })

  it("updates parent modelValue on click", async () => {
    const Parent = {
      components: { BSwitch },
      template: '<BSwitch v-model="value" />',
      data: () => ({ value: false }),
    }

    const wrapper = mount(Parent)
    await wrapper.findComponent(BSwitch).find(".switch_indicator").trigger("click")

    expect(wrapper.vm.value).toBe(true)

    const child = wrapper.findComponent(BSwitch)
    expect(child.props("modelValue")).toBe(true)

    await wrapper.findComponent(BSwitch).find(".switch_indicator").trigger("click")
    expect(wrapper.vm.value).toBe(false)
  })
})
