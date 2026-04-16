import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BMaterialIcon from "./BMaterialIcon.vue"

const meta = {
  component: BMaterialIcon,
  argTypes: {
    size: {
      control: { type: "number" },
      description: "Sets the size of the icon in pixels",
    },
    color: {
      control: { type: "color" },
      description:
        "Sets the color of the icon. Accepts a string (e.g. hex code, custom properties)",
    },
    hover: {
      control: { type: "boolean" },
      description: "Enables hover effect",
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BMaterialIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    size: 24,
    color: "#ffffff",
    hover: false,
  },
  render: (args) => ({
    components: { BMaterialIcon },
    setup() {
      return { args }
    },
    template: `<BMaterialIcon v-bind="args">home</BMaterialIcon>`,
  }),
}

export const Large: Story = {
  args: {
    size: 48,
    color: "#ffffff",
    hover: false,
  },
  render: (args) => ({
    components: { BMaterialIcon },
    setup() {
      return { args }
    },
    template: `<BMaterialIcon v-bind="args">home</BMaterialIcon>`,
  }),
}

export const Colored: Story = {
  args: {
    size: 24,
    color: "#ff0000",
    hover: false,
  },
  render: (args) => ({
    components: { BMaterialIcon },
    setup() {
      return { args }
    },
    template: `<BMaterialIcon v-bind="args">home</BMaterialIcon>`,
  }),
}

export const WithHoverEffect: Story = {
  args: {
    size: 24,
    color: "#ff0000",
    hover: true,
  },
  render: (args) => ({
    components: { BMaterialIcon },
    setup() {
      return { args }
    },
    template: `<BMaterialIcon v-bind="args">home</BMaterialIcon>`,
  }),
}
