export interface IVSPain {
  REC_NO?: string;
  SEQ_NO?: string;
  ptEncounterID?: string;
  DOC_CODE?: string;
  PT_NO?: string;
  PainRegion?: string;
  PainType?: string;
  PainScale?: string;
  NonDoReason_Pain?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
  EvaluationForm?: string;
  REC_DTM?: string;
  PainVal?: string;
}

export default class VSPain implements IVSPain {
  REC_NO: string;
  SEQ_NO: string;
  ptEncounterID: string;
  DOC_CODE: string;
  PT_NO: string;
  PainRegion: string;
  PainType: string;
  PainScale: string;
  NonDoReason_Pain: string;
  MD_MAN: string;
  MD_NAME: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;
  EvaluationForm: string;
  REC_DTM: string;
  PainVal: string;

  constructor({
    REC_NO = '',
    SEQ_NO = '',
    ptEncounterID = '',
    DOC_CODE = '',
    PT_NO = '',
    PainRegion = '',
    PainType = '',
    PainScale = '',
    NonDoReason_Pain = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = '',
    EvaluationForm = '',
    REC_DTM = '',
    PainVal = ''
  }: IVSPain = {}) {
    this.REC_NO = REC_NO;
    this.SEQ_NO = SEQ_NO;
    this.ptEncounterID = ptEncounterID;
    this.DOC_CODE = DOC_CODE;
    this.PT_NO = PT_NO;
    this.PainRegion = PainRegion;
    this.PainType = PainType;
    this.PainScale = PainScale;
    this.NonDoReason_Pain = NonDoReason_Pain;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
    this.EvaluationForm = EvaluationForm;
    this.REC_DTM = REC_DTM;
    this.PainVal = PainVal;
  }
}

