export type TubeMagTBKind = '' | 'A' | 'B' | 'C';
export type TubeMagTreatType = '' | '1' | '2' | '3' | '4' | 'ON' | 'CLOSE';

export interface ITubeMag {
  REC_NO_TB?: string;
  ptEncounterID?: string;
  DOC_CODE?: string;
  PT_NO?: string;
  REC_DTM?: string;
  TBID?: string;
  PRSNO?: string;
  TBType?: string;
  TBMaterial?: string;
  TBSize?: string;
  TBRegion?: string;
  TBSite?: string;
  TBNumber?: string;
  FixLength?: string;
  FixUnit?: string;
  IfCharge?: string;
  TBMagMemo?: string;
  TBCareFreq?: string;
  TBCareFreqUnit?: string;
  NextChangeDTM?: string;
  TreatType?: TubeMagTreatType;
  TBTreatDTM?: string;
  TB_HISID?: string;
  REC_STATUS?: string;
  InstructorId?: string;
  Instructor_NAME?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
  TBPlace?: string;
  TBEndReason?: string;
  /** A:氣管內管Endo/Tr.、B:中心靜脈導管CVC、C:留置導尿管Foley */
  TBKind?: TubeMagTBKind;
  REC_DTM_begin?: string;
  REC_DTM_end?: string;
  TreatTypeName?: string;
}

export default class TubeMag implements ITubeMag {
  REC_NO_TB: string;
  ptEncounterID: string;
  DOC_CODE: string;
  PT_NO: string;
  REC_DTM: string;
  TBID: string;
  PRSNO: string;
  TBType: string;
  TBMaterial: string;
  TBSize: string;
  TBRegion: string;
  TBSite: string;
  TBNumber: string;
  FixLength: string;
  FixUnit: string;
  IfCharge: string;
  TBMagMemo: string;
  TBCareFreq: string;
  TBCareFreqUnit: string;
  NextChangeDTM: string;
  TreatType: TubeMagTreatType;
  TBTreatDTM: string;
  TB_HISID: string;
  REC_STATUS: string;
  InstructorId: string;
  Instructor_NAME: string;
  MD_MAN: string;
  MD_NAME: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;
  TBPlace: string;
  TBEndReason: string;
  TBKind: TubeMagTBKind;
  REC_DTM_begin: string;
  REC_DTM_end: string;
  TreatTypeName: string;

  constructor({
    REC_NO_TB = '',
    ptEncounterID = '',
    DOC_CODE = '',
    PT_NO = '',
    REC_DTM = '',
    TBID = '',
    PRSNO = '',
    TBType = '',
    TBMaterial = '',
    TBSize = '',
    TBRegion = '',
    TBSite = '',
    TBNumber = '',
    FixLength = '',
    FixUnit = '',
    IfCharge = '',
    TBMagMemo = '',
    TBCareFreq = '',
    TBCareFreqUnit = '',
    NextChangeDTM = '',
    TreatType = '',
    TBTreatDTM = '',
    TB_HISID = '',
    REC_STATUS = '',
    InstructorId = '',
    Instructor_NAME = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = '',
    TBPlace = '',
    TBEndReason = '',
    TBKind = '',
    REC_DTM_begin = '',
    REC_DTM_end = '',
    TreatTypeName = ''
  }: ITubeMag = {}) {
    this.REC_NO_TB = REC_NO_TB;
    this.ptEncounterID = ptEncounterID;
    this.DOC_CODE = DOC_CODE;
    this.PT_NO = PT_NO;
    this.REC_DTM = REC_DTM;
    this.TBID = TBID;
    this.PRSNO = PRSNO;
    this.TBType = TBType;
    this.TBMaterial = TBMaterial;
    this.TBSize = TBSize;
    this.TBRegion = TBRegion;
    this.TBSite = TBSite;
    this.TBNumber = TBNumber;
    this.FixLength = FixLength;
    this.FixUnit = FixUnit;
    this.IfCharge = IfCharge;
    this.TBMagMemo = TBMagMemo;
    this.TBCareFreq = TBCareFreq;
    this.TBCareFreqUnit = TBCareFreqUnit;
    this.NextChangeDTM = NextChangeDTM;
    this.TreatType = TreatType;
    this.TBTreatDTM = TBTreatDTM;
    this.TB_HISID = TB_HISID;
    this.REC_STATUS = REC_STATUS;
    this.InstructorId = InstructorId;
    this.Instructor_NAME = Instructor_NAME;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
    this.TBPlace = TBPlace;
    this.TBEndReason = TBEndReason;
    this.TBKind = TBKind;
    this.REC_DTM_begin = REC_DTM_begin;
    this.REC_DTM_end = REC_DTM_end;
    this.TreatTypeName = TreatTypeName;
  }
}
