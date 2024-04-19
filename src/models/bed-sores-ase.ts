export interface IBedSoresASE {
  REC_NO?: string;
  ptEncounterID?: string;
  DOC_CODE?: string;
  PT_NO?: string;
  REC_DTM?: string;
  ASEItem_VER?: string;
  ASEItem1?: string;
  ASEItem2?: string;
  ASEItem3?: string;
  ASEItem4?: string;
  ASEItem5?: string;
  ASEItem6?: string;
  ASEItem7?: string;
  ASEItem8?: string;
  ASEItem9?: string;
  ASEItem10?: string;
  ASEItem11?: string;
  ASEItem12?: string;
  ASEItem13?: string;
  ASEItem14?: string;
  ASEItem15?: string;
  ASETotalGrade?: string;
  ASE_Others?: string;
  UP_EMR?: string;
  LastEMRRecNo?: string;
  REC_STATUS?: string;
  InstructorId?: string;
  Instructor_Name?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
}

export default class BedSoresASE implements IBedSoresASE {
  REC_NO: string;
  ptEncounterID: string;
  DOC_CODE: string;
  PT_NO: string;
  REC_DTM: string;
  ASEItem_VER: string;
  ASEItem1: string;
  ASEItem2: string;
  ASEItem3: string;
  ASEItem4: string;
  ASEItem5: string;
  ASEItem6: string;
  ASEItem7: string;
  ASEItem8: string;
  ASEItem9: string;
  ASEItem10: string;
  ASEItem11: string;
  ASEItem12: string;
  ASEItem13: string;
  ASEItem14: string;
  ASEItem15: string;
  ASETotalGrade: string;
  ASE_Others: string;
  UP_EMR: string;
  LastEMRRecNo: string;
  REC_STATUS: string;
  InstructorId: string;
  Instructor_Name: string;
  MD_MAN: string;
  MD_NAME: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;

  constructor({
    REC_NO = '',
    ptEncounterID = '',
    DOC_CODE = '',
    PT_NO = '',
    REC_DTM = '',
    ASEItem_VER = '',
    ASEItem1 = '',
    ASEItem2 = '',
    ASEItem3 = '',
    ASEItem4 = '',
    ASEItem5 = '',
    ASEItem6 = '',
    ASEItem7 = '',
    ASEItem8 = '',
    ASEItem9 = '',
    ASEItem10 = '',
    ASEItem11 = '',
    ASEItem12 = '',
    ASEItem13 = '',
    ASEItem14 = '',
    ASEItem15 = '',
    ASETotalGrade = '',
    ASE_Others = '',
    UP_EMR = '',
    LastEMRRecNo = '',
    REC_STATUS = '',
    InstructorId = '',
    Instructor_Name = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = ''
  }: IBedSoresASE = {}) {
    this.REC_NO = REC_NO;
    this.ptEncounterID = ptEncounterID;
    this.DOC_CODE = DOC_CODE;
    this.PT_NO = PT_NO;
    this.REC_DTM = REC_DTM;
    this.ASEItem_VER = ASEItem_VER;
    this.ASEItem1 = ASEItem1;
    this.ASEItem2 = ASEItem2;
    this.ASEItem3 = ASEItem3;
    this.ASEItem4 = ASEItem4;
    this.ASEItem5 = ASEItem5;
    this.ASEItem6 = ASEItem6;
    this.ASEItem7 = ASEItem7;
    this.ASEItem8 = ASEItem8;
    this.ASEItem9 = ASEItem9;
    this.ASEItem10 = ASEItem10;
    this.ASEItem11 = ASEItem11;
    this.ASEItem12 = ASEItem12;
    this.ASEItem13 = ASEItem13;
    this.ASEItem14 = ASEItem14;
    this.ASEItem15 = ASEItem15;
    this.ASETotalGrade = ASETotalGrade;
    this.ASE_Others = ASE_Others;
    this.UP_EMR = UP_EMR;
    this.LastEMRRecNo = LastEMRRecNo;
    this.REC_STATUS = REC_STATUS;
    this.InstructorId = InstructorId;
    this.Instructor_Name = Instructor_Name;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
  }
}
