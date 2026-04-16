import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BDialog from "./BDialog.vue"

const meta = {
  component: BDialog,
  argTypes: {
    modelValue: {
      control: { type: "boolean" },
      description: "Controls the visibility of the dialog",
    },
    canClose: {
      control: { type: "boolean" },
      description: "Whether the dialog can be closed by clicking the overlay",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A dialog component that can be toggled on/off and contain custom content and actions.",
      },
    },
    actions: {
      handles: ["update:modelValue"],
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BDialog>

export default meta
type Story = StoryObj<typeof meta>

const dialogTemplate = `
    <div>
      <button @click="args.modelValue = true">Open Dialog</button>
      <BDialog v-model:modelValue="args.modelValue" :canClose="args.canClose">
        <template #default>
          <h2>Dialog Title</h2>
          <p>This is the content of the dialog. You can put any content here.</p>
        </template>
        <template #actions>
          <button @click="args.modelValue = false">Close</button>
          <button @click="args.modelValue = false" style="margin-left: 10px;">Submit</button>
        </template>
      </BDialog>
    </div>
  `

export const Default: Story = {
  args: {
    modelValue: false,
    canClose: true,
  },
  render: (args) => ({
    components: { BDialog },
    setup() {
      return { args }
    },
    template: dialogTemplate,
  }),
}

export const NonClosable: Story = {
  args: {
    modelValue: false,
    canClose: false,
  },
  render: (args) => ({
    components: { BDialog },
    setup() {
      return { args }
    },
    template: dialogTemplate,
  }),
}

export const OpenByDefault: Story = {
  args: {
    modelValue: true,
    canClose: true,
  },
  render: (args) => ({
    components: { BDialog },
    setup() {
      return { args }
    },
    template: dialogTemplate,
  }),
}
