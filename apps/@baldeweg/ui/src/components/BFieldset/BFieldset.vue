<script setup lang="ts">
interface Props {
  legend?: string
}

defineProps<Props>()
</script>

<template>
  <fieldset class="p-none m-none border-0">
    <legend class="p-none">
      {{ legend }}
    </legend>
    <slot />
  </fieldset>
</template>
