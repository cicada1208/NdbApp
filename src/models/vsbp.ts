export interface IVSBP {
  REC_NO?: string;
  SEQ_NO?: string;
  ptEncounterID?: string;
  DOC_CODE?: string;
  PT_NO?: string;
  SBP?: string;
  DBP?: string;
  BPPose?: string;
  BPRegion?: string;
  NonDoReason_BP?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
  BPType?: string;
  MAP_MBP?: string;
  REC_DTM?: string;
}

export default class VSBP implements IVSBP {
  REC_NO: string;
  SEQ_NO: string;
  ptEncounterID: string;
  DOC_CODE: string;
  PT_NO: string;
  SBP: string;
  DBP: string;
  BPPose: string;
  BPRegion: string;
  NonDoReason_BP: string;
  MD_MAN: string;
  MD_NAME: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;
  BPType: string;
  MAP_MBP: string;
  REC_DTM: string;

  constructor({
    REC_NO = '',
    SEQ_NO = '',
    ptEncounterID = '',
    DOC_CODE = '',
    PT_NO = '',
    SBP = '',
    DBP = '',
    BPPose = '',
    BPRegion = '',
    NonDoReason_BP = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = '',
    BPType = '',
    MAP_MBP = '',
    REC_DTM = ''
  }: IVSBP = {}) {
    this.REC_NO = REC_NO;
    this.SEQ_NO = SEQ_NO;
    this.ptEncounterID = ptEncounterID;
    this.DOC_CODE = DOC_CODE;
    this.PT_NO = PT_NO;
    this.SBP = SBP;
    this.DBP = DBP;
    this.BPPose = BPPose;
    this.BPRegion = BPRegion;
    this.NonDoReason_BP = NonDoReason_BP;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
    this.BPType = BPType;
    this.MAP_MBP = MAP_MBP;
    this.REC_DTM = REC_DTM;
  }
}

