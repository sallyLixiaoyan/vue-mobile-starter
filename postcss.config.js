import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    autoprefixer(),
    postcsspxtoviewport8plugin({
      viewportWidth: 375, // 设计稿宽度
      viewportHeight: 667, // 设计稿高度
      unitPrecision: 5, // 转换后的精度
      viewportUnit: 'vw', // 转换单位
      selectorBlackList: [], // 不转换的选择器
      minPixelValue: 1, // 小于1px不转换
      mediaQuery: false, // 不转换媒体查询
      exclude: [/node_modules/], // 排除 node_modules
    }),
  ],
}