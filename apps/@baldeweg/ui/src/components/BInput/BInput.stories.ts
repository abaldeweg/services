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
      control: {
        type: "select", options: [
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
        ]
      }
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

export const Default: Story = {
  args: {
    type: "text",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Date: Story = {
  args: {
    type: "date",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Color: Story = {
  args: {
    type: "color",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Datetime: Story = {
  args: {
    type: "datetime-local",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Email: Story = {
  args: {
    type: "email",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Month: Story = {
  args: {
    type: "month",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Number: Story = {
  args: {
    type: "number",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Password: Story = {
  args: {
    type: "password",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Range: Story = {
  args: {
    type: "range",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Search: Story = {
  args: {
    type: "search",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Tel: Story = {
  args: {
    type: "tel",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Time: Story = {
  args: {
    type: "time",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const URL: Story = {
  args: {
    type: "url",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const Week: Story = {
  args: {
    type: "week",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: false,
  },
}

export const HiddenLabel: Story = {
  args: {
    type: "text",
    name: "input",
    id: "input",
    label: "Label",
    help: "This is a help text",
    hideLabel: true,
  },
}

export const WithoutHelpline: Story = {
  args: {
    type: "text",
    name: "input",
    id: "input",
    label: "Label",
    help: "",
    hideLabel: false,
  },
}
