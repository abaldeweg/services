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
    "border-red-500": props.type === "danger",
    "text-red-500": props.type === "danger",
    "border-yellow-500": props.type === "warning",
    "text-yellow-500": props.type === "warning",
    "border-green-500": props.type === "success",
    "text-green-500": props.type === "success",
  }),
)
</script>

<template>
  <div
    class="gap-xl p-xl my-l rounded-m box-border flex border border-blue-500 text-blue-500"
    :class="alertClass"
    v-if="!showAlert"
  >
    <BMaterialIcon :size="20" class="select-none">info</BMaterialIcon>
    <div class="alert-content flex-1">
      <slot />
    </div>
    <BMaterialIcon :size="20" @click="showAlert = true" hover v-if="closable">
      close
    </BMaterialIcon>
  </div>
</template>

<style scoped>
.alert-content a,
.alert-content a:hover {
  color: inherit;
  text-decoration-color: currentColor;
}
</style>
