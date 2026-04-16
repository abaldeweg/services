import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BFieldset from "./BFieldset.vue"

const meta = {
  component: BFieldset,
  argTypes: {
    legend: { control: "text" },
  },
  tags: ["beta"],
} satisfies Meta<typeof BFieldset>

export default meta
type Story = StoryObj<typeof meta>

export const General: Story = {
  args: {
    legend: "Label",
  },
  render: (args) => ({
    components: { BFieldset },
    setup() {
      return { args }
    },
    template: `
      <BFieldset v-bind="args">
        <button>Submit</button>
      </BFieldset>
    `,
  }),
}
