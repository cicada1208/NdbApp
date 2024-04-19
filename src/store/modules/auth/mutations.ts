import Users from '@/models/users';
import { IAuthState } from './state';

export default {
  setToken(state: IAuthState, token: string): void {
    state.token = token;
  },

  setUser(state: IAuthState, user: Users): void {
    state.user = new Users(user ?? undefined);
  }
};
