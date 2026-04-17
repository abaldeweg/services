<script setup lang="ts">
interface Props {
  modelValue?: string
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
  <div class="textarea_group mb-xl">
    <div :class="['py-m textarea_item', { 'sr-only': hideLabel }]">
      <label :for="id">{{ label }}</label>
    </div>
    <div class="py-m">
      <textarea
        class="px-m py-m text-m textarea_input m-0 box-border w-full rounded-xl border border-neutral-400 bg-neutral-100 text-neutral-950"
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
    <p v-if="help" class="textarea_helpline text-neutral-800">
      {{ help }}
    </p>
  </div>
</template>

<style scoped>
.textarea_group:last-child {
  margin-bottom: 0;
}

.textarea_input {
  resize: vertical;
}

.textarea_input:hover,
.textarea_input:focus {
  border: 1px solid var(--color-primary-900);
  outline: none;
}

.textarea_helpline {
  font-size: 0.8rem;
}
</style>
