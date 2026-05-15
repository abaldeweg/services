<script setup lang="ts">
interface Props {
  position?: "top" | "bottom" | "left" | "right"
  text?: string
}

withDefaults(defineProps<Props>(), {
  position: "top",
  text: "",
})
</script>

<template>
  <div class="tooltip relative inline-block">
    <slot />
    <span
      class="tooltip_text p-l invisible absolute z-1 rounded-s bg-neutral-200 text-center text-neutral-950 opacity-0 after:absolute after:border-10"
      :class="{
        'after:-ml-l left-[50%] max-w-[320px] min-w-[120px] after:left-[50%]':
          position === 'top' || position === 'bottom',
        'after:-mt-l bottom-[50%] h-auto max-w-[320px] min-w-[120px] after:top-[50%]':
          position === 'left' || position === 'right',
        'tooltip_position_top mb-l bottom-full after:top-full':
          position === 'top',
        'tooltip_position_bottom mt-l top-full after:bottom-full':
          position === 'bottom',
        'tooltip_position_left mr-l right-full after:left-full':
          position === 'left',
        'tooltip_position_right ml-l left-full after:right-full':
          position === 'right',
      }"
      >{{ text }}</span
    >
  </div>
</template>

<style scoped>
.tooltip {
  line-height: 0;
}

.tooltip_text {
  line-height: initial;
  transition: opacity 0.3s;
}

.tooltip_position_top,
.tooltip_position_bottom {
  transform: translateX(-50%);
}

.tooltip_position_left,
.tooltip_position_right {
  transform: translateY(50%);
}

.tooltip_text.tooltip_position_top::after {
  border-color: var(--color-neutral-200) transparent transparent transparent;
}

.tooltip_text.tooltip_position_bottom::after {
  border-color: transparent transparent var(--color-neutral-200) transparent;
}

.tooltip_text.tooltip_position_left::after {
  border-color: transparent transparent transparent var(--color-neutral-200);
}

.tooltip_text.tooltip_position_right::after {
  border-color: transparent var(--color-neutral-200) transparent transparent;
}

.tooltip:hover .tooltip_text {
  visibility: visible;
  opacity: 1;
}
</style>
