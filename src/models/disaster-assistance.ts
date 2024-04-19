export interface IDisasterAssistance {
  ADL?: string;
  Beds?: string;
}

export default class DisasterAssistance implements IDisasterAssistance {
  ADL: string;
  Beds: string;

  constructor({
    ADL = '',
    Beds = ''
  }: IDisasterAssistance = {}) {
    this.ADL = ADL;
    this.Beds = Beds;
  }
}

