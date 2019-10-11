import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    name: 'vue-tag-fields',
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [
    resolve({ extensions: ['.vue'] }),
    commonjs(),
    vue(),
    babel()
  ]
}