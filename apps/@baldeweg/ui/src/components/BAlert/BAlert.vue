<script setup lang="ts">
import { ref, computed } from "vue"

interface Props {
  type?: "info" | "danger" | "warning" | "success"
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  closable: false,
})

const showAlert = ref<boolean>(false)

const typeClass = computed<Record<string, boolean>>(
  (): Record<string, boolean> => ({
    "border-red-900": props.type === "danger",
    "text-red-900": props.type === "danger",
    "border-yellow-900": props.type === "warning",
    "text-yellow-900": props.type === "warning",
    "border-green-900": props.type === "success",
    "text-green-900": props.type === "success",
  }),
)
</script>

<template>
  <div
    class="gap-xl p-xl my-l rounded-m box-border flex border border-blue-900 text-blue-900"
    :class="typeClass"
    v-if="!showAlert"
  >
    <BMaterialIcon :size="20" class="select-none">info</BMaterialIcon>
    <div class="flex-1">
      <slot />
    </div>
    <BMaterialIcon :size="20" @click="showAlert = true" hover v-if="closable">
      close
    </BMaterialIcon>
  </div>
</template>
