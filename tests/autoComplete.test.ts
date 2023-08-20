import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AutoComplete from '../src/components/AutoComplete.vue'

describe('AutoComplete component', () => {
  it('emit change event with selected value', async () => {
    const wrapper = mount(AutoComplete, { props: { modelValue: [] } });

    const input = wrapper.find('input');
    await input.setValue('japan');

    setTimeout(async () => {
      const suggestion = wrapper.find('li')
      await suggestion.trigger('click')
      wrapper.vm.$emit('search');

      expect(wrapper.emitted('search')).toBeTruthy();
    }, 300)
  })
})