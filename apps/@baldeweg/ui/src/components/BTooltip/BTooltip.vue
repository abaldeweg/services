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
      class="tooltip_text p-l invisible group-hover:visible absolute z-1 rounded-s bg-neutral-200 text-center leading-[initial] text-neutral-950 opacity-0 group-hover:opacity-100 transition duration-300 after:absolute after:border-10"
      :class="{
        'left-[50%] max-w-[320px] min-w-[120px] after:left-[50%] translate-x-[-50%] after:-ml-l':
          position === 'top' || position === 'bottom',
        'bottom-[50%] h-auto max-w-[320px] min-w-[120px] after:top-[50%] translate-y-[50%] after:-mt-l':
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

