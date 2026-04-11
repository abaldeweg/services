import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BDivider from "./BDivider.vue"

const meta = {
  component: BDivider,
  tags: ["beta"],
} satisfies Meta<typeof BDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BDivider },
    setup() {
      return { args }
    },
    template: `<BDivider v-bind="args" />`,
  }),
}
