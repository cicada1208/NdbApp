import ApiResult from '@/models/api-result';
import Users from '@/models/users';
import { ActionContext } from 'vuex';
import { ndbApi } from '@/services';
import router from '@/router';
import ndbRoutes from '@/services/ndb-routes';

export default {
  async login(
    { commit, dispatch }: ActionContext<unknown, unknown>,
    user: Users
  ): Promise<void> {
    const loginRst: ApiResult<Users> = await ndbApi.postPs(
      ndbRoutes.Login.PostLogin,
      {
        auth: {
          // `auth` HTTP Basic Auth
          username: user.loginId,
          password: user.password
        }
      }
    );

    if (loginRst.Succ) {
      // localStorage.setItem('user', JSON.stringify(loginRst.Data));
      // commit('setUser', loginRst.Data);
      localStorage.setItem('token', loginRst.Data.token);
      commit('setToken', loginRst.Data.token);
      await dispatch('queryAndSetUser');
      if (router.currentRoute.path != '/') router.push('/');
    }
  },

  logout({ commit }: ActionContext<unknown, unknown>): void {
    // localStorage.removeItem('user');
    localStorage.removeItem('token');
    commit('setToken', '');
    commit('setUser', {});
    if (router.currentRoute.path != '/login') router.push('/login');
  },

  async queryAndSetUser({
    commit
  }: ActionContext<unknown, unknown>): Promise<void> {
    const userRst: ApiResult<Users> = await ndbApi.getPs(
      ndbRoutes.Users.GetNdbUser
    );
    commit('setUser', userRst.Data);
  }
};
