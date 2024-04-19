import MedicalTeamNPPGY from './medical-team-nppgy';

export interface IMedicalTeam {
  PatDept?: string;
  PatDeptName?: string;
  VsNo?: string;
  VsName?: string;
  Mvpn?: string;
  NPPGY?: Array<MedicalTeamNPPGY>;
}

export default class MedicalTeam implements IMedicalTeam {
  PatDept: string;
  PatDeptName: string;
  VsNo: string;
  VsName: string;
  Mvpn: string;
  NPPGY: Array<MedicalTeamNPPGY>;

  constructor({
    PatDept = '',
    PatDeptName = '',
    VsNo = '',
    VsName = '',
    Mvpn = '',
    NPPGY = []
  }: IMedicalTeam = {}) {
    this.PatDept = PatDept;
    this.PatDeptName = PatDeptName;
    this.VsNo = VsNo;
    this.VsName = VsName;
    this.Mvpn = Mvpn;
    this.NPPGY = NPPGY;
  }
}
