<script setup lang="ts">
import { ref } from "vue"

interface Props {
  modelValue: boolean
  id: string
  text?: string
  accept?: string
}

defineProps<Props>()

const emit = defineEmits<{
  "update:modelValue": [file: File | null]
}>()

const isDragging = ref<boolean>(false)
</script>

<template>
  <div
    class="hover:border-primary-900 rounded-m relative h-[300px] border border-neutral-200"
    :class="{ 'border-primary-900': isDragging }"
  >
    <p class="absolute top-[50%] w-full text-center -translate-y-1/2">{{ text }}</p>
    <div
      class="absolute h-full w-full"
      @dragover="isDragging = true"
      @dragenter="isDragging = true"
      @dragleave="isDragging = false"
      @dragend="isDragging = false"
      @drop="isDragging = false"
    >
      <BInput
        type="file"
        class="absolute h-full w-full cursor-pointer opacity-0"
        event
        :id="id"
        :accept="accept"
        @change="
          emit(
            'update:modelValue',
            $event.target.files && $event.target.files.length
              ? $event.target.files[0]
              : null,
          )
        "
        aria-label="Upload"
      />
    </div>
  </div>
</template>
