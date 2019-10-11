import TagFields from './lib/TagFields.vue';

const option = {
  install(Vue) {
    Vue.component('TagFields', TagFields);
  }
}

export default option;

export {
  TagFields,
};