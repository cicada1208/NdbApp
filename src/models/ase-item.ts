export interface IASEItem {
  Title?: string;
  Value?: string;
  Unit?: string;
}

export default class ASEItem implements IASEItem {
  Title: string;
  Value: string;
  Unit: string;

  constructor({ Title = '', Value = '', Unit = '' }: IASEItem = {}) {
    this.Title = Title;
    this.Value = Value;
    this.Unit = Unit;
  }
}
