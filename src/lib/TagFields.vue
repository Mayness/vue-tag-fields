<template>
  <div :class="[ 'vTag-box', active ? 'active' : '' ]" @click="focusBox">
    <div @click="touchItem(key)" v-for="(item, key) in data" :key="key">
      <div v-if="touchIndex !== key" class="tag-label">
        {{item}}
        <span v-if="readyOnlyIndex <= key" class="delete" @click.stop="deleteItem(key)">×</span>
      </div>
      <Input v-else v-model="active" :inputInitValue="item" :ids="key" @outerValue="outerValue" />
    </div>
    <Input v-if="touchIndex === null" v-model="active" @outerValue="outerValue" :placeholder="data.length ? '' : placeholder"/>
  </div>
</template>

<script>
import Input from './Input';
export default {
  props: {
    value: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(item => typeof item === 'string');
      }
    },
    placeholder: {
      type: String,
      required: false,
    },
    'allow-duplicates': {
      type: Boolean,
      required: false,
      default: true,
    },
    'ready-only': {
      type: Boolean,
      required: false,
      default: false,
    },
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
    focusBox() {
      this.active = true;
    },
    outerValue({ value, ids }, cb) {
      if (!this.allowDuplicates) {
        const index = this.data.indexOf(value);
        // 如果找到有相同的数 并且 该位不是原本位置
        if (index > -1 && index !== ids) return;
      };
      if (ids !== undefined) {
        this.data.splice(ids, 1, value);
      } else {
        this.data.push(value);
      }
      this.touchIndex = null;
      cb();
    },
    deleteItem(key) {
      this.data.splice(key, 1);
    },
  },
  computed: {
    data: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  created() {
    this.readyOnlyIndex = this.readyOnly ? this.value.length : -1;
  },
  components: { Input },
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
  width: 150px;
  border: 1px solid;
  padding: 2px 4px 3px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  min-height: 25px;
}
.vTag-box > div {
  display: inline-block;
}
.vTag-box:hover {
  border-color: #57a3f3;
}
.vTag-box.active {
  border-color: #57a3f3;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}
</style>
