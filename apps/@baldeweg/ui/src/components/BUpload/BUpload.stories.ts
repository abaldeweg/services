import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { action } from "storybook/actions"
import BUpload from "./BUpload.vue"

const meta = {
  component: BUpload,
  tags: ["beta"],
  parameters: {
    docs: {
      description: {
        component:
          'Set the enctype of the parent form to `enctype="multipart/form-data"`.',
      },
    },
    actions: {
      handles: ["update:modelValue"],
    },
  },
  argTypes: {
    modelValue: {
      control: "boolean",
      description: "v-model binding",
    },
    id: {
      control: "text",
      description: "ID attribute for the input element",
    },
    text: {
      control: "text",
      description: "Instructional text displayed in the upload area",
    },
    accept: {
      control: "text",
      description: "File types that the file input should accept",
    },
  },
} satisfies Meta<typeof BUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Upload: Story = {
  args: {
    modelValue: false,
    id: "upload",
    text: "Drop a file here or click to upload",
    "onUpdate:modelValue": action("upload"),
  },
  render: (args) => ({
    components: { BUpload },
    setup() {
      return { args }
    },
    template: `<BUpload v-bind="args" />`,
  }),
}

export const PDFUpload: Story = {
  args: {
    modelValue: false,
    id: "upload",
    text: "Drop a pdf file here or click to upload",
    accept: "application/pdf",
    "onUpdate:modelValue": action("upload"),
  },
  render: (args) => ({
    components: { BUpload },
    setup() {
      return { args }
    },
    template: `<BUpload v-bind="args" />`,
  }),
}
