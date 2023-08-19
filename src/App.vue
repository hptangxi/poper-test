<script setup lang="ts">
import { onMounted } from 'vue'
import smoothScroll from 'smoothscroll-polyfill'

onMounted(() => {
  smoothScroll.polyfill()
})
</script>

<template>
  <div class="m-auto align-baseline text-base text-[#493b32] leading-6 tap-highlight-transparent">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component v-if="$route.meta.keepAlive" :is="Component" />
      </keep-alive>
      <component v-if="!$route.meta.keepAlive" :is="Component" />
    </router-view>
  </div>
</template>

<style>
@import url("//at.alicdn.com/t/c/font_4208217_fkzgbq89gc.css");
</style>
