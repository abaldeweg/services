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
.table :deep(table) {
  width: 100%;
  border-spacing: 0;
  padding: 0;
  margin: 0;
  overflow: auto;
}

.table :deep(th) {
  text-align: left;
}

.table :deep(tr) {
  transition: background 0.3s ease;
}

.table :deep(th),
.table :deep(td) {
  border-bottom: 1px solid var(--color-neutral-200);
  vertical-align: top;
  padding: 10px;
}

.table.canHover :deep(tbody tr:hover) {
  background: var(--color-neutral-200);
  transition: background 0.3s ease;
}
</style>
