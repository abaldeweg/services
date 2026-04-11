<script setup lang="ts">
interface Props {
  size?: "l" | "m" | "s"
  align?: "left" | "right" | "center"
  highlight?: boolean
}

withDefaults(defineProps<Props>(), {
  size: "l",
  align: "left",
  highlight: false,
})
</script>

<template>
  <section
    class="u:clear-both u:px-xl u:mx-auto u:box-border container"
    :class="{
      container_size_l: size === 'l',
      container_size_m: size === 'm',
      container_size_s: size === 's',
      container_align_right: align === 'right',
      container_align_center: align === 'center',
      container_hasHighlight: highlight,
    }"
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

.container_size_l {
  width: 100%;
}

.container_size_m {
  max-width: 1160px;
}

.container_size_s {
  max-width: 600px;
}

.container_align_right {
  text-align: right;
}

.container_align_center {
  text-align: center;
}

.container_hasHighlight {
  background: var(--color-neutral-02);
}
</style>
