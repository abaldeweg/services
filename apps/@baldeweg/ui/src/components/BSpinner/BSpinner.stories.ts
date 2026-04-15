import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BSpinner from "./BSpinner.vue"

const meta = {
  component: BSpinner,
  tags: ["beta"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
      description: "Controls the size of the spinner",
    },
  },
} satisfies Meta<typeof BSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Size: Story = {
  args: {
    size: "l",
  },
  render: (args) => ({
    components: { BSpinner },
    setup() {
      return { args }
    },
    template: `<BSpinner v-bind="args" />`,
  }),
}
