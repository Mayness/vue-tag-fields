import TagFields from './lib/TagFields.vue';

const Option = {
  install(Vue) {
    Vue.component('TagFields', TagFields);
  }
}

export {
  Option as default,
  TagFields,
};