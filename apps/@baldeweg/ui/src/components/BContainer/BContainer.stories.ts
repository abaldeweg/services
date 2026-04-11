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
    highlight: {
      control: "boolean",
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BContainer>

export default meta
type Story = StoryObj<typeof meta>

const Template = (args) => ({
  components: { BContainer },
  setup() {
    return { args }
  },
  template: `
    <BContainer v-bind="args">
      <p>This is content inside the container.</p>
    </BContainer>
  `,
})

export const Default: Story = {
  args: {
    size: "l",
    align: "left",
    highlight: false,
  },
  render: (args) => Template(args),
}

export const MediumSize: Story = {
  args: {
    size: "m",
    align: "left",
    highlight: false,
  },
  render: (args) => Template(args),
}

export const SmallSize: Story = {
  args: {
    size: "s",
    align: "left",
    highlight: false,
  },
  render: (args) => Template(args),
}

export const CenterAligned: Story = {
  args: {
    size: "l",
    align: "center",
    highlight: false,
  },
  render: (args) => Template(args),
}

export const RightAligned: Story = {
  args: {
    size: "l",
    align: "right",
    highlight: false,
  },
  render: (args) => Template(args),
}

export const Highlighted: Story = {
  args: {
    size: "l",
    align: "left",
    highlight: true,
  },
  render: (args) => Template(args),
}
