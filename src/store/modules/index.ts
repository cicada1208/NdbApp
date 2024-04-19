const requireModule = require.context('.', true, /\.ts$/);
const modules = {};

requireModule.keys().forEach(filePath => {
  if (filePath === './index.ts') return;

  const [moduleName, imported] = filePath
    .replace(/(\.\/|\.ts)/g, '') // Replace ./ and .ts
    .split('/');

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true
    };
  }

  modules[moduleName][imported] = requireModule(filePath).default;
});

export default modules;
