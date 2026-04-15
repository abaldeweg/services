import type { Meta, StoryObj } from "@storybook/vue3-vite"

import BTable from "./BTable.vue"

const meta = {
  component: BTable,
  parameters: {
    docs: {
      description: {
        component:
          "Its just a wrapper, make use of the HTML table elements, including `<table>`.",
      },
    },
  },
  argTypes: {
    hover: {
      control: "boolean",
      description: "Enables hover effect on table rows",
    },
  },
  tags: ["beta"],
} satisfies Meta<typeof BTable>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  args: {
    hover: false,
  },
  render: (args) => ({
    components: { BTable },
    setup() {
      return { args }
    },
    template: `
    <BTable v-bind="args">
      <table>
        <thead>
          <tr>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1</td>
            <td>Row 1</td>
            <td>Row 1</td>
          </tr>
          <tr>
            <td>Row 2</td>
            <td>Row 2</td>
            <td>Row 2</td>
          </tr>
          <tr>
            <td>Row 3</td>
            <td>Row 3</td>
            <td>Row 3</td>
          </tr>
        </tbody>
      </table>
    </BTable>
    `,
  }),
}

export const WithHover: Story = {
  args: {
    hover: true,
  },
  render: (args) => ({
    components: {
      BTable,
    },

    setup() {
      return { args }
    },
    template: `
    <BTable v-bind="args">
      <table>
        <thead>
          <tr>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1</td>
            <td>Row 1</td>
            <td>Row 1</td>
          </tr>
          <tr>
            <td>Row 2</td>
            <td>Row 2</td>
            <td>Row 2</td>
          </tr>
          <tr>
            <td>Row 3</td>
            <td>Row 3</td>
            <td>Row 3</td>
          </tr>
        </tbody>
      </table>
    </BTable>
    `,
  }),
}
