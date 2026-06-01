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
  <div class="group relative inline-block leading-none">
    <slot />
    <span
      class="tooltip_text p-l invisible absolute z-1 rounded-s bg-neutral-200 text-center leading-[initial] text-neutral-950 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 after:absolute after:border-10"
      :class="{
        'after:-ml-l left-[50%] max-w-[320px] min-w-[120px] translate-x-[-50%] after:left-[50%]':
          position === 'top' || position === 'bottom',
        'after:-mt-l bottom-[50%] h-auto max-w-[320px] min-w-[120px] translate-y-[50%] after:top-[50%]':
          position === 'left' || position === 'right',
        'mb-l bottom-full after:top-full after:border-t-neutral-200 after:border-r-transparent after:border-b-transparent after:border-l-transparent':
          position === 'top',
        'mt-l top-full after:bottom-full after:border-t-transparent after:border-r-transparent after:border-b-neutral-200 after:border-l-transparent':
          position === 'bottom',
        'mr-l right-full after:left-full after:border-t-transparent after:border-r-transparent after:border-b-transparent after:border-l-neutral-200':
          position === 'left',
        'ml-l left-full after:right-full after:border-t-transparent after:border-r-neutral-200 after:border-b-transparent after:border-l-transparent':
          position === 'right',
      }"
      >{{ text }}</span
    >
  </div>
</template>
