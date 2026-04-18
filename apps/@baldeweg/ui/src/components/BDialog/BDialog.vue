<script setup lang="ts">
import { computed } from "vue"

const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>()

interface Props {
  modelValue?: boolean
  canClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  canClose: true,
})

const visible = computed<boolean>({
  get: (): boolean => !!props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
})

const close = () => {
  if (!props.canClose) return
  visible.value = false
}
</script>

<template>
  <div v-if="visible" class="dialog fixed z-5 w-full">
    <div
      class="dialog_overlay fixed h-full w-full bg-neutral-100 opacity-80"
      @click="close"
    />

    <div
      class="dialog_body my-3xl relative mx-auto box-border rounded-xl border border-neutral-200 bg-neutral-100"
    >
      <div class="p-xl">
        <slot />
      </div>
      <div class="p-xl text-right">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  top: 0;
  left: 0;
}

.dialog_overlay {
  top: 0;
  left: 0;
}

.dialog_body {
  max-width: 600px;
}
</style>
