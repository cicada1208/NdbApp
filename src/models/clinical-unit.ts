export interface IClinicalUnit {
  clinicalUnitId?: string;
  label?: string;
  longLabel?: string;
  clinicalHisId?: string;
  cuTypeId?: string;
  isActive?: boolean;
  systemUserId?: string;
  systemDt?: Date;
}

export default class ClinicalUnit implements IClinicalUnit {
  clinicalUnitId: string;
  label: string;
  longLabel: string;
  clinicalHisId: string;
  cuTypeId: string;
  isActive: boolean;
  systemUserId: string;
  systemDt: Date;

  constructor({
    clinicalUnitId = '',
    label = '',
    longLabel = '',
    clinicalHisId = '',
    cuTypeId = '',
    isActive = null,
    systemUserId = '',
    systemDt = null
  }: IClinicalUnit = {}) {
    this.clinicalUnitId = clinicalUnitId;
    this.label = label;
    this.longLabel = longLabel;
    this.clinicalHisId = clinicalHisId;
    this.cuTypeId = cuTypeId;
    this.isActive = isActive;
    this.systemUserId = systemUserId;
    this.systemDt = systemDt;
  }
}

