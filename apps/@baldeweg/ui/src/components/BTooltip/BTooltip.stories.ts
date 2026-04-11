import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BTooltip from "./BTooltip.vue"

const meta = {
  component: BTooltip,
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
      description: "Position of the tooltip",
      table: {
        defaultValue: { summary: "top" },
      },
    },
    text: {
      control: { type: "text" },
      description: "Text content of the tooltip",
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BTooltip>

export default meta
type Story = StoryObj<typeof meta>

const Template = (args) => ({
  components: { BTooltip },
  setup() {
    return { args }
  },
  template: `
    <BTooltip v-bind="args">
      <button>Hover me</button>
    </BTooltip>
  `,
})

export const Default: Story = {
  args: {
    text: "This is a tooltip",
    position: "top",
  },
  render: (args) => Template(args),
}
export const Bottom: Story = {
  args: {
    text: "This is a bottom tooltip",
    position: "bottom",
  },
  render: (args) => Template(args),
}

export const Left: Story = {
  args: {
    text: "This is a left tooltip",
    position: "left",
  },
  render: (args) => Template(args),
}

export const Right: Story = {
  args: {
    text: "This is a right tooltip",
    position: "right",
  },
  render: (args) => Template(args),
}

// Long text tooltip example
export const LongText: Story = {
  args: {
    text: "This is a tooltip with a very long text content that demonstrates how the component handles wrapping larger amounts of content.",
    position: "top",
  },
  render: (args) => Template(args),
}
