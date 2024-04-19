<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn color="primary" @click="fetch1">fetch</v-btn>
        <v-btn color="primary" @click="fetch2">fetch2</v-btn>
        <v-btn color="primary" @click="log">log</v-btn>
        <v-btn color="error" @click="msg1">msg1</v-btn>
        <v-btn color="info" @click="msg2">msg2</v-btn>
        <v-btn color="primary" @click="setChart">chart</v-btn>
        <br />
        <br />
        {{ 'Code:' + userRst.Code }} <br />
        {{ 'Succ:' + userRst.Succ }} <br />
        {{ 'Msg:' + userRst.Msg }} <br />
        <!-- {{ 'loading:' + userContent.loading }} <br />
        {{ 'Code:' + userContent.rst.Code }} <br />
        {{ 'Succ:' + userContent.rst.Succ }} <br />
        {{ 'Msg:' + userContent.rst.Msg }} <br /> -->
        {{ 'userName:' + user.userName }} <br />
      </v-col>

      <v-col cols="12">
        <v-chart :option="option" class="chart" autoresize ref="chart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ndbApi } from '@/services';
import ApiContent from '@/models/api-content';
import ApiResult from '@/models/api-result';
import Msg from '@/models/msg';
import Users from '@/models/users';
import ndbRoutes from '@/services/ndb-routes';
import Vue from 'vue';
import { EChartsOption } from 'echarts';

export default Vue.extend({
  data: () => ({
    userRst: new ApiResult<Users[]>(),
    userContent: new ApiContent<ApiResult<Users[]>>(),

    option: ((): EChartsOption => {
      // RR: 呼吸 次/分 black
      // HR: 脈搏 次/分 red
      // BT: 體溫 °C blue
      // SBP: 收縮壓 mmHg green
      // DBP: 舒張壓 mmHg green
      const colors = ['#97999B', '#EE6666', '#5470C6', '#91CC75', '#91CC75'];

      return {
        color: colors,
        title: {
          text: 'TPR',
          left: 'center'
        },
        legend: {
          left: 'left',
          top: 20
        },
        toolbox: {
          top: 20,
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          top: 80,
          left: 100,
          right: 100
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
            offset: 60,
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
            offset: 10,
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
            position: 'right',
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
            offset: 60,
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[3]
              }
            }
          }
        ],
        series: [
          {
            name: 'RR',
            type: 'line',
            yAxisIndex: 0,
            datasetId: 'vsDataset',
            encode: {
              x: 'rec_dtm',
              y: 'rr'
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
            datasetId: 'vsDataset',
            encode: {
              x: 'rec_dtm',
              y: 'hr'
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
              x: 'rec_dtm',
              y: 'bt'
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
              x: 'rec_dtm',
              y: 'sbp'
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
              x: 'rec_dtm',
              y: 'dbp'
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
            yAxisIndex: [0, 1, 2, 3],
            filterMode: 'empty'
          }
        ]
      };
    })()
  }),

  computed: {
    user() {
      return this.userRst.Data?.[0] ?? new Users();
      // return this.userContent.rst.Data?.[0] ?? new Users();
    }
  },

  methods: {
    async fetch1() {
      this.userRst = await ndbApi.getPs(ndbRoutes.Users.GetUsers + 1, {
        params: new Users({
          loginId: '10964',
          isActive: true
        })
      });
      this.log();

      // ndbApi.get(this.userContent, `${ndbRoutes.Users.GetUsers}1`, {
      //   params: {
      //     loginId: '10964',
      //     isActive: true,
      //   }
      // });
    },
    async fetch2() {
      this.userRst = await ndbApi.getPs(ndbRoutes.Users.GetUsers + 1, {
        params: new Users({
          loginId: '02217',
          isActive: true
        })
      });
      this.log();

      // ndbApi.get(this.userContent, `${ndbRoutes.Users.GetUsers}1`, {
      //   params: {
      //     loginId: '02217',
      //     isActive: true,
      //   }
      // });
    },
    log() {
      console.log('userRst:', this.userRst);
      console.log('userContent:', this.userContent);
      console.log('userContent.rst.Data:', this.userContent.rst.Data);
      console.log('user:', this.user);
      console.log('userName:', this.user?.userName);
    },
    msg1() {
      this.$store.dispatch(
        'alert/setMsg',
        new Msg({
          show: true,
          type: 'error',
          msg: `error top`,
          timeout: 5000
        })
      );
    },
    msg2() {
      this.$store.dispatch(
        'alert/setMsg',
        new Msg({
          show: true,
          type: 'info',
          msg: `info center`,
          timeout: 1000,
          centered: true
        })
      );
    },
    setChart() {
      this.option.dataset = [
        {
          id: 'vsDataset',
          source: [
            {
              rec_dtm: '2021-12-01 01:00:00',
              rr: 20,
              hr: 80
            },
            {
              rec_dtm: '2021-12-01 01:00:00',
              rr: 25,
              hr: 75
            },
            {
              rec_dtm: '2022-01-15 02:00:00',
              rr: 18,
              hr: 74
            },
            {
              rec_dtm: '2022-02-18 04:00:00',
              rr: 12,
              hr: 87
            },
            {
              rec_dtm: '2022-03-02 03:00:00',
              rr: 25,
              hr: 90
            }
          ]
        },
        {
          id: 'btDataset',
          source: [
            {
              rec_dtm: '2021-12-01 01:00:00',
              bt: '36.7'
            },
            {
              rec_dtm: '2021-12-01 01:00:00',
              bt: '36'
            },
            {
              rec_dtm: '2022-01-16 02:00:00',
              bt: '38'
            },
            {
              rec_dtm: '2022-02-18 04:00:00',
              bt: '39'
            },
            {
              rec_dtm: '2022-03-02 03:00:00',
              bt: '36.8'
            }
          ]
        },
        {
          id: 'bpDataset',
          source: [
            {
              rec_dtm: '2021-12-01 01:00:00',
              sbp: 140,
              dbp: 70
            },
            {
              rec_dtm: '2021-12-01 01:00:00',
              sbp: 110,
              dbp: 60
            },
            {
              rec_dtm: '2022-01-16 02:00:00',
              sbp: 145,
              dbp: 80
            },
            {
              rec_dtm: '2022-02-18 04:00:00',
              sbp: 138,
              dbp: 65
            },
            {
              rec_dtm: '2022-03-02 03:00:00',
              sbp: 155,
              dbp: 90
            }
          ]
        }
      ];
    }
  }
});
</script>

<style lang="scss" scoped>
.chart {
  height: 600px;
}
</style>
