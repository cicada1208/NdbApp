<template>
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    v-on="$listeners"
    v-resize="setDataTableHeight"
  >
    <template v-slot:title>
      <pat-info-title title="EKG" :nisPatInfo="nisPatInfo" />
    </template>

    <v-row class="flex-column" no-gutters>
      <v-col>
        <v-data-table
          :headers="vitalSignHeaders"
          :items="vitalSigns"
          :loading="vsContent.loading"
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
                <v-btn
                  :loading="vsContent.loading"
                  :disabled="vsContent.loading"
                  @click="getVitalSignRpt"
                  color="primary"
                >
                  <v-icon left> mdi-magnify </v-icon>
                  查詢
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  :loading="vsContent.loading"
                  :disabled="vsContent.loading"
                  @click="exportExcel"
                  color="primary"
                >
                  <v-icon left> mdi-microsoft-excel </v-icon>
                  匯出
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
      <v-col>
        <v-chart
          ref="chart"
          :option="chartOption"
          autoresize
          class="chart-height"
        />
      </v-col>
    </v-row>
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
import VitalSignRpt from '@/models/vital-sign-rpt';
import VitalSign from '@/models/vital-sign';
import { ECharts, EChartsOption } from 'echarts';
import VSBT from '@/models/vsbt';
import VSBP from '@/models/vsbp';
import VSPain from '@/models/vspain';
import { exportXlsx } from '@/libs/xlsx-util';

export default Vue.extend({
  name: 'PatInfoEkg',

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
    }
  },

  data() {
    return {
      vsContent: new ApiContent<ApiResult<VitalSignRpt>>(),
      filter: {
        begin: moment().subtract(6, 'd').format('YYYY-MM-DD'), //this.nisPatInfo.BeginDt,
        end: moment().format('YYYY-MM-DD')
      },
      chartOption: ((): EChartsOption => {
        // RR: 呼吸 次/分 grey '#97999B'
        // HR: 脈搏 次/分 red '#EE6666'
        // BT: 體溫 °C blue '#5470C6'
        // SBP: 收縮壓 mmHg green '#91CC75'
        // DBP: 舒張壓 mmHg green '#91CC75'
        // Pain: 疼痛 分 purple '#fac858'
        // RASS: RASS 分 pink '#9a60b4'
        const colors = [
          '#97999B',
          '#EE6666',
          '#5470C6',
          '#91CC75',
          '#91CC75',
          '#fac858',
          '#9a60b4'
        ];

        return {
          color: colors,
          // title: {
          //   text: 'TPR',
          //   left: 'center'
          // },
          legend: {
            left: 'left'
            // top: 20
          },
          toolbox: {
            // top: 20,
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            top: 50, // 80
            left: 150,
            right: 150
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            textStyle: { align: 'left' }
          },
          dataset: [],
          xAxis: {
            type: 'time'
          },
          yAxis: [
            {
              name: 'RR',
              type: 'value',
              min: 0,
              max: 80,
              interval: 10, // splitNumber: 9,
              position: 'left',
              offset: 110,
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              }
              // axisLabel: {
              //   formatter: '{value} 次/分'
              // }
            },
            {
              name: 'HR',
              type: 'value',
              min: 40,
              max: 200,
              interval: 20, // splitNumber: 9,
              position: 'left',
              offset: 60,
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              }
            },
            {
              name: 'BT',
              type: 'value',
              min: 35,
              max: 43,
              interval: 1, //splitNumber: 9,
              position: 'left',
              offset: 10,
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              }
            },
            {
              name: 'BP',
              type: 'value',
              min: 0,
              max: 240,
              interval: 30, //splitNumber: 9,
              position: 'right',
              offset: 10,
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[3]
                }
              }
            },
            {
              name: 'Pain',
              type: 'value',
              min: 0,
              max: 16,
              interval: 2, // splitNumber: 9,
              position: 'right',
              offset: 60,
              // alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[5]
                }
              }
            },
            {
              name: 'RASS',
              type: 'value',
              min: -5,
              max: 11,
              interval: 2, // splitNumber: 9,
              position: 'right',
              offset: 110,
              // alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[6]
                }
              }
            }
          ],
          series: [
            {
              name: 'RR',
              type: 'line',
              yAxisIndex: 0,
              datasetId: 'rrDataset',
              encode: {
                x: 'REC_DTM',
                y: 'BTHFreq'
              },
              tooltip: {
                valueFormatter: value => value + ' 次/分'
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'RRMax' },
                  { type: 'min', name: 'RRMin' }
                ],
                label: { color: '#FFFFFF' }
              }
            },
            {
              name: 'HR',
              type: 'line',
              yAxisIndex: 1,
              datasetId: 'hrDataset',
              encode: {
                x: 'REC_DTM',
                y: 'HBFreq',
                tooltip: ['HBType', 'HBFreq']
              },
              tooltip: {
                valueFormatter: value => value + ' 次/分'
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'HRMax' },
                  { type: 'min', name: 'HRMin' }
                ],
                label: { color: '#FFFFFF' }
              }
            },
            {
              name: 'BT',
              type: 'line',
              yAxisIndex: 2,
              datasetId: 'btDataset',
              encode: {
                x: 'REC_DTM',
                y: 'BTNum',
                tooltip: ['BTType', 'BTNum']
              },
              tooltip: {
                valueFormatter: value => value + ' °C'
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'BTMax' },
                  { type: 'min', name: 'BTMin' }
                ],
                label: { color: '#FFFFFF' }
              }
            },
            {
              name: 'SBP',
              type: 'line',
              yAxisIndex: 3,
              datasetId: 'bpDataset',
              encode: {
                x: 'REC_DTM',
                y: 'SBP',
                tooltip: ['BPType', 'SBP']
              },
              tooltip: {
                valueFormatter: value => value + ' mmHg'
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'SBPMax' },
                  { type: 'min', name: 'SBPMin' }
                ],
                label: { color: '#FFFFFF' }
              },
              symbol: 'triangle',
              symbolRotate: 180,
              symbolSize: 13,
              lineStyle: { opacity: 0 }
            },
            {
              name: 'DBP',
              type: 'line',
              yAxisIndex: 3,
              datasetId: 'bpDataset',
              encode: {
                x: 'REC_DTM',
                y: 'DBP',
                tooltip: ['BPType', 'DBP']
              },
              tooltip: {
                valueFormatter: value => value + ' mmHg'
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'DBPMax' },
                  { type: 'min', name: 'DBPMin' }
                ],
                label: { color: '#FFFFFF' }
              },
              symbol: 'triangle',
              symbolSize: 13,
              lineStyle: { opacity: 0 }
            },
            {
              name: 'Pain',
              type: 'line',
              yAxisIndex: 4,
              datasetId: 'painDataset',
              encode: {
                x: 'REC_DTM',
                y: 'PainVal'
              },
              tooltip: {
                valueFormatter: value => value + ' 分'
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'PainMax' },
                  { type: 'min', name: 'PainMin' }
                ],
                label: { color: '#FFFFFF' }
              }
            },
            {
              name: 'RASS',
              type: 'line',
              yAxisIndex: 5,
              datasetId: 'rassDataset',
              encode: {
                x: 'REC_DTM',
                y: 'RASS'
              },
              tooltip: {
                valueFormatter: value => value + ' 分'
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'RASSMax' },
                  { type: 'min', name: 'RASSMin' }
                ],
                label: { color: '#FFFFFF' }
              }
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: [0],
              filterMode: 'filter'
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              filterMode: 'filter'
            },
            {
              type: 'inside',
              yAxisIndex: [0, 1, 2, 3, 4, 5],
              filterMode: 'none'
            }
          ]
        };
      })(),
      dataTableHeight: 0
    };
  },

  computed: {
    vitalSigns(): VitalSign[] {
      return this.vsContent.rst.Data?.VS ?? [];
    },
    bts(): VSBT[] {
      return this.vsContent.rst.Data?.BT ?? [];
    },
    bps(): VSBP[] {
      return this.vsContent.rst.Data?.BP ?? [];
    },
    pains(): VSPain[] {
      return this.vsContent.rst.Data?.Pain ?? [];
    },
    rrDataset(): VitalSign[] {
      return this.vitalSigns.filter(vs => vs.BTHFreq !== '');
      // .sort((a, b) => {
      //   if (a.REC_DTM > b.REC_DTM) return 1;
      //   else if (a.REC_DTM < b.REC_DTM) return -1;
      //   else return 0;
      // })
    },
    hrDataset(): VitalSign[] {
      return this.vitalSigns.filter(vs => vs.HBFreq !== '');
    },
    btDataset(): VSBT[] {
      return this.bts.filter(bt => bt.BTNum !== '');
    },
    bpDataset(): VSBP[] {
      return this.bps.filter(bp => bp.SBP !== '' || bp.DBP !== '');
    },
    painDataset(): VSPain[] {
      return this.pains.filter(pain => pain.PainVal !== '');
    },
    rassDataset(): VitalSign[] {
      return this.vitalSigns.filter(vs => vs.RASS !== '');
    },
    vitalSignHeaders() {
      return [
        { text: '評估日期時間', value: 'REC_DTM', class: 'text-no-wrap' },
        {
          text: '體溫',
          value: 'BT',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '脈搏',
          value: 'HR',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '呼吸',
          value: 'RR',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '呼吸模式',
          value: 'OTVT',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: 'SPO2',
          value: 'SPO2',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: 'BP(MBP)',
          value: 'NBPMBP',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: 'ABP(MAP)',
          value: 'ABPMAP',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '疼痛',
          value: 'Pain',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '昏迷指數',
          value: 'GCS',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '肌力',
          value: 'MP',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '瞳孔反射',
          value: 'EPReaction',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: 'CVP',
          value: 'CVPressure',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '今天排便',
          value: 'MovToday',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '昨天排便',
          value: 'MovYesterday',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '特殊處置',
          value: 'SpecialTr',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '身高',
          value: 'Ht',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '體重',
          value: 'Wt',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: 'BMI',
          value: 'BMI',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '圍長',
          value: 'PRFR',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: 'RASS',
          value: 'RASS',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: 'CAM-ICU',
          value: 'CAM_ICU_RST',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '藥物',
          value: 'Med',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '脈搏強度',
          value: 'Pulse',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        },
        {
          text: '評估者',
          value: 'MD_NAME',
          class: 'text-no-wrap',
          cellClass: 'text-pre'
        }
      ];
    }
  },

  methods: {
    getVitalSignRpt() {
      ndbApi.get(this.vsContent, ndbRoutes.VitalSign.GetVitalSignRpt + 2, {
        params: new VitalSign({
          ptEncounterID: this.nisPatInfo.ptEncounterId,
          REC_DTM_begin: moment(this.filter.begin).format('YYYYMMDD000000'),
          REC_DTM_end: moment(this.filter.end).format('YYYYMMDD235959')
        })
      });
    },
    setChart() {
      this.chartOption.dataZoom[0].start = 0;
      this.chartOption.dataZoom[0].end = 100;

      this.chartOption.dataset = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // { id: 'vsRawDataset', source: this.vitalSigns as any },
        {
          id: 'rrDataset',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          source: this.rrDataset as any
          // fromDatasetId: 'vsRawDataset',
          // transform: [
          //   {
          //     type: 'filter',
          //     config: { dimension: 'BTHFreq', '!=': '' }
          //   },
          //   {
          //     type: 'sort',
          //     config: { dimension: 'REC_DTM', order: 'desc' }
          //   }
          // ]
        },
        {
          id: 'hrDataset',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          source: this.hrDataset as any
          // fromDatasetId: 'vsRawDataset',
          // transform: [
          //   {
          //     type: 'filter',
          //     config: { dimension: 'HBFreq', '!=': '' }
          //   },
          //   {
          //     type: 'sort',
          //     config: { dimension: 'REC_DTM', order: 'desc' }
          //   }
          // ]
        },
        // {
        //   id: 'btRawDataset',
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   source: this.bts as any
        // },
        {
          id: 'btDataset',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          source: this.btDataset as any
          // fromDatasetId: 'btRawDataset',
          // transform: [
          //   {
          //     type: 'filter',
          //     config: { dimension: 'BTNum', '!=': '' }
          //   },
          //   {
          //     type: 'sort',
          //     config: { dimension: 'REC_DTM', order: 'desc' }
          //   }
          // ]
        },
        // {
        //   id: 'bpRawDataset',
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   source: this.bps as any
        // },
        {
          id: 'bpDataset',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          source: this.bpDataset as any
          // fromDatasetId: 'bpRawDataset',
          // transform: [
          //   {
          //     type: 'filter',
          //     config: {
          //       or: [
          //         { dimension: 'SBP', '!=': '' },
          //         { dimension: 'DBP', '!=': '' }
          //       ]
          //     }
          //   },
          //   {
          //     type: 'sort',
          //     config: { dimension: 'REC_DTM', order: 'desc' }
          //   }
          // ]
        },
        {
          id: 'painDataset',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          source: this.painDataset as any
        },
        {
          id: 'rassDataset',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          source: this.rassDataset as any
        }
      ];
    },
    setDataTableHeight() {
      // chart + title + data table top & foot: 700
      let tableHeight = window.innerHeight - 700;
      /// data table 3 row: 204
      this.dataTableHeight = tableHeight < 204 ? 204 : tableHeight;
    },
    exportExcel() {
      exportXlsx(
        this.vitalSigns.map(vs => ({
          評估日期時間: vs.REC_DTM,
          體溫: vs.BT,
          脈搏: vs.HR,
          呼吸: vs.RR,
          呼吸模式: vs.OTVT,
          SPO2: vs.SPO2,
          'BP(MBP)': vs.NBPMBP,
          'ABP(MAP)': vs.ABPMAP,
          疼痛: vs.Pain,
          昏迷指數: vs.GCS,
          肌力: vs.MP,
          瞳孔反射: vs.EPReaction,
          CVP: vs.CVPressure,
          今天排便: vs.MovToday,
          昨天排便: vs.MovYesterday,
          特殊處置: vs.SpecialTr,
          身高: vs.Ht,
          體重: vs.Wt,
          BMI: vs.BMI,
          圍長: vs.PRFR,
          RASS: vs.RASS,
          'CAM-ICU': vs.CAM_ICU_RST,
          藥物: vs.Med,
          脈搏強度: vs.Pulse,
          評估者: vs.MD_NAME
        })),
        `VitalSign：${this.nisPatInfo.PatNo}.xlsx`
      );
    }
  },

  watch: {
    value(show) {
      if (show) this.getVitalSignRpt();
    },
    'nisPatInfo.ptEncounterId': function (ptEncounterId) {
      if (!ptEncounterId) this.$emit('input', false);
      else if (this.value) this.getVitalSignRpt();
    },
    'vsContent.rst.Data': function () {
      this.setChart();
    }
  },

  beforeDestroy() {
    if (this.$refs.chart) (this.$refs.chart as unknown as ECharts).dispose();
  }
});
</script>

<style lang="scss" scoped>
.chart-height {
  height: 480px;
}
</style>
