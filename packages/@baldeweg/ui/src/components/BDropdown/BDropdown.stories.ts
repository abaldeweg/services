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
    align: {
      control: { type: "select" },
      options: ["bottom", "top", "left", "right"],
    },
    keepOpen: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof BDropdown>

export default meta
type Story = StoryObj<typeof meta>

const dropdownTemplate = `
  <div style="display: flex; justify-content: center; align-items: center; min-height: 350px;">
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
  </div>
`

export const AlignBottom: Story = {
  args: {
    align: "bottom",
  },
  render: (args) => ({
    components: { BDropdown, DropdownItem },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}

export const AlignTop: Story = {
  args: {
    align: "top",
  },
  render: (args) => ({
    components: { BDropdown, DropdownItem },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}

export const AlignLeft: Story = {
  args: {
    align: "left",
  },
  render: (args) => ({
    components: { BDropdown, DropdownItem },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}

export const AlignRight: Story = {
  args: {
    align: "right",
  },
  render: (args) => ({
    components: { BDropdown, DropdownItem },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}

export const PositionMouse: Story = {
  args: {
    position: "mouse",
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
