export interface IUserInfo {
  empid?: string;
  name?: string;
  depPos_Name?: string;
  inadate?: string;
  ext?: string;
  mvpn?: string;
  bbc?: string;
}

export default class UserInfo implements IUserInfo {
  empid: string;
  name: string;
  depPos_Name: string;
  inadate: string;
  ext: string;
  mvpn: string;
  bbc: string;

  constructor({
    empid = '',
    name = '',
    depPos_Name = '',
    inadate = '',
    ext = '',
    mvpn = '',
    bbc = ''
  }: IUserInfo = {}) {
    this.empid = empid;
    this.name = name;
    this.depPos_Name = depPos_Name;
    this.inadate = inadate;
    this.ext = ext;
    this.mvpn = mvpn;
    this.bbc = bbc;
  }
}

