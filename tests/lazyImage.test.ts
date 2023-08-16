import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import LazyImage from '../src/components/LazyImage.vue'

class IntersectionObserver {
  callback
  options
  constructor(callback, options) {
    this.callback = callback
    this.options = options
  }

  observe() {
    this.callback([
      {
        isIntersecting: true,
        intersectionRatio: 1,
        target: this.options.root,
      },
    ])
  }

  unobserve() {}

  disconnect() {}
}

global.IntersectionObserver = IntersectionObserver

describe('LazyImage component', () => {
  it('renders with default placeholder', async () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'real.jpg',
      },
    })

    expect(wrapper.find('img').attributes('src')).toBe('/images/image.png')

    wrapper.trigger('intersect')
    await nextTick()

    expect(wrapper.find('img').attributes('src')).toBe('real.jpg')
  })
})