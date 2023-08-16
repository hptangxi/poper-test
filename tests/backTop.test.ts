import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BackTop from '../src/components/BackTop.vue'

describe('BackTop component', () => {
  it('should show back button when scroll position is greater than 200', async () => {
    const wrapper = mount(BackTop)

    window.scrollY = 250
    wrapper.vm.handleScroll()
    await wrapper.vm.$nextTick()
    const backButton = wrapper.find('button')

    expect(backButton.exists()).toBe(true)

  })

  it('should not show back button when scroll position is less than or equal to 200', async () => {
    const wrapper = mount(BackTop)

    window.scrollY = 150
    wrapper.vm.handleScroll()
    await wrapper.vm.$nextTick()
    const backButton = wrapper.find('button')

    expect(backButton.exists()).toBe(false)
  })

  it('should scroll to top when back button is clicked', async () => {
    const wrapper = mount(BackTop)
    window.scrollY = 500
    wrapper.vm.handleScroll()
    await wrapper.vm.$nextTick()
    wrapper.find('button').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(document.documentElement.scrollTop).toBe(0)
  })
})