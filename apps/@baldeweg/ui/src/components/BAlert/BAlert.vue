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
  (): Record<string, boolean> => {
    return {
      alert_info: props.type === "info",
      alert_danger: props.type === "danger",
      alert_warning: props.type === "warning",
      alert_success: props.type === "success",
    }
  },
)
</script>

<template>
  <div
    class="alert u:flex u:gap-xl u:rounded-xl u:border u:border-neutral-800 u:bg-neutral-100 u:p-xl u:my-l u:box-border"
    :class="alertClass"
    v-if="!showAlert"
  >
    <BMaterialIcon :size="20" class="alert_icon">info</BMaterialIcon>
    <div class="alert-content u:flex-1">
      <slot />
    </div>
    <BMaterialIcon
      :size="20"
      @click="showAlert = true"
      hover
      class="alert_close"
      v-if="closable"
      >close</BMaterialIcon
    >
  </div>
</template>

<style>
.alert_icon {
  user-select: none;
}

/* Type */
.alert_info {
  border-color: var(--color-accent-blue-10);
  color: var(--color-accent-blue-10);
}

.alert_info a,
.alert_info a:hover {
  color: var(--color-accent-blue-10);
  text-decoration-color: var(--color-accent-blue-10);
}

.alert_danger {
  border-color: var(--color-accent-red-10);
  color: var(--color-accent-red-10);
}

.alert_danger a,
.alert_danger a:hover {
  color: var(--color-accent-red-10);
  text-decoration-color: var(--color-accent-red-10);
}

.alert_warning {
  border-color: var(--color-accent-yellow-10);
  color: var(--color-accent-yellow-10);
}

.alert_warning a,
.alert_warning a:hover {
  color: var(--color-accent-yellow-10);
  text-decoration-color: var(--color-accent-yellow-10);
}

.alert_success {
  border-color: var(--color-accent-green-10);
  color: var(--color-accent-green-10);
}

.alert_success a,
.alert_success a:hover {
  color: var(--color-accent-green-10);
  text-decoration-color: var(--color-accent-green-10);
}
</style>
