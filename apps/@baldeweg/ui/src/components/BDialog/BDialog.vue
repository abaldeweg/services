<script setup lang="ts">

interface Props {
  modelValue: boolean
  canClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  canClose: true,
})

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const close = () => {
  if (!props.canClose) return
  emit("update:modelValue", false)
}
</script>

<template>
  <div v-if="props.modelValue" class="top-none left-none fixed z-5 w-full">
    <div
      class="top-none left-none fixed h-full w-full bg-neutral-100 opacity-80"
      @click="close"
    />

    <div
      class="my-2xl rounded-m relative mx-auto box-border max-w-[600px] border border-neutral-200 bg-neutral-100"
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
