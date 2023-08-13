<script setup lang="ts">
import { NewsItem } from '../utils/dataset'
import LazyImage from './LazyImage.vue'

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
</script>

<template>
  <ul>
    <li
      class="mt-2.5 border shadow-md rounded-lg p-4 cursor-pointer"
      v-for="(l, lIndex) in list"
      :key="lIndex"
    >
      <div class="flex justify-between items-start">
        <div>
          <div class="text-sky-500 font-bold text-lg">{{ l.title }}</div>
          <div>
            <p class="line-clamp-3">{{ l.desc }}</p>
          </div>
          <div class="text-sm text-gray-400 mt-2">{{ l.date }}</div>
        </div>
        <!-- <img
          class="md:w-32 md:h-32 w-20 h-20 object-cover shrink-0 rounded ml-2.5 shadow-md border mt-2"
          :src="`/images/${l.image}`"
        /> -->
        <lazy-image
          class="md:w-32 md:h-32 w-20 h-20 shrink-0 ml-2.5 mt-2"
          :src="`/images/${l.image}`"
        />
      </div>
    </li>
  </ul>
</template>
