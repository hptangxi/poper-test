<script setup lang="ts">
import { NewsItem } from '@/utils/dataset'
import LazyImage from './LazyImage.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  list: {
    type: Array as () => Array<NewsItem>,
    default() {
      return []
    }
  },
  total: {
    type: Number,
    default: 0
  }
})

const router = useRouter()

const goDetail = (item: NewsItem) => {
  router.push(`/detail/${item.title}`)
}
</script>

<template>
  <ul>
    <li
      class="mt-2.5 border shadow-md rounded-lg p-4 cursor-pointer"
      v-for="(l, lIndex) in list"
      :key="lIndex"
      @click="goDetail(l)"
    >
      <div class="flex justify-between items-start">
        <div>
          <div class="news-title text-sky-500 font-bold text-lg">{{ l.title }}</div>
          <div>
            <p class="news-desc line-clamp-3">{{ l.desc }}</p>
          </div>
          <div class="text-sm text-gray-400 mt-2">{{ l.date }}</div>
        </div>
        <lazy-image
          class="md:w-32 md:h-32 w-20 h-20 shrink-0 ml-2.5 mt-2"
          :src="`@/assets/images/${l.image}`"
        />
      </div>
    </li>
  </ul>
</template>
