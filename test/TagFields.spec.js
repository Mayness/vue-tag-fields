import { mount } from '@vue/test-utils';
import TagFields from '../src/lib/TagFields.vue';
import Vue from 'vue';

function addTag(wrapper, tagName) {
  const InputWrapper = wrapper.find({ name: 'Input' });
  const input = InputWrapper.find('input');
  input.element.value = tagName;
  input.trigger('input');
  input.trigger('keypress.enter');
}

function changeTap(InputWrapper, value) {
  InputWrapper.element.value = value;
  InputWrapper.trigger('input');
  InputWrapper.trigger('keypress.enter');
}

function sleep() {
  return new Promise(resolve => Vue.nextTick(resolve));
}

describe('TagFields.vue', () => {
  it('add a tag', () => {
    const wrapper = mount(TagFields, {
      propsData: {
        value: []
      }
    });
    addTag(wrapper, 'tag 1');
    expect(wrapper.vm.value).toEqual(['tag 1']);
  });

  it('delete a tag', () => {
    const wrapper = mount(TagFields, {
      propsData: {
        value: ['tag 1', 'tag 2']
      }
    });
    const labels = wrapper.findAll('.tag-label');
    expect(labels.length).toBe(2);
    labels.at(1).find('.delete').trigger('click');
    expect(wrapper.vm.value).toEqual(['tag 1']);
  });

  it('change a tag', async done => {
    const wrapper = mount(TagFields, {
      propsData: {
        value: ['tag 1']
      }
    });
    let labels = wrapper.find('.tag-label');
    labels.trigger('click');
    await sleep();
    let labelInput = wrapper.find('.tag-label-box input');
    expect(labelInput.name()).toBe('input');
    changeTap(labelInput, 'change tag 1');
    expect(wrapper.vm.value).toEqual(['change tag 1']);
    await sleep();
    labels = wrapper.find('.tag-label');
    labels.trigger('click');
    await sleep();
    labelInput = wrapper.find('.tag-label-box input');
    labelInput.element.value = 'rechange tag 1';
    labelInput.trigger('input');
    labelInput.trigger('blur');
    expect(wrapper.vm.value).toEqual(['change tag 1']);
    done();
  });

  it('test max-tag-length property', () => {
    const wrapper = mount(TagFields, {
      propsData: {
        value: ['tag 1', 'tag 2', 'tag 3'],
        'max-tag-length': 4
      }
    });
    addTag(wrapper, 'tag 4');
    expect(wrapper.vm.value).toEqual(['tag 1', 'tag 2', 'tag 3', 'tag 4']);
    addTag(wrapper, 'tag 5');
    expect(wrapper.vm.value).toEqual(['tag 1', 'tag 2', 'tag 3', 'tag 4']);
  });

  it('test allow-duplicates property', () => {
    const wrapper = mount(TagFields, {
      propsData: {
        value: ['tag 1'],
        'allow-duplicates': false
      }
    });
    addTag(wrapper, 'tag 1');
    expect(wrapper.vm.value).toEqual(['tag 1']);
  });

  it('test ready-only property', () => {
    const wrapper = mount(TagFields, {
      propsData: {
        value: ['tag 1'],
        'ready-only': true
      }
    });
    let labels = wrapper.find('.tag-label');
    labels.trigger('click');
    expect(wrapper.contains('.tag-label-box input')).toBe(false);
  });

  it('test before-change property', () => {
    const wrapper = mount(TagFields, {
      propsData: {
        value: [],
        'before-change': function(name) {
          return name !== 'tag 1';
        }
      }
    });
    addTag(wrapper, 'tag 1');
    expect(wrapper.vm.value).toEqual([]);
    addTag(wrapper, 'tag 2');
    expect(wrapper.vm.value).toEqual(['tag 2']);
  });

  it('test onblur-append property', async done => {
    const wrapper = mount(TagFields, {
      propsData: {
        value: ['tag 1'],
        'onblur-append': true
      }
    });
    let labels = wrapper.find('.tag-label');
    labels.trigger('click');
    await sleep();
    let labelInput = wrapper.find('.tag-label-box input');
    labelInput.element.value = 'rechange tag 1';
    labelInput.trigger('input');
    labelInput.trigger('blur');
    expect(wrapper.vm.value).toEqual(['rechange tag 1']);
    done();
  });
});
