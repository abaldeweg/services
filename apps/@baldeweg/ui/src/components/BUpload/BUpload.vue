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
  <div class="upload" :class="{ isDragging: isDragging }">
    <p class="upload_text">{{ text }}</p>
    <div
      class="upload_dropzone"
      @dragover="isDragging = true"
      @dragenter="isDragging = true"
      @dragleave="isDragging = false"
      @dragend="isDragging = false"
      @drop="isDragging = false"
    >
      <BInput
        type="file"
        class="upload_input"
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

<style>
.upload {
  position: relative;
  height: 300px;
  border: 1px solid var(--color-neutral-02);
  border-radius: 10px;
}

.upload:hover,
.upload.isDragging {
  border: 1px solid var(--color-primary-10);
}

.upload_text {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
}

.upload_dropzone {
  position: absolute;
  width: 100%;
  height: 100%;
}

.upload_input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.001;
}
</style>
