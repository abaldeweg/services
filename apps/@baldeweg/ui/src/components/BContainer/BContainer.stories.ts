import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BContainer from "./BContainer.vue"

const meta = {
  component: BContainer,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["l", "m", "s"],
    },
    align: {
      control: { type: "select" },
      options: ["left", "right", "center"],
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Size: Story = {
  args: {
    size: "l",
    align: "left",
  },
  render: (args) => ({
    components: { BContainer },
    setup() {
      return { args }
    },
    template: `<BContainer v-bind="args">This is content inside the container.</BContainer>`,
  }),
}

export const Align: Story = {
  args: {
    size: "l",
    align: "right",
  },
  render: (args) => ({
    components: { BContainer },
    setup() {
      return { args }
    },
    template: `<BContainer v-bind="args">This is content inside the container.</BContainer>`,
  }),
}
