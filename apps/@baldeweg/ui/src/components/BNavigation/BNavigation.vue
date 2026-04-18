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
    class="gap-s p-xl m-0 flex list-none flex-col rounded-xl"
    :class="{
      border: border !== 'none',
      'border-primary-100': border === 'primary',
      'border-neutral-200': border === 'neutral',
      'bg-primary-100': background === 'primary',
      'bg-neutral-200': background === 'neutral',
      navigation_horizontal: direction === 'horizontal',
    }"
  >
    <slot />
  </ul>
</template>

<style scoped>
@media (min-width: 600px) {
  .navigation_horizontal {
    flex-direction: row;
    padding: 0 20px;
    overflow-x: auto;
  }
}
</style>
