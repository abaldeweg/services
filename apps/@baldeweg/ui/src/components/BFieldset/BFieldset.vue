<script setup lang="ts">
interface Props {
  legend?: string
}

defineProps<Props>()
</script>

<template>
  <fieldset class="p-none m-none clear-both border-0">
    <legend class="p-0">
      {{ legend }}
    </legend>
    <slot />
  </fieldset>
</template>
