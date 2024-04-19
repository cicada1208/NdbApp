import Mi_mbed, { IMi_mbed } from './mi-mbed';

export interface IMi_mbed_Ext extends IMi_mbed {
  bed_pat_no?: string;
  bed_i_bed?: string;
  bed_i_ipd_no?: string;
  bed_i_pat_no?: string;
  bed_o_bed?: string;
  bed_o_pat_no?: string;
  bed_reason?: string;
  bed_reason_name?: string;
  bed_reason_doc?: string;
}

export default class Mi_mbed_Ext extends Mi_mbed implements IMi_mbed_Ext {
  bed_pat_no: string;
  bed_i_bed: string;
  bed_i_ipd_no: string;
  bed_i_pat_no: string;
  bed_o_bed: string;
  bed_o_pat_no: string;
  bed_reason: string;
  bed_reason_name: string;
  bed_reason_doc: string;

  constructor({
    bed_pat_no = '',
    bed_i_bed = '',
    bed_i_ipd_no = '',
    bed_i_pat_no = '',
    bed_o_bed = '',
    bed_o_pat_no = '',
    bed_reason = '',
    bed_reason_name = '',
    bed_reason_doc = '',
    ...restProps
  }: IMi_mbed_Ext = {}) {
    super(restProps);
    this.bed_pat_no = bed_pat_no;
    this.bed_i_bed = bed_i_bed;
    this.bed_i_ipd_no = bed_i_ipd_no;
    this.bed_i_pat_no = bed_i_pat_no;
    this.bed_o_bed = bed_o_bed;
    this.bed_o_pat_no = bed_o_pat_no;
    this.bed_reason = bed_reason;
    this.bed_reason_name = bed_reason_name;
    this.bed_reason_doc = bed_reason_doc;
  }
}
