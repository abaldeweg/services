import type { Preview, StoryFn } from "@storybook/vue3-vite"
import { setup } from "@storybook/vue3-vite"
import { createRouter, createMemoryHistory } from "vue-router"
import BApp from "../src/components/BApp/BApp.vue"
import { registerPlugins } from "../src/plugins"
import "../src/globals.css"

const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { name: "home", path: "/home", component: { template: "<div />" } },
    { path: "/:pathMatch(.*)*", component: { template: "<div />" } },
  ],
})

setup((app) => {
  registerPlugins(app)
  app.use(mockRouter)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      toc: true,
    },
    a11y: {
      test: "todo",
    },
    tags: ["autodocs"],
  },
}

export const decorators = [
  (story: StoryFn) => ({
    components: { story, BApp },
    template: "<BApp><story /></BApp>",
  }),
]

export default preview
