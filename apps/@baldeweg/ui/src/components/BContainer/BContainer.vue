<script setup lang="ts">
interface Props {
  size?: "l" | "m" | "s"
  align?: "left" | "right" | "center"
}

withDefaults(defineProps<Props>(), {
  size: "l",
  align: "left",
})
</script>

<template>
  <section
    class="px-xl clear-both container mx-auto box-border"
    :class="[
      size === 'l' ? 'w-full' : undefined,
      size === 'm' ? 'container_size_m' : undefined,
      size === 's' ? 'container_size_s' : undefined,
      align === 'left' ? 'text-left' : undefined,
      align === 'right' ? 'text-right' : undefined,
      align === 'center' ? 'text-center' : undefined,
    ]"
  >
    <slot />
  </section>
</template>

<style scoped>
.container {
  letter-spacing: 0.3px;
}

.container::after {
  content: "";
  display: table;
  clear: both;
}

.container_size_s {
  max-width: 600px;
}

.container_size_m {
  max-width: 1160px;
}

.container_size_l {
  max-width: 100%;
}
</style>
