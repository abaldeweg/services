import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BDropdown from "./BDropdown.vue"

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
    <div style="height: 300px; padding: 50px;">
      <BDropdown v-bind="args">
        <template #selector>
          <button>
            Click to open dropdown
          </button>
        </template>
        <li style="padding: 10px;">Item 1</li>
        <li style="padding: 10px;">Item 2</li>
        <li style="padding: 10px;">Item 3</li>
      </BDropdown>
    </div>
  `

export const Default: Story = {
  args: {
    position: "selector",
    keepOpen: false,
  },
  render: (args) => ({
    components: { BDropdown },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}

export const MousePosition: Story = {
  args: {
    position: "mouse",
    keepOpen: false,
  },
  render: (args) => ({
    components: { BDropdown },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}

export const BottomPosition: Story = {
  args: {
    position: "bottom",
    keepOpen: false,
  },
  render: (args) => ({
    components: { BDropdown },
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
    components: { BDropdown },
    setup() {
      return { args }
    },
    template: dropdownTemplate,
  }),
}
