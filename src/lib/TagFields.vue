<template>
  <div :class="[ 'vTag-box', disabled ? 'disabled' : active ? 'active' : '' ]" @click="focusBox">
    <div class="tag-label-box" @click="touchItem(key)" v-for="(item, key) in data" :key="key">
      <div v-if="touchIndex !== key" class="tag-label">
        {{item}}
        <span v-if="!disabled && readyOnlyIndex <= key" class="delete" @click.stop="deleteItem(key)">×</span>
      </div>
      <Input v-else v-model="active" :inputInitValue="item" :ids="key" @outerValue="outerValue" :onblurAppend="onblurAppend" />
    </div>
    <Input v-if="touchIndex === null" v-model="active" @outerValue="outerValue" :onblurAppend="onblurAppend"
      :placeholder="data.length ? '' : placeholder" />
  </div>
</template>

<script>
import Input from './Input';
export default {
  name: 'TagFields',
  props: {
    value: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    'max-tag-length': {
      type: Number,
      required: false,
    },
    'allow-duplicates': {
      type: Boolean,
      required: false,
      default: true
    },
    'ready-only': {
      type: Boolean,
      required: false,
      default: false
    },
    'onblur-append': {
      type: Boolean,
      required: false,
      default: false
    },
    'before-change': {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      active: false,
      touchIndex: null,
      readyOnlyIndex: -1,
    };
  },
  methods: {
    touchItem(key) {
      if (this.readyOnlyIndex <= key) {
        this.touchIndex = key;
      }
    },
    focusBox(e) {
      if (this.disabled) {
        e.stopPropagation();
      } else {
        this.active = true;
      }
    },
    async outerValue({ value, ids }, cb) {
      const flag = ids !== undefined;
      // 校验tag是否超过限制，只校验新增情况
      if (this.maxTagLength && !flag && this.data.length >= this.maxTagLength) return;
      // 校验是否有重复tag
      if (!this.allowDuplicates) {
        const index = this.data.indexOf(value);
        // 如果找到有相同的数 并且 该位不是原本位置
        if (index > -1 && index !== ids) return;
      }

      const pos = flag ? ids : this.data.length;
      const deletes = flag ? 1 : 0;
      if (this.changeData(pos, deletes, value)) {
        this.touchIndex = null;
        cb();
      }
    },
    changeData(pos, deletes = 0, value) {
      if (this.beforeChange) {
        const flag = this.beforeChange(value, pos);
        if (flag !== true) return;
      }
      if (value) {
        this.data.splice(pos, deletes, value);
      } else {
        this.data.splice(pos, deletes);
      }
      this.$emit('change', value, pos, this.data);
      return true;
    },
    deleteItem(key) {
      this.changeData(key, 1);
    }
  },
  computed: {
    data: {
      get() {
        return this.value;
      },
    }
  },
  created() {
    this.readyOnlyIndex = this.readyOnly ? this.value.length : -1;
  },
  components: { Input }
};
</script>

<style scoped>
.tag-label {
  display: inline-block;
  position: relative;
  font-size: 12px;
  background: #f7f7f7;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  padding: 1px 4px;
  margin: 1px 5px 2px 0;
}
.delete {
  margin-left: 2px;
  cursor: pointer;
  color: #666;
  font-size: 13px;
}
.vTag-box {
  position: relative;
  border: 1px solid;
  padding: 2px 4px 3px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  min-height: 25px;
}
.vTag-box > div {
  display: inline-block;
}
.vTag-box:not(.disabled):hover {
  border-color: #57a3f3;
}
.vTag-box.active {
  border-color: #57a3f3;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}
.vTag-box.disabled::after {
  content: '';
  cursor: not-allowed;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
</style>
