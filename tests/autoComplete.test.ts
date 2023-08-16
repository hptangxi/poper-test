import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AutoComplete from '../src/components/AutoComplete.vue'

describe('AutoComplete component', () => {
  it('update input value using v-model', async () => {
    const wrapper = mount(AutoComplete, {
      props: {
        modelValue: 'japan'
      }
    })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('japan')

    await input.setValue('china')
    setTimeout(() => {
      expect(wrapper.props('modelValue')).toBe('china')
    }, 300)
  })

  it('emit change event with selected value', async () => {
    const wrapper = mount(AutoComplete, { props: { modelValue: '' } });

    const input = wrapper.find('input');
    await input.setValue('japan');

    setTimeout(async () => {
      const suggestion = wrapper.find('li')
      await suggestion.trigger('click')
      wrapper.vm.$emit('change', suggestion.text());

      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')[0]).toEqual([suggestion.text()]);
    }, 300)
  })
})