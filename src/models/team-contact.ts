export interface ITeamContact {
  REC_NO?: string;
  ClinicalUnitId?: string;
  TeamType?: string;
  EmpNo?: string;
  EmpName?: string;
  Ext?: string;
  Mvpn?: string;
  REC_STATUS?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
}

export default class TeamContact implements ITeamContact {
  REC_NO: string;
  ClinicalUnitId: string;
  TeamType: string;
  EmpNo: string;
  EmpName: string;
  Ext: string;
  Mvpn: string;
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
    TeamType = '',
    EmpNo = '',
    EmpName = '',
    Ext = '',
    Mvpn = '',
    REC_STATUS = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = ''
  }: ITeamContact = {}) {
    this.REC_NO = REC_NO;
    this.ClinicalUnitId = ClinicalUnitId;
    this.TeamType = TeamType;
    this.EmpNo = EmpNo;
    this.EmpName = EmpName;
    this.Ext = Ext;
    this.Mvpn = Mvpn;
    this.REC_STATUS = REC_STATUS;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
  }
}

