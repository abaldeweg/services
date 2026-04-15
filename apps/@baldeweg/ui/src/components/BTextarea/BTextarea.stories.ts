import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BTextarea from "./BTextarea.vue"

const meta = {
  component: BTextarea,
  parameters: {
    docs: {
      description: {
        component:
          "Additional attributes are passed to the underlying textarea element.",
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

export const Full: Story = {
  args: {
    modelValue: "This is some sample text for the textarea.",
    name: "textarea",
    id: "textarea",
    label: "Label",
    help: "This is some help text for the textarea.",
    hideLabel: false,
  },
  render: (args) => ({
    components: { BTextarea },
    setup() {
      return { args }
    },
    template: `<BTextarea v-bind="args" />`,
  }),
}
