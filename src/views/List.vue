<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete from '../components/AutoComplete.vue'

const searchKey = ref('')
</script>

<template>
  <auto-complete v-model="searchKey" />
</template>
