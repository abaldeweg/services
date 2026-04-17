<script setup lang="ts">
interface Props {
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false,
})
</script>

<template>
  <div class="table overflow-auto" :class="{ canHover: hover }">
    <slot />
  </div>
</template>

<style scoped>
.table.canHover tbody tr:hover {
  background: var(--color-neutral-200);
  transition: background 0.3s ease;
}
</style>
