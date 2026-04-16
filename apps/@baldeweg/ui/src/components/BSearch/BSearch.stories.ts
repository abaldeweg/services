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
    placeholder: { control: { type: "text" } },
    modelValue: { control: { type: "text" } },
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

export const Base: Story = {
  args: {
    placeholder: "Search",
    modelValue: "",
    searchLabel: "Search",
  },
  render: (args) => ({
    components: { BSearch },
    setup() {
      return { args }
    },
    template: '<BSearch v-bind="args" />',
  }),
}

export const WithFilter: Story = {
  args: {
    placeholder: "Search",
    modelValue: "",
    filter: true,
    filterLabel: "Show filters",
    searchLabel: "Search",
  },
  render: (args) => ({
    components: { BSearch },
    setup() {
      return { args }
    },
    template: '<BSearch v-bind="args" />',
  }),
}

export const WithReset: Story = {
  args: {
    placeholder: "Search",
    modelValue: "Search term",
    reset: true,
    resetLabel: "Clear search",
    searchLabel: "Search",
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
    placeholder: "Search",
    modelValue: "",
    branded: true,
    searchLabel: "Search",
  },
  render: (args) => ({
    components: { BSearch },
    setup() {
      return { args }
    },
    template: '<BSearch v-bind="args" />',
  }),
}

export const Autofocus: Story = {
  args: {
    placeholder: "Search",
    modelValue: "",
    focus: true,
    searchLabel: "Search",
  },
  render: (args) => ({
    components: { BSearch },
    setup() {
      return { args }
    },
    template: '<BSearch v-bind="args" />',
  }),
}

export const WithAllFeatures: Story = {
  args: {
    placeholder: "Search",
    modelValue: "Example search",
    filter: true,
    reset: true,
    branded: true,
    resetLabel: "Clear search",
    filterLabel: "Show filters",
    searchLabel: "Search",
  },
  render: (args) => ({
    components: { BSearch },
    setup() {
      return { args }
    },
    template: '<BSearch v-bind="args" />',
  }),
}
