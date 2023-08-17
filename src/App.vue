<script setup lang="ts">
import { onMounted } from 'vue'
import smoothScroll from 'smoothscroll-polyfill'

onMounted(() => {
  smoothScroll.polyfill()
})
</script>

<template>
  <div class="max-w-screen-lg mt-0 mx-auto">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style>
@import url("//at.alicdn.com/t/c/font_4208217_fkzgbq89gc.css");
</style>
