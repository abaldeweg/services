<script setup lang="ts">
import { computed } from "vue"

interface Props {
  size?: "l" | "m" | "s"
  align?: "left" | "right" | "center"
}

const props = withDefaults(defineProps<Props>(), {
  size: "l",
  align: "left",
})

const sizeClass = computed(() => {
  return {
    "w-[600px]": props.size === "s",
    "w-[1160px]": props.size === "m",
    "w-full": props.size === "l",
  }
})

const alignClass = computed(() => {
  return {
    "text-left": props.align === "left",
    "text-right": props.align === "right",
    "text-center": props.align === "center",
  }
})
</script>

<template>
  <section
    class="px-xl mx-auto box-border table after:clear-both after:block"
    :class="[sizeClass, alignClass]"
  >
    <slot />
  </section>
</template>
