<script setup lang="ts">
import { useSlots } from "vue"

const slots = useSlots()
</script>

<template>
  <form class="box-border w-full">
    <slot />
    <div class="gap-s flex justify-end" v-if="slots.buttons">
      <slot name="buttons" />
    </div>
  </form>
</template>
