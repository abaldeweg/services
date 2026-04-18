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
    class="dropdown_item py-l px-xl flex cursor-pointer items-center"
    :class="{ dropdown_isBold: bold, dropdown_canHover: !noHover }"
  >
    <div class="mr-l flex" v-if="icon">
      <BMaterialIcon :type="icon" :size="15">{{ icon }}</BMaterialIcon>
    </div>
    <div class="w-full">
      <slot />
    </div>
  </li>
</template>

<style scoped>
.dropdown_item.dropdown_isBold {
  font-weight: bold;
}

.dropdown_item:hover.dropdown_canHover {
  background: var(--color-neutral-200);
}
</style>
