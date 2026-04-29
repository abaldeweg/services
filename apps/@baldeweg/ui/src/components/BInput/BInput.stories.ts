import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BInput from "./BInput.vue"

const meta = {
  title: "Components/BInput",
  component: BInput,
  tags: ["beta"],
  parameters: {
    docs: {
      description: {
        component:
          "Not applicable to checkbox and radio. Additional attributes are passed to the underlying input element. For types refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes.",
      },
    },
    actions: {
      handles: ["update:modelValue"],
    },
  },
  argTypes: {
    modelValue: { control: { type: "text" } },
    type: {
      options: [
        "date",
        "color",
        "datetime-local",
        "email",
        "month",
        "number",
        "password",
        "range",
        "search",
        "tel",
        "text",
        "time",
        "url",
        "week",
        "file",
      ],
      control: { type: "select" },
    },
    name: { control: { type: "text" } },
    id: { control: { type: "text" } },
    label: { control: { type: "text" } },
    help: { control: { type: "text" } },
    hideLabel: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof BInput>

export default meta
type Story = StoryObj<typeof meta>

export const Type: Story = {
  args: {
    type: "text",
    modelValue: "This is some sample text for the input.",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
  render: (args) => ({
    components: { BInput },
    setup() {
      return { args }
    },
    template: `<BInput v-bind="args" />`,
  }),
}

export const HideLabel: Story = {
  args: {
    hideLabel: true,
    modelValue: "This is some sample text for the input.",
    type: "text",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
  },
  render: (args) => ({
    components: { BInput },
    setup() {
      return { args }
    },
    template: `<BInput v-bind="args" />`,
  }),
}

export const WithoutHelpline: Story = {
  args: {
    help: "",
    modelValue: "This is some sample text for the input.",
    type: "text",
    name: "input",
    id: "input",
    label: "Label",
    hideLabel: false,
  },
  render: (args) => ({
    components: { BInput },
    setup() {
      return { args }
    },
    template: `<BInput v-bind="args" />`,
  }),
}
