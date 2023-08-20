<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NewsItem, totalList } from '../utils/news'
import { debounce, getFilteredList } from '../utils'

const props = defineProps({
  modelValue: {
    type: Array<string>,
    required: true
  }
})

const emit = defineEmits([
  'update:modelValue',
  'clear',
  'search'
])

const searchKey = ref('')
const suggestions = [...totalList]
const completeRef = ref<HTMLElement | null>(null)
const showSuggestions = ref(false)
const filteredSuggestions = ref<NewsItem[]>([])

const handleInput = debounce(() => {
  if (!showSuggestions.value) showSuggestions.value = true
  handleFilter()
}, 300)

const handleFilter = () => {
  filteredSuggestions.value =
    getFilteredList(suggestions, searchKey.value, 15)
}

const handleSelect = (title: string) => {
  let arr: any[]
  if (props.modelValue.includes(title)) {
    arr = props.modelValue.filter(v => v !== title)
  } else {
    arr = props.modelValue.concat([title])
  }
  emit('update:modelValue', arr)
  searchKey.value = ''
}

const handleSearch = () => {
  if (!props.modelValue || !props.modelValue.length) return
  emit('search')
  if (showSuggestions.value) showSuggestions.value = false
}

const deleteTag = (title: string) => {
  const arr = props.modelValue.filter(v => v !== title)
  emit('update:modelValue', arr)
  if (!arr.length) emit('clear')
}

const handleDelete = (item: NewsItem) => {
  const index = suggestions.findIndex(s => s.title === item.title)
  if (index >= 0) {
    suggestions.splice(index, 1)
    handleFilter()
  }
  emit('update:modelValue', props.modelValue.filter(v => v !== item.title))
}

const handleClear = () => {
  emit('update:modelValue', [])
  emit('clear')
  handleFilter()
}

const handleClickOutside = (event: MouseEvent) => {
  if (completeRef.value && !completeRef.value.contains(event.target as Node)) {
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
  <div ref="completeRef" class="relative">
    <div class="border flex justify-between rounded-lg overflow-hidden min-h-[40px] items-stretch">
      <div class="grow px-2.5 flex flex-wrap justify-start">
        <span
          class="bg-[#f4f4f5] border text-[#909399] px-1 py-0.5 my-[2px] mr-2 inline-block rounded"
          v-for="(v, vIndex) in modelValue"
          :key="vIndex"
          @click="showSuggestions = !showSuggestions"
        >
          {{ v }}
          <i class="fa-solid fa-xmark cursor-pointer" @click.stop="deleteTag(v)" />
        </span>
        <input
          class="px-2.5"
          ref="inputRef"
          v-model="searchKey"
          type="text"
          style="flex:1;min-width:50px"
          :placeholder="modelValue.length ? '' : '请输入关键字搜索'"
          autocomplete="off"
          @focus="handleFilter"
          @click="showSuggestions = !showSuggestions"
          @input="handleInput"
          @keydown.enter="handleSearch"
        />
      </div>
      <span class="flex justify-center items-center">
        <i
          v-show="modelValue.length"
          class="fa-solid fa-xmark p-2 hover:text-sky-400 cursor-pointer"
          @click="handleClear"
        />
      </span>
      <span
        class="bg-sky-400 text-white w-10 flex justify-center items-center cursor-pointer shrink-0"
        :class="modelValue.length ? '' : 'pointer-events-none bg-slate-300'"
        @click="handleSearch"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>
    <Transition name="slide-down">
      <ul class="border absolute top-full w-full rounded-lg z-10 bg-white" v-if="showSuggestions">
        <template v-if="filteredSuggestions.length">
          <li
            class="suggestion-item"
            v-for="(s, sIndex) in filteredSuggestions"
            :key="sIndex"
            :class="modelValue.includes(s.title) ? 'bg-sky-400/10' : ''"
            @click="handleSelect(s.title)"
          >
            <span>{{ s.title }}</span>
            <i class="fa-solid fa-xmark" @click.stop="handleDelete(s)" />
          </li>
        </template>
        <li class="py-5 px-2.5 text-gray-400 text-center" v-else>
          暂无数据
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.suggestion-item {
  @apply cursor-pointer hover:bg-sky-400/10 flex justify-between items-center;
}
.suggestion-item span {
  @apply py-1.5 px-2.5;
}
.suggestion-item i {
  @apply py-1.5 px-2.5 hover:text-sky-400;
}
</style>
