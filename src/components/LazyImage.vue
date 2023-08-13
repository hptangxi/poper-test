<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: String
})

const loaded = ref(false)
const imageRef = ref<HTMLElement | null>(null)

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage()
      observer.unobserve(entry.target)
    }
  })
}

const loadImage = () => {
  if (props.src && !loaded.value) {
    const img = new Image()
    img.src = props.src
    img.onload = () => {
      loaded.value = true
    }
  }
}

const observer = new IntersectionObserver(handleIntersect, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
})

onMounted(() => {
  if (imageRef.value) {
    observer.observe(imageRef.value)
  }
});
</script>

<template>
  <img
    class="object-cover rounded-lg border"
    :src="loaded ? src : '/images/image.png'"
    alt=""
    ref="imageRef"
  />
</template>