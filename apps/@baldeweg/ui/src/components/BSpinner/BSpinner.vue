<script setup lang="ts">
interface Props {
  size?: "s" | "m" | "l"
}

withDefaults(defineProps<Props>(), {
  size: "l",
})
</script>

<template>
  <div
    class="spinner border-t-primary-900 rounded-full border-neutral-200"
    :class="{
      'h-xl w-xl border-2': size === 's',
      'h-[40px] w-[40px] border-4': size === 'm',
      'h-2xl w-2xl border-6': size === 'l',
    }"
  />
</template>

<style scoped>
.spinner {
  animation: spinner 2s linear infinite;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
