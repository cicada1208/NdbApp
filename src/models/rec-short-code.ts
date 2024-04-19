export interface IRecShortCode {
  RECMODEL?: string;
  GROUPCODE?: string;
  SHORTCODE?: string;
  CODEVER?: string;
  FULLNAME?: string;
  CONTEXT01?: string;
  CONTEXT02?: string;
  CONTEXT03?: string;
  CONTEXT04?: string;
  CONTEXT05?: string;
  GROUPSEQ?: string;
  CODESEQ?: string;
  isActive?: string;
  UUserNO?: string;
  UDateTime?: string;
}

export default class RecShortCode implements IRecShortCode {
  RECMODEL: string;
  GROUPCODE: string;
  SHORTCODE: string;
  CODEVER: string;
  FULLNAME: string;
  CONTEXT01: string;
  CONTEXT02: string;
  CONTEXT03: string;
  CONTEXT04: string;
  CONTEXT05: string;
  GROUPSEQ: string;
  CODESEQ: string;
  isActive: string;
  UUserNO: string;
  UDateTime: string;

  constructor({
    RECMODEL = '',
    GROUPCODE = '',
    SHORTCODE = '',
    CODEVER = '',
    FULLNAME = '',
    CONTEXT01 = '',
    CONTEXT02 = '',
    CONTEXT03 = '',
    CONTEXT04 = '',
    CONTEXT05 = '',
    GROUPSEQ = '',
    CODESEQ = '',
    isActive = '',
    UUserNO = '',
    UDateTime = ''
  }: IRecShortCode = {}) {
    this.RECMODEL = RECMODEL;
    this.GROUPCODE = GROUPCODE;
    this.SHORTCODE = SHORTCODE;
    this.CODEVER = CODEVER;
    this.FULLNAME = FULLNAME;
    this.CONTEXT01 = CONTEXT01;
    this.CONTEXT02 = CONTEXT02;
    this.CONTEXT03 = CONTEXT03;
    this.CONTEXT04 = CONTEXT04;
    this.CONTEXT05 = CONTEXT05;
    this.GROUPSEQ = GROUPSEQ;
    this.CODESEQ = CODESEQ;
    this.isActive = isActive;
    this.UUserNO = UUserNO;
    this.UDateTime = UDateTime;
  }
}

