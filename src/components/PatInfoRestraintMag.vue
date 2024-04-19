<template>
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    v-on="$listeners"
    v-resize="setDataTableHeight"
  >
    <template v-slot:title>
      <pat-info-title title="約束管理" :nisPatInfo="nisPatInfo" />
    </template>

    <v-data-table
      :headers="rtMagHeaders"
      :items="rtMags"
      :loading="rtMagContent.loading"
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
                  label="評估日期起"
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
                  label="評估日期迄"
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
              label="狀態"
              v-model="filter.rtEndDTMSelected"
              :items="rtEndDTMItems"
              item-text="text"
              return-object
              auto-select-first
              clearable
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="auto">
            <v-btn
              :loading="rtMagContent.loading"
              :disabled="rtMagContent.loading"
              @click="getRestraintMagRpt"
              color="primary"
            >
              <v-icon left> mdi-magnify </v-icon>
              查詢
            </v-btn>
          </v-col>
        </v-row>
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
import moment from 'moment';
import { IComboItem } from '@/types/combo-item';
import RestraintMag from '@/models/restraint-mag';

const rtEndDTMItems: IComboItem[] = [
  { text: '未結', value: 'ON' },
  { text: '已結', value: 'CLOSE' },
  { text: '全部', value: '' }
];

export default Vue.extend({
  name: 'PatInfoRestraintMag',

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
    param: { type: Object as PropType<RestraintMag> }
  },

  data() {
    return {
      rtMagContent: new ApiContent<ApiResult<RestraintMag[]>>(),
      filter: {
        begin: this.nisPatInfo.BeginDt,
        end: moment().format('YYYY-MM-DD'),
        rtEndDTMSelected: ((): IComboItem => {
          if (this.param.RTEndDTM) {
            return rtEndDTMItems.find(t => t.value === this.param.RTEndDTM);
          } else {
            return rtEndDTMItems.find(t => t.value === '');
          }
        })()
      },
      rtEndDTMItems,
      dataTableHeight: 0
    };
  },

  computed: {
    rtMags(): RestraintMag[] {
      return this.rtMagContent.rst.Data ?? [];
    },
    rtMagHeaders() {
      return [
        { text: '評估日期時間', value: 'REC_DTM' },
        { text: '約束理由', value: 'RTReason' },
        { text: '約束部位', value: 'RTRegion' },
        { text: '約束工具', value: 'RTTool' },
        { text: '約束用藥', value: 'RTMedicine' },
        { text: '結束合併症', value: 'RTComplication' },
        { text: '結束日期', value: 'RTEndDTM' },
        { text: '評估者', value: 'MD_NAME' },
        { text: '管路 HIS編號', value: 'RT_HISID' }
      ];
    }
  },

  methods: {
    getRestraintMagRpt() {
      let params = new RestraintMag(this.param);
      params.ptEncounterID = this.nisPatInfo.ptEncounterId;
      params.REC_DTM_begin = moment(this.filter.begin).format('YYYYMMDD000000');
      params.REC_DTM_end = moment(this.filter.end).format('YYYYMMDD235959');
      params.RTEndDTM = this.filter.rtEndDTMSelected?.value as string;

      ndbApi.get(
        this.rtMagContent,
        ndbRoutes.RestraintMag.GetRestraintMagRpt + 2,
        {
          params
        }
      );
    },
    setDataTableHeight() {
      let tableHeight = window.innerHeight - 355;
      /// data table 3 row: 204
      this.dataTableHeight = tableHeight < 204 ? 204 : tableHeight;
    }
  },

  watch: {
    value(show) {
      if (show) this.getRestraintMagRpt();
    },
    'nisPatInfo.ptEncounterId': function (ptEncounterId) {
      if (!ptEncounterId) this.$emit('input', false);
      else if (this.value) this.getRestraintMagRpt();
    }
  }
});
</script>
