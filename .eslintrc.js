module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parserOptions: {
    // parser: 'babel-eslint',
    ecmaVersion: 2020
    // ecmaFeatures: {
    //   jsx: true
    // }
  },
  extends: [
    // add more generic rulesets here
    'eslint:recommended',
    'plugin:vue/essential', //'plugin:vue/recommended'
    '@vue/typescript/recommended'
    // 'plugin:prettier/recommended',
  ],
  rules: {
    // override/add rules settings here
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['off', 'windows'], // 關閉 win os 對換行的 lint
    'vue/valid-v-slot': ['error', { allowModifiers: true }] // to disable errors, when slots use modifiers
    // '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
