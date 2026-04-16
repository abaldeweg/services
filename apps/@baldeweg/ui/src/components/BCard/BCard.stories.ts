import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BCard from "./BCard.vue"
import placeholderImage from "../../assets/placeholder_16x9.jpg"

const meta = {
  component: BCard,
  argTypes: {
    outlined: {
      control: "boolean",
      description: "Sets an outline style for the card",
    },
    filled: {
      control: "boolean",
      description: "Sets a filled background style for the card",
    },
    route: {
      control: "object",
      description: "Router link object for clickable card elements",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A versatile card component that can display various content with different styles.",
      },
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BCard>

export default meta
type Story = StoryObj<typeof meta>

const cardTemplate = `
    <BCard v-bind="args">
      <template #title>Card Title</template>
      <template #subtitle v-if="args.subtitle">Card Subtitle</template>
      <template #text v-if="args.text">This is the card content that provides more information about this card item.</template>
      <template #image v-if="args.image">
        <img :src="placeholderImage" alt="Card image" />
      </template>
      <template #actions v-if="args.actions">
        <button>Action 1</button>
        <button>Action 2</button>
      </template>
    </BCard>
  `

export const Default: Story = {
  args: {
    outlined: false,
    filled: false,
    text: true,
  },
  render: (args) => ({
    components: { BCard },
    setup() {
      return { args, placeholderImage }
    },
    template: cardTemplate,
  }),
}

export const Outlined: Story = {
  args: {
    outlined: true,
    text: true,
  },
  render: (args) => ({
    components: { BCard },
    setup() {
      return { args, placeholderImage }
    },
    template: cardTemplate,
  }),
}

export const Filled: Story = {
  args: {
    filled: true,
    text: true,
  },
  render: (args) => ({
    components: { BCard },
    setup() {
      return { args, placeholderImage }
    },
    template: cardTemplate,
  }),
}

export const WithImage: Story = {
  args: {
    outlined: true,
    text: true,
    image: true,
  },
  render: (args) => ({
    components: { BCard },
    setup() {
      return { args, placeholderImage }
    },
    template: cardTemplate,
  }),
}

export const WithSubtitle: Story = {
  args: {
    outlined: true,
    subtitle: true,
    text: true,
  },
  render: (args) => ({
    components: { BCard },
    setup() {
      return { args, placeholderImage }
    },
    template: cardTemplate,
  }),
}

export const WithActions: Story = {
  args: {
    outlined: true,
    text: true,
    actions: true,
  },
  render: (args) => ({
    components: { BCard },
    setup() {
      return { args, placeholderImage }
    },
    template: cardTemplate,
  }),
}

export const CompleteCard: Story = {
  args: {
    outlined: true,
    image: true,
    subtitle: true,
    text: true,
    actions: true,
  },
  render: (args) => ({
    components: { BCard },
    setup() {
      return { args, placeholderImage }
    },
    template: cardTemplate,
  }),
}

export const ClickableCard: Story = {
  args: {
    outlined: true,
    image: true,
    subtitle: true,
    text: true,
    route: { path: "/" },
  },
  render: (args) => ({
    components: { BCard },
    setup() {
      return { args, placeholderImage }
    },
    template: cardTemplate,
  }),
}
