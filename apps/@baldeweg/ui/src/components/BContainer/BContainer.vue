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
    class="u:clear-both u:px-xl u:mx-auto u:box-border container"
    :class="[
      size === 'l' ? 'u:w-full' : undefined,
      size === 'm' ? 'container_size_m' : undefined,
      size === 's' ? 'container_size_s' : undefined,
      align === 'left' ? 'u:text-left' : undefined,
      align === 'right' ? 'u:text-right' : undefined,
      align === 'center' ? 'u:text-center' : undefined,
    ]"
  >
    <slot />
  </section>
</template>

<style>
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
