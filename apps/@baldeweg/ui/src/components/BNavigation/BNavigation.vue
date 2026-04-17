<script setup lang="ts">
interface Props {
  border?: "none" | "primary" | "neutral"
  background?: "none" | "primary" | "neutral"
  direction?: "horizontal" | "vertical"
}

withDefaults(defineProps<Props>(), {
  border: "none",
  background: "none",
  direction: "vertical",
})
</script>

<template>
  <ul
    class="navigation gap-s p-xl m-0 flex list-none flex-col rounded-xl"
    :class="[
      border !== 'none' && `navigation_border_${border}`,
      background !== 'none' && `navigation_background_${background}`,
      direction === 'horizontal' && 'navigation_horizontal',
    ]"
  >
    <slot />
  </ul>
</template>

<style scoped>
.navigation_border_primary {
  border: 1px solid var(--color-primary-100);
}

.navigation_border_neutral {
  border: 1px solid var(--color-neutral-200);
}

.navigation_background_primary {
  background-color: var(--color-primary-100);
}

.navigation_background_neutral {
  background-color: var(--color-neutral-200);
}

@media (min-width: 600px) {
  .navigation_horizontal {
    flex-direction: row;
    padding: 0 20px;
    overflow-x: auto;
  }
}
</style>
