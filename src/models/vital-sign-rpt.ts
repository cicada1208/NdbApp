import VitalSign from './vital-sign';
import VSBP from './vsbp';
import VSBT from './vsbt';
import VSPain from './vspain';

export interface IVitalSignRpt {
  VS?: Array<VitalSign>;
  BT?: Array<VSBT>;
  BP?: Array<VSBP>;
  Pain?: Array<VSPain>;
}

export default class VitalSignRpt implements IVitalSignRpt {
  VS: Array<VitalSign>;
  BT: Array<VSBT>;
  BP: Array<VSBP>;
  Pain: Array<VSPain>;

  constructor({ VS = [], BT = [], BP = [], Pain = [] }: IVitalSignRpt = {}) {
    this.VS = VS;
    this.BT = BT;
    this.BP = BP;
    this.Pain = Pain;
  }
}
