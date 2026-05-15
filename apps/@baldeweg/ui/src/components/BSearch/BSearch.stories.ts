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

export const Full: Story = {
  args: {
    placeholder: "Search",
    modelValue: "",
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
