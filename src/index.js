import TagSelect from './lib/TagSelect.vue';

const option = {
  install(Vue) {
    Vue.component('TagSelect', TagSelect);
  }
}

export default option;

export {
  TagSelect,
};