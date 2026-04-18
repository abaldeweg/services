<script setup lang="ts">
import { useSlots } from "vue"

interface Props {
  modelValue?: boolean
  position?: "left" | "right"
  width?: string
  permanent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  position: "left",
  width: "300px",
  permanent: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const slots = useSlots()
</script>

<template>
  <Transition name="panel_overlay" v-if="!props.permanent">
    <div
      class="panel_overlay absolute z-3 bg-neutral-100 opacity-70"
      @click="emit('update:modelValue', false)"
      v-if="modelValue"
    />
  </Transition>

  <Transition name="panel_container">
    <div
      class="panel_container fixed z-3 flex flex-col bg-neutral-100"
      :class="{
        panel_position_left: position === 'left',
        panel_position_right: position === 'right',
        panel_permanent: permanent,
      }"
      v-if="modelValue"
      :style="{
        maxWidth: width,
      }"
    >
      <div class="border-b border-neutral-200" v-if="slots.header">
        <slot name="header" />
      </div>
      <div class="panel_content grow overflow-y-auto">
        <slot />
      </div>
      <div class="border-t border-neutral-200" v-if="slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.panel_overlay {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.panel_container {
  top: 0;
  bottom: 0;
  width: calc(100% - 20px);
}

.panel_container.panel_position_left {
  left: 0;
  border-right: 1px solid var(--color-neutral-200);
}

.panel_container.panel_position_right {
  right: 0;
  border-left: 1px solid var(--color-neutral-200);
}

.panel_content {
  max-height: calc(100vh);
}

/* transition overlay */
.panel_overlay-enter-active,
.panel_overlay-leave-active {
  transition: opacity 0.5s ease;
}

.panel_overlay-enter-from,
.panel_overlay-leave-to {
  opacity: 0;
}

/* transition container */
.panel_container-enter-active {
  transition: all 0.5s ease-out;
}

.panel_container-leave-active {
  transition: all 0.5s ease-in;
}

.panel_container-enter-from,
.panel_container-leave-to {
  opacity: 0;
}

.panel_container-enter-from.panel_position_left,
.panel_container-leave-to.panel_position_left {
  transform: translateX(-300px);
}

.panel_container-enter-from.panel_position_right,
.panel_container-leave-to.panel_position_right {
  transform: translateX(300px);
}

@media print {
  .panel_overlay,
  .panel_container {
    display: none;
  }
}
</style>
