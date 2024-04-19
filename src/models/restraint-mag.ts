export interface IRestraintMag {
  REC_NO_RT?: string;
  ptEncounterID?: string;
  DOC_CODE?: string;
  PT_NO?: string;
  REC_DTM?: string;
  REC_BedNo?: string;
  RTReason?: string;
  RTRegion?: string;
  RTTool?: string;
  RTMedicine?: string;
  RecordNS?: string;
  RTEndDTM?: string;
  RTComplication?: string;
  CloseNS?: string;
  CloseBedNo?: string;
  RT_HISID?: string;
  REC_STATUS?: string;
  InstructorId?: string;
  Instructor_NAME?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
  REC_DTM_begin?: string;
  REC_DTM_end?: string;
}

export default class RestraintMag implements IRestraintMag {
  REC_NO_RT: string;
  ptEncounterID: string;
  DOC_CODE: string;
  PT_NO: string;
  REC_DTM: string;
  REC_BedNo: string;
  RTReason: string;
  RTRegion: string;
  RTTool: string;
  RTMedicine: string;
  RecordNS: string;
  RTEndDTM: string;
  RTComplication: string;
  CloseNS: string;
  CloseBedNo: string;
  RT_HISID: string;
  REC_STATUS: string;
  InstructorId: string;
  Instructor_NAME: string;
  MD_MAN: string;
  MD_NAME: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;
  REC_DTM_begin: string;
  REC_DTM_end: string;

  constructor({
    REC_NO_RT = '',
    ptEncounterID = '',
    DOC_CODE = '',
    PT_NO = '',
    REC_DTM = '',
    REC_BedNo = '',
    RTReason = '',
    RTRegion = '',
    RTTool = '',
    RTMedicine = '',
    RecordNS = '',
    RTEndDTM = '',
    RTComplication = '',
    CloseNS = '',
    CloseBedNo = '',
    RT_HISID = '',
    REC_STATUS = '',
    InstructorId = '',
    Instructor_NAME = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = '',
    REC_DTM_begin = '',
    REC_DTM_end = ''
  }: IRestraintMag = {}) {
    this.REC_NO_RT = REC_NO_RT;
    this.ptEncounterID = ptEncounterID;
    this.DOC_CODE = DOC_CODE;
    this.PT_NO = PT_NO;
    this.REC_DTM = REC_DTM;
    this.REC_BedNo = REC_BedNo;
    this.RTReason = RTReason;
    this.RTRegion = RTRegion;
    this.RTTool = RTTool;
    this.RTMedicine = RTMedicine;
    this.RecordNS = RecordNS;
    this.RTEndDTM = RTEndDTM;
    this.RTComplication = RTComplication;
    this.CloseNS = CloseNS;
    this.CloseBedNo = CloseBedNo;
    this.RT_HISID = RT_HISID;
    this.REC_STATUS = REC_STATUS;
    this.InstructorId = InstructorId;
    this.Instructor_NAME = Instructor_NAME;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
    this.REC_DTM_begin = REC_DTM_begin;
    this.REC_DTM_end = REC_DTM_end;
  }
}
