import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BDropdown from "./BDropdown.vue"
import DropdownItem from "./BDropdownItem.vue"

const meta = {
  component: BDropdown,
  tags: ["experimental"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["selector", "mouse", "bottom"],
    },
    keepOpen: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof BDropdown>

export default meta
type Story = StoryObj<typeof meta>

const dropdownTemplate = `
    <BDropdown v-bind="args">
      <template #selector>
        <button>
          Click to open dropdown
        </button>
      </template>
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
    </BDropdown>
`

export const Position: Story = {
  args: {
    position: "selector",
  },
  render: (args) => ({
    components: { BDropdown, DropdownItem },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}

export const KeepOpen: Story = {
  args: {
    position: "selector",
    keepOpen: true,
  },
  render: (args) => ({
    components: { BDropdown, DropdownItem },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}
