<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    class="fixed bottom-5 right-5 text-white bg-sky-500/70 cursor-pointer w-12 h-12 rounded-[50%]"
    v-if="showBackToTop"
    @click="scrollToTop"
  >
    <span class="text-xl">&#8679;</span>
  </button>
</template>
