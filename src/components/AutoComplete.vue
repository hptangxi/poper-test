<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NewsItem } from '../utils/dataset'
import { debounce, getFilteredList } from '../utils'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  list: {
    type: Array as () => Array<NewsItem>,
    required: true
  }
})

const emit = defineEmits<{
  'update:modelValue': [value: string],
  change: [value: string]
}>()

const suggestions = [...props.list]
const inputRef = ref<HTMLInputElement | null>(null)
const showSuggestions = ref(false)
const filteredSuggestions = ref<NewsItem[]>([])

const handleInput = debounce((e: Event) => {
  if (!showSuggestions.value) showSuggestions.value = true
  const target = e.target as HTMLInputElement
  const value = target.value || ''
  emit('update:modelValue', value)

  handleFilter(value)
}, 300)

const handleFilter = (value?: string) => {
  filteredSuggestions.value = getFilteredList(suggestions, 'title', value, 15)
  if (!value) handleChange('')
}

const handleSelect = (title: string) => {
  emit('update:modelValue', title)
  handleChange(props.modelValue)
}

const handleSearch = () => {
  if (!filteredSuggestions.value.length) return
  handleChange(props.modelValue)
  if (showSuggestions.value) showSuggestions.value = false
}

const handleChange = (value: string) => {
  emit('change', value)
  inputRef.value?.blur()
}

const handleDelete = (item: NewsItem) => {
  const index = suggestions.findIndex(s => s.title === item.title)
  if (index >= 0) {
    suggestions.splice(index, 1)
    handleFilter(props.modelValue)
  }
}

const handleClear = () => {
  emit('update:modelValue', '')
  handleFilter()
}

const handleClickOutside = (event: MouseEvent) => {
  if (inputRef.value && !inputRef.value.contains(event.target as Node)) {
    showSuggestions.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})


</script>

<template>
  <div class="relative">
    <div class="border flex justify-between items-center rounded-lg overflow-hidden">
      <input
        class="grow px-2.5"
        ref="inputRef"
        :value="modelValue"
        type="text"
        placeholder="请输入关键字搜索"
        inputmode="search"
        @focus="showSuggestions = true"
        @input="handleInput"
        @keydown.enter="handleSearch"
      />
      <i
        v-show="!!modelValue"
        class="iconfont icon-close p-2 hover:text-sky-400 cursor-pointer"
        @click="handleClear"
      />
      <span
        class="bg-sky-400 text-white w-10 h-10 flex justify-center items-center cursor-pointer"
        :class="filteredSuggestions.length ? '' : 'pointer-events-none bg-slate-300'"
        @click="handleSearch"
      >
        <i class="iconfont icon-search"></i>
      </span>
    </div>
    <ul class="border absolute top-11 w-full rounded-lg z-10 bg-white" v-if="showSuggestions && filteredSuggestions.length">
      <li
        class="cursor-pointer hover:bg-sky-400/10 flex justify-between items-center"
        v-for="(s, sIndex) in filteredSuggestions"
        :key="sIndex"
        :class="s.title === modelValue ? 'bg-sky-400/10' : ''"
        @click="handleSelect(s.title)"
      >
        <span class="py-1.5 px-2.5">{{ s.title }}</span>
        <i class="iconfont icon-close py-1.5 px-2.5 hover:text-sky-400" @click.stop="handleDelete(s)" />
      </li>
    </ul>
  </div>
</template>
