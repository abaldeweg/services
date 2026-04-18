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

const show = ref<boolean>(false)
const top = ref<string>("0px")
const left = ref<string>("0px")

const selector = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)

const showDropdown = (event: MouseEvent): void => {
  show.value = true
  if (dropdown.value) dropdown.value.style.display = "block"

  const selectorEl = selector.value
  const dropdownEl = dropdown.value
  if (!selectorEl || !dropdownEl) return

  const position = selectorEl.getBoundingClientRect()
  const selectorY = position.y
  const selectorX = position.x
  const selectorWidth = selectorEl.offsetWidth
  const selectorHeight = selectorEl.offsetHeight
  const clickY = event.clientY
  const clickX = event.clientX
  const clientWidth = window.innerWidth
  const clientHeight = window.innerHeight
  const dimensionWidth = dropdownEl.offsetWidth
  const dimensionHeight = dropdownEl.offsetHeight

  dropdownEl.style.display = ""

  if ("mouse" === props.position) {
    left.value = clickX + "px"
    if (clickX + dimensionWidth > clientWidth) {
      left.value = clickX - dimensionWidth + "px"
    }
    top.value = clickY + "px"
    if (clickY + dimensionHeight > clientHeight) {
      top.value = clickY - dimensionHeight + "px"
    }
    return
  }

  if ("bottom" === props.position) {
    left.value = selectorX + "px"
    if (selectorX + dimensionWidth > clientWidth) {
      left.value = selectorX - dimensionWidth + selectorWidth + "px"
    }
    top.value = selectorY + selectorHeight + "px"
    if (selectorY + dimensionHeight > clientHeight) {
      top.value = selectorY - dimensionHeight + "px"
    }
    return
  }

  left.value = selectorX + "px"
  if (selectorX + dimensionWidth > clientWidth) {
    left.value = selectorX - dimensionWidth + selectorWidth + "px"
  }
  top.value = selectorY + "px"
  if (selectorY + dimensionHeight > clientHeight) {
    top.value = selectorY - dimensionHeight + selectorHeight + "px"
  }
}

const slots = useSlots()
</script>

<template>
  <article>
    <span @click="showDropdown" v-if="slots.selector" ref="selector">
      <slot name="selector" />
    </span>

    <div
      class="hidden"
      :class="{
        isActive: show,
      }"
      @click="show = false"
    />

    <ul
      class="dropdown m-none p-none rounded-m fixed hidden list-none overflow-auto border border-neutral-200 bg-neutral-100 text-left"
      :class="{
        isActive: show,
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
  </article>
</template>

<style scoped>
.dropdown {
  top: 0;
  left: 0;
  min-width: 200px;
  max-width: 90%;
  max-height: 300px;
}
.dropdown.isActive {
  display: block;
}
.dropdown_overlay.isActive {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
}

@media all and (min-width: 400px) {
  .dropdown {
    max-width: 350px;
  }
}
</style>
