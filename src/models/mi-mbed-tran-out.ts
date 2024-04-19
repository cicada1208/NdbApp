import Mi_mbed_Ext, { IMi_mbed_Ext } from './mi-mbed-ext';

export interface IMi_mbed_TranOut extends IMi_mbed_Ext {
  bed_pat_no?: string;
  bed_pat_name?: string;
  bed_pat_sex?: string;
  ipd_preout_dt?: string;
  ipd_oc_end_yn?: string;
  bed_tranout_st?: string;
  bed_note?: string;
}

export default class Mi_mbed_TranOut
  extends Mi_mbed_Ext
  implements IMi_mbed_TranOut
{
  declare bed_pat_no: string;
  bed_pat_name: string;
  bed_pat_sex: string;
  ipd_preout_dt: string;
  ipd_oc_end_yn: string;
  bed_tranout_st: string;
  bed_note: string;

  constructor({
    bed_pat_no = '',
    bed_pat_name = '',
    bed_pat_sex = '',
    ipd_preout_dt = '',
    ipd_oc_end_yn = '',
    bed_tranout_st = '',
    bed_note = '',
    ...restProps
  }: IMi_mbed_TranOut = {}) {
    super(restProps);
    this.bed_pat_no = bed_pat_no;
    this.bed_pat_name = bed_pat_name;
    this.bed_pat_sex = bed_pat_sex;
    this.ipd_preout_dt = ipd_preout_dt;
    this.ipd_oc_end_yn = ipd_oc_end_yn;
    this.bed_tranout_st = bed_tranout_st;
    this.bed_note = bed_note;
  }
}
