/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/poper-test/',
  plugins: [vue()],
  test: {
    environment: 'happy-dom'
  }
})
