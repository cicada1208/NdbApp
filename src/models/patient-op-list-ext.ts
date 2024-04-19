import PatientOPList, { IPatientOPList } from './patient-op-list';

export interface IPatientOPListExt extends IPatientOPList {
  ptEncounterId?: string;
  BedNo?: string;
  PatName?: string;
  /** 手術同意書：
   * Y or Empty
   */
  CHK_Consent1?: string;
  /** 自費同意書：
   * Y or Empty
   */
  CHK_Consent2?: string;
  /** 麻醉前評估：
   * 1-麻醉前評估與麻醉計畫單;2-無此需要
   */
  AnesthesiaAse?: string;
  /** 手術部位標記(NIS) */
  OPSiteMark?: string;
  /** 傳送工具 */
  TransferTool?: string;
  /** 傳送地點 */
  TransferSite?: string;
  /** 傳送派工時間 yyyy-MM-dd HH:mm:ss */
  TransferDispatchTime?: string;
}

export default class PatientOPListExt
  extends PatientOPList
  implements IPatientOPListExt
{
  ptEncounterId: string;
  BedNo: string;
  PatName: string;
  CHK_Consent1: string;
  CHK_Consent2: string;
  AnesthesiaAse: string;
  OPSiteMark: string;
  TransferTool: string;
  TransferSite: string;
  TransferDispatchTime: string;

  constructor({
    ptEncounterId = '',
    BedNo = '',
    PatName = '',
    CHK_Consent1 = '',
    CHK_Consent2 = '',
    AnesthesiaAse = '',
    OPSiteMark = '',
    TransferTool = '',
    TransferSite = '',
    TransferDispatchTime = '',
    ...restProps
  }: IPatientOPListExt = {}) {
    super(restProps);
    this.ptEncounterId = ptEncounterId;
    this.BedNo = BedNo;
    this.PatName = PatName;
    this.CHK_Consent1 = CHK_Consent1;
    this.CHK_Consent2 = CHK_Consent2;
    this.AnesthesiaAse = AnesthesiaAse;
    this.OPSiteMark = OPSiteMark;
    this.TransferTool = TransferTool;
    this.TransferSite = TransferSite;
    this.TransferDispatchTime = TransferDispatchTime;
  }
}
