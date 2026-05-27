<script setup lang="ts">
interface Props {
  modelValue: boolean
  label: string
}

defineProps<Props>()

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()
</script>

<template>
  <div class="flex items-center">
    <button
      class="after:absolute after:top-m after:left-m after:rounded-full after:bg-neutral-100 after:w-xl after:h-xl relative h-[30px] w-[50px] cursor-pointer rounded-full border-0 bg-neutral-800 p-0 transition duration-200"
      :class="{ 'bg-primary-900 after:left-[calc(100%-5px)] after:translate-x-full': modelValue }"
      @click="emit('update:modelValue', !modelValue)"
      :aria-label="label"
    />
    <div
      class="ml-l block cursor-pointer"
      @click="emit('update:modelValue', !modelValue)"
    >
      {{ label }}
    </div>
  </div>
</template>
