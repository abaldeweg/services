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
  if (typeof props.route === "object") return router.resolve(props.route).href
  return undefined
})

const isActive = computed<boolean>(() => {
  if (typeof props.route !== "object" || props.route === null) return false
  return currentRoute.path === router.resolve(props.route).path
})

const handleNavigation = (event: Event): void => {
  if (typeof props.route !== "object" || props.route === null) return
  event.preventDefault()
  router.push(props.route)
}
</script>

<template>
  <li
    class="navigation_item"
    :class="[
      border !== 'none' && `navigation_item_border_${border}`,
      background !== 'none' && `navigation_item_background_${background}`,
      direction === 'vertical' && 'navigation_item_vertical',
      isActive && 'isActive',
    ]"
  >
    <a
      :href="href"
      @click="handleNavigation"
      class="navigation_link"
      rel="noopener noreferrer"
    >
      <span class="navigation_icon" v-if="icon">
        <BMaterialIcon :size="18">{{ icon }}</BMaterialIcon>
      </span>

      <span class="navigation_title">
        <slot />
      </span>

      <span class="navigation_badge" v-if="badge">
        {{ badge }}
      </span>
    </a>
  </li>
</template>

<style>
.navigation_item {
  display: block;
  border-radius: 10px;
  margin: 0;
  transition: background 0.3s ease;
  color: var(--color-neutral-10);
}

.navigation_item:hover,
.navigation_item.isActive {
  background: var(--color-neutral-02);
  transition: background 0.3s ease;
}

.navigation_background_neutral .navigation_item:hover,
.navigation_background_neutral .navigation_item.isActive {
  background: var(--color-primary-00);
}

.navigation_link {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 5px 20px;
  text-decoration: none;
}

.navigation a,
.navigation a:hover {
  text-decoration: none;
}

.navigation_icon {
  display: flex;
  align-items: center;
  width: 18px;
  line-height: 1;
}

.navigation_title {
  flex-grow: 1;
}

.navigation_badge {
  color: var(--color-neutral-10);
}

.navigation_item_border_primary {
  border: 1px solid var(--color-primary-00);
}

.navigation_item_border_neutral {
  border: 1px solid var(--color-neutral-02);
}

.navigation_item_background_primary {
  background-color: var(--color-primary-00);
}

.navigation_item_background_neutral {
  background-color: var(--color-neutral-02);
}

.navigation_item_vertical .navigation_link {
  flex-direction: column;
  align-items: center;
}

.navigation_item_vertical .navigation_title {
  flex-grow: 0;
  font-size: 0.8rem;
}
</style>
