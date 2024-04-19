export type BedInfoBadgeKey = 'all' | 'empty' | 'inbed' | 'add';

export interface IBedInfoBadge {
  key: BedInfoBadgeKey;
  text?: string;
  value?: number;
}
