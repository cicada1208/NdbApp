export interface IMedicalTeamNPPGY {
  Type?: string;
  No?: string;
  Name?: string;
  Mvpn?: string;
}

export default class MedicalTeamNPPGY implements IMedicalTeamNPPGY {
  Type: string;
  No: string;
  Name: string;
  Mvpn: string;

  constructor({
    Type = '',
    No = '',
    Name = '',
    Mvpn = ''
  }: IMedicalTeamNPPGY = {}) {
    this.Type = Type;
    this.No = No;
    this.Name = Name;
    this.Mvpn = Mvpn;
  }
}
