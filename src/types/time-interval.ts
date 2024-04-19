export type TimeIntervalKey = 'D' | 'E' | 'N' | 'S';

export interface ITimeInterval {
  key: TimeIntervalKey;
  text?: string;
}

export const timeInterval: ITimeInterval[] = [
  { key: 'D', text: 'D' },
  { key: 'E', text: 'E' },
  { key: 'N', text: 'N' },
  { key: 'S', text: 'AN' }
];
