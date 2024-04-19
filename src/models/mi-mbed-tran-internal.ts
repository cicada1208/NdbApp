import Mi_mbed_Ext, { IMi_mbed_Ext } from './mi-mbed-ext';

export interface IMi_mbed_TranInternal extends IMi_mbed_Ext {
  bed_note?: string;
}

export default class Mi_mbed_TranInternal
  extends Mi_mbed_Ext
  implements IMi_mbed_TranInternal
{
  bed_note: string;

  constructor({ bed_note = '', ...restProps }: IMi_mbed_TranInternal = {}) {
    super(restProps);
    this.bed_note = bed_note;
  }
}
