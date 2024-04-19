import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import vuetify from './plugins/vuetify';
import './plugins/echarts';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV !== 'production';

// Sync Vue Router's current $route as part of Vuex store's state.
sync(store, router);

moment.locale('zh-tw');

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
