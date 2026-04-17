<template>
  <form class="box-border w-full">
    <slot />
    <div
      class="gap-s clear-both flex justify-end overflow-auto"
      v-if="$slots.buttons"
    >
      <slot name="buttons" />
    </div>
  </form>
</template>
