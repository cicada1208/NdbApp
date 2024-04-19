import Msg from '@/models/msg';

export interface IAlertState {
  msg: Msg;
}

export default (): IAlertState => ({
  msg: new Msg()
});
