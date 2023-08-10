<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { NewsItem } from '../utils/dataset'
import { getNewsList } from '../utils/dataset'

const suggestions = ref<NewsItem[]>(getNewsList(1000))
const inputValue = ref('')
const showSuggestions = ref(false)
const activeIndex = ref(-1)
const inputRef = ref<HTMLInputElement | null>(null)

const filteredSuggestions = computed(() => {
  if (!inputValue.value) return []

  return suggestions.value
    .filter(s =>
      s.title.toLowerCase().includes(inputValue.value.toLowerCase())
    )
    .slice(0, 15)
})

const handleFocus = () => {
  if (filteredSuggestions.value.length) showSuggestions.value = true
}

const handleInput = () => {
  // activeIndex.value = -1
  // showSuggestions.value = true
}

const handleBlur = () => {
  showSuggestions.value = false
}

const handleArrowDown = () => {
  if (activeIndex.value < filteredSuggestions.value.length - 1) {
    activeIndex.value += 1
  }
}

const handleArrowUp = () => {
  if (activeIndex.value > 0) {
    activeIndex.value -= 1
  }
}

const handleEnter = () => {
  if (activeIndex.value >= 0 && activeIndex.value < filteredSuggestions.value.length) {
    selectSuggestion(activeIndex.value)
  }
}

const selectSuggestion = (index: number) => {
  activeIndex.value = index
  inputValue.value = filteredSuggestions.value[index].title
  showSuggestions.value = false
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
  if (inputRef.value && !inputRef.value.contains(event.target as Node)) {
    showSuggestions.value = false
  }
}
</script>

<template>
  <div>
    <input
      ref="input"
      v-model="inputValue"
      @focus="handleFocus"
      @input="handleInput"
      @blur="handleBlur"
      @keydown.down="handleArrowDown"
      @keydown.up="handleArrowUp"
      @keydown.enter="handleEnter"
    />111
    <ul v-if="showSuggestions" class="suggestions">
      <li
        v-for="(item, index) in filteredSuggestions"
        :key="index"
        :class="{ active: index === activeIndex }"
        @click="selectSuggestion(index)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li.active {
  background-color: #f0f0f0;
}
</style>