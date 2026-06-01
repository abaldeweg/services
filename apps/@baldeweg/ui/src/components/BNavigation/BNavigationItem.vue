<script setup lang="ts">
import { computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import type { RouteLocationRaw } from "vue-router"
import BMaterialIcon from "../BMaterialIcon/BMaterialIcon.vue"

interface Props {
  border?: "none" | "primary" | "neutral"
  background?: "none" | "primary" | "neutral"
  direction?: "horizontal" | "vertical"
  route?: string | RouteLocationRaw
  icon?: string
  badge?: string
}

const props = withDefaults(defineProps<Props>(), {
  border: "none",
  background: "none",
  direction: "horizontal",
})

const router = useRouter()
const currentRoute = useRoute()

const href = computed<string | undefined>(() => {
  if (typeof props.route === "string") return props.route
  if (typeof props.route === "object") return router?.resolve(props.route)?.href
  return undefined
})

const isActive = computed<boolean>(() => {
  if (typeof props.route !== "object" || props.route === null) return false
  return currentRoute?.path === router?.resolve(props.route)?.path
})

const borderClasses = computed(() => {
  return {
    primary: "border border-primary-100",
    neutral: "border border-neutral-200",
    none: "",
  }[props.border]
})

const backgroundClasses = computed(() => {
  return {
    primary: "bg-primary-100",
    neutral: "bg-neutral-200",
    none: "",
  }[props.background]
})

/**
 * Handles navigation when the item is clicked.
 */
const handleNavigation = (event: Event): void => {
  if (typeof props.route !== "object" || props.route === null) return
  event.preventDefault()
  router.push(props.route)
}
</script>

<template>
  <li
    class="navigation_item m-none rounded-m block text-neutral-950 transition duration-300 ease-in-out hover:bg-neutral-200"
    :class="[
      borderClasses,
      backgroundClasses,
      isActive && 'bg-neutral-200',
      background === 'neutral' && isActive && 'bg-primary-100',
      background === 'neutral' && 'hover:bg-primary-100',
    ]"
  >
    <a
      :href="href"
      @click="handleNavigation"
      class="navigation_link no-underline gap-xl py-m px-xl flex flex-row text-neutral-950"
      :class="[
        direction === 'vertical' && 'flex-col items-center',
      ]"
      rel="noopener noreferrer"
    >
      <span class="navigation_icon w-[18px] leading-m flex items-center" v-if="icon">
        <BMaterialIcon :size="18">{{ icon }}</BMaterialIcon>
      </span>

      <span
        class="navigation_title grow"
        :class="[
          direction === 'vertical' && 'grow-0',
        ]"
      >
        <slot />
      </span>

      <span class="navigation_badge text-neutral-950" v-if="badge">
        {{ badge }}
      </span>
    </a>
  </li>
</template>
