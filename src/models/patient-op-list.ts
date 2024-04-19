export interface IPatientOPList {
  /** 病歷號 */
  PATNO?: number;
  /** 手術日期 yyyMMdd */
  iOPdate?: number;
  /** 主刀醫師姓名 */
  DrName?: string;
  /** 主刀醫師科別 */
  DrSubject?: string;
  /** 部位標記 */
  OperationSite?: string;
  /** 術式 */
  Operation?: string;
  /** 麻醉方式 */
  Anesthesia?: string;
  /** 手術地點 */
  OPStation?: string;
  /** 狀態代碼 */
  STATUSID?: string;
  /** 狀態 / 動態 */
  STATUS?: string;
  /** 恢復室時間 HH:mm */
  PARTIME?: string;
  /** 手術預估時間 min */
  ExpectedTime?: number;
  /** 排定日期 yyyy/MM/dd */
  OPStartDate?: string;
  /** 排定時間 HH:mm、time follow */
  OPStartTime?: string;
  /** 開始日期時間 yyyy/MM/dd HH:mm:ss */
  StartTime?: string;
  /** 手術預計完成時間 HH:mm */
  OPDoneTime?: string;
  /** 手術進度 */
  OPPercent?: number;
  /** 上台刀：手術預估時間 min */
  PreExpectedTime?: number;
  /** 上台刀：開始日期時間 yyyy/MM/dd HH:mm:ss */
  PreStartTime?: string;
  /** 上台刀：手術預計完成時間 HH:mm */
  PreOPDoneTime?: string;
  /** 上台刀：手術進度 */
  PreOPPercent?: number;
  /** 急診級數 */
  ERClass?: string;
  /** 手術房間 */
  OPRoom?: string;
  /** 手術單號 */
  NOTNO?: string;
  /** 麻諮門診是否完成 */
  IsPAAComplete?: boolean;
}

export default class PatientOPList implements IPatientOPList {
  PATNO: number;
  iOPdate: number;
  DrName: string;
  DrSubject: string;
  OperationSite: string;
  Operation: string;
  Anesthesia: string;
  OPStation: string;
  STATUSID: string;
  STATUS: string;
  PARTIME: string;
  ExpectedTime: number;
  OPStartDate: string;
  OPStartTime: string;
  StartTime: string;
  OPDoneTime: string;
  OPPercent: number;
  PreExpectedTime: number;
  PreStartTime: string;
  PreOPDoneTime: string;
  PreOPPercent: number;
  ERClass: string;
  OPRoom: string;
  NOTNO: string;
  IsPAAComplete: boolean;

  constructor({
    PATNO = null,
    iOPdate = null,
    DrName = '',
    DrSubject = '',
    OperationSite = '',
    Operation = '',
    Anesthesia = '',
    OPStation = '',
    STATUSID = '',
    STATUS = '',
    PARTIME = '',
    ExpectedTime = null,
    OPStartDate = '',
    OPStartTime = '',
    StartTime = '',
    OPDoneTime = '',
    OPPercent = 0,
    PreExpectedTime = null,
    PreStartTime = '',
    PreOPDoneTime = '',
    PreOPPercent = 0,
    ERClass = '',
    OPRoom = '',
    NOTNO = '',
    IsPAAComplete = null
  }: IPatientOPList = {}) {
    this.PATNO = PATNO;
    this.iOPdate = iOPdate;
    this.DrName = DrName;
    this.DrSubject = DrSubject;
    this.OperationSite = OperationSite;
    this.Operation = Operation;
    this.Anesthesia = Anesthesia;
    this.OPStation = OPStation;
    this.STATUSID = STATUSID;
    this.STATUS = STATUS;
    this.PARTIME = PARTIME;
    this.ExpectedTime = ExpectedTime;
    this.OPStartDate = OPStartDate;
    this.OPStartTime = OPStartTime;
    this.StartTime = StartTime;
    this.OPDoneTime = OPDoneTime;
    this.OPPercent = OPPercent;
    this.PreExpectedTime = PreExpectedTime;
    this.PreStartTime = PreStartTime;
    this.PreOPDoneTime = PreOPDoneTime;
    this.PreOPPercent = PreOPPercent;
    this.ERClass = ERClass;
    this.OPRoom = OPRoom;
    this.NOTNO = NOTNO;
    this.IsPAAComplete = IsPAAComplete;
  }
}
