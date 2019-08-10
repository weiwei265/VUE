module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'always'],  // 强制分号
    "indent": ["error", 4], // 4个空格
    "vue/html-indent": ["error", 4], // vue中4个空格
    "vue/prop-name-casing": "off", // prop的属性名可以为驼峰，也可以_表示
    "camelcase": 0, // 不强制_形式，或者驼峰
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'vue'
  ]
}