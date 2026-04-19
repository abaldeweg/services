import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BApp from "./BApp.vue"

const meta = {
  component: BApp,
  tags: ["beta"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'Do not forget to set the attribute `id="app"` here, if not otherwise done.',
      },
    },
  },
} satisfies Meta<typeof BApp>

export default meta
type Story = StoryObj<typeof meta>

export const General: Story = {
  render: (args) => ({
    components: { BApp },
    setup() {
      return { args }
    },
    template: `
      <BApp v-bind="args">
        <section>
          <h1 class="h1">Heading 1</h1>
          <p class="py-l px-none m-none">text text text text text text text text text text</p>
          <h2 class="h2">Heading 2</h2>
          <p class="py-l px-none m-none">text text text text text text text text text text</p>
          <h3 class="h3">Heading 3</h3>
          <p class="py-l px-none m-none">text text text text text text text text text text</p>
          <h4 class="h4">Heading 4</h4>
          <p class="py-l px-none m-none">text text text text text text text text text text</p>
          <h5 class="h5">Heading 5</h5>
          <p class="py-l px-none m-none">text text text text text text text text text text</p>
          <h6 class="h6">Heading 6</h6>
          <p class="py-l px-none m-none">text text text text text text text text text text</p>
        </section>

        <section>
          <p class="py-l px-none m-none"><a href="#" class="link">Example Link</a></p>
          <p class="py-l px-none m-none"><strong>bold</strong></p>
          <p class="py-l px-none m-none"><code>code</code></p>
          <p class="py-l px-none m-none"><em>emphasis</em></p>
          <p class="py-l px-none m-none"><em>italic</em></p>
          <p class="py-l px-none m-none"><strong>strong</strong></p>
        </section>

        <section>
          <h2 class="h2">Ordered List</h2>
          <ol>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>
              Item 3
              <ol>
                <li>Item 3.1</li>
                <li>
                  Item 3.2
                  <ol>
                    <li>Item 3.2.1</li>
                    <li>Item 3.2.2</li>
                  </ol>
                </li>
                <li>Item 3.3</li>
              </ol>
            </li>
            <li>Item 4</li>
          </ol>
        </section>

        <section>
          <h2 class="h2">Unordered List</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>
              Item 3
              <ul>
                <li>Item 3.1</li>
                <li>
                  Item 3.2
                  <ul>
                    <li>Item 3.2.1</li>
                    <li>Item 3.2.2</li>
                  </ul>
                </li>
                <li>Item 3.3</li>
              </ul>
            </li>
            <li>Item 4</li>
          </ul>
        </section>
      </BApp>
    `,
  }),
  args: {},
}
