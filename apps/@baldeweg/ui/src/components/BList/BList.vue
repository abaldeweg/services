<script setup lang="ts">
import { useSlots } from "vue"
import type { RouteLocationRaw } from "vue-router"

interface Props {
  route?: RouteLocationRaw
  mediaSize?: "landscape" | "portrait" | "avatar"
  textWidth?: string
  controlsWidth?: string
  divider?: boolean
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  mediaSize: "landscape",
  textWidth: "200px",
  controlsWidth: "50px",
  divider: false,
  hover: false,
})

const slots = useSlots()
</script>

<template>
  <div
    class="list transition duration-300 ease-in-out my-xl mx-none flex"
    :class="{
      'hover:cursor-pointer hover:bg-neutral-200': hover,
    }"
  >
    <div
      v-if="slots.media"
      class="list_media py-xl px-none pr-xl"
      :class="{
        'cursor-pointer hover:bg-neutral-200': hover,
        'w-[200px]': mediaSize === 'landscape',
        'w-[100px]': mediaSize === 'portrait',
        'list_avatar h-[50px] w-[50px] rounded-full': mediaSize === 'avatar',
      }"
      :style="{ width: mediaSize }"
    >
      <slot name="media" />
    </div>

    <div
      class="list_content py-xl px-none grow"
      :class="{
        'border-b border-neutral-200': divider,
      }"
    >
      <RouterLink :to="route" v-if="route">
        <h3 class="m-none" v-if="slots.title">
          <slot name="title" />
        </h3>
        <p class="p-none m-none">
          <span v-if="slots.subtitle" class="list_subtitle">
            <slot name="subtitle" />
          </span>
          <span v-if="slots.subtitle && slots.default"> - </span>
          <slot />
        </p>
      </RouterLink>
      <div v-else>
        <h3 class="m-none" v-if="slots.title">
          <slot name="title" />
        </h3>
        <p class="p-none m-none">
          <span v-if="slots.subtitle" class="list_subtitle font-bold">
            <slot name="subtitle" />
          </span>
          <span v-if="slots.subtitle && slots.default"> - </span>
          <slot />
        </p>
      </div>
    </div>

    <div
      v-if="slots.text"
      class="list_text py-xl px-none pl-xl text-primary-900 text-right font-bold"
      :class="{
        'border-b border-neutral-200': divider,
      }"
      :style="{ width: textWidth }"
    >
      <slot name="text" />
    </div>

    <div
      v-if="slots.controls"
      class="list_controls py-xl px-none pl-xl text-right"
      :class="{
        'border-b border-neutral-200': divider,
      }"
      :style="{ width: controlsWidth }"
    >
      <slot name="controls" />
    </div>
  </div>
</template>

<style>
.list a,
.list a:hover {
  text-decoration: none;
}

.list_avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.list_content a,
.list_content a:hover {
  color: var(--color-neutral-950) !important;
}
</style>
