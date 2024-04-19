export interface IBed {
  bedId?: string;
  label?: string;
  bedHisId?: string;
  clinicalUnitId?: string;
  clinicalHisId?: string;
  isAdd?: boolean;
  isActive?: boolean;
  systemUserId?: string;
  systemDt?: Date;
  ptEncounterId?: string;
}

export default class Bed implements IBed {
  bedId: string;
  label: string;
  bedHisId: string;
  clinicalUnitId: string;
  clinicalHisId: string;
  isAdd: boolean;
  isActive: boolean;
  systemUserId: string;
  systemDt: Date;
  ptEncounterId: string;

  constructor({
    bedId = '',
    label = '',
    bedHisId = '',
    clinicalUnitId = '',
    clinicalHisId = '',
    isAdd = null,
    isActive = null,
    systemUserId = '',
    systemDt = null,
    ptEncounterId = ''
  }: IBed = {}) {
    this.bedId = bedId;
    this.label = label;
    this.bedHisId = bedHisId;
    this.clinicalUnitId = clinicalUnitId;
    this.clinicalHisId = clinicalHisId;
    this.isAdd = isAdd;
    this.isActive = isActive;
    this.systemUserId = systemUserId;
    this.systemDt = systemDt;
    this.ptEncounterId = ptEncounterId;
  }
}

