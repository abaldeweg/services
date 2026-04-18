<script setup lang="ts">
import { ref } from "vue"

interface Props {
  id?: string
  text?: string
  accept?: string
  modelValue?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{
  "update:modelValue": [file: File | null]
}>()

const isDragging = ref<boolean>(false)
</script>

<template>
  <div
    class="upload rounded-m relative border border-neutral-200"
    :class="{ isDragging: isDragging }"
  >
    <p class="upload_text absolute text-center">{{ text }}</p>
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
        class="upload_input absolute h-full w-full cursor-pointer opacity-0"
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

<style scoped>
.upload {
  height: 300px;
}

.upload:hover,
.upload.isDragging {
  border: 1px solid var(--color-primary-900);
}

.upload_text {
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
</style>
