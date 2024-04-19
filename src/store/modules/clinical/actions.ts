import { ActionContext } from 'vuex';
import ClinicalUnit from '@/models/clinical-unit';
import { BedInfoBadgeKey } from '@/types/bed-info-badge';

export default {
  setClinicalSelected(
    { commit }: ActionContext<unknown, unknown>,
    clinicalSelected: ClinicalUnit
  ): void {
    commit('setClinicalSelected', clinicalSelected);
  },
  setBedInfoSelected(
    { commit }: ActionContext<unknown, unknown>,
    bedInfoSelected: BedInfoBadgeKey
  ): void {
    commit('setBedInfoSelected', bedInfoSelected);
  }
};
