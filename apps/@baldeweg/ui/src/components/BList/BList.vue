<script setup lang="ts">
import { computed, useSlots } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { RouteLocationRaw } from "vue-router"

interface Props {
  route?: RouteLocationRaw
  mediaSize?: "landscape" | "portrait" | "avatar"
  textWidth?: string
  controlsWidth?: string
  divider?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mediaSize: "landscape",
  textWidth: "200px",
  controlsWidth: "50px",
  divider: false,
  hover: false,
})

const router = useRouter()
const currentRoute = useRoute()

const active = computed(() => {
  if (!props.route) return false
  const resolved = router.resolve(props.route as RouteLocationRaw)
  return resolved.fullPath === currentRoute.fullPath
})

const slots = useSlots()
</script>

<template>
  <div
    class="list"
    :class="{
      list_hasHover: hover,
      list_isActive: active,
    }"
  >
    <div
      v-if="slots.media"
      class="list_media"
      :class="{
        list_hasHover: hover,
        list_isActive: active,
        list_mediaSize_landscape: mediaSize === 'landscape',
        list_mediaSize_portrait: mediaSize === 'portrait',
        list_mediaSize_avatar: mediaSize === 'avatar',
      }"
      :style="{ width: mediaSize }"
    >
      <slot name="media" />
    </div>

    <div
      class="list_content"
      :class="{
        list_hasDivider: divider,
      }"
    >
      <RouterLink :to="route" v-if="route">
        <h3 v-if="slots.title">
          <slot name="title" />
        </h3>
        <p>
          <span v-if="slots.subtitle" class="list_subtitle">
            <slot name="subtitle" />
          </span>
          <span v-if="slots.subtitle && slots.default"> - </span>
          <slot />
        </p>
      </RouterLink>
      <div v-else>
        <h3 v-if="slots.title">
          <slot name="title" />
        </h3>
        <p>
          <span v-if="slots.subtitle" class="list_subtitle">
            <slot name="subtitle" />
          </span>
          <span v-if="slots.subtitle && slots.default"> - </span>
          <slot />
        </p>
      </div>
    </div>

    <div
      v-if="slots.text"
      class="list_text"
      :class="{
        list_hasDivider: divider,
      }"
      :style="{ width: textWidth }"
    >
      <slot name="text" />
    </div>

    <div
      v-if="slots.controls"
      class="list_controls"
      :class="{
        list_hasDivider: divider,
      }"
      :style="{ width: controlsWidth }"
    >
      <slot name="controls" />
    </div>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  margin: 20px 0;
  transition: background-color 0.3s ease;
}

.list_hasDivider {
  border-bottom: 1px solid var(--color-neutral-200);
}

.list a,
.list a:hover {
  text-decoration: none;
}

.list_hasHover:hover {
  background: var(--color-neutral-200);
  cursor: pointer;
}

.list_media,
.list_content,
.list_text,
.list_controls {
  padding: 10px 0;
}

.list_media {
  padding-right: 20px;
}

.list_media.list_mediaSize_landscape {
  width: 200px;
}

.list_mediaSize_landscape img {
  width: 200px;
}

.list_mediaSize_portrait img {
  width: 100px;
}

.list_mediaSize_avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.list_content {
  flex-grow: 1;
}

.list_content h3 {
  margin: 0;
}

.list_content p {
  padding: 0;
}

.list_content a,
.list_content a:hover {
  color: var(--color-neutral-950) !important;
}

.list_subtitle {
  font-weight: bold;
}

.list_text {
  padding-left: 20px;
  text-align: right;
  color: var(--color-primary-900);
  font-weight: bold;
}

.list_controls {
  padding-left: 20px;
  text-align: right;
}
</style>
