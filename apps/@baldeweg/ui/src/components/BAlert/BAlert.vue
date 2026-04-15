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

const alertClass = computed<Record<string, boolean>>(
  (): Record<string, boolean> => ({
    "u:border-red-500": props.type === "danger",
    "u:text-red-500": props.type === "danger",
    "u:border-yellow-500": props.type === "warning",
    "u:text-yellow-500": props.type === "warning",
    "u:border-green-500": props.type === "success",
    "u:text-green-500": props.type === "success",
  }),
)
</script>

<template>
  <div
    class="u:flex u:gap-xl u:rounded-xl u:border u:border-blue-500 u:text-blue-500 u:p-xl u:my-l u:box-border"
    :class="alertClass"
    v-if="!showAlert"
  >
    <BMaterialIcon :size="20" class="u:select-none">info</BMaterialIcon>
    <div class="alert-content u:flex-1">
      <slot />
    </div>
    <BMaterialIcon :size="20" @click="showAlert = true" hover v-if="closable">
      close
    </BMaterialIcon>
  </div>
</template>

<style>
.alert-content a,
.alert-content a:hover {
  color: inherit;
  text-decoration-color: currentColor;
}
</style>
