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
    class="gap-s p-xl rounded-m m-0 flex list-none flex-col"
    :class="{
      border: border !== 'none',
      'border-primary-100': border === 'primary',
      'border-neutral-200': border === 'neutral',
      'bg-primary-100': background === 'primary',
      'bg-neutral-200': background === 'neutral',
      'navigation_horizontal small:flex-row small:p-none small:px-xl small:overflow-x-auto': direction === 'horizontal',
    }"
  >
    <slot />
  </ul>
</template>
