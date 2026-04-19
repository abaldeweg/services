<script setup lang="ts">
interface Props {
  bold?: boolean
  noHover?: boolean
  icon?: string
}

withDefaults(defineProps<Props>(), {
  bold: false,
  noHover: false,
})
</script>

<template>
  <li
    class="py-l px-xl flex cursor-pointer items-center"
    :class="{ 'font-bold': bold, 'hover:bg-neutral-200': !noHover }"
  >
    <div class="mr-l flex" v-if="icon">
      <BMaterialIcon :type="icon" :size="15">{{ icon }}</BMaterialIcon>
    </div>
    <div class="w-full">
      <slot />
    </div>
  </li>
</template>
