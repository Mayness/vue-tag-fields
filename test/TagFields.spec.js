import { mount } from "@vue/test-utils";
import TagFields from "../src/lib/TagFields.vue";

async function addTag(wrapper, newTag) {
}

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
  });
})