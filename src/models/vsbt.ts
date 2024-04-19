export interface IVSBT {
  REC_NO?: string;
  SEQ_NO?: string;
  ptEncounterID?: string;
  DOC_CODE?: string;
  PT_NO?: string;
  BTNum?: string;
  BTUnit?: string;
  BTType?: string;
  FeverMed?: string;
  NonDoReason_BT?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
  REC_DTM?: string;
}

export default class VSBT implements IVSBT {
  REC_NO: string;
  SEQ_NO: string;
  ptEncounterID: string;
  DOC_CODE: string;
  PT_NO: string;
  BTNum: string;
  BTUnit: string;
  BTType: string;
  FeverMed: string;
  NonDoReason_BT: string;
  MD_MAN: string;
  MD_NAME: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;
  REC_DTM: string;

  constructor({
    REC_NO = '',
    SEQ_NO = '',
    ptEncounterID = '',
    DOC_CODE = '',
    PT_NO = '',
    BTNum = '',
    BTUnit = '',
    BTType = '',
    FeverMed = '',
    NonDoReason_BT = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = '',
    REC_DTM = ''
  }: IVSBT = {}) {
    this.REC_NO = REC_NO;
    this.SEQ_NO = SEQ_NO;
    this.ptEncounterID = ptEncounterID;
    this.DOC_CODE = DOC_CODE;
    this.PT_NO = PT_NO;
    this.BTNum = BTNum;
    this.BTUnit = BTUnit;
    this.BTType = BTType;
    this.FeverMed = FeverMed;
    this.NonDoReason_BT = NonDoReason_BT;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
    this.REC_DTM = REC_DTM;
  }
}

