import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    '../src/**/*.stories.ts',
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    'storybook-addon-tag-badges'
  ],
  "framework": "@storybook/vue3-vite",
  'core': {
    'disableTelemetry': true
  }
};
export default config;
