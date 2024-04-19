import { ActionContext } from 'vuex';
import Msg from '@/models/msg';

export default {
  async setMsg(
    { commit }: ActionContext<unknown, unknown>,
    msg: Msg
  ): Promise<void> {
    await commit('setMsg', new Msg({ timeout: 1 })); // timeout 更改後才能重置，這裡需 await 使其回到 vue 渲染，才算重置
    commit('setMsg', msg);
  }
};
