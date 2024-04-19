import ClinicalUnit from '@/models/clinical-unit';
import { BedInfoBadgeKey } from '@/types/bed-info-badge';
import { IClinicalState } from './state';

export default {
  setClinicalSelected(
    state: IClinicalState,
    clinicalSelected: ClinicalUnit
  ): void {
    state.clinicalSelected = new ClinicalUnit(clinicalSelected ?? undefined);
  },
  setBedInfoSelected(
    state: IClinicalState,
    bedInfoSelected: BedInfoBadgeKey
  ): void {
    state.bedInfoSelected = bedInfoSelected;
  }
};
