export interface IMi_mbed {
  bed_bed?: string;
  bed_grd?: string;
  bed_dpt?: string;
  bed_unit?: string;
  bed_status?: string;
  bed_i_mark?: string;
  bed_o_mark?: string;
  bed_group1?: string;
}

export default class Mi_mbed implements IMi_mbed {
  bed_bed: string;
  bed_grd: string;
  bed_dpt: string;
  bed_unit: string;
  bed_status: string;
  bed_i_mark: string;
  bed_o_mark: string;
  bed_group1: string;

  constructor({
    bed_bed = '',
    bed_grd = '',
    bed_dpt = '',
    bed_unit = '',
    bed_status = '',
    bed_i_mark = '',
    bed_o_mark = '',
    bed_group1 = ''
  }: IMi_mbed = {}) {
    this.bed_bed = bed_bed;
    this.bed_grd = bed_grd;
    this.bed_dpt = bed_dpt;
    this.bed_unit = bed_unit;
    this.bed_status = bed_status;
    this.bed_i_mark = bed_i_mark;
    this.bed_o_mark = bed_o_mark;
    this.bed_group1 = bed_group1;
  }
}
