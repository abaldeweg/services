import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BSliderItem from "./BSliderItem.vue"

const meta = {
  component: BSliderItem,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "s", "m", "l", "xl"],
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BSliderItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "m",
  },
  render: (args) => ({
    components: { BSliderItem },
    setup() {
      return { args }
    },
    template: '<BSliderItem v-bind="args">Slider Item Content</BSliderItem>',
  }),
}

export const ExtraSmall: Story = {
  args: {
    size: "xs",
  },
  render: (args) => ({
    components: { BSliderItem },
    setup() {
      return { args }
    },
    template: '<BSliderItem v-bind="args">Slider Item Content</BSliderItem>',
  }),
}

export const Small: Story = {
  args: {
    size: "s",
  },
  render: (args) => ({
    components: { BSliderItem },
    setup() {
      return { args }
    },
    template: '<BSliderItem v-bind="args">Slider Item Content</BSliderItem>',
  }),
}

export const Medium: Story = {
  args: {
    size: "m",
  },
  render: (args) => ({
    components: { BSliderItem },
    setup() {
      return { args }
    },
    template: '<BSliderItem v-bind="args">Slider Item Content</BSliderItem>',
  }),
}

export const Large: Story = {
  args: {
    size: "l",
  },
  render: (args) => ({
    components: { BSliderItem },
    setup() {
      return { args }
    },
    template: '<BSliderItem v-bind="args">Slider Item Content</BSliderItem>',
  }),
}

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
  render: (args) => ({
    components: { BSliderItem },
    setup() {
      return { args }
    },
    template: '<BSliderItem v-bind="args">Slider Item Content</BSliderItem>',
  }),
}

export const WithCustomContent: Story = {
  args: {
    size: "m",
  },
  render: (args) => ({
    components: { BSliderItem },
    setup() {
      return { args }
    },
    template: `
      <BSliderItem v-bind="args">
        <div style="padding: 20px; background-color:rgb(0, 0, 0); border-radius: 4px; text-align: center;">
          <h3>Custom Content</h3>
          <p>You can place any content inside the slider item.</p>
        </div>
      </BSliderItem>
    `,
  }),
}
