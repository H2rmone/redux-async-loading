import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: './src/index.js',
  output: {
    name: 'redux-async-loading',
    file: './dist/redux-async-loading.min.js',
    format: 'umd',
  },
  plugins: [
    babel(),
  ],
}
