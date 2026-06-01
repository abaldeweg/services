<script setup lang="ts">
interface Props {
  size?: "xs" | "s" | "m" | "l" | "xl"
}

withDefaults(defineProps<Props>(), {
  size: "m",
})
</script>

<template>
  <div
    class="slider_item block"
    :class="{
      slider_size_xs: size === 'xs',
      slider_size_s: size === 's',
      slider_size_m: size === 'm',
      slider_size_l: size === 'l',
      slider_size_xl: size === 'xl',
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.slider_item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
.slider_size_xs {
  min-width: 160px;
  max-width: 160px;
}
.slider_size_s {
  min-width: 200px;
  max-width: 200px;
}
.slider_size_m {
  min-width: 300px;
  max-width: 300px;
}
.slider_size_l {
  min-width: 500px;
  max-width: 500px;
}
.slider_size_xl {
  min-width: 700px;
  max-width: 700px;
}
</style>
