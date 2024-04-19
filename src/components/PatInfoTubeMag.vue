<template>
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    v-on="$listeners"
    v-resize="setDataTableHeight"
  >
    <template v-slot:title>
      <pat-info-title title="管路管理" :nisPatInfo="nisPatInfo" />
    </template>

    <v-data-table
      :headers="tubeMagHeaders"
      :items="tubeMags"
      :loading="tubeMagContent.loading"
      :items-per-page="-1"
      multi-sort
      fixed-header
      :height="dataTableHeight"
      class="table-header table-col1-fixed"
    >
      <template v-slot:top>
        <v-row class="ma-1">
          <v-col cols="auto">
            <v-menu :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="插管日期起"
                  v-model="filter.begin"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.begin"
                :day-format="date => new Date(date).getDate()"
                no-title
                scrollable
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="auto">
            <v-menu :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="插管日期迄"
                  v-model="filter.end"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.end"
                :day-format="date => new Date(date).getDate()"
                no-title
                scrollable
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="auto">
            <v-autocomplete
              label="種類"
              v-model="filter.tbKindTypeSelected"
              :items="tbKindTypeItems"
              item-text="text"
              return-object
              auto-select-first
              clearable
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="auto">
            <v-autocomplete
              label="狀態"
              v-model="filter.tbTreatTypeSelected"
              :items="tbTreatTypeItems"
              item-text="text"
              return-object
              auto-select-first
              clearable
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="auto">
            <v-btn
              :loading="tubeMagContent.loading"
              :disabled="tubeMagContent.loading"
              @click="getTubeMag"
              color="primary"
            >
              <v-icon left> mdi-magnify </v-icon>
              查詢
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <template v-slot:item.NextChangeDTM="{ item }">
        <span :class="{ 'red--text': warnNextChangeDTM(item.NextChangeDTM) }">
          {{ item.NextChangeDTM }}
        </span>
      </template>
    </v-data-table>
  </info-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import NisPatInfo from '@/models/nis-pat-info';
import PatInfoTitle from './PatInfoTitle.vue';
import InfoDialog from './utils/InfoDialog.vue';
import ApiContent from '@/models/api-content';
import ApiResult from '@/models/api-result';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';
import TubeMag, { TubeMagTBKind, TubeMagTreatType } from '@/models/tube-mag';
import moment from 'moment';
import { IComboItem } from '@/types/combo-item';

const tbKindTypeItems: IComboItem[] = [
  { text: 'CVC', value: 'B', field: 'TBKind' },
  { text: 'Foley', value: 'C', field: 'TBKind' },
  { text: 'Chest Tube', value: 'Chest tube%', field: 'TBType' },
  { text: '全部', value: '', field: '' }
];

const tbTreatTypeItems: IComboItem[] = [
  { text: '未結', value: 'ON' },
  { text: '已結', value: 'CLOSE' },
  { text: '全部', value: '' }
];

export default Vue.extend({
  name: 'PatInfoTubeMag',

  components: { PatInfoTitle, InfoDialog },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 'none'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    nisPatInfo: {
      type: Object as PropType<NisPatInfo>
    },
    param: { type: Object as PropType<TubeMag> }
  },

  data() {
    return {
      tubeMagContent: new ApiContent<ApiResult<TubeMag[]>>(),
      filter: {
        begin: this.nisPatInfo.BeginDt,
        end: moment().format('YYYY-MM-DD'),
        tbKindTypeSelected: ((): IComboItem => {
          if (this.param.TBKind) {
            return tbKindTypeItems.find(
              kt => kt.field === 'TBKind' && kt.value === this.param.TBKind
            );
          } else if (this.param.TBType) {
            return tbKindTypeItems.find(
              kt => kt.field === 'TBType' && kt.value === this.param.TBType
            );
          } else {
            return tbKindTypeItems.find(
              kt => kt.field === '' && kt.value === ''
            );
          }
        })(),
        tbTreatTypeSelected: ((): IComboItem => {
          if (this.param.TreatType) {
            return tbTreatTypeItems.find(t => t.value === this.param.TreatType);
          } else {
            return tbTreatTypeItems.find(t => t.value === '');
          }
        })()
      },
      tbKindTypeItems,
      tbTreatTypeItems,
      dataTableHeight: 0
    };
  },

  computed: {
    tubeMags(): TubeMag[] {
      return this.tubeMagContent.rst.Data ?? [];
    },
    tubeMagHeaders() {
      return [
        { text: '插管日期時間', value: 'REC_DTM' },
        { text: '管路編號', value: 'TBNumber' },
        { text: '管路種類', value: 'TBType' },
        { text: '管路材質', value: 'TBMaterial' },
        { text: '管路型號', value: 'TBSize' },
        { text: '管路部位', value: 'TBRegion' },
        { text: '預計換管日期', value: 'NextChangeDTM' },
        { text: '評估者', value: 'MD_NAME' },
        { text: '處置日期', value: 'TBTreatDTM' },
        { text: '處置方式', value: 'TreatTypeName' }
      ];
    }
  },

  methods: {
    getTubeMag() {
      let params = new TubeMag(this.param);
      params.ptEncounterID = this.nisPatInfo.ptEncounterId;
      params.REC_DTM_begin = moment(this.filter.begin).format('YYYYMMDD000000');
      params.REC_DTM_end = moment(this.filter.end).format('YYYYMMDD235959');
      params.TreatType = this.filter.tbTreatTypeSelected
        ?.value as TubeMagTreatType;
      if (this.filter.tbKindTypeSelected?.field === 'TBKind') {
        params[this.filter.tbKindTypeSelected?.field] = this.filter
          .tbKindTypeSelected?.value as TubeMagTBKind;
        params.TBType = '';
      } else if (this.filter.tbKindTypeSelected?.field === 'TBType') {
        params[this.filter.tbKindTypeSelected?.field] = this.filter
          .tbKindTypeSelected?.value as string;
        params.TBKind = '';
      } else {
        params.TBKind = '';
        params.TBType = '';
      }

      ndbApi.get(this.tubeMagContent, ndbRoutes.TubeMag.GetTubeMagRpt + 2, {
        params
      });
    },
    setDataTableHeight() {
      let tableHeight = window.innerHeight - 355;
      /// data table 3 row: 204
      this.dataTableHeight = tableHeight < 204 ? 204 : tableHeight;
    },
    /** Now(YYYY-MM-DD) <= NextChangeDTM then Warn */
    warnNextChangeDTM(nextChangeDTM: string) {
      return moment().isSameOrBefore(
        moment(nextChangeDTM, 'YYYY-MM-DD HH:mm:ss'),
        'day'
      );
    }
  },

  watch: {
    value(show) {
      if (show) this.getTubeMag();
    },
    'nisPatInfo.ptEncounterId': function (ptEncounterId) {
      if (!ptEncounterId) this.$emit('input', false);
      else if (this.value) this.getTubeMag();
    }
  }
});
</script>
