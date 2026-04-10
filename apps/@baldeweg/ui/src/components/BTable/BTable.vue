<script setup lang="ts">
interface Props {
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
})
</script>

<template>
  <div class="u:overflow-auto table" :class="{ canHover: hover }">
    <slot />
  </div>
</template>

<style>
.table.canHover tbody tr:hover {
  background: var(--color-neutral-02);
}
</style>
