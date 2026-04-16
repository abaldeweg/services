import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BPanel from "./BPanel.vue"

const meta = {
  component: BPanel,
  argTypes: {
    position: {
      control: { type: "select", options: ["left", "right"] },
      description: "The position of the panel",
    },
    width: {
      control: { type: "text" },
      description: "The width of the panel",
    },
    modelValue: {
      control: { type: "boolean" },
      description: "Controls the visibility of the panel",
    },
    permanent: {
      control: { type: "boolean" },
      description:
        "If true, panel is always shown, no overlay, and margin is added",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A sliding panel component that can be positioned on the left or right side of the screen.",
      },
    },
    actions: {
      handles: ["update:modelValue"],
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BPanel>

export default meta
type Story = StoryObj<typeof meta>

const panelTemplate = `
    <div :style="args.modelValue && args.permanent ? { marginLeft: args.position === 'left' ? args.width : undefined, marginRight: args.position === 'right' ? args.width : undefined } : {}">
      <div :style="{margin: 'auto', width: '500px'}">
        <p>Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text </p>
        <button @click="args.modelValue = true">Open Panel</button>
      </div>
    </div>
    <BPanel v-bind="args" @update:modelValue="args.modelValue = $event">
      <template #header v-if="args.showHeader">
        <div style="padding: 1rem;">
          <h2>Panel Header</h2>
        </div>
      </template>

      <div style="padding: 1rem;">
        <h3>Panel Content</h3>
        <p>This is the main content of the panel.</p>
      </div>

      <template #footer v-if="args.showFooter">
        <div style="padding: 1rem;">
          <button @click="args.modelValue = false">Close</button>
        </div>
      </template>
    </BPanel>
  `

export const LeftPanel: Story = {
  args: {
    modelValue: false,
    position: "left",
    width: "300px",
    permanent: false,
  },
  render: (args) => ({
    components: { BPanel },
    setup() {
      return { args }
    },
    template: panelTemplate,
  }),
}

export const RightPanel: Story = {
  args: {
    modelValue: false,
    position: "right",
    width: "300px",
    permanent: false,
  },
  render: (args) => ({
    components: { BPanel },
    setup() {
      return { args }
    },
    template: panelTemplate,
  }),
}

export const WithoutHeader: Story = {
  args: {
    modelValue: false,
    position: "left",
    width: "300px",
    permanent: false,
  },
  render: (args) => ({
    components: { BPanel },
    setup() {
      return { args }
    },
    template: panelTemplate,
  }),
}

export const WithoutFooter: Story = {
  args: {
    modelValue: false,
    position: "left",
    width: "300px",
    permanent: false,
  },
  render: (args) => ({
    components: { BPanel },
    setup() {
      return { args }
    },
    template: panelTemplate,
  }),
}

export const CustomWidth: Story = {
  args: {
    modelValue: false,
    position: "left",
    width: "500px",
    permanent: false,
  },
  render: (args) => ({
    components: { BPanel },
    setup() {
      return { args }
    },
    template: panelTemplate,
  }),
}

export const PermanentPanel: Story = {
  args: {
    modelValue: true,
    position: "left",
    width: "300px",
    permanent: true,
  },
  render: (args) => ({
    components: { BPanel },
    setup() {
      return { args }
    },
    template: panelTemplate,
  }),
}
