<script setup lang="ts">
import { ref, watch } from "vue"

interface Props {
  modelValue?: string | string[]
  type?: "checkbox" | "radio" | "options"
  name: string
  id: string
  help?: string
  options?: Record<string, string>[]
  optionsKeyName?: string
  optionsValueName?: string
  label?: string
  hideLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: "checkbox",
  optionsKeyName: "key",
  optionsValueName: "value",
  hideLabel: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]]
}>()

defineOptions({
  inheritAttrs: false,
})

const initialSelected =
  props.type === "checkbox"
    ? Array.isArray(props.modelValue)
      ? props.modelValue
      : []
    : typeof props.modelValue === "string"
      ? props.modelValue
      : ""
const selected = ref<string | string[]>(initialSelected)

watch(selected, (newValue) => {
  emit("update:modelValue", newValue)
})
</script>

<template>
  <div class="select_group mb-xl">
    <div
      :class="['select_item', 'py-m', 'px-none', { 'sr-only': hideLabel }]"
      v-if="type === 'options'"
    >
      <label :for="id">{{ label }}</label>
    </div>

    <div class="select_item py-m px-none">
      <div v-if="type === 'checkbox'">
        <div
          v-for="option in options"
          :key="option[optionsKeyName]"
          class="select_option"
        >
          <input
            v-model="selected"
            type="checkbox"
            :value="option[optionsKeyName]"
            :name="`${name}-${option[optionsKeyName]}`"
            :id="`${name}-${option[optionsKeyName]}`"
            class="mr-l h-[1rem] w-[1rem]"
          />
          <label :for="`${name}-${option[optionsKeyName]}`">
            {{ option[optionsValueName] }}
          </label>
        </div>
      </div>

      <div v-if="type === 'radio'">
        <div
          v-for="option in options"
          :key="option[optionsKeyName]"
          class="select_option"
        >
          <input
            v-model="selected"
            type="radio"
            :value="option[optionsKeyName]"
            :name="name"
            :id="option[optionsKeyName]"
            class="mr-l h-[1rem] w-[1rem]"
          />
          <label :for="option[optionsKeyName]">
            {{ option[optionsValueName] }}
          </label>
        </div>
      </div>

      <div v-if="type === 'options'">
        <select
          v-model="selected"
          class="select_input hover:border-primary-100 focus:border-primary-100 py-m px-l text-m m-none rounded-m box-border w-full border border-neutral-400 bg-neutral-100 text-neutral-950 hover:outline-0 focus:outline-0"
          :id="id"
          :name="name"
        >
          <option
            v-for="option in options"
            :key="option[optionsKeyName]"
            :value="option[optionsKeyName]"
          >
            {{ option[optionsValueName] }}
          </option>
        </select>
      </div>
    </div>

    <p v-if="help" class="select_helpline text-s text-neutral-800">
      {{ help }}
    </p>
  </div>
</template>
