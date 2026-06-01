<script setup lang="ts">
interface Props {
  modelValue: string
  name: string
  id: string
  label?: string
  hideLabel?: boolean
  help?: string
}

withDefaults(defineProps<Props>(), {
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
      <textarea
        class="p-xl text-m rounded-m hover:border-primary-900 focus:border-primary-900 m-0 box-border w-full resize-y border border-neutral-400 bg-neutral-100 text-neutral-950 focus:outline-none"
        v-bind="$attrs"
        :value="modelValue"
        :name="name"
        :id="id"
        @input="
          emit(
            'update:modelValue',
            ($event.target as HTMLTextAreaElement).value,
          )
        "
      />
    </div>
    <p v-if="help" class="text-s text-neutral-800">
      {{ help }}
    </p>
  </div>
</template>
