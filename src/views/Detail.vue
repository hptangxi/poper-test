<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { totalList, NewsItem } from '../utils/news'
import BackTop from '../components/BackTop.vue'

const { title } = useRoute().params
const detail = ref<NewsItem>({
  title: '',
  date: '',
  image: '',
  desc: ''
})
const loading = ref(true)
const videoRef = ref<HTMLVideoElement | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)

const onVideoPlay = () => {
  audioRef.value?.pause()
}

const onAudioPlay = () => {
  videoRef.value?.pause()
}

onMounted(() => {
  const curNewsStr = localStorage.getItem('curNews')
  let item = curNewsStr ? JSON.parse(curNewsStr) : {}
  if (item.title === title) {
    detail.value = {
      ...item,
      desc: item.desc?.repeat(10)
    }
  } else {
    item = totalList.find(l => l.title === title)
    if (item) {
      detail.value = {
        ...item,
        desc: item.desc?.repeat(10)
      }
    }
  }
  loading.value = false
})

</script>

<template>
  <div class="max-w-[1100px] m-auto">
    <div v-if="loading" class="h-full flex justify-center items-center">loading ...</div>
    <div class="px-4 pt-4 pb-10 flex flex-col items-center" v-else>
      <h1 class="text-3xl text-sky-500 font-bold py-2">{{ title }}</h1>
      <div class="w-full h-0 pt-[56.25%] relative mt-5">
        <video
          class="absolute top-0 left-0 w-full h-full bg-black"
          ref="videoRef"
          controls
          playsinline
          webkit-playsinline
          preload="metadata"
          :poster="`./images/${detail.image}`"
          @play="onVideoPlay"
        >
          <source :src="'./media/movie.mp4'" type="video/mp4" />
        </video>
      </div>
      <audio
        ref="audioRef"
        class="mt-5"
        src="./media/music.mp3"
        controls
        @play="onAudioPlay"
      />
      <p class="mt-3">{{ detail.desc }}</p>
    </div>
  </div>
  <back-top />
</template>
