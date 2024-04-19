import Msg from '@/models/msg';
import { IAlertState } from './state';

export default {
  setMsg(state: IAlertState, msg: Msg): void {
    state.msg = new Msg(msg);
  }
};
