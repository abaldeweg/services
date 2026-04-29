<script setup lang="ts">
interface Props {
  modelValue: string
  type?:
    | "date"
    | "color"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "range"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | "file"
  name: string
  id: string
  label?: string
  help?: string
  hideLabel?: boolean
}

withDefaults(defineProps<Props>(), {
  type: "text",
  hideLabel: false,
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()
</script>

<template>
  <div class="mb-xl">
    <div :class="['py-m', { 'sr-only': hideLabel }]">
      <label :for="id">{{ label }}</label>
    </div>
    <div class="py-m">
      <input
        :class="[
          'px-l py-m text-m rounded-m m-0 box-border w-full border border-neutral-400 bg-neutral-100 text-neutral-950',
          'hover:border-primary-900 focus:border-primary-900 focus:outline-none',
          type === 'color' && 'h-[40px] w-[90px]',
          type === 'range' && 'p-0',
        ]"
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :name="name"
        :id="id"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </div>
    <p v-if="help" class="text-s text-neutral-800">
      {{ help }}
    </p>
  </div>
</template>
