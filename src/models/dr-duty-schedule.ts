export interface IDrDutySchedule {
  SchCode?: string;
  SchName?: string;
  DrType?: string;
  DrEmpNo?: string;
  DrName?: string;
  Mvpn?: string;
}

export default class DrDutySchedule implements IDrDutySchedule {
  SchCode: string;
  SchName: string;
  DrType: string;
  DrEmpNo: string;
  DrName: string;
  Mvpn: string;

  constructor({
    SchCode = '',
    SchName = '',
    DrType = '',
    DrEmpNo = '',
    DrName = '',
    Mvpn = ''
  }: IDrDutySchedule = {}) {
    this.SchCode = SchCode;
    this.SchName = SchName;
    this.DrType = DrType;
    this.DrEmpNo = DrEmpNo;
    this.DrName = DrName;
    this.Mvpn = Mvpn;
  }
}

