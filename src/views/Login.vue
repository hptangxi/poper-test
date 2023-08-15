<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})
const showPassword = ref(false)

const submit = () => {
  router.push('/')
}

</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold border-b pb-2.5 mb-5">Login</h1>
    <div class="form-group">
      <label class="form-label" for="username">Username</label>
      <input class="form-input" id="username" v-model="form.username" type="text" autocomplete="off" />
    </div>
    <div class="form-group">
      <label class="form-label" for="password">Password</label>
      <input class="form-input" id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" autocomplete="off" />
    </div>
    <div class="form-group">
      <label class="form-label" for="show-password">
        <input v-model="showPassword" id="show-password" type="checkbox" />
        <span>show password</span>
      </label>
    </div>
    <div class="my-5">
      <button
        class="bg-primary text-white h-9 px-7 rounded-2xl border-0 shadow"
        @click="submit"
      >
        log in
      </button>
    </div>
  </div>
</template>
