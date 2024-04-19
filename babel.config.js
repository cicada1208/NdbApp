module.exports = {
  // npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
  // presets: 原使用 '@vue/cli-plugin-babel/preset'，
  // for Vue JSX 改使用 '@vue/babel-preset-jsx'。

  // npm install -D @babel/core @babel/preset-env
  // 該包確保只根據你指定的設置向應用程序中添加必要的pollyfills，
  // 而不是手動安裝和導入所需的polyfills。
  // presets: '@babel/preset-env'。
  presets: [
    '@vue/babel-preset-jsx',
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ]
  ]
};
