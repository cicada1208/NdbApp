export interface IBedPatDpt {
  dpt?: string;
  dptName?: string;
  beds?: number;
  obeds?: number;
  ibeds?: number;
}

export default class BedPatDpt implements IBedPatDpt {
  dpt: string;
  dptName: string;
  beds: number;
  obeds: number;
  ibeds: number;

  constructor({
    dpt = '',
    dptName = '',
    beds = null,
    obeds = null,
    ibeds = null
  }: IBedPatDpt = {}) {
    this.dpt = dpt;
    this.dptName = dptName;
    this.beds = beds;
    this.obeds = obeds;
    this.ibeds = ibeds;
  }
}

