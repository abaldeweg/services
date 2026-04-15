import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BForm from "./BForm.vue"

const meta = {
  title: "Components/BForm",
  component: BForm,
  tags: ["beta"],
} satisfies Meta<typeof BForm>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  render: () => ({
    components: { BForm },
    template: `
      <BForm>
        <p>Form content goes here</p>
        <template #buttons>
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </template>
      </BForm>
    `,
  }),
}
