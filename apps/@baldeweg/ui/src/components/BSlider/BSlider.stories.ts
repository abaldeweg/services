import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BSlider from "./BSlider.vue"
import BCard from "../BCard/BCard.vue"

const meta = {
  component: BSlider,
  tags: ["experimental"],
} satisfies Meta<typeof BSlider>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {},
  render: (args) => ({
    components: { BSlider },
    setup() {
      return { args }
    },
    template: `
    <BSlider>
      <div v-for="n in 10" :key="n" style="min-width: 200px; height: 150px; background-color:rgb(255, 255, 255); color:rgb(0, 0, 0); display: flex; justify-content: center; align-items: center; scroll-snap-align: start;">
        Slide {{ n }}
      </div>
    </BSlider>
  `,
  }),
}

export const WithCards: Story = {
  args: {},
  render: () => ({
    components: { BSlider, BCard },
    template: `
      <BSlider>
        <a href="#" v-for="n in 8" :key="n">
          <BCard :style="{ width: '200px' }">
            <template #title>
              Card {{ n }}
            </template>
            <template #subtitle>
              This is a card component displayed inside a slider for horizontal scrolling.
            </template>
          </BCard>
        </a>
      </BSlider>
    `,
  }),
}
