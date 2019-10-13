import { mount } from "@vue/test-utils";
import TagFields from "../src/lib/TagFields.vue";
import flushPromises from 'flush-promises'

describe("TagFields.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TagFields, {
      propsData: {
        value: [],
      }
    });
  });

  it("add a tag", async () => {
    const InputWrapper = wrapper.find({ name: 'Input' });
    const input = InputWrapper.find('input');
    input.element.value = 'tag 1';
    input.trigger('input');
    input.trigger('keypress.enter');
    expect(wrapper.vm.value).toEqual([ 'tag 1' ]);
    await flushPromises();
    console.log(wrapper.findAll('.tag-label'));
  });
})