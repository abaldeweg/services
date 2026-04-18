<script setup lang="ts">
interface Props {
  placeholder?: string
  modelValue?: string
  filter?: boolean
  branded?: boolean
  focus?: boolean
  reset?: boolean
  resetLabel?: string
  filterLabel?: string
  searchLabel?: string
}

withDefaults(defineProps<Props>(), {
  filter: false,
  branded: false,
  focus: false,
  reset: false,
})

const emit = defineEmits<{
  reset: []
  input: [value: string]
  "update:modelValue": [value: string]
  submit: [event: SubmitEvent]
  filter: []
}>()
</script>

<template>
  <form
    class="search block grow items-center rounded-xl border border-neutral-400"
    :class="{ search_isBranded: branded }"
    @submit.prevent="emit('submit', $event)"
  >
    <input
      type="search"
      class="search_input p-m pl-l m-none text-m w-full grow rounded-xl border-none bg-neutral-100 font-sans text-neutral-950 outline-none"
      :placeholder="placeholder"
      :value="modelValue"
      :autofocus="focus"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      aria-label="Search"
    />
    <div class="search_buttons w-full text-right">
      <button
        type="reset"
        class="search_button"
        @click="emit('reset')"
        v-if="reset"
      >
        <BMaterialIcon :size="22" :aria-label="resetLabel" hover>
          close
        </BMaterialIcon>
      </button>
      <button
        type="button"
        class="search_button"
        @click="emit('filter')"
        v-if="filter"
      >
        <BMaterialIcon :size="22" :aria-label="filterLabel" hover>
          filter_alt
        </BMaterialIcon>
      </button>
      <button class="search_button">
        <BMaterialIcon
          :size="22"
          :isPrimary="branded"
          :aria-label="searchLabel"
          hover
        >
          search
        </BMaterialIcon>
      </button>
    </div>
  </form>
</template>

<style scoped>
.search.search_isBranded {
  border: 1px solid var(--color-primary-900);
}



.search_button {
  border: 0;
  background: transparent;
  padding: 5px 10px;
  margin: 0;
  cursor: pointer;
}

.search_input::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

input[type="search"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

@media all and (min-width: 500px) {
  .search {
    display: flex;
  }

  .search_buttons {
    width: auto;
  }

  .search_input {
    width: auto;
  }
}

@media (prefers-color-scheme: dark) {
  .search_button {
    color: var(--color-neutral-950);
  }
}
</style>
