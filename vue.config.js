// webpack config 審查:
// development: vue inspect > webpack.dev.output.txt
// production: vue inspect --mode production > webpack.prd.output.txt

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

// 環境變量 BASE_URL: 與 vue.config.js 的 publicPath 相符，即應用部署的基礎路徑。
// 用法同 webpack 的 output.publicPath，但 Vue CLI 在其他地方也需用到此值，
// 所以請設定在 vue.config.js 的 publicPath。

// 環境變量 VUE_APP_VERSION: 程式版本為新增的自定義變數
process.env.VUE_APP_VERSION = pkg.version;
process.env.VUE_APP_TITLE = pkg.title;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `/${pkg.name}/` : '/',

  // configureWebpack: 調整 webpack 配置，該對象將會被 webpack-merge 合併最終的 webpack 配置。
  configureWebpack: {
    // source-map: Before you can debug your Vue components from VS Code
    // you need to update the generated webpack config to build
    // sourcemaps that contains more information for our debugger.
    devtool: 'source-map',

    resolve: {
      alias: {
        // 若出現錯誤訊息:
        // [Vue warn]: You are using the runtime-only build of Vue
        // where the template compiler is not available.
        // Either pre-compile the templates into render functions,
        // or use the compiler-included build.
        // 是因為若使用 const comp = { template: '<div>...</div>' }; 需引入帶 compiler 的 vue.esm.js。
        // compiler: 可將模板字符串編譯成為 JavaScript 渲染函數的代碼。
        // vue.runtime.esm.js: 只包含 runtime。
        // vue.esm.js: 完整版包含 compiler and runtime。
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  },

  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });
  },

  // 若於 App.vue 或各個 component 的 style 使用 @use 出現下列錯誤訊息
  // SassError: @use rules must be written before any other rules.
  // 是因 vuetify 將 shared global sass variables 導入至各個 component，
  // 導致 @use 無法置頂，可於下列將所需先行導入。
  // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use '@/styles/main'`
      },
      scss: {
        additionalData: `@use '@/styles/main';`
      }
    }
  },

  transpileDependencies: ['vuetify']
};
