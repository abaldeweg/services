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
  <div class="u:flex u:items-center">
    <button
      class="switch_indicator u:relative u:border-0 u:rounded-full u:bg-neutral-800 u:p-0 u:cursor-pointer"
      :class="{ isActive: modelValue }"
      @click="emit('update:modelValue', !modelValue)"
      :aria-label="label"
    />
    <div
      class="u:block u:ml-l u:cursor-pointer"
      @click="emit('update:modelValue', !modelValue)"
    >
      {{ label }}
    </div>
  </div>
</template>

<style>
.switch_indicator {
  height: 30px;
  width: 50px;
}

.switch_indicator::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 90px;
  background: var(--color-neutral-00);
  width: 20px;
  height: 20px;
  transition: 0.2s;
}

.switch_indicator.isActive {
  background: var(--color-primary-10);
}

.switch_indicator.isActive::after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}
</style>
