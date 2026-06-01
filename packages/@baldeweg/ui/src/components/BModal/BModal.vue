<script setup lang="ts">
import { onBeforeUnmount, onMounted, useSlots } from "vue"

interface Props {
  modelValue: boolean
  width?: number
  closeButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 600,
  closeButton: true,
})

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const slots = useSlots()

/**
 * Closes the modal by emitting an event to update the modelValue to false and removing the "isModalOpen" class from the body element.
 */
const close = (): void => {
  emit("update:modelValue", false)
  document.body.classList.remove("isModalOpen")
}

/**
 * Handles the keydown event to close the modal when the Escape key is pressed.
 */
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape" && props.modelValue) {
    close()
  }
}

onMounted((): void => {
  document.body.classList.add("isModalOpen")
  document.addEventListener("keydown", handleKeydown)
})

onBeforeUnmount((): void => {
  document.body.classList.remove("isModalOpen")
  document.removeEventListener("keydown", handleKeydown)
})
</script>

<template>
  <div v-if="modelValue" class="top-none left-none fixed z-4 w-full">
    <div
      class="top-none left-none fixed h-full w-full bg-neutral-100 opacity-80"
      @click="close"
    />

    <div
      class="my-2xl rounded-m relative mx-auto box-border flex h-[calc(100vh-120px)] flex-col border border-neutral-200 bg-neutral-100"
      :style="{ maxWidth: width + 'px' }"
    >
      <div class="py-m px-xl flex items-center border-b border-neutral-200">
        <h2 class="text-m m-none grow font-sans font-normal" v-if="slots.title">
          <slot name="title" />
        </h2>
        <span class="float-right" @click="close" v-if="closeButton">
          <BMaterialIcon :size="26" hover>close</BMaterialIcon>
        </span>
      </div>

      <div class="h-[calc(100vh-90px)] grow overflow-y-auto">
        <slot />
      </div>

      <div class="p-xl border-t border-neutral-200" v-if="slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style>
body.isModalOpen {
  overflow: hidden;
}
</style>
