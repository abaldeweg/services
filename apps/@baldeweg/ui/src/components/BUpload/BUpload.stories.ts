import type { Meta, StoryObj } from "@storybook/vue3-vite"

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
    modelValue: {
      control: "boolean",
      description: "v-model binding",
    },
  },
} satisfies Meta<typeof BUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "upload",
    text: "Drop a file here or click to upload",
  },
}

export const PDFUpload: Story = {
  args: {
    id: "upload",
    text: "Drop a pdf file here or click to upload",
    accept: "application/pdf",
  },
}
