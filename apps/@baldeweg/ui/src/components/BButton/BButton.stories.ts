import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { action } from "storybook/actions"
import BButton from "./BButton.vue"

const meta = {
  component: BButton,
  tags: ["alpha"],
  argTypes: {
    design: {
      control: { type: "select" },
      options: [
        "primary",
        "primary_danger",
        "primary_wide",
        "outline",
        "outline_danger",
        "outline_wide",
        "text",
        "text_danger",
      ],
    },
  },
  args: { onClick: action("clicked") },
} satisfies Meta<typeof BButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    default: "Send",
    design: "primary",
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args }
    },
    template: `<BButton v-bind="args">{{ args.default }}</BButton>`,
  }),
}

export const Secondary: Story = {
  args: {
    default: "Send",
    design: "primary_danger",
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args }
    },
    template: `<BButton v-bind="args">{{ args.default }}</BButton>`,
  }),
}

export const PrimaryWide: Story = {
  args: {
    default: "Send",
    design: "primary_wide",
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args }
    },
    template: `<BButton v-bind="args">{{ args.default }}</BButton>`,
  }),
}

export const Outline: Story = {
  args: {
    default: "Send",
    design: "outline",
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args }
    },
    template: `<BButton v-bind="args">{{ args.default }}</BButton>`,
  }),
}

export const OutlineDanger: Story = {
  args: {
    default: "Send",
    design: "outline_danger",
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args }
    },
    template: `<BButton v-bind="args">{{ args.default }}</BButton>`,
  }),
}

export const OutlineWide: Story = {
  args: {
    default: "Send",
    design: "outline_wide",
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args }
    },
    template: `<BButton v-bind="args">{{ args.default }}</BButton>`,
  }),
}

export const Text: Story = {
  args: {
    default: "Send",
    design: "text",
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args }
    },
    template: `<BButton v-bind="args">{{ args.default }}</BButton>`,
  }),
}

export const TextDanger: Story = {
  args: {
    default: "Send",
    design: "text_danger",
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args }
    },
    template: `<BButton v-bind="args">{{ args.default }}</BButton>`,
  }),
}
