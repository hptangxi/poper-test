<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: String
})

const imageRef = ref<HTMLImageElement | null>(null)
const imageSrc = ref('')

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage()
      observer.unobserve(entry.target)
    }
  })
}

const loadImage = () => {
  if (props.src && !imageSrc.value) {
    imageSrc.value = props.src
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
    :src="imageSrc || '/poper-test/images/image.png'"
    alt=""
    ref="imageRef"
  />
</template>