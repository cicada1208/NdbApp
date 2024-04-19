import ClinicalUnit from '@/models/clinical-unit';
import { BedInfoBadgeKey } from '@/types/bed-info-badge';

export interface IClinicalState {
  clinicalSelected: ClinicalUnit;
  bedInfoSelected: BedInfoBadgeKey;
}

export default (): IClinicalState => ({
  clinicalSelected: new ClinicalUnit(),
  bedInfoSelected: 'all'
});
