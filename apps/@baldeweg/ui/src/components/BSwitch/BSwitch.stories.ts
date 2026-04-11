import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BSwitch from "./BSwitch.vue"

const meta = {
  component: BSwitch,
  tags: ["beta"],
  argTypes: {
    modelValue: { control: "boolean" },
    label: { control: "text" },
  },
} satisfies Meta<typeof BSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: true,
    label: "Label",
  },
}
