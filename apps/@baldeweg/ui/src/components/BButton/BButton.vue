<script setup lang="ts">
interface Props {
  design?:
    | "primary"
    | "primary_danger"
    | "primary_wide"
    | "outline"
    | "outline_danger"
    | "outline_wide"
    | "text"
    | "text_danger"
}

withDefaults(defineProps<Props>(), {
  design: "primary",
})

const emit = defineEmits<{
  (e: "click"): void
}>()
</script>

<template>
  <button
    class="text-m rounded-m relative m-0 inline-block cursor-pointer overflow-hidden text-center font-sans no-underline"
    :class="{
      btn_primary:
        design === 'primary' ||
        design === 'primary_danger' ||
        design === 'primary_wide',
      btn_primary_danger: design === 'primary_danger',
      btn_primary_wide: design === 'primary_wide',
      btn_outline:
        design === 'outline' ||
        design === 'outline_danger' ||
        design === 'outline_wide',
      btn_outline_danger: design === 'outline_danger',
      btn_outline_wide: design === 'outline_wide',
      btn_text: design === 'text' || design === 'text_danger',
      btn_text_danger: design === 'text_danger',
    }"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn_primary {
  outline: 0;
  border: 0;
  background: var(--color-primary-900);
  padding: 6px 11px;
  color: var(--color-neutral-100);
  opacity: 1;
  transition: background 0.3s;
}

.btn_primary:hover,
.btn_primary:focus {
  color: var(--color-neutral-100);
  background: var(--color-primary-500);
}

.btn_primary_danger {
  background: var(--color-red-900);
}

.btn_primary_danger:hover,
.btn_primary_danger:focus {
  background: var(--color-red-500);
}

.btn_primary[disabled],
.btn_primary[disabled]:hover {
  background: var(--color-neutral-600);
  cursor: default;
}

.btn_primary_wide {
  width: 100%;
}

/* Outline */
.btn_outline {
  outline: 0;
  border: 1px solid var(--color-primary-900);
  background: var(--color-neutral-100);
  padding: 5px 10px;
  color: var(--color-primary-900);
  transition: background 0.2s;
}

.btn_outline:hover,
.btn_outline:focus {
  background: var(--color-primary-00);
  color: var(--color-primary-900);
}

.btn_outline_danger {
  border-color: var(--color-red-900);
  color: var(--color-red-900);
}

.btn_outline_danger:hover,
.btn_outline_danger:focus {
  color: var(--color-red-900);
  background: var(--color-red-100);
}

.btn_outline[disabled],
.btn_outline[disabled]:hover {
  background: transparent;
  border: 1px solid var(--color-neutral-600);
  color: var(--color-neutral-600);
  cursor: default;
}

.btn_outline_wide {
  width: 100%;
}

/* Text */
.btn_text {
  border: 0;
  background: transparent;
  color: var(--color-primary-900);
  padding: 5px 10px;
}

.btn_text_danger,
.btn_text_danger:hover {
  color: var(--color-red-900);
}

.btn_text[disabled],
.btn_text[disabled]:hover {
  color: var(--color-neutral-600);
  cursor: default;
}
</style>
