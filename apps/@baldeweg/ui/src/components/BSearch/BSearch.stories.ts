import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BSearch from "./BSearch.vue"

const meta = {
  component: BSearch,
  parameters: {
    actions: {
      handles: ["submit", "reset", "filter", "update:modelValue"],
    },
  },
  argTypes: {
    modelValue: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    filter: { control: { type: "boolean" } },
    branded: { control: { type: "boolean" } },
    focus: { control: { type: "boolean" } },
    reset: { control: { type: "boolean" } },
    resetLabel: { control: { type: "text" } },
    filterLabel: { control: { type: "text" } },
    searchLabel: { control: { type: "text" } },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {
  args: {
    modelValue: "",
    placeholder: "Search",
    searchLabel: "Search",
    filter: true,
    branded: false,
    focus: false,
    reset: true,
    resetLabel: "Reset",
    filterLabel: "Filter",
  },
  render: (args) => ({
    components: { BSearch },
    setup() {
      return { args }
    },
    template: '<BSearch v-bind="args" />',
  }),
}

export const Branded: Story = {
  args: {
    modelValue: "",
    placeholder: "Search",
    searchLabel: "Search",
    filter: true,
    branded: true,
    focus: false,
    reset: true,
    resetLabel: "Reset",
    filterLabel: "Filter",
  },
  render: (args) => ({
    components: { BSearch },
    setup() {
      return { args }
    },
    template: '<BSearch v-bind="args" />',
  }),
}
