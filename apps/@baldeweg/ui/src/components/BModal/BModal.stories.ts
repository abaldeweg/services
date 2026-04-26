import type { Meta, StoryObj } from "@storybook/vue3-vite"
import BModal from "./BModal.vue"
import BMaterialIcon from "../BMaterialIcon/BMaterialIcon.vue"

const meta = {
  component: BModal,
  argTypes: {
    modelValue: { control: "boolean" },
    width: { control: { type: "number", min: 200, max: 1000, step: 50 } },
    closeButton: { control: "boolean" },
  },
  tags: ["experimental"],
} satisfies Meta<typeof BModal>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: (args) => ({
    components: { BModal, BMaterialIcon },
    setup() {
      return { args }
    },
    template: `
        <button @click="args.modelValue = true">Open Modal</button>
        <BModal v-bind="args" @update:modelValue="args.modelValue = $event">
          <template #title>Modal Title</template>
          <p class="p-xl">This is the modal content.</p>
          <template #footer>
            <div class="flex justify-end gap-10">
              <button @click="args.modelValue = false">Cancel</button>
              <button @click="args.modelValue = false" class="ml-l">Save</button>
            </div>
          </template>
        </BModal>
    `,
  }),
  args: {
    modelValue: true,
    width: 600,
    closeButton: true,
  },
}

export const Width: Story = {
  render: (args) => ({
    components: { BModal, BMaterialIcon },
    setup() {
      return { args }
    },
    template: `
      <button @click="args.modelValue = true">Open Modal</button>
        <BModal v-bind="args" @update:modelValue="args.modelValue = $event">
          <template #title>Modal Title</template>
          <p class="p-xl">This is the modal content.</p>
          <template #footer>
            <div class="flex justify-end gap-10">
              <button @click="args.modelValue = false">Cancel</button>
              <button @click="args.modelValue = false" class="ml-l">Save</button>
            </div>
          </template>
        </BModal>
    `,
  }),
  args: {
    modelValue: true,
    width: 900,
    closeButton: true,
  },
}

export const Closable: Story = {
  render: (args) => ({
    components: { BModal, BMaterialIcon },
    setup() {
      return { args }
    },
    template: `
      <button @click="args.modelValue = true">Open Modal</button>
        <BModal v-bind="args" @update:modelValue="args.modelValue = $event">
          <template #title>Modal Title</template>
          <p class="p-xl">This is the modal content.</p>
          <template #footer>
            <div class="flex justify-end gap-10">
              <button @click="args.modelValue = false">Cancel</button>
              <button @click="args.modelValue = false" class="ml-l">Save</button>
            </div>
          </template>
        </BModal>
    `,
  }),
  args: {
    modelValue: true,
    width: 600,
    closeButton: true,
  },
}
