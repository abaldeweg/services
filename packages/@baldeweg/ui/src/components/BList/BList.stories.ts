import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BList from "./BList.vue"
import placeholderImage from "../../assets/placeholder_16x9.jpg"

const meta = {
  component: BList,
  argTypes: {
    mediaSize: {
      control: "select",
      options: ["landscape", "portrait", "avatar"],
    },
    divider: {
      control: "boolean",
    },
    hover: {
      control: "boolean",
    },
    route: {
      control: "object",
    },
    textWidth: {
      control: "text",
    },
    controlsWidth: {
      control: "text",
    },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BList>

export default meta
type Story = StoryObj<typeof meta>

export const Landscape: Story = {
  render: (args) => ({
    components: { BList },
    setup() {
      return { args, placeholderImage }
    },
    template: `
      <BList v-bind="args">
      <template #media>
          <img :src="placeholderImage" alt="Placeholder" />
        </template>
        <template #title>List Title</template>
        <template #subtitle>Subtitle</template>
        <template #text>Text</template>
        This is the default content
        <template #controls>
          <button>Add</button>
          <button>Remove</button>
        </template>
      </BList>
    `,
  }),
  args: {
    divider: true,
    hover: true,
    route: { name: "home", params: { id: 1 } },
    controlsWidth: "120px",
  },
}

export const Portrait: Story = {
  render: (args) => ({
    components: { BList },
    setup() {
      return { args, placeholderImage }
    },
    template: `
      <BList v-bind="args">
      <template #media>
          <img :src="placeholderImage" alt="Placeholder" />
        </template>
        <template #title>List Title</template>
        <template #subtitle>Subtitle</template>
        <template #text>Text</template>
        This is the default content
        <template #controls>
          <button>Add</button>
          <button>Remove</button>
        </template>
      </BList>
    `,
  }),
  args: {
    mediaSize: "portrait",
    divider: true,
    hover: true,
    route: { name: "home", params: { id: 1 } },
    controlsWidth: "120px",
  },
}

export const Avatar: Story = {
  render: (args) => ({
    components: { BList },
    setup() {
      return { args, placeholderImage }
    },
    template: `
      <BList v-bind="args">
      <template #media>
          <img :src="placeholderImage" alt="Placeholder" />
        </template>
        <template #title>List Title</template>
        <template #subtitle>Subtitle</template>
        <template #text>Text</template>
        This is the default content
        <template #controls>
          <button>Add</button>
          <button>Remove</button>
        </template>
      </BList>
    `,
  }),
  args: {
    mediaSize: "avatar",
    divider: true,
    hover: true,
    route: { name: "home", params: { id: 1 } },
    controlsWidth: "120px",
  },
}
