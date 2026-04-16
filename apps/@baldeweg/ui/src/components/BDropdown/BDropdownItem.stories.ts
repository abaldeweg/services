import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BDropdownItem from "./BDropdownItem.vue"
import BMaterialIcon from "../BMaterialIcon/BMaterialIcon.vue"

const meta = {
  component: BDropdownItem,
  tags: ["experimental"],
  argTypes: {
    bold: {
      control: "boolean",
      description: "Makes the text bold",
    },
    noHover: {
      control: "boolean",
      description: "Disables hover effect",
    },
    icon: {
      control: "text",
      description: "Material icon name to display",
    },
  },
} satisfies Meta<typeof BDropdownItem>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  render: (args) => ({
    components: { BDropdownItem, BMaterialIcon },
    setup() {
      return { args }
    },
    template:
      '<BDropdownItem v-bind="args">Combined Properties</BDropdownItem>',
  }),
  args: {
    bold: true,
    icon: "star",
    noHover: false,
  },
}

export const WithIcon: Story = {
  render: (args) => ({
    components: { BDropdownItem, BMaterialIcon },
    setup() {
      return { args }
    },
    template:
      '<BDropdownItem v-bind="args">Dropdown Item with Icon</BDropdownItem>',
  }),
  args: {
    icon: "settings",
  },
}

export const Bold: Story = {
  render: (args) => ({
    components: { BDropdownItem, BMaterialIcon },
    setup() {
      return { args }
    },
    template: '<BDropdownItem v-bind="args">Bold Dropdown Item</BDropdownItem>',
  }),
  args: {
    bold: true,
  },
}

export const NoHover: Story = {
  render: (args) => ({
    components: { BDropdownItem, BMaterialIcon },
    setup() {
      return { args }
    },
    template:
      '<BDropdownItem v-bind="args">Dropdown Item without Hover</BDropdownItem>',
  }),
  args: {
    noHover: true,
  },
}
