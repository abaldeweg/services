<script setup lang="ts">
interface Props {
  legend?: string
}

defineProps<Props>()
</script>

<template>
  <fieldset class="u:clear-both u:border-0 u:p-none u:m-none">
    <legend class="u:p-0">
      {{ legend }}
    </legend>
    <slot />
  </fieldset>
</template>
