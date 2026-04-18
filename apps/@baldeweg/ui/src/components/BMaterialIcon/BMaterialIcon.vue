<script setup lang="ts">
import { computed } from "vue"

interface Props {
  size?: number
  color?: string
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: "inherit",
  hover: false,
})

const iconClasses = computed<Array<string | Record<string, boolean>>>(() => [
  "icon",
  "opacity-100",
  "material-symbols-outlined",
  "align-middle",
  { canHover: props.hover },
])

const iconStyle = computed<Record<string, string>>(() => ({
  fontSize: `${props.size}px`,
  color: String(props.color),
}))
</script>

<template>
  <span :class="iconClasses" :style="iconStyle">
    <slot />
  </span>
</template>

<style scoped>
.icon {
  transition: opacity 0.2s;
}

.icon:hover.canHover {
  opacity: 0.6;
  cursor: pointer;
}

.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 35;
}
</style>
