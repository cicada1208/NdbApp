<template>
  <v-container fluid v-resize="setDataTableHeight">
    <v-data-table
      :headers="patOPListExtHeaders"
      :items="patOPListExts"
      :loading="patOPListExtContent.loading"
      :items-per-page="-1"
      multi-sort
      item-key="NOTNO"
      :expanded="patOPListExtExpandeds"
      fixed-header
      :height="dataTableHeight"
      class="table-header"
    >
      <template v-slot:top>
        <v-row ref="dataTableTop" class="ma-1">
          <v-col cols="auto">
            <v-menu :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="手術日期起"
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
                  label="手術日期迄"
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
            <v-btn
              :loading="patOPListExtContent.loading"
              :disabled="patOPListExtContent.loading"
              @click="getUnitPatientOPListExt"
              color="primary"
            >
              <v-icon left> mdi-magnify </v-icon>
              查詢
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              :loading="patOPListExtContent.loading"
              :disabled="patOPListExtContent.loading"
              @click="getUnitPatientOPListExtToday"
              color="primary"
            >
              <v-icon left> mdi-magnify </v-icon>
              今日手術
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              :loading="patOPListExtContent.loading"
              :disabled="patOPListExtContent.loading"
              @click="getUnitPatientOPListExtTomorrow"
              color="primary"
            >
              <v-icon left> mdi-magnify </v-icon>
              明日手術
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <template v-slot:item.OPRoom="{ item }">
        <v-chip dark class="ma-1 color-candy-pink" v-if="item.OPRoom">
          {{ item.OPRoom }}
        </v-chip>
        <v-chip dark class="ma-1 color-pine" v-if="item.ERClass">
          {{ item.ERClass }}
        </v-chip>
      </template>
      <template v-slot:item.CHK_Consent1="{ item }">
        <v-icon color="success" v-if="item.CHK_Consent1 === 'Y'">
          mdi-check-circle-outline
        </v-icon>
      </template>
      <template v-slot:item.CHK_Consent2="{ item }">
        <v-icon color="success" v-if="item.CHK_Consent2 === 'Y'">
          mdi-check-circle-outline
        </v-icon>
      </template>
      <template v-slot:item.IsPAAComplete="{ item }">
        <v-icon
          color="success"
          v-if="item.AnesthesiaAse === '1' && item.IsPAAComplete"
        >
          mdi-check-circle-outline
        </v-icon>
      </template>
      <template v-slot:item.OPSiteMark="{ item }">
        {{ item.OPSiteMark ? item.OPSiteMark : item.OperationSite }}
      </template>
      <template v-slot:item.TransferTool="{ item }">
        <v-chip
          v-for="(tool, idx) in splitContent(item.TransferTool)"
          :key="idx"
          dark
          class="ma-1 color-terra-cotta"
        >
          <span>{{ tool }}</span>
        </v-chip>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-timeline
            align-top
            :dense="$vuetify.breakpoint.smAndDown"
            :style="{
              width: ($vuetify.breakpoint.smAndDown ? 400 : 800) + 'px'
            }"
          >
            <v-timeline-item
              color="grey lighten-3"
              fill-dot
              small
              v-if="item.PreOPDoneTime"
            >
              <v-card color="grey lighten-3">
                <v-alert
                  :value="true"
                  color="grey lighten-3"
                  class="blue-grey--text"
                >
                  <v-row justify="start" align="center" no-gutters>
                    <v-col cols="12"
                      ><span class="warning--text font-weight-bold">上台刀</span
                      >手術進度：</v-col
                    >
                    <v-col cols="10">
                      <v-progress-linear
                        :value="item.PreOPPercent"
                        buffer-value="0"
                        stream
                        height="12"
                        :color="item.PreOPPercent > 100 ? 'error' : 'info'"
                        rounded
                      >
                      </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                      <strong
                        :class="{
                          'red--text text--lighten-1': item.PreOPPercent > 100,
                          'yellow--text text--darken-3':
                            item.PreOPPercent <= 100
                        }"
                        >{{ item.PreOPPercent }}%</strong
                      >
                    </v-col>
                    <v-col cols="12"
                      >預計完成時間：{{ item.PreOPDoneTime }}</v-col
                    >
                  </v-row>
                </v-alert>
              </v-card>
            </v-timeline-item>
            <v-timeline-item
              color="grey lighten-3"
              fill-dot
              small
              v-if="item.TransferSite"
            >
              <v-card color="grey lighten-3">
                <v-alert
                  :value="true"
                  color="grey lighten-3"
                  class="blue-grey--text"
                >
                  <v-row justify="start" align="center" no-gutters>
                    <v-col cols="12">傳送地點： </v-col>
                    <v-col
                      cols="auto"
                      v-for="(site, idx) in splitContent(
                        item.TransferSite,
                        '，'
                      )"
                      :key="idx"
                    >
                      <v-chip dark class="ma-1 brown lighten-2">
                        <span>{{ site }}</span>
                      </v-chip>
                    </v-col>
                    <v-col cols="12"
                      >派工時間：{{ item.TransferDispatchTime }}</v-col
                    >
                  </v-row>
                </v-alert>
              </v-card>
            </v-timeline-item>
            <v-timeline-item
              color="grey lighten-3"
              fill-dot
              small
              v-if="item.OPDoneTime"
            >
              <v-card color="grey lighten-3">
                <v-alert
                  :value="true"
                  color="grey lighten-3"
                  class="blue-grey--text"
                >
                  <v-row justify="start" align="center" no-gutters>
                    <v-col cols="12">手術進度：</v-col>
                    <v-col cols="10">
                      <v-progress-linear
                        :value="item.OPPercent"
                        buffer-value="0"
                        stream
                        height="12"
                        :color="item.OPPercent > 100 ? 'error' : 'info'"
                        rounded
                      >
                      </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                      <strong
                        :class="{
                          'red--text text--lighten-1': item.OPPercent > 100,
                          'yellow--text text--darken-3': item.OPPercent <= 100
                        }"
                        >{{ item.OPPercent }}%</strong
                      >
                    </v-col>
                    <v-col cols="12">預計完成時間：{{ item.OPDoneTime }}</v-col>
                  </v-row>
                </v-alert>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </td>
      </template>
    </v-data-table>

    <v-btn
      @click="load"
      :disabled="isLoading"
      fixed
      right
      bottom
      fab
      small
      color="primary"
      style="bottom: 65px; opacity: 70%"
    >
      <v-icon> mdi-refresh </v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import ApiContent from '@/models/api-content';
import ApiResult from '@/models/api-result';
import ClinicalUnit from '@/models/clinical-unit';
import PatientOPListExt from '@/models/patient-op-list-ext';
import refreshParam from '@/params/refresh-param';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';
import store from '@/store';
import moment from 'moment';
import momentTw from 'moment-taiwan';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      patOPListExtContent: new ApiContent<ApiResult<PatientOPListExt[]>>(),
      filter: {
        begin: moment().format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
      },
      dataTableHeight: 0,
      clinicalOPTimer: null
    };
  },

  computed: {
    clinicalSelected(): ClinicalUnit {
      return store.state.clinical.clinicalSelected;
    },
    patOPListExts(): PatientOPListExt[] {
      return this.patOPListExtContent.rst.Data ?? [];
    },
    patOPListExtExpandeds(): PatientOPListExt[] {
      return this.patOPListExts.filter(
        op => op.OPDoneTime || op.PreOPDoneTime || op.TransferSite
      );
    },
    patOPListExtHeaders() {
      return [
        {
          text: '手術單號',
          value: 'NOTNO',
          class: 'd-none',
          cellClass: 'd-none'
        },
        { text: 'OR ROOM/級', value: 'OPRoom' },
        { text: '床號', value: 'BedNo', class: 'text-no-wrap' },
        {
          text: '姓名',
          value: 'PatName',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        { text: '術式', value: 'Operation', width: 200 },
        { text: '手術同意書', value: 'CHK_Consent1', class: 'text-no-wrap' },
        { text: '自費同意書', value: 'CHK_Consent2', class: 'text-no-wrap' },
        { text: '麻諮', value: 'IsPAAComplete', class: 'text-no-wrap' },
        { text: '部位標記', value: 'OPSiteMark', class: 'text-no-wrap' },
        { text: '醫師', value: 'DrName', class: 'text-no-wrap' },
        { text: '麻醉方式', value: 'Anesthesia', class: 'text-no-wrap' },
        { text: '排定日期', value: 'OPStartDate', class: 'text-no-wrap' },
        { text: '排定時間', value: 'OPStartTime', class: 'text-no-wrap' },
        { text: '傳送工具', value: 'TransferTool', class: 'text-no-wrap' },
        { text: '狀態', value: 'STATUS', class: 'text-no-wrap' }
      ];
    },
    isLoading(): boolean {
      return this.patOPListExtContent.loading;
    }
  },

  methods: {
    load() {
      this.getUnitPatientOPListExt();
    },
    getUnitPatientOPListExt() {
      ndbApi.get(
        this.patOPListExtContent,
        ndbRoutes.Operation.GetUnitPatientOPListExt,
        {
          params: {
            clinicalUnitId: this.clinicalSelected.clinicalUnitId,
            iOpdates: momentTw(this.filter.begin).format('tYYMMDD'),
            iOpdatee: momentTw(this.filter.end).format('tYYMMDD')
          }
        }
      );
    },
    getUnitPatientOPListExtToday() {
      this.filter.begin = moment().format('YYYY-MM-DD');
      this.filter.end = this.filter.begin;
      this.getUnitPatientOPListExt();
    },
    getUnitPatientOPListExtTomorrow() {
      this.filter.begin = moment().add(1, 'd').format('YYYY-MM-DD');
      this.filter.end = this.filter.begin;
      this.getUnitPatientOPListExt();
    },
    splitContent(content: string, split = ',') {
      if (content) return content.split(split);
      else return [];
    },
    setDataTableHeight() {
      const dataTableTopHeight = (this.$refs.dataTableTop as Element)
        .clientHeight;
      this.dataTableHeight = window.innerHeight - dataTableTopHeight - 190;
    }
  },

  watch: {
    clinicalSelected() {
      this.load();
    },
    'patOPListExtContent.rst': function () {
      this.patOPListExtContent.rst?.Data.forEach(op => {
        if (op.StartTime && op.ExpectedTime > 0)
          op.OPDoneTime = moment(op.StartTime, 'YYYY/MM/DD HH:mm:ss')
            .add(op.ExpectedTime, 'minute')
            .format('HH:mm');

        if (
          op.StartTime &&
          op.ExpectedTime > 0 &&
          moment().isSameOrAfter(
            moment(op.StartTime, 'YYYY/MM/DD HH:mm:ss'),
            'second'
          )
        ) {
          let now = moment();
          op.OPPercent = Math.floor(
            (now.diff(
              moment(op.StartTime, 'YYYY/MM/DD HH:mm:ss'),
              'minute',
              true
            ) /
              op.ExpectedTime) *
              100
          );
        }

        // 上台刀
        if (op.PreStartTime && op.PreExpectedTime > 0)
          op.PreOPDoneTime = moment(op.PreStartTime, 'YYYY/MM/DD HH:mm:ss')
            .add(op.PreExpectedTime, 'minute')
            .format('HH:mm');

        if (
          op.PreStartTime &&
          op.PreExpectedTime > 0 &&
          moment().isSameOrAfter(
            moment(op.PreStartTime, 'YYYY/MM/DD HH:mm:ss'),
            'second'
          )
        ) {
          let now = moment();
          op.PreOPPercent = Math.floor(
            (now.diff(
              moment(op.PreStartTime, 'YYYY/MM/DD HH:mm:ss'),
              'minute',
              true
            ) /
              op.PreExpectedTime) *
              100
          );
        }
      });
    }
  },

  created() {
    this.load();
  },

  mounted() {
    this.clinicalOPTimer = setInterval(this.load, refreshParam.clinicalOP);
  },

  beforeDestroy() {
    clearInterval(this.clinicalOPTimer);
  }
});
</script>
