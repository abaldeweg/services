<script setup lang="ts">
import { ref, useSlots } from "vue"

interface Props {
  position?: "selector" | "mouse" | "bottom"
  keepOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: "selector",
  keepOpen: false,
})

const slots = useSlots()

const show = ref<boolean>(false)

const top = ref<string>("0px")
const left = ref<string>("0px")

const selector = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)

const showDropdown = (event: MouseEvent): void => {
  show.value = true

  const selectorEl = selector.value
  const dropdownEl = dropdown.value
  if (!selectorEl || !dropdownEl) return

  const { x: selectorX, y: selectorY } = selectorEl.getBoundingClientRect()
  const { offsetWidth: selectorWidth, offsetHeight: selectorHeight } =
    selectorEl
  const { offsetWidth: dimensionWidth, offsetHeight: dimensionHeight } =
    dropdownEl
  const { clientX: clickX, clientY: clickY } = event
  const { innerWidth: clientWidth, innerHeight: clientHeight } = window

  if (props.position === "mouse") {
    left.value =
      (clickX + dimensionWidth > clientWidth
        ? clickX - dimensionWidth
        : clickX) + "px"
    top.value =
      (clickY + dimensionHeight > clientHeight
        ? clickY - dimensionHeight
        : clickY) + "px"
    return
  }

  if (props.position === "bottom") {
    left.value =
      (selectorX + dimensionWidth > clientWidth
        ? selectorX - dimensionWidth + selectorWidth
        : selectorX) + "px"
    top.value =
      (selectorY + dimensionHeight > clientHeight
        ? selectorY - dimensionHeight
        : selectorY + selectorHeight) + "px"
    return
  }

  left.value =
    (selectorX + dimensionWidth > clientWidth
      ? selectorX - dimensionWidth + selectorWidth
      : selectorX) + "px"
  top.value =
    (selectorY + dimensionHeight > clientHeight
      ? selectorY - dimensionHeight + selectorHeight
      : selectorY) + "px"
}
</script>

<template>
  <!-- selector -->
  <span @click="showDropdown" v-if="slots.selector" ref="selector">
    <slot name="selector" />
  </span>

  <!-- overlay -->
  <div
    class="top-none left-none fixed h-full w-full"
    :class="{
      block: show,
      hidden: !show,
    }"
    @click="show = false"
  />

  <!-- dropdown -->
  <ul
    class="dropdown top-none left-none m-none p-none rounded-m fixed box-border max-h-[300px] w-[200px] max-w-[90%] list-none overflow-auto border border-neutral-200 bg-neutral-100 text-left"
    :class="{
      block: show,
      hidden: !show,
    }"
    :style="{
      top: top,
      left: left,
    }"
    @click="!keepOpen ? (show = false) : null"
    ref="dropdown"
  >
    <slot />
  </ul>
</template>
