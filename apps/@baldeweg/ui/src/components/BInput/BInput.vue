<script setup lang="ts">
interface Props {
  modelValue?: string
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
  <div class="input_group mb-xl">
    <div :class="['py-m input_item', { 'sr-only': hideLabel }]">
      <label :for="id">{{ label }}</label>
    </div>
    <div class="py-m">
      <input
        class="px-m py-m text-m input_input m-0 box-border w-full rounded-xl border border-neutral-400 bg-neutral-100 text-neutral-950"
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
    <p v-if="help" class="input_helpline">
      {{ help }}
    </p>
  </div>
</template>

<style scoped>
.input_group:last-child {
  margin-bottom: 0;
}

.input_input:hover,
.input_input:focus {
  border: 1px solid var(--color-primary-900);
  outline: none;
}

input[type="color"].input_input {
  width: 90px;
  height: 40px;
}

input[type="range"].input_input {
  padding: 0;
}

.input_helpline {
  font-size: 0.8rem;
  color: var(--color-neutral-800);
}
</style>
