import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BAlert from "./BAlert.vue"

const meta = {
  component: BAlert,
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["info", "danger", "warning", "success"],
    },
    closable: { control: "boolean" },
  },
  decorators: [
    () => ({
      template:
        '<div style="padding: 3em; height: 300px; position: relative;">This is same text.<story/></div>',
    }),
  ],
  tags: ["beta"],
} satisfies Meta<typeof BAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: "info",
    closable: false,
  },
  render: (args) => ({
    components: { BAlert },
    setup() {
      return { args }
    },
    template: `<BAlert v-bind="args">This is an alert message. <a href="#">Link</a></BAlert>`,
  }),
}

export const Info: Story = {
  args: {
    type: "info",
    closable: true,
  },
  render: (args) => ({
    components: {
      BAlert,
    },

    setup() {
      return { args }
    },
    template: `<BAlert v-bind="args">This is an alert message. <a href="#">Link</a></BAlert>`,
  }),
}

export const Danger: Story = {
  args: {
    type: "danger",
    closable: true,
  },
  render: (args) => ({
    components: {
      BAlert,
    },

    setup() {
      return { args }
    },
    template: `<BAlert v-bind="args">This is an alert message. <a href="#">Link</a></BAlert>`,
  }),
}

export const Warning: Story = {
  args: {
    type: "warning",
    closable: true,
  },
  render: (args) => ({
    components: {
      BAlert,
    },

    setup() {
      return { args }
    },
    template: `<BAlert v-bind="args">This is an alert message. <a href="#">Link</a></BAlert>`,
  }),
}

export const Success: Story = {
  args: {
    type: "success",
    closable: true,
  },
  render: (args) => ({
    components: {
      BAlert,
    },

    setup() {
      return { args }
    },
    template: `<BAlert v-bind="args">This is an alert message. <a href="#">Link</a></BAlert>`,
  }),
}

export const WithoutCloseButton: Story = {
  args: {
    type: "info",
    closable: false,
  },
  render: (args) => ({
    components: {
      BAlert,
    },

    setup() {
      return { args }
    },
    template: `<BAlert v-bind="args">This is an alert message. <a href="#">Link</a></BAlert>`,
  }),
}
