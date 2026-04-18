<script setup lang="ts">
import { onBeforeUnmount, onMounted, useSlots } from "vue"

interface Props {
  modelValue?: boolean
  width?: number
  closeButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  width: 600,
  closeButton: true,
})

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const close = (): void => {
  emit("update:modelValue", false)
  document.body.classList.remove("isModalOpen")
}

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

const slots = useSlots()
</script>

<template>
  <div v-if="modelValue" class="modal fixed z-4 w-full">
    <div
      class="modal_overlay fixed h-full w-full bg-neutral-100 opacity-80"
      @click="close"
    />

    <div
      class="modal_inner my-3xl relative mx-auto box-border flex flex-col rounded-xl border border-neutral-200 bg-neutral-100"
      :style="{ maxWidth: width + 'px' }"
    >
      <div class="py-m px-xl flex items-center border-b border-neutral-200">
        <h2 class="modal_title grow font-normal" v-if="slots.title">
          <slot name="title" />
        </h2>
        <span class="float-right" @click="close" v-if="closeButton">
          <BMaterialIcon :size="26" hover>close</BMaterialIcon>
        </span>
      </div>

      <div class="modal_body grow overflow-y-auto">
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

<style scoped>
.modal {
  top: 0;
  left: 0;
}

.modal_overlay {
  top: 0;
  left: 0;
}

.modal_inner {
  height: calc(100vh - 120px);
}

.modal_title {
  font-family: var(--font-sans);
  font-size: 1rem;
  margin: 0;
}

.modal_body {
  height: calc(100vh - 90px);
}
</style>
