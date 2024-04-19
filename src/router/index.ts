import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import Msg from '@/models/msg';
import store from '@/store';
import paths from './routes';

Vue.use(VueRouter);

function setRoute({ path, name, view, ...meta }): RouteConfig {
  return {
    path,
    name: name || view,
    component: () => import(`@/views/${view}.vue`),
    meta
  };
}

const routes = paths
  .map(path => setRoute(path))
  .concat([{ path: '*', redirect: '/' }]);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    // 此功能只在支持 history.pushState 的瀏覽器中可用。
    // savedPosition: 僅當 popstate 導航（通過瀏覽器的前進/後退按鈕觸發）時才可用。
    let scrollTo: unknown = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }
    // return 期望滾動到哪個位置
    return goTo(scrollTo);
  }
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page

  // https://router.vuejs.org/zh/guide/advanced/meta.html
  // const requiresAuth = to.meta.auth;
  const requiresAuth = to.matched.some(record => record.meta.auth);

  // const user = JSON.parse(localStorage.getItem('user'));
  let loggedIn = store.state.auth.user?.loggedIn;

  // 重新載入頁面時，因 store 會清空，此時重心讀取使用者資料確認是否已登入
  if (requiresAuth && !loggedIn) {
    await store.dispatch('auth/queryAndSetUser');
    loggedIn = store.state.auth.user?.loggedIn;
  }

  if (requiresAuth && !loggedIn) {
    // alert('請先登入');
    store.dispatch(
      'alert/setMsg',
      new Msg({
        show: true,
        type: 'info',
        msg: '請先登入'
      })
    );
    next('/login');
  } else next();
});

export default router;
