import type { Preview, StoryFn, StoryContext } from "@storybook/vue3-vite"
import { setup } from '@storybook/vue3-vite';
import { createRouter, createMemoryHistory } from 'vue-router';
import BApp from '../src/components/BApp/BApp.vue';
import { registerPlugins } from '../src/plugins';

const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { name: 'home', path: '/home', component: { template: '<div />' } },
    { path: '/:pathMatch(.*)*', component: { template: '<div />' } },
  ],
})

setup((app) => {
  registerPlugins(app);
  app.use(mockRouter);
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#ffffff' },
        dark: { name: 'Dark', value: '#292929' },
      }
    },
    tags: ['autodocs'],
  },
}

export const decorators = [
  (story: StoryFn) => ({
    components: { story, BApp },
    template: '<BApp><story /></BApp>',
  }),
  (story: StoryFn<Record<string, unknown>>, context: StoryContext<Record<string, unknown>>) => {
    setTimeout(() => {
      document.body.setAttribute('data-theme', 'light');
      if (context?.globals?.backgrounds?.value === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
      }
    }, 100);
    return story(context.args, context);
  },
];

export default preview
