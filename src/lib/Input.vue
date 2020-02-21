<template>
  <div class="input-box">
    <input ref="input" @blur="blurInput" @keypress.enter="outerValue" v-model="inputValue"
      :style="{ width: `${inputWidth}px` }" :placeholder="placeholder"/>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    onblurAppend: {
      type: Boolean,
      required: false,
      default: false,
    },
    inputInitValue: {
      type: [ String, Number ],
      required: false,
      default: ''
    },
    ids: {
      type: Number,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      inputValue: ''
    };
  },
  methods: {
    outerValue() {
      if (this.inputValue) {
        this.$emit('outerValue', {
          value: this.inputValue,
          ids: this.itemId
        }, () => {
          this.inputValue = '';
          // 防止事件冲突
          this.itemId = undefined;
        });
      }
    },
    blurInput() {
      if (this.onblurAppend) {
        this.outerValue();
        this.$emit('input', false);
      } else {
        // 如果是当前已存在的label失去焦点，则还原之前数据
        if (this.itemId !== undefined) {
          this.inputValue = this.inputInitValue;
          this.outerValue();
        }
        this.$emit('input', false);
      }
    },
  },
  computed: {
    inputWidth() {
      return 20 + (this.placeholder.length || this.inputValue.length) * 15;
    },
  },
  watch: {
    value(flag) {
      if (flag) {
        this.$refs.input.focus();
      }
    },
  },
  created() {
    this.inputValue = this.inputInitValue;
    this.itemId = this.ids;
  },
};
</script>

<style scoped>
.input-box {
  display: inline-block;
}
input {
  position: relative;
  border: none;
  outline: 0;
  max-width: 90%;
}
</style>