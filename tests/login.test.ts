import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../src/views/Login.vue'
import List from '../src/views/List.vue'

describe('Login Page', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: List }
    ]
  })

  it('show password successfully', async () => {
    const wrapper = mount(Login)
    const showPasswordCheckbox = wrapper.find('input[id="show-password"]')
    const passwordInput = wrapper.find('input[id="password"]')

    await showPasswordCheckbox.setChecked()

    expect(showPasswordCheckbox.element.checked).toBeTruthy()
    expect(passwordInput.attributes('type')).toBe('text')
  })

  it('hide password successfully', async () => {
    const wrapper = mount(Login)
    const showPasswordCheckbox = wrapper.find('input[id="show-password"]')
    const passwordInput = wrapper.find('input[id="password"]')

    await showPasswordCheckbox.setChecked(false)

    expect(showPasswordCheckbox.element.checked).toBe(false)
    expect(passwordInput.attributes('type')).toBe('password')
  })

  it('login in successfully from login page to news list page', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router]
      }
    })
    const usernameInput = wrapper.find('input[id="username"]')
    const passwordInput = wrapper.find('input[id="password"]')
    const loginButton = wrapper.find('button[id="submit-btn"]')

    await usernameInput.setValue('user')
    await passwordInput.setValue('pass')
    await loginButton.trigger('click')

    await router.isReady()
    const currentRoute = router.currentRoute.value

    expect(currentRoute.path).toBe('/')
  })
})