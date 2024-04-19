import Mi_mbed_Ext, { IMi_mbed_Ext } from './mi-mbed-ext';

export interface IMi_mbed_TranIn extends IMi_mbed_Ext {
  bed_i_pat_name?: string;
  bed_i_pat_sex?: string;
  bed_i_pat_from?: string;
  bed_i_need_bed_cls?: string;
}

export default class Mi_mbed_TranIn
  extends Mi_mbed_Ext
  implements IMi_mbed_TranIn
{
  bed_i_pat_name: string;
  bed_i_pat_sex: string;
  bed_i_pat_from: string;
  bed_i_need_bed_cls: string;

  constructor({
    bed_i_pat_name = '',
    bed_i_pat_sex = '',
    bed_i_pat_from = '',
    bed_i_need_bed_cls = '',
    ...restProps
  }: IMi_mbed_TranIn = {}) {
    super(restProps);
    this.bed_i_pat_name = bed_i_pat_name;
    this.bed_i_pat_sex = bed_i_pat_sex;
    this.bed_i_pat_from = bed_i_pat_from;
    this.bed_i_need_bed_cls = bed_i_need_bed_cls;
  }
}
