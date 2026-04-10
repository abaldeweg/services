<script setup lang="ts">
import { ref, watch } from "vue"

interface Props {
  modelValue?: Array<any>
  type?: "checkbox" | "radio" | "options"
  name: string
  id: string
  help?: string
  options?: Array<any>
  optionsKeyName?: string
  optionsValueName?: string
  label?: string
  hideLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: "checkbox",
  optionsKeyName: "key",
  optionsValueName: "value",
  modelValue: () => [],
  hideLabel: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: Array<any>]
}>()

defineOptions({
  inheritAttrs: false,
})

const selected = ref<Array<any>>(props.modelValue ?? [])

watch(selected, (newValue) => {
  emit("update:modelValue", newValue)
})
</script>

<template>
  <div class="select_group">
    <div
      :class="['select_item', { 'u:sr-only': hideLabel }]"
      v-if="type === 'options'"
    >
      <label :for="id">{{ label }}</label>
    </div>

    <div class="select_item">
      <div
        v-if="type === 'checkbox'"
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
        />
        <label :for="`${name}-${option[optionsKeyName]}`">
          {{ option[optionsValueName] }}
        </label>
      </div>

      <div
        v-if="type === 'radio'"
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
        />
        <label :for="option[optionsKeyName]">
          {{ option[optionsValueName] }}
        </label>
      </div>

      <div v-if="type === 'options'">
        <select v-model="selected" class="select_input" :id="id" :name="name">
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

    <p v-if="help" class="select_helpline">
      {{ help }}
    </p>
  </div>
</template>

<style>
.select_group {
  margin-bottom: 20px;
}

.select_group:last-child {
  margin-bottom: 0;
}

.select_item {
  padding: 5px 0;
}

.select_input {
  border: 1px solid var(--color-neutral-04);
  background: var(--color-neutral-00);
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  padding: 5px 10px;
  margin: 0;
  font-size: 1rem;
  color: var(--color-neutral-10);
}

.select_input:hover,
.select_input:focus {
  border: 1px solid var(--color-primary-10);
  outline: none;
}

.select_item input[type="checkbox"],
.select_item input[type="radio"] {
  width: 1rem;
  height: 1rem;
  margin-right: 10px;
}

.select_helpline {
  font-size: 0.8rem;
  color: var(--color-neutral-08);
}
</style>
