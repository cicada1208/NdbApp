import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import { IAlertState } from './modules/alert/state';
import { IAuthState } from './modules/auth/state';
import { IClinicalState } from './modules/clinical/state';

Vue.use(Vuex);

export interface IState {
  auth: IAuthState;
  alert: IAlertState;
  clinical: IClinicalState;
}

export default new Vuex.Store<IState>({
  modules,
  // strict: true，不是由 mutation 引起的狀態變更，將拋出錯誤，開發時檢測即可，避免影響性能
  strict: process.env.NODE_ENV !== 'production'
});
