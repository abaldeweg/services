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
    <span class="tooltip_text rounded-s bg-neutral-200 p-l text-neutral-950 text-center opacity-0 invisible absolute z-1
    after:absolute after:border-10" :class="{
      'min-w-[120px] max-w-[320px] left-[50%] after:left-[50%] after:-ml-l': position === 'top' || position === 'bottom',
      'h-auto min-w-[120px] max-w-[320px] bottom-[50%] after:top-[50%] after:-mt-l': position === 'left' || position === 'right',
      'tooltip_position_top bottom-full mb-l after:top-full': position === 'top',
      'tooltip_position_bottom top-full mt-l after:bottom-full': position === 'bottom',
      'tooltip_position_left right-full mr-l after:left-full': position === 'left',
      'tooltip_position_right left-full ml-l after:right-full': position === 'right',
    }">{{ text }}</span>
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
