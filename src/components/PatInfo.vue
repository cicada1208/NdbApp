<template>
  <v-card rounded="xl" hover v-resize="onResize" color="grey lighten-4">
    <v-card-text class="pa-3 color-cadetblue-text">
      <v-row>
        <v-col cols="3" class="d-flex">
          <v-row
            class="flex-column text-center white--text text-body-1 font-weight-bold"
            style="min-height: 150px"
          >
            <v-col
              ref="bedLabelCol"
              class="flex-grow-0 rounded-tl-xl px-0"
              :class="colorParam.tsmitGrade[nisPatInfo.TsmitGrade]"
            >
              <div
                ref="bedLabelDiv"
                class="mx-auto text-pre-line"
                style="width: fit-content"
              >
                {{ bedLabel }}
              </div>
            </v-col>
            <v-col
              class="flex-grow-1 transfer-color d-flex align-center justify-center"
            >
              <span class="text-vertical text-h6 font-weight-bold">
                {{ nisPatInfo.TransferType }}
              </span>
            </v-col>
            <v-col class="flex-grow-0 rounded-bl-xl transfer-color px-0">
              {{ nisPatInfo.TransferBedLabel }}
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="9">
          <v-row dense>
            <v-col cols="12">
              <v-row justify="start" align="center" no-gutters>
                <v-col
                  class="text-h5 font-weight-bold text-decoration-underline text-truncate"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">{{ nisPatInfo.PatName }}</span>
                    </template>
                    <span>{{ nisPatInfo.PatName }}</span>
                  </v-tooltip>
                </v-col>
                <v-col v-if="DNR.show">
                  <v-btn
                    @click.stop="showDialogDNR"
                    color="purple"
                    x-small
                    dark
                  >
                    {{ DNR.text }}
                  </v-btn>
                </v-col>
                <v-col class="text-body-1 text-truncate">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">{{ vsName }}</span>
                    </template>
                    <span>{{ vsName }}</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row justify="start" align="center" dense>
                <span class="mr-3 black--text">{{ nisPatInfo.PatNo }}</span>

                <span>{{ nisPatInfo.PatAge }}</span>
                <v-icon :color="patGender.color">{{ patGender.icon }}</v-icon>
                <span class="red--text">
                  {{ nisPatInfo.PatBloodType + nisPatInfo.PatBloodRh }}
                </span>

                <span
                  :class="{ 'red--text': nisPatInfo.Days > 30 }"
                  class="mx-2"
                >
                  {{ nisPatInfo.Days ? `${nisPatInfo.Days}天` : '' }}
                </span>

                <v-col @click.stop="showDialogDiag" class="text-truncate">{{
                  diag
                }}</v-col>
              </v-row>
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col cols="12">
              <v-card-actions class="flex-wrap justify-end pa-0">
                <template v-for="highRisk in highRisks">
                  <v-tooltip
                    :key="highRisk.key"
                    v-if="highRisk.show"
                    :disabled="
                      highRisk.tip === undefined || highRisk.tip === ''
                    "
                    bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click.stop="highRisk.showDialog"
                        :outlined="highRisk.notWarn"
                        :min-width="highRiskSize"
                        v-on="on"
                        color="red"
                        class="mb-1 mr-1 text-button"
                        small
                        dark
                      >
                        {{ highRisk.text }}
                      </v-btn>
                    </template>
                    <span class="text-pre-line">{{ highRisk.tip }}</span>
                  </v-tooltip>
                </template>
              </v-card-actions>
              <v-card-actions class="flex-wrap pa-0">
                <template v-for="symptom in symptoms">
                  <v-tooltip
                    :key="symptom.key"
                    v-if="symptom.show"
                    :disabled="symptom.tip === undefined || symptom.tip === ''"
                    bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click.stop="symptom.showDialog"
                        :min-width="symptomImgSize"
                        v-on="on"
                        class="mr-0 my-3"
                        text
                      >
                        <!-- <v-row class="flex-column align-center">
                          <v-img
                            :src="symptom.img"
                            :max-width="symptomImgSize"
                            contain
                          />
                          <v-sheet
                            :min-width="symptomImgSize"
                            :max-width="symptomTextSize"
                            :class="symptom.color"
                            class="white--text text-caption text-truncate"
                          >
                            {{ symptom.text }}
                          </v-sheet>
                        </v-row> -->
                        <v-badge
                          :content="symptom.text"
                          :value="symptom.text"
                          :color="symptom.color"
                          overlap
                          offset-x="11"
                          offset-y="11"
                          class="mx-auto my-auto"
                        >
                          <v-img
                            :src="symptom.img"
                            :max-width="symptomImgSize"
                            contain
                          />
                        </v-badge>
                      </v-btn>
                    </template>
                    <span class="text-pre-line">{{ symptom.tip }}</span>
                  </v-tooltip>
                </template>
              </v-card-actions>
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col cols="12">
              <v-row
                v-if="opShowOperation"
                justify="start"
                align="center"
                no-gutters
              >
                <span class="mr-1">{{ op.Anesthesia }}</span>
                <span class="mr-1">{{ op.DrName }}</span>
                <v-col class="text-truncate">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">{{ op.Operation }}</span>
                    </template>
                    <span>{{ op.Operation }}</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row
                v-if="op.PARTIME"
                justify="start"
                align="center"
                no-gutters
              >
                <v-col cols="6">恢復室時間：{{ op.PARTIME }}</v-col>
                <v-col cols="6">動態：{{ op.STATUS }}</v-col>
              </v-row>
              <v-row
                v-else-if="op.StartTime && op.ExpectedTime > 0"
                justify="start"
                align="center"
                no-gutters
              >
                <v-col>
                  <v-progress-linear
                    :value="opPercent"
                    buffer-value="0"
                    stream
                    height="12"
                    :color="opPercent > 100 ? 'error' : 'info'"
                    rounded
                  >
                  </v-progress-linear>
                </v-col>
                <v-col cols="auto">
                  <strong
                    :class="{
                      'red--text text--lighten-1': opPercent > 100,
                      'yellow--text text--darken-3': opPercent <= 100
                    }"
                    >{{ opPercent }}%</strong
                  >
                </v-col>
                <v-col cols="12">預計完成時間：{{ opDoneTime }}</v-col>
              </v-row>
              <v-row
                v-else-if="op.OPStartTime && !op.StartTime"
                justify="start"
                align="center"
                no-gutters
              >
                <v-col>排定時間：{{ op.OPStartTime }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <pat-info-dnr
      v-model="dialog.DNR"
      :nisPatInfo="nisPatInfo"
      @close="showDialogDNR"
      :width="500"
    />
    <pat-info-diag
      v-model="dialog.Diag"
      :nisPatInfo="nisPatInfo"
      @close="showDialogDiag"
      :width="600"
    />
    <pat-info-allergy
      v-model="dialog.highRisks.Allergy"
      :nisPatInfo="nisPatInfo"
      @close="showDialogAllergy"
      :width="600"
    />
    <pat-info-fall
      v-model="dialog.highRisks.FallTotalGrade"
      :nisPatInfo="nisPatInfo"
      @close="showDialogFallTotalGrade"
      :width="500"
    />
    <pat-info-bed-sores
      v-model="dialog.highRisks.BedSoresTotalGrade"
      :nisPatInfo="nisPatInfo"
      @close="showDialogBedSoresTotalGrade"
      :width="500"
    />
    <pat-info-tube-mag
      v-model="dialog.symptoms.CVC"
      :nisPatInfo="nisPatInfo"
      :param="dialogParam.CVC"
      @close="showDialogCVC"
    />
    <pat-info-tube-mag
      v-model="dialog.symptoms.Foley"
      :nisPatInfo="nisPatInfo"
      :param="dialogParam.Foley"
      @close="showDialogFoley"
    />
    <pat-info-tube-mag
      v-model="dialog.symptoms.ChestTube"
      :nisPatInfo="nisPatInfo"
      :param="dialogParam.ChestTube"
      @close="showDialogChestTube"
    />
    <pat-info-restraint-mag
      v-model="dialog.symptoms.Restraint"
      :nisPatInfo="nisPatInfo"
      :param="dialogParam.Restraint"
      @close="showDialogRestraint"
    />
    <pat-info-ekg
      v-model="dialog.symptoms.EKG"
      :nisPatInfo="nisPatInfo"
      @close="showDialogEKG"
    />
  </v-card>
</template>

<script lang="ts">
import NisPatInfo from '@/models/nis-pat-info';
import colorParam from '@/params/color-param';
import Vue, { PropType } from 'vue';
import PatInfoAllergy from './PatInfoAllergy.vue';
import PatInfoDiag from './PatInfoDiag.vue';
import PatInfoDnr from './PatInfoDnr.vue';
import moment from 'moment';
import momentTw from 'moment-taiwan';
import PatientOPList from '@/models/patient-op-list';
import { opStateApi } from '@/services';
import opStateRoutes from '@/services/op-state-routes';
import PatInfoFall from './PatInfoFall.vue';
import PatInfoBedSores from './PatInfoBedSores.vue';
import PatInfoTubeMag from './PatInfoTubeMag.vue';
import TubeMag from '@/models/tube-mag';
import PatInfoRestraintMag from './PatInfoRestraintMag.vue';
import RestraintMag from '@/models/restraint-mag';
import PatInfoEkg from './PatInfoEkg.vue';
import refreshParam from '@/params/refresh-param';
import { isNumeric } from '@/libs/num-util';

// let opRst: PatientOPList[] = [];

export default Vue.extend({
  components: {
    PatInfoDnr,
    PatInfoDiag,
    PatInfoAllergy,
    PatInfoFall,
    PatInfoBedSores,
    PatInfoTubeMag,
    PatInfoRestraintMag,
    PatInfoEkg
  },
  props: {
    nisPatInfo: {
      type: Object as PropType<NisPatInfo>
    }
  },
  data() {
    return {
      colorParam,
      highRiskSize: 30,
      symptomImgSize: 45, // 30
      symptomTextSize: 67,
      dialog: {
        DNR: false,
        Diag: false,
        highRisks: {
          Allergy: false,
          FallTotalGrade: false,
          BedSoresTotalGrade: false
        },
        symptoms: {
          EKG: false,
          CVC: false,
          Foley: false,
          ChestTube: false,
          Restraint: false
        }
      },
      dialogParam: {
        CVC: new TubeMag({ TBKind: 'B', TreatType: 'ON' }),
        Foley: new TubeMag({ TBKind: 'C', TreatType: 'ON' }),
        ChestTube: new TubeMag({ TBType: 'Chest tube%', TreatType: 'ON' }),
        Restraint: new RestraintMag({ RTEndDTM: 'ON' })
      },
      opRst: ((): PatientOPList[] => [])(),
      opTimer: null,
      /** 手術進度 */
      opPercent: 0,
      bedLabel: this.nisPatInfo.bedLabel,
      bedLabelDivWidth: 0
    };
  },
  computed: {
    DNR() {
      let result: {
        show?: boolean;
        text?: string;
      } = {
        show: this.nisPatInfo.DNR?.length > 0,
        text: this.nisPatInfo.DNR?.find(Boolean)?.dnr_type
      };
      return result;
    },
    vsName(): string {
      let vsName =
        this.nisPatInfo.Vs1Name +
        (this.nisPatInfo.Vs2Name ? '/' : '') +
        this.nisPatInfo.Vs2Name;
      if (vsName) vsName = 'VS' + vsName;
      return vsName;
    },
    patGender() {
      let result: {
        color?: string;
        icon?: string;
      } = {};
      if (this.nisPatInfo.PatGender === '男') {
        result.color = 'blue';
        result.icon = 'mdi-gender-male';
      } else if (this.nisPatInfo.PatGender === '女') {
        result.color = 'pink';
        result.icon = 'mdi-gender-female';
      }
      return result;
    },
    diag(): string {
      if (this.nisPatInfo.odrDiag) {
        if (this.nisPatInfo.odrDiag.includes('◆Diagnosis:'))
          return this.nisPatInfo.odrDiag.split('◆Diagnosis:')[1].trim();
        else return this.nisPatInfo.odrDiag;
      } else return this.nisPatInfo.encDiagCh1;
    },
    highRisks() {
      interface IHighRisk {
        key: string;
        show?: boolean;
        /** 預設 warn */
        notWarn?: boolean;
        text?: string;
        tip?: string;
        showDialog(): void;
      }
      let result: Array<IHighRisk> = [
        {
          key: 'Blood',
          show: this.nisPatInfo.Blood,
          text: 'BLOOD',
          tip: '血液感染',
          showDialog: () => ({})
        },
        {
          key: 'Allergy',
          show: this.nisPatInfo.Allergy?.length > 0,
          text: '敏',
          showDialog: this.showDialogAllergy
        },
        {
          key: 'FallTotalGrade',
          show: Number.isInteger(this.nisPatInfo.FallTotalGrade),
          notWarn:
            this.nisPatInfo.FallTotalGrade < 2 ||
            !Number.isInteger(this.nisPatInfo.FallTotalGrade),
          text: '跌',
          showDialog: this.showDialogFallTotalGrade
        },
        {
          key: 'BedSoresTotalGrade',
          show: Number.isInteger(this.nisPatInfo.BedSoresTotalGrade),
          notWarn:
            this.nisPatInfo.BedSoresTotalGrade >= 16 ||
            !Number.isInteger(this.nisPatInfo.BedSoresTotalGrade),
          text: '壓',
          showDialog: this.showDialogBedSoresTotalGrade
        },
        {
          key: 'Cough',
          show: this.nisPatInfo.Cough,
          text: '咳',
          tip: '咳嗽',
          showDialog: () => ({})
        },
        {
          key: 'Fever',
          show: this.nisPatInfo.Fever,
          text: '燒',
          tip: '發燒',
          showDialog: () => ({})
        },
        {
          key: 'DHRL',
          show: this.nisPatInfo.DHRL !== '',
          notWarn: !this.nisPatInfo.DHRL.includes('已收案'),
          text: '出',
          tip: this.nisPatInfo.DHRL,
          showDialog: () => ({})
        },
        {
          key: 'ESS',
          show: this.nisPatInfo.ESS !== '',
          notWarn: !this.nisPatInfo.ESS.includes('已收案'),
          text: '情',
          tip: this.nisPatInfo.ESS,
          showDialog: () => ({})
        }
      ];
      return result;
    },
    symptoms() {
      interface ISymptom {
        key: string;
        img?: string;
        color?: string;
        show?: boolean;
        text?: string;
        tip?: string;
        showDialog(): void;
      }
      let result: Array<ISymptom> = [
        {
          key: 'AP2',
          img: require('@/assets/ap2.png'),
          color: 'indigo',
          show: this.nisPatInfo.AP2 !== '',
          text: this.nisPatInfo.AP2,
          tip: `AP-II ${this.nisPatInfo.AP2} 分`,
          showDialog: () => ({})
        },
        {
          key: 'RASS',
          img: require('@/assets/rass.png'),
          color: 'indigo lighten-3',
          show: Number.isInteger(this.nisPatInfo.RASS),
          text: `${this.nisPatInfo.RASS}`,
          tip: `RASS ${this.nisPatInfo.RASS} 分`,
          showDialog: this.showDialogEKG
        },
        {
          key: 'CAM',
          img: require('@/assets/cam.png'),
          color: 'orange',
          show: this.nisPatInfo.CAM === 'Y',
          text: '',
          tip: `CAM 譫`,
          showDialog: () => ({})
        },
        {
          key: 'Pain',
          img: require('@/assets/pain.png'),
          color: 'orange lighten-2',
          show: this.nisPatInfo.Pain !== '',
          text: this.nisPatInfo.Pain,
          tip: `Pain ${this.nisPatInfo.Pain} ${
            isNumeric(this.nisPatInfo.Pain) ? '分' : ''
          }`,
          showDialog: this.showDialogEKG
        },
        {
          key: 'EKG',
          img: require('@/assets/ekg.png'),
          color: 'cyan lighten-3',
          show: this.nisPatInfo.ptEncounterId !== '',
          text: '',
          showDialog: () => {
            this.showDialogEKG();

            // if (this.nisPatInfo.clinicalUnitId === 'SI') {
            //   let url =
            //     'http://172.16.64.54/logon.aspx?UserName=SICU&Password=SICU&Timeout=20&App=PatientView&PatientId=17216920';
            //   window.open(url);
            // } else this.showDialogEKG();
          }
        },
        {
          key: 'HR',
          img: require('@/assets/hr.png'),
          color: 'red lighten-1',
          show: Number.isInteger(this.nisPatInfo.HR),
          text: `${this.nisPatInfo.HR}`,
          tip: `HR ${this.nisPatInfo.HR} 次/分`,
          showDialog: this.showDialogEKG
        },
        {
          key: 'CAS',
          img: require('@/assets/cas.png'),
          color: 'light-blue lighten-3',
          show: this.nisPatInfo.CAS !== '',
          text: '',
          tip: this.nisPatInfo.CAS,
          showDialog: () => ({})
        },
        {
          key: 'CVC',
          img: require('@/assets/cvc.png'),
          color: 'red lighten-3',
          show: this.nisPatInfo.CVC !== '',
          text: this.nisPatInfo.CVC,
          tip: `ON ${this.nisPatInfo.CVC} 天`,
          showDialog: this.showDialogCVC
        },
        {
          key: 'Foley',
          img: require('@/assets/foley.png'),
          color: 'brown',
          show: this.nisPatInfo.Foley !== '',
          text: this.nisPatInfo.Foley,
          tip: `ON ${this.nisPatInfo.Foley} 天`,
          showDialog: this.showDialogFoley
        },
        {
          key: 'ChestTube',
          img: require('@/assets/chest-tube.png'),
          color: 'teal lighten-3',
          show: this.nisPatInfo.ChestTube !== '',
          text: this.nisPatInfo.ChestTube,
          tip: `ON ${this.nisPatInfo.ChestTube} 天`,
          showDialog: this.showDialogChestTube
        },
        {
          key: 'O2',
          img: require('@/assets/o2.png'),
          color: 'blue-grey',
          show: this.nisPatInfo.O2 !== '',
          text: '',
          tip: this.nisPatInfo.O2,
          showDialog: () => ({})
        },
        {
          key: 'Restraint',
          img: require('@/assets/restraint.png'),
          color: 'blue darken-3',
          show: this.nisPatInfo.Restraint,
          text: '',
          tip: '約束',
          showDialog: this.showDialogRestraint
        },
        {
          key: 'TransferTool',
          img: this.nisPatInfo.TransferTool.includes('走')
            ? require('@/assets/walking.png')
            : this.nisPatInfo.TransferTool.includes('輪椅')
            ? require('@/assets/wheelchair.png')
            : this.nisPatInfo.TransferTool.includes('床')
            ? require('@/assets/bed.png')
            : this.nisPatInfo.TransferTool.includes('保溫箱')
            ? require('@/assets/incubator.png')
            : require('@/assets/transfer-tool.png'),
          color: 'grey',
          show: this.nisPatInfo.TransferTool !== '',
          text: '',
          tip: `傳送工具：${this.nisPatInfo.TransferTool}`,
          showDialog: () => ({})
        }
      ];
      return result;
    },
    op(): PatientOPList {
      // constructor 可傳入 undefined，但不可傳入 null
      // return new PatientOPList(this.opRst?.[0]);
      return this.opRst?.[0] ?? new PatientOPList();
    },
    /** 手術預計完成時間 */
    opDoneTime(): string {
      return moment(this.op.StartTime, 'YYYY/MM/DD HH:mm:ss')
        .add(this.op.ExpectedTime, 'minute')
        .format('HH:mm');
    },
    /** 手術標題是否顯示 */
    opShowOperation(): boolean | string {
      return (
        this.op.PARTIME ||
        (this.op.StartTime && this.op.ExpectedTime > 0) ||
        (this.op.OPStartTime && !this.op.StartTime)
      );
    }
  },
  methods: {
    onResize() {
      const bedLabelColWidth = (this.$refs.bedLabelCol as Element).clientWidth;
      const bedLabelDivWidth = (this.$refs.bedLabelDiv as Element).clientWidth;

      if (this.bedLabelDivWidth === 0) this.bedLabelDivWidth = bedLabelDivWidth;

      this.bedLabel =
        bedLabelColWidth - this.bedLabelDivWidth <= 5 &&
        this.nisPatInfo.bedLabelNo
          ? `${this.nisPatInfo.bedLabelClinical}
          ${this.nisPatInfo.bedLabelNo}`
          : this.nisPatInfo.bedLabel;
    },
    showDialogDNR() {
      this.dialog.DNR = !this.dialog.DNR;
    },
    showDialogDiag() {
      this.dialog.Diag = !this.dialog.Diag;
    },
    showDialogAllergy() {
      this.dialog.highRisks.Allergy = !this.dialog.highRisks.Allergy;
    },
    showDialogFallTotalGrade() {
      this.dialog.highRisks.FallTotalGrade =
        !this.dialog.highRisks.FallTotalGrade;
    },
    showDialogBedSoresTotalGrade() {
      this.dialog.highRisks.BedSoresTotalGrade =
        !this.dialog.highRisks.BedSoresTotalGrade;
    },
    showDialogEKG() {
      this.dialog.symptoms.EKG = !this.dialog.symptoms.EKG;
    },
    showDialogCVC() {
      this.dialog.symptoms.CVC = !this.dialog.symptoms.CVC;
    },
    showDialogFoley() {
      this.dialog.symptoms.Foley = !this.dialog.symptoms.Foley;
    },
    showDialogChestTube() {
      this.dialog.symptoms.ChestTube = !this.dialog.symptoms.ChestTube;
    },
    showDialogRestraint() {
      this.dialog.symptoms.Restraint = !this.dialog.symptoms.Restraint;
    },
    async getPatientOPList() {
      if (!this.nisPatInfo.PatNo) return;
      let iOpdate = momentTw().format('tYYMMDD');
      this.opRst = await opStateApi.getPs(
        opStateRoutes.PatientLocation.PatientOPList,
        {
          params: {
            iOpdates: iOpdate,
            iOpdatee: iOpdate,
            Patno: this.nisPatInfo.PatNo
          }
        }
      );
      this.opPercent = 0;
      this.setOpPercent();
    },
    setOpPercent() {
      if (
        this.op.StartTime &&
        this.op.ExpectedTime > 0 &&
        moment().isSameOrAfter(
          moment(this.op.StartTime, 'YYYY/MM/DD HH:mm:ss'),
          'second'
        )
      ) {
        let now = moment();
        this.opPercent = Math.floor(
          (now.diff(
            moment(this.op.StartTime, 'YYYY/MM/DD HH:mm:ss'),
            'minute',
            true
          ) /
            this.op.ExpectedTime) *
            100
        );
      }
    }
  },
  mounted() {
    this.activateMultipleDraggableDialogs();

    if (this.nisPatInfo.PatNo) {
      this.getPatientOPList();
      this.opTimer = setInterval(
        this.getPatientOPList,
        refreshParam.patientOPList
      );
    }
  },
  beforeDestroy() {
    if (this.opTimer) {
      clearInterval(this.opTimer);
    }
  }
});
</script>

<style lang="scss" scoped>
.transfer-color {
  background-color: #4f6a5f;
}
</style>
