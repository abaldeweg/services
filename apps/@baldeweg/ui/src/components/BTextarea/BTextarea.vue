<script setup lang="ts">
interface Props {
  modelValue?: string
  name: string
  id: string
  label?: string
  hideLabel?: boolean
  help?: string
}

const props = withDefaults(defineProps<Props>(), {
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
  <div class="textarea_group u:mb-xl">
    <div :class="['u:py-m textarea_item', { 'u:sr-only': hideLabel }]">
      <label :for="id">{{ label }}</label>
    </div>
    <div class="u:py-m">
      <textarea
        class="u:border u:border-neutral-400 u:bg-neutral-100 u:box-border u:rounded-xl u:w-full u:px-m u:py-m u:m-0 u:text-m u:text-neutral-950 textarea_input"
        v-bind="$attrs"
        :value="modelValue"
        :name="name"
        :id="id"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      ></textarea>
    </div>
    <p v-if="help" class="textarea_helpline">
      {{ help }}
    </p>
  </div>
</template>

<style>
.textarea_group:last-child {
  margin-bottom: 0;
}

.textarea_input {
  resize: vertical;
}

.textarea_input:hover,
.textarea_input:focus {
  border: 1px solid var(--color-primary-10);
  outline: none;
}

.textarea_helpline {
  font-size: 0.8rem;
  color: var(--color-neutral-06);
}
</style>
