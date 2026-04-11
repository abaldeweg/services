import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BTextarea from "./BTextarea.vue"

const meta = {
  component: BTextarea,
  parameters: {
    docs: {
      description: {
        component:
          "Additional attributes are passed to the underlying input element.",
      },
    },
  },
  tags: ["experimental"],
  argTypes: {
    modelValue: { control: "text" },
    name: { control: "text" },
    id: { control: "text" },
    label: { control: "text" },
    hideLabel: { control: "boolean" },
    help: { control: "text" },
  },
} satisfies Meta<typeof BTextarea>

export default meta
type Story = StoryObj<typeof meta>

const Template = (args) => ({
  components: { BTextarea },
  setup() {
    return { args }
  },
  template: '<BTextarea v-bind="args" />',
})

export const Default: Story = {
  args: {
    modelValue: "This is some sample text for the textarea.",
    name: "textarea",
    id: "textarea",
    label: "Label",
  },
  render: (args) => Template(args),
}

export const WithHelpText: Story = {
  args: {
    ...Default.args,
    help: "This is some help text for the textarea.",
  },
  render: (args) => Template(args),
}

export const HiddenLabel: Story = {
  args: {
    ...Default.args,
    hideLabel: true,
  },
  render: (args) => Template(args),
}
