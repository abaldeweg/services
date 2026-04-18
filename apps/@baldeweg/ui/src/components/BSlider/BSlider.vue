<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import BMaterialIcon from "../BMaterialIcon/BMaterialIcon.vue"

const slider = ref<HTMLElement | null>(null)

/**
 * Updates the visibility of the slider arrows based on the scroll position
 */
const updateSliderEdges = () => {
  if (!slider.value) return
  const body = slider.value.querySelector<HTMLElement>(".slider_body")
  if (!body) return
  const isStart = body.scrollLeft === 0
  const isEnd = body.scrollLeft + body.clientWidth >= body.scrollWidth - 1
  const left = slider.value.querySelector<HTMLElement>(".slider_arrow_left")
  const right = slider.value.querySelector<HTMLElement>(".slider_arrow_right")
  left?.classList.toggle("isVisible", !isStart)
  right?.classList.toggle("isVisible", !isEnd)
}

/**
 * Scrolls the slider by a specified number of pixels
 */
const scroll = (pixels: number) => {
  if (!slider.value) return
  const body = slider.value.querySelector<HTMLElement>(".slider_body")
  if (!body) return
  body.scrollBy({ left: pixels, behavior: "smooth" })
}

onMounted(() => {
  if (!slider.value) return
  const body = slider.value.querySelector<HTMLElement>(".slider_body")
  if (!body) return
  body.addEventListener("scroll", updateSliderEdges)
  updateSliderEdges()
})

onUnmounted(() => {
  if (!slider.value) return
  const body = slider.value.querySelector<HTMLElement>(".slider_body")
  if (!body) return
  body.removeEventListener("scroll", updateSliderEdges)
})
</script>

<template>
  <div class="slider relative w-full" ref="slider">
    <BMaterialIcon
      class="slider_arrow_left absolute"
      color="var(--color-neutral-100)"
      :size="40"
      hover
      @click="scroll(-200)"
      aria-hidden="true"
    >
      chevron_left
    </BMaterialIcon>
    <div class="slider_body gap-xl flex overflow-x-auto" tabindex="0">
      <slot />
    </div>
    <BMaterialIcon
      class="slider_arrow_right absolute"
      color="var(--color-neutral-100)"
      :size="40"
      hover
      @click="scroll(200)"
      aria-hidden="true"
    >
      chevron_right
    </BMaterialIcon>
  </div>
</template>

<style scoped>
.slider_body {
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.slider_arrow_left,
.slider_arrow_right {
  top: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 80px;
  background: var(--color-neutral-800);
  z-index: 1;
  user-select: none;
  transform: translateY(-50%);
}

.slider:hover .slider_arrow_left.isVisible,
.slider:hover .slider_arrow_right.isVisible {
  display: flex;
}

.slider:hover .slider_arrow_left.isVisible {
  left: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.slider:hover .slider_arrow_right.isVisible {
  right: 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.slider_arrow_left:focus,
.slider_arrow_right:focus {
  outline: 3px solid var(--color-blue-900);
}
</style>
