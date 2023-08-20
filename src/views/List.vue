<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete from '../components/AutoComplete.vue'
import NewsList from '../components/NewsList.vue'
import { totalList, NewsItem } from '../utils/news'
import { getFilteredList } from '../utils'

const searchKeys = ref<string[]>([])

let curPage = 1
let pageSize = 10
let totalPages = 0

const displayList = ref<NewsItem[]>([])

const getDisplayList = () => {
  let list: NewsItem[]
  list = searchKeys.value.length ? getFilteredList(totalList, searchKeys.value) : totalList
  const startIndex = (curPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  displayList.value = list.slice(startIndex, endIndex);
  totalPages = Math.ceil(list.length / pageSize)
}
getDisplayList()

const handleSearch = () => {
  curPage = 1
  getDisplayList()
}

const changePage = (page: number) => {
  curPage = page
  getDisplayList()
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <div class="fixed bg-white w-full shadow z-10 left-0 top-0">
    <div class="p-4 mt-0 mx-auto max-w-[1100px]">
      <auto-complete
        v-model="searchKeys"
        @search="handleSearch"
        @clear="handleSearch"
      />
    </div>
  </div>
  <div class="max-w-[1100px] m-auto">
    <div class="h-16"></div>
    <div class="p-4">
      <news-list :list="displayList" :total="totalPages" />
      <div class="mt-5 text-center">
        <span>{{ curPage }}</span>
        <span class="text-gray-400"> / {{ totalPages }}</span>
      </div>
      <div class="flex mt-2 pb-6">
        <button
          class="grow p-3 rounded-lg bg-sky-400 text-white font-bold"
          :class="{
            'mr-1.5': curPage < totalPages
          }"
          v-show="curPage > 1"
          @click="changePage(curPage - 1)"
        >
          上一页
        </button>
        <button
          class="grow p-3 rounded-lg bg-sky-400 text-white font-bold"
          :class="{
            'ml-1.5': curPage > 1
          }"
          v-show="curPage < totalPages"
          @click="changePage(curPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>
