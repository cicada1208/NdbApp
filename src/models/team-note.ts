export interface ITeamNote {
  REC_NO?: string;
  ClinicalUnitId?: string;
  Note?: string;
  REC_STATUS?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
}

export default class TeamNote implements ITeamNote {
  REC_NO: string;
  ClinicalUnitId: string;
  Note: string;
  REC_STATUS: string;
  MD_MAN: string;
  MD_NAME: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;

  constructor({
    REC_NO = '',
    ClinicalUnitId = '',
    Note = '',
    REC_STATUS = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = ''
  }: ITeamNote = {}) {
    this.REC_NO = REC_NO;
    this.ClinicalUnitId = ClinicalUnitId;
    this.Note = Note;
    this.REC_STATUS = REC_STATUS;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
  }
}

