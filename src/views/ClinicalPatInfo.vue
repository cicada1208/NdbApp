<template>
  <v-container fluid>
    <loading-dialog v-model="nisPatInfoContent.loading" :dialog="false" />
    <v-data-iterator
      :items="nisPatInfosFiltered"
      :items-per-page="-1"
      no-data-text=""
      hide-default-footer
    >
      <template v-slot:default="{ items: pats }">
        <v-row>
          <v-col
            v-for="pat in pats"
            :key="`${pat.bedId}-${pat.PatNo}-${pat.ptEncounterId}`"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <PatInfo :nisPatInfo="pat" />
          </v-col>
        </v-row>
      </template>
      <!-- <template v-slot:loading>
        <div class="text-center mt-10">
          <v-progress-circular
            indeterminate
            :size="60"
            color="primary"
          ></v-progress-circular>
        </div>
      </template> -->
      <template v-slot:no-data v-if="!nisPatInfoContent.loading">
        <div class="text-center mt-10">
          <v-img :src="require('../assets/no-data.png')" contain height="100" />
        </div>
      </template>
    </v-data-iterator>

    <v-btn
      @click="getNisPatInfo"
      :disabled="nisPatInfoContent.loading"
      fixed
      right
      bottom
      fab
      small
      color="primary"
      style="bottom: 115px; opacity: 70%"
    >
      <v-icon> mdi-refresh </v-icon>
    </v-btn>

    <v-speed-dial
      v-model="filterShow"
      direction="left"
      transition="slide-x-transition"
      v-click-outside="{ closeConditional: () => false }"
      fixed
      right
      bottom
      style="bottom: 65px"
    >
      <template v-slot:activator>
        <v-btn
          v-model="filterShow"
          color="primary"
          style="opacity: 70%"
          fab
          small
        >
          <v-icon v-if="filterShow"> mdi-close </v-icon>
          <v-icon v-else> mdi-filter-check </v-icon>
        </v-btn>
      </template>
      <v-card
        :width="$vuetify.breakpoint.width - $vuetify.application.left - 85"
        @click.stop=""
        :ripple="false"
        style="position: fixed; bottom: 4px; right: 62px; opacity: 90%"
        color="grey lighten-4"
        hover
      >
        <v-row dense>
          <v-col class="flex-grow-0 mr-2 d-flex flex-column">
            <v-switch
              messages="同時符合"
              v-model="filterAnd"
              @click.stop=""
              class="text-no-wrap ml-3 mt-1 mb-4"
              color="primary"
            >
            </v-switch>
            <v-badge
              :content="filterPatCount"
              :value="filterPatCount"
              color="info"
              overlap
              offset-x="7"
              offset-y="7"
              class="mx-auto my-auto"
            >
              <v-img
                :src="require('../assets/patient.png')"
                contain
                max-width="40"
              />
            </v-badge>
          </v-col>
          <v-col class="flex-grow-1">
            <v-btn-toggle
              v-for="type in filterTypeValue"
              v-model="filterToggles[type]"
              :key="type"
              multiple
              borderless
              tile
              dense
              class="d-flex flex-wrap mt-2"
              background-color="transparent"
            >
              <v-tooltip
                v-for="filter in filterConfigs.filter(f => f.type === type)"
                :key="filter.key"
                :disabled="filter.tip === undefined || filter.tip === ''"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    :value="filter.key"
                    @click.stop=""
                    v-on="on"
                    color="red"
                    class="text-body-1 mr-4"
                    width="auto"
                    icon
                  >
                    <v-badge
                      :content="filter.count"
                      :value="filter.count"
                      color="info"
                      overlap
                      offset-x="0"
                      offset-y="0"
                    >
                      {{ filter.text }}
                    </v-badge>
                  </v-btn>
                </template>
                <span class="text-pre-line">{{ filter.tip }}</span>
              </v-tooltip>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card>
    </v-speed-dial>

    <!-- 若不用 v-speed-dial 可使用下列方式:
    <v-card class="sticky-bottom mt-3" color="grey lighten-4" hover>
      filter...
    </v-card>
    -->
  </v-container>
</template>

<script lang="ts">
import { ndbApi } from '@/services';
import NisPatInfo from '@/models/nis-pat-info';
import ApiContent from '@/models/api-content';
import ApiResult from '@/models/api-result';
import Vue from 'vue';
import ndbRoutes from '@/services/ndb-routes';
import PatInfo from '@/components/PatInfo.vue';
import store from '@/store';
import ClinicalUnit from '@/models/clinical-unit';
import axios, { CancelTokenSource } from 'axios';
import LoadingDialog from '@/components/utils/LoadingDialog.vue';
import { BedInfoBadgeKey } from '@/types/bed-info-badge';
import refreshParam from '@/params/refresh-param';

// const assertions: array literals become readonly tuples
const filterTypeValue = ['highRisk', 'tube'] as const;
// tuple to union
type FilterType = typeof filterTypeValue[number];
interface IFilter {
  key: string;
  type?: FilterType;
  text?: string;
  tip?: string;
  filter(pat: NisPatInfo): boolean;
  /** 人數 */
  count?: number;
}

export default Vue.extend({
  components: { PatInfo, LoadingDialog },

  data() {
    return {
      nisPatInfoContent: new ApiContent<ApiResult<NisPatInfo[]>>(),
      nisPatInfoCancel: ((): CancelTokenSource => null)(),
      nisPatInfoTimer: null,
      filterTypeValue,
      /** 篩選顯示 */
      filterShow: false,
      /** 篩選同時符合 */
      filterAnd: false,
      /** 篩選選取 */
      filterToggles: {
        highRisk: ((): string[] => [])(),
        tube: ((): string[] => [])()
      },
      /** 篩選設定 */
      filterConfigs: ((): IFilter[] => [
        {
          key: 'FallTotalGrade',
          type: 'highRisk',
          text: '跌',
          tip: '跌倒',
          filter: (pat: NisPatInfo) =>
            Number.isInteger(pat.FallTotalGrade) && pat.FallTotalGrade >= 2
        },
        {
          key: 'BedSoresTotalGrade',
          type: 'highRisk',
          text: '壓',
          tip: '壓力性損傷',
          filter: (pat: NisPatInfo) =>
            Number.isInteger(pat.BedSoresTotalGrade) &&
            pat.BedSoresTotalGrade < 16
        },
        {
          key: 'Cough',
          type: 'highRisk',
          text: '咳',
          tip: '咳嗽',
          filter: (pat: NisPatInfo) => pat.Cough
        },
        {
          key: 'Fever',
          type: 'highRisk',
          text: '燒',
          tip: '發燒',
          filter: (pat: NisPatInfo) => pat.Fever
        },
        {
          key: 'Blood',
          type: 'highRisk',
          text: 'B',
          tip: '血液感染',
          filter: (pat: NisPatInfo) => pat.Blood
        },
        {
          key: 'DHRL',
          type: 'highRisk',
          text: '出',
          tip: '出院準備服務高危險群篩選',
          filter: (pat: NisPatInfo) => pat.DHRL.includes('已收案')
        },
        {
          key: 'ESS',
          type: 'highRisk',
          text: '情',
          tip: '情緒壓力篩檢',
          filter: (pat: NisPatInfo) => pat.ESS.includes('已收案')
        },
        {
          key: 'Infectious',
          type: 'highRisk',
          text: '傳',
          tip: '傳染性',
          filter: (pat: NisPatInfo) => pat.Infectious
        },
        {
          key: 'Restraint',
          type: 'highRisk',
          text: '束',
          tip: '約束',
          filter: (pat: NisPatInfo) => pat.Restraint
        },
        {
          key: 'Allergy',
          type: 'highRisk',
          text: '敏',
          tip: '過敏藥物',
          filter: (pat: NisPatInfo) => pat.Allergy?.length > 0
        },
        {
          key: 'EndoTr',
          type: 'tube',
          text: 'Endo(Tr)',
          tip: '氣管內管 Endo/Tr.',
          filter: (pat: NisPatInfo) => pat.EndoTr
        },
        {
          key: 'CVC',
          type: 'tube',
          text: 'CVC',
          tip: '中心靜脈導管 CVC',
          filter: (pat: NisPatInfo) => pat.CVC !== ''
        },
        {
          key: 'Foley',
          type: 'tube',
          text: 'Foley',
          tip: '留置導尿管 Foley',
          filter: (pat: NisPatInfo) => pat.Foley !== ''
        },
        {
          key: 'DLHick',
          type: 'tube',
          text: 'D/L(Hick)',
          tip: 'D/L (Hickman)',
          filter: (pat: NisPatInfo) => pat.DLHick
        }
      ])()
    };
  },

  computed: {
    clinicalSelected(): ClinicalUnit {
      return store.state.clinical.clinicalSelected;
    },
    bedInfoSelected(): BedInfoBadgeKey {
      return store.state.clinical.bedInfoSelected;
    },
    nisPatInfos(): NisPatInfo[] {
      return this.nisPatInfoContent.rst.Data ?? [];
    },
    nisPatInfosFiltered(): NisPatInfo[] {
      if (this.bedInfoSelected === 'empty')
        return this.nisPatInfos.filter(pat => pat.ptEncounterId === '');
      else if (
        this.bedInfoSelected === 'inbed' &&
        this.filterToggles.highRisk.length === 0 &&
        this.filterToggles.tube.length === 0
      )
        return this.nisPatInfos.filter(pat => pat.ptEncounterId !== '');
      else if (
        this.filterToggles.highRisk.length === 0 &&
        this.filterToggles.tube.length === 0
      )
        return this.nisPatInfos;
      else {
        let filterSelected = this.filterConfigs
          .filter(
            hr =>
              this.filterToggles.highRisk.includes(hr.key) ||
              this.filterToggles.tube.includes(hr.key)
          )
          .map(hr => hr.filter);

        let result = this.nisPatInfos.filter(pat => {
          if (this.filterAnd) return filterSelected.every(f => f(pat));
          else return filterSelected.some(f => f(pat));
        });

        return result;
      }
    },
    /** 篩選選取病人數 */
    filterPatCount(): number {
      if (
        this.filterToggles.highRisk.length === 0 &&
        this.filterToggles.tube.length === 0
      )
        return 0;
      else return this.nisPatInfosFiltered.length;
    }
  },

  methods: {
    getNisPatInfo() {
      if (this.nisPatInfoCancel)
        this.nisPatInfoCancel.cancel('nisPatInfo cancel');
      this.nisPatInfoCancel = axios.CancelToken.source();

      ndbApi.get(
        this.nisPatInfoContent,
        ndbRoutes.NisPatInfo.GetNisPatInfo + 1,
        {
          params: new NisPatInfo({
            clinicalUnitId: this.clinicalSelected.clinicalUnitId
          }),
          cancelToken: this.nisPatInfoCancel.token
        }
      );
    },
    /** 計算各篩選項目的人數 */
    setFiltersCount() {
      this.filterConfigs.forEach(
        f => (f.count = this.nisPatInfos.filter(pat => f.filter(pat)).length)
      );
    }
  },

  watch: {
    // 'nisPatInfoContent.loading': function (loading) {
    //   let msg = '';
    //   let type: MsgType;
    //   if (loading) {
    //     msg = msgParam.loading;
    //     type = 'info';
    //   } else if (!this.nisPatInfoContent.err) {
    //     msg = msgParam.loadSuccess;
    //     type = 'success';
    //   }
    //   if (msg) {
    //     this.$store.dispatch(
    //       'alert/setMsg',
    //       new Msg({
    //         show: true,
    //         type,
    //         msg
    //       })
    //     );
    //     console.log(msg);
    //   }
    // },
    nisPatInfos() {
      this.setFiltersCount();
    },
    clinicalSelected() {
      this.getNisPatInfo();
    }
  },

  created() {
    this.getNisPatInfo();
  },

  mounted() {
    this.nisPatInfoTimer = setInterval(
      this.getNisPatInfo,
      refreshParam.clinicalPatInfo
    );
  },

  beforeDestroy() {
    if (this.nisPatInfoTimer) {
      clearInterval(this.nisPatInfoTimer);
    }
  }
});
</script>
