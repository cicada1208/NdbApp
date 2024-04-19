export interface IBedInfo {
  clinicalUnitId?: string;
  all?: number;
  empty?: number;
  inbed?: number;
  add?: number;
}

export default class BedInfo implements IBedInfo {
  clinicalUnitId: string;
  all: number;
  empty: number;
  inbed: number;
  add: number;

  constructor({
    clinicalUnitId = '',
    all = null,
    empty = null,
    inbed = null,
    add = null
  }: IBedInfo = {}) {
    this.clinicalUnitId = clinicalUnitId;
    this.all = all;
    this.empty = empty;
    this.inbed = inbed;
    this.add = add;
  }
}
