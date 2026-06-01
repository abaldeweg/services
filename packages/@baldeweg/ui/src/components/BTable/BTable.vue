<script setup lang="ts">
interface Props {
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false,
})
</script>

<template>
  <div class="overflow-auto" :class="{ canHover: hover }">
    <slot />
  </div>
</template>

<style scoped>
:deep(table) {
  width: 100%;
  border-spacing: 0;
  padding: 0;
  margin: 0;
  overflow: auto;
}

:deep(th) {
  text-align: left;
}

:deep(tr) {
  transition: background 0.3s ease;
}

:deep(th),
:deep(td) {
  border-bottom: 1px solid var(--color-neutral-200);
  vertical-align: top;
  padding: 10px;
}

.canHover :deep(tbody tr:hover) {
  background: var(--color-neutral-200);
  transition: background 0.3s ease;
}
</style>
