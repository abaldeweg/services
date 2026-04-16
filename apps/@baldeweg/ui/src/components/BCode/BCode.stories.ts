import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BCode from "./BCode.vue"

const meta = {
  component: BCode,
  tags: ["beta"],
  argTypes: {
    default: {
      control: "text",
      description: "The content to be displayed inside the code block",
    },
  },
} satisfies Meta<typeof BCode>

export default meta
type Story = StoryObj<typeof meta>

export const General: Story = {
  args: {
    default: 'const example = "test";\nconsole.log(example);',
  },
}
