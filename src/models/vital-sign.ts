export interface IVitalSign {
  REC_NO?: string;
  ptEncounterID?: string;
  DOC_CODE?: string;
  PT_NO?: string;
  REC_DTM?: string;
  HBFreq?: string;
  HBType?: string;
  NonDoReason_HB?: string;
  BTHFreq?: string;
  NonDoReason_BTH?: string;
  SPO2Num?: string;
  NonDoReason_SPO2?: string;
  OTType?: string;
  OTNum?: string;
  OTUnit?: string;
  VType?: string;
  VMode?: string;
  VTV?: string;
  VRR?: string;
  Voxygon?: string;
  VPEEP?: string;
  MAP?: string;
  ABP?: string;
  CVP?: string;
  CVPUnit?: string;
  ABP_MAP?: string;
  ICP?: string;
  CPP?: string;
  NonDoReason_CVP?: string;
  NoPain?: string;
  MovNum1?: string;
  MovAmount1?: string;
  MovType1?: string;
  MovColor1?: string;
  MovShape1?: string;
  MovPipeLine1?: string;
  NonDoReason_Mov1?: string;
  MovNum2?: string;
  MovAmount2?: string;
  MovType2?: string;
  MovColor2?: string;
  MovShape2?: string;
  MovPipeLine2?: string;
  NonDoReason_Mov2?: string;
  SpecialTr?: string;
  ComaScaleE?: string;
  ComaScaleV?: string;
  ComaScaleM?: string;
  ComaTotalGrade?: string;
  ArmMP_L?: string;
  ForeArmMP_L?: string;
  UpperArmMP_L?: string;
  LegMP_L?: string;
  ThighMP_L?: string;
  LowerLegMP_L?: string;
  ArmMP_R?: string;
  ForeArmMP_R?: string;
  UpperArmMP_R?: string;
  LegMP_R?: string;
  ThighMP_R?: string;
  LowerLegMP_R?: string;
  EPReaction_R?: string;
  EPSize_R?: string;
  EPReaction_L?: string;
  EPSize_L?: string;
  Height?: string;
  NonDoReason_Height?: string;
  Weight?: string;
  WeightUnit?: string;
  WeightSPMark?: string;
  NonDoReason_Weight?: string;
  BMI?: string;
  HeadPRFR?: string;
  NeckPRFR?: string;
  ChestPRFR?: string;
  BellyPRFR?: string;
  WaistPRFR?: string;
  ButtocksPRFR?: string;
  ArmPRFR_L?: string;
  ForeArmPRFR_L?: string;
  UpperArmPRFR_L?: string;
  ArmPRFR_R?: string;
  ForeArmPRFR_R?: string;
  UpperArmPRFR_R?: string;
  LegPRFR_L?: string;
  ThighPRFR_L?: string;
  LowerLegPRFR_L?: string;
  LegPRFR_R?: string;
  ThighPRFR_R?: string;
  LowerLegPRFR_R?: string;
  AnklePRFR_L?: string;
  AnklePRFR_R?: string;
  NonDoReason_PRFR?: string;
  PtPose?: string;
  VSMemo?: string;
  UP_EMR?: string;
  EMRRecNo?: string;
  REC_STATUS?: string;
  InstructorId?: string;
  InstructorName?: string;
  MD_MAN?: string;
  MD_NAME?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
  ScVO2?: string;
  PCWP?: string;
  CO?: string;
  CI?: string;
  SVR?: string;
  PVR?: string;
  IAP?: string;
  FBReaction_R?: string;
  FBReaction_L?: string;
  ANReaction_R?: string;
  ANReaction_L?: string;
  OtherReaction_R?: string;
  OtherReaction_L?: string;
  OtherReaction_LName?: string;
  OtherReaction_RName?: string;
  EMR_YN?: string;
  PAP?: string;
  RASS?: string;
  NonDoReason_GCS?: string;
  CAM_ICU_SPT?: string;
  CAM_ICU_ATN?: string;
  CAM_ICU_CON?: string;
  CAM_ICU_THK?: string;
  CAM_ICU_RST?: string;
  ETCO2?: string;
  SPO2Side?: string;
  ScaleVCode?: string;
  REC_DTM_begin?: string;
  REC_DTM_end?: string;
  BT?: string;
  NBPMBP?: string;
  ABPMAP?: string;
  CVPressure?: string;
  Pain?: string;
  Med?: string;
  Pulse?: string;
  HR?: string;
  RR?: string;
  SPO2?: string;
  OT?: string;
  Ventilator?: string;
  OTVT?: string;
  GCS?: string;
  MP?: string;
  EPReaction?: string;
  MovToday?: string;
  MovYesterday?: string;
  Ht?: string;
  Wt?: string;
  PRFR?: string;
}

export default class VitalSign implements IVitalSign {
  REC_NO: string;
  ptEncounterID: string;
  DOC_CODE: string;
  PT_NO: string;
  REC_DTM: string;
  HBFreq: string;
  HBType: string;
  NonDoReason_HB: string;
  BTHFreq: string;
  NonDoReason_BTH: string;
  SPO2Num: string;
  NonDoReason_SPO2: string;
  OTType: string;
  OTNum: string;
  OTUnit: string;
  VType: string;
  VMode: string;
  VTV: string;
  VRR: string;
  Voxygon: string;
  VPEEP: string;
  MAP: string;
  ABP: string;
  CVP: string;
  CVPUnit: string;
  ABP_MAP: string;
  ICP: string;
  CPP: string;
  NonDoReason_CVP: string;
  NoPain: string;
  MovNum1: string;
  MovAmount1: string;
  MovType1: string;
  MovColor1: string;
  MovShape1: string;
  MovPipeLine1: string;
  NonDoReason_Mov1: string;
  MovNum2: string;
  MovAmount2: string;
  MovType2: string;
  MovColor2: string;
  MovShape2: string;
  MovPipeLine2: string;
  NonDoReason_Mov2: string;
  SpecialTr: string;
  ComaScaleE: string;
  ComaScaleV: string;
  ComaScaleM: string;
  ComaTotalGrade: string;
  ArmMP_L: string;
  ForeArmMP_L: string;
  UpperArmMP_L: string;
  LegMP_L: string;
  ThighMP_L: string;
  LowerLegMP_L: string;
  ArmMP_R: string;
  ForeArmMP_R: string;
  UpperArmMP_R: string;
  LegMP_R: string;
  ThighMP_R: string;
  LowerLegMP_R: string;
  EPReaction_R: string;
  EPSize_R: string;
  EPReaction_L: string;
  EPSize_L: string;
  Height: string;
  NonDoReason_Height: string;
  Weight: string;
  WeightUnit: string;
  WeightSPMark: string;
  NonDoReason_Weight: string;
  BMI: string;
  HeadPRFR: string;
  NeckPRFR: string;
  ChestPRFR: string;
  BellyPRFR: string;
  WaistPRFR: string;
  ButtocksPRFR: string;
  ArmPRFR_L: string;
  ForeArmPRFR_L: string;
  UpperArmPRFR_L: string;
  ArmPRFR_R: string;
  ForeArmPRFR_R: string;
  UpperArmPRFR_R: string;
  LegPRFR_L: string;
  ThighPRFR_L: string;
  LowerLegPRFR_L: string;
  LegPRFR_R: string;
  ThighPRFR_R: string;
  LowerLegPRFR_R: string;
  AnklePRFR_L: string;
  AnklePRFR_R: string;
  NonDoReason_PRFR: string;
  PtPose: string;
  VSMemo: string;
  UP_EMR: string;
  EMRRecNo: string;
  REC_STATUS: string;
  InstructorId: string;
  InstructorName: string;
  MD_MAN: string;
  MD_NAME: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;
  ScVO2: string;
  PCWP: string;
  CO: string;
  CI: string;
  SVR: string;
  PVR: string;
  IAP: string;
  FBReaction_R: string;
  FBReaction_L: string;
  ANReaction_R: string;
  ANReaction_L: string;
  OtherReaction_R: string;
  OtherReaction_L: string;
  OtherReaction_LName: string;
  OtherReaction_RName: string;
  EMR_YN: string;
  PAP: string;
  RASS: string;
  NonDoReason_GCS: string;
  CAM_ICU_SPT: string;
  CAM_ICU_ATN: string;
  CAM_ICU_CON: string;
  CAM_ICU_THK: string;
  CAM_ICU_RST: string;
  ETCO2: string;
  SPO2Side: string;
  ScaleVCode: string;
  REC_DTM_begin: string;
  REC_DTM_end: string;
  BT: string;
  NBPMBP: string;
  ABPMAP: string;
  CVPressure: string;
  Pain: string;
  Med: string;
  Pulse: string;
  HR: string;
  RR: string;
  SPO2: string;
  OT: string;
  Ventilator: string;
  OTVT: string;
  GCS: string;
  MP: string;
  EPReaction: string;
  MovToday: string;
  MovYesterday: string;
  Ht: string;
  Wt: string;
  PRFR: string;

  constructor({
    REC_NO = '',
    ptEncounterID = '',
    DOC_CODE = '',
    PT_NO = '',
    REC_DTM = '',
    HBFreq = '',
    HBType = '',
    NonDoReason_HB = '',
    BTHFreq = '',
    NonDoReason_BTH = '',
    SPO2Num = '',
    NonDoReason_SPO2 = '',
    OTType = '',
    OTNum = '',
    OTUnit = '',
    VType = '',
    VMode = '',
    VTV = '',
    VRR = '',
    Voxygon = '',
    VPEEP = '',
    MAP = '',
    ABP = '',
    CVP = '',
    CVPUnit = '',
    ABP_MAP = '',
    ICP = '',
    CPP = '',
    NonDoReason_CVP = '',
    NoPain = '',
    MovNum1 = '',
    MovAmount1 = '',
    MovType1 = '',
    MovColor1 = '',
    MovShape1 = '',
    MovPipeLine1 = '',
    NonDoReason_Mov1 = '',
    MovNum2 = '',
    MovAmount2 = '',
    MovType2 = '',
    MovColor2 = '',
    MovShape2 = '',
    MovPipeLine2 = '',
    NonDoReason_Mov2 = '',
    SpecialTr = '',
    ComaScaleE = '',
    ComaScaleV = '',
    ComaScaleM = '',
    ComaTotalGrade = '',
    ArmMP_L = '',
    ForeArmMP_L = '',
    UpperArmMP_L = '',
    LegMP_L = '',
    ThighMP_L = '',
    LowerLegMP_L = '',
    ArmMP_R = '',
    ForeArmMP_R = '',
    UpperArmMP_R = '',
    LegMP_R = '',
    ThighMP_R = '',
    LowerLegMP_R = '',
    EPReaction_R = '',
    EPSize_R = '',
    EPReaction_L = '',
    EPSize_L = '',
    Height = '',
    NonDoReason_Height = '',
    Weight = '',
    WeightUnit = '',
    WeightSPMark = '',
    NonDoReason_Weight = '',
    BMI = '',
    HeadPRFR = '',
    NeckPRFR = '',
    ChestPRFR = '',
    BellyPRFR = '',
    WaistPRFR = '',
    ButtocksPRFR = '',
    ArmPRFR_L = '',
    ForeArmPRFR_L = '',
    UpperArmPRFR_L = '',
    ArmPRFR_R = '',
    ForeArmPRFR_R = '',
    UpperArmPRFR_R = '',
    LegPRFR_L = '',
    ThighPRFR_L = '',
    LowerLegPRFR_L = '',
    LegPRFR_R = '',
    ThighPRFR_R = '',
    LowerLegPRFR_R = '',
    AnklePRFR_L = '',
    AnklePRFR_R = '',
    NonDoReason_PRFR = '',
    PtPose = '',
    VSMemo = '',
    UP_EMR = '',
    EMRRecNo = '',
    REC_STATUS = '',
    InstructorId = '',
    InstructorName = '',
    MD_MAN = '',
    MD_NAME = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = '',
    ScVO2 = '',
    PCWP = '',
    CO = '',
    CI = '',
    SVR = '',
    PVR = '',
    IAP = '',
    FBReaction_R = '',
    FBReaction_L = '',
    ANReaction_R = '',
    ANReaction_L = '',
    OtherReaction_R = '',
    OtherReaction_L = '',
    OtherReaction_LName = '',
    OtherReaction_RName = '',
    EMR_YN = '',
    PAP = '',
    RASS = '',
    NonDoReason_GCS = '',
    CAM_ICU_SPT = '',
    CAM_ICU_ATN = '',
    CAM_ICU_CON = '',
    CAM_ICU_THK = '',
    CAM_ICU_RST = '',
    ETCO2 = '',
    SPO2Side = '',
    ScaleVCode = '',
    REC_DTM_begin = '',
    REC_DTM_end = '',
    BT = '',
    NBPMBP = '',
    ABPMAP = '',
    CVPressure = '',
    Pain = '',
    Med = '',
    Pulse = '',
    HR = '',
    RR = '',
    SPO2 = '',
    OT = '',
    Ventilator = '',
    OTVT = '',
    GCS = '',
    MP = '',
    EPReaction = '',
    MovToday = '',
    MovYesterday = '',
    Ht = '',
    Wt = '',
    PRFR = ''
  }: IVitalSign = {}) {
    this.REC_NO = REC_NO;
    this.ptEncounterID = ptEncounterID;
    this.DOC_CODE = DOC_CODE;
    this.PT_NO = PT_NO;
    this.REC_DTM = REC_DTM;
    this.HBFreq = HBFreq;
    this.HBType = HBType;
    this.NonDoReason_HB = NonDoReason_HB;
    this.BTHFreq = BTHFreq;
    this.NonDoReason_BTH = NonDoReason_BTH;
    this.SPO2Num = SPO2Num;
    this.NonDoReason_SPO2 = NonDoReason_SPO2;
    this.OTType = OTType;
    this.OTNum = OTNum;
    this.OTUnit = OTUnit;
    this.VType = VType;
    this.VMode = VMode;
    this.VTV = VTV;
    this.VRR = VRR;
    this.Voxygon = Voxygon;
    this.VPEEP = VPEEP;
    this.MAP = MAP;
    this.ABP = ABP;
    this.CVP = CVP;
    this.CVPUnit = CVPUnit;
    this.ABP_MAP = ABP_MAP;
    this.ICP = ICP;
    this.CPP = CPP;
    this.NonDoReason_CVP = NonDoReason_CVP;
    this.NoPain = NoPain;
    this.MovNum1 = MovNum1;
    this.MovAmount1 = MovAmount1;
    this.MovType1 = MovType1;
    this.MovColor1 = MovColor1;
    this.MovShape1 = MovShape1;
    this.MovPipeLine1 = MovPipeLine1;
    this.NonDoReason_Mov1 = NonDoReason_Mov1;
    this.MovNum2 = MovNum2;
    this.MovAmount2 = MovAmount2;
    this.MovType2 = MovType2;
    this.MovColor2 = MovColor2;
    this.MovShape2 = MovShape2;
    this.MovPipeLine2 = MovPipeLine2;
    this.NonDoReason_Mov2 = NonDoReason_Mov2;
    this.SpecialTr = SpecialTr;
    this.ComaScaleE = ComaScaleE;
    this.ComaScaleV = ComaScaleV;
    this.ComaScaleM = ComaScaleM;
    this.ComaTotalGrade = ComaTotalGrade;
    this.ArmMP_L = ArmMP_L;
    this.ForeArmMP_L = ForeArmMP_L;
    this.UpperArmMP_L = UpperArmMP_L;
    this.LegMP_L = LegMP_L;
    this.ThighMP_L = ThighMP_L;
    this.LowerLegMP_L = LowerLegMP_L;
    this.ArmMP_R = ArmMP_R;
    this.ForeArmMP_R = ForeArmMP_R;
    this.UpperArmMP_R = UpperArmMP_R;
    this.LegMP_R = LegMP_R;
    this.ThighMP_R = ThighMP_R;
    this.LowerLegMP_R = LowerLegMP_R;
    this.EPReaction_R = EPReaction_R;
    this.EPSize_R = EPSize_R;
    this.EPReaction_L = EPReaction_L;
    this.EPSize_L = EPSize_L;
    this.Height = Height;
    this.NonDoReason_Height = NonDoReason_Height;
    this.Weight = Weight;
    this.WeightUnit = WeightUnit;
    this.WeightSPMark = WeightSPMark;
    this.NonDoReason_Weight = NonDoReason_Weight;
    this.BMI = BMI;
    this.HeadPRFR = HeadPRFR;
    this.NeckPRFR = NeckPRFR;
    this.ChestPRFR = ChestPRFR;
    this.BellyPRFR = BellyPRFR;
    this.WaistPRFR = WaistPRFR;
    this.ButtocksPRFR = ButtocksPRFR;
    this.ArmPRFR_L = ArmPRFR_L;
    this.ForeArmPRFR_L = ForeArmPRFR_L;
    this.UpperArmPRFR_L = UpperArmPRFR_L;
    this.ArmPRFR_R = ArmPRFR_R;
    this.ForeArmPRFR_R = ForeArmPRFR_R;
    this.UpperArmPRFR_R = UpperArmPRFR_R;
    this.LegPRFR_L = LegPRFR_L;
    this.ThighPRFR_L = ThighPRFR_L;
    this.LowerLegPRFR_L = LowerLegPRFR_L;
    this.LegPRFR_R = LegPRFR_R;
    this.ThighPRFR_R = ThighPRFR_R;
    this.LowerLegPRFR_R = LowerLegPRFR_R;
    this.AnklePRFR_L = AnklePRFR_L;
    this.AnklePRFR_R = AnklePRFR_R;
    this.NonDoReason_PRFR = NonDoReason_PRFR;
    this.PtPose = PtPose;
    this.VSMemo = VSMemo;
    this.UP_EMR = UP_EMR;
    this.EMRRecNo = EMRRecNo;
    this.REC_STATUS = REC_STATUS;
    this.InstructorId = InstructorId;
    this.InstructorName = InstructorName;
    this.MD_MAN = MD_MAN;
    this.MD_NAME = MD_NAME;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
    this.ScVO2 = ScVO2;
    this.PCWP = PCWP;
    this.CO = CO;
    this.CI = CI;
    this.SVR = SVR;
    this.PVR = PVR;
    this.IAP = IAP;
    this.FBReaction_R = FBReaction_R;
    this.FBReaction_L = FBReaction_L;
    this.ANReaction_R = ANReaction_R;
    this.ANReaction_L = ANReaction_L;
    this.OtherReaction_R = OtherReaction_R;
    this.OtherReaction_L = OtherReaction_L;
    this.OtherReaction_LName = OtherReaction_LName;
    this.OtherReaction_RName = OtherReaction_RName;
    this.EMR_YN = EMR_YN;
    this.PAP = PAP;
    this.RASS = RASS;
    this.NonDoReason_GCS = NonDoReason_GCS;
    this.CAM_ICU_SPT = CAM_ICU_SPT;
    this.CAM_ICU_ATN = CAM_ICU_ATN;
    this.CAM_ICU_CON = CAM_ICU_CON;
    this.CAM_ICU_THK = CAM_ICU_THK;
    this.CAM_ICU_RST = CAM_ICU_RST;
    this.ETCO2 = ETCO2;
    this.SPO2Side = SPO2Side;
    this.ScaleVCode = ScaleVCode;
    this.REC_DTM_begin = REC_DTM_begin;
    this.REC_DTM_end = REC_DTM_end;
    this.BT = BT;
    this.NBPMBP = NBPMBP;
    this.ABPMAP = ABPMAP;
    this.CVPressure = CVPressure;
    this.Pain = Pain;
    this.Med = Med;
    this.Pulse = Pulse;
    this.HR = HR;
    this.RR = RR;
    this.SPO2 = SPO2;
    this.OT = OT;
    this.Ventilator = Ventilator;
    this.OTVT = OTVT;
    this.GCS = GCS;
    this.MP = MP;
    this.EPReaction = EPReaction;
    this.MovToday = MovToday;
    this.MovYesterday = MovYesterday;
    this.Ht = Ht;
    this.Wt = Wt;
    this.PRFR = PRFR;
  }
}

