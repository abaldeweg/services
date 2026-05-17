<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label: string
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()
</script>

<template>
  <div class="flex items-center">
    <button
      class="switch_indicator relative h-[30px] w-[50px] cursor-pointer rounded-full border-0 bg-neutral-800 p-0 transition duration-200"
      :class="{ 'isActive bg-primary-900': modelValue }"
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

<style scoped>
.switch_indicator::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 90px;
  background: var(--color-neutral-100);
  width: 20px;
  height: 20px;
}

.switch_indicator.isActive::after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}
</style>
