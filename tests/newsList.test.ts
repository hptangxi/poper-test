import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NewsList from '../src/components/NewsList.vue'
import Detail from '../src/views/Detail.vue'
import { createRouter, createWebHistory } from 'vue-router'

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

describe('NewsList component', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/detail/:title', component: Detail }
    ]
  })

  it('should render news items correctly', async () => {
    const list = [
      { title: 'News 1', desc: 'Description 1', date: '2023-08-16', image: 'news1.jpg' },
      { title: 'News 2', desc: 'Description 2', date: '2023-08-17', image: 'news2.jpg' }
    ]

    const wrapper = mount(NewsList, {
      props: {
        list
      }
    })

    const newsItems = wrapper.findAll('li')
    expect(newsItems.length).toBe(list.length)

    const firstNews = newsItems[0]
    expect(firstNews.find('.news-title').text()).toBe(list[0].title)
    expect(firstNews.find('.news-desc').text()).toBe(list[0].desc)
  })

  it('should navigate to news detail when a news item is clicked', async () => {
    const list = [
      { title: 'News 1', desc: 'Description 1', date: '2023-08-16', image: 'news1.jpg' },
    ]

    const wrapper = mount(NewsList, {
      props: {
        list
      },
      global: {
        plugins: [router]
      }
    })

    wrapper.find('li').trigger('click')
    await router.isReady()
    const currentRoute = router.currentRoute.value
    expect(currentRoute.path).toBe(`/detail/${list[0].title}`)
  })
})