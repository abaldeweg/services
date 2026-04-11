import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BSelect from "./BSelect.vue"

const meta = {
  component: BSelect,
  tags: ["beta"],
  parameters: {
    docs: {
      description: {
        component:
          "Additional attributes are passed to the underlying input or select element. Label works for options type only.",
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: "object" },
    },
    type: {
      control: "select",
      options: ["checkbox", "radio", "options"],
    },
    name: { control: "text" },
    id: { control: "text" },
    help: { control: "text" },
    options: { control: { type: "object" } },
    optionsKeyName: { control: "text" },
    optionsValueName: { control: "text" },
  },
} satisfies Meta<typeof BSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: "option1",
    name: "checkbox",
    id: "checkbox",
    type: "options",
    options: [
      {
        key: "option1",
        value: "Option 1",
      },
      {
        key: "option2",
        value: "Option 2",
      },
      {
        key: "option3",
        value: "Option 3",
      },
      {
        key: "option4",
        value: "Option 4",
      },
    ],
    label: "Label",
    hideLabel: false,
  },
}

export const Checkbox: Story = {
  args: {
    modelValue: ["option1", "option3"],
    name: "checkbox",
    id: "checkbox",
    type: "checkbox",
    options: [
      { key: "option1", value: "Option 1" },
      { key: "option2", value: "Option 2" },
      { key: "option3", value: "Option 3" },
      { key: "option4", value: "Option 4" },
    ],
  },
}

export const Radio: Story = {
  args: {
    modelValue: "option1",
    name: "checkbox",
    id: "checkbox",
    type: "radio",
    options: [
      {
        key: "option1",
        value: "Option 1",
      },
      {
        key: "option2",
        value: "Option 2",
      },
      {
        key: "option3",
        value: "Option 3",
      },
      {
        key: "option4",
        value: "Option 4",
      },
    ],
  },
}

export const WithHelpline: Story = {
  args: {
    modelValue: ["option1", "option3"],
    name: "checkbox",
    id: "checkbox",
    type: "checkbox",
    options: [
      {
        key: "option1",
        value: "Option 1",
      },
      {
        key: "option2",
        value: "Option 2",
      },
      {
        key: "option3",
        value: "Option 3",
      },
      {
        key: "option4",
        value: "Option 4",
      },
    ],
    help: "Select one option",
  },
}

export const WithCustomKeys: Story = {
  args: {
    modelValue: ["option1", "option3"],
    name: "checkbox",
    id: "checkbox",
    type: "checkbox",
    options: [
      {
        label: "option1",
        id: "Option 1",
      },
      {
        label: "option2",
        id: "Option 2",
      },
      {
        label: "option3",
        id: "Option 3",
      },
      {
        label: "option4",
        id: "Option 4",
      },
    ],
    optionsKeyName: "label",
    optionsValueName: "id",
  },
}
