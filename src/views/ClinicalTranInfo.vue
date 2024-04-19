<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="5">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="bedPatDptHeaders"
              :items="bedPatDpts"
              :loading="bedPatDptContent.loading"
              :items-per-page="-1"
              multi-sort
              hide-default-footer
              :mobile-breakpoint="-1"
              class="table-header elevation-2"
            >
              <template v-slot:top>
                <v-toolbar color="secondary" dark dense> 科別床動態 </v-toolbar>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="lockBedHeaders"
              :items="lockBeds"
              :loading="lockBedContent.loading"
              :items-per-page="-1"
              multi-sort
              hide-default-footer
              :mobile-breakpoint="-1"
              class="table-header elevation-2"
            >
              <template v-slot:top>
                <v-toolbar color="secondary" dark dense> 不排床註記 </v-toolbar>
              </template>

              <template v-slot:item.bed_reason_name="{ item }">
                {{
                  item.bed_reason_name +
                  (item.bed_reason_doc ? `：${item.bed_reason_doc}` : '')
                }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="7">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="tranInHeaders"
              :items="tranIns"
              :loading="tranInContent.loading"
              :items-per-page="-1"
              multi-sort
              hide-default-footer
              class="table-header elevation-2"
            >
              <template v-slot:top>
                <v-toolbar color="secondary" dark dense> 預住/轉入 </v-toolbar>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="tranInternalHeaders"
              :items="tranInternals"
              :loading="tranInternalContent.loading"
              :items-per-page="-1"
              multi-sort
              hide-default-footer
              class="table-header elevation-2"
            >
              <template v-slot:top>
                <v-toolbar color="secondary" dark dense> 內轉床 </v-toolbar>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="tranOutHeaders"
              :items="tranOuts"
              :loading="tranOutContent.loading"
              :items-per-page="-1"
              multi-sort
              hide-default-footer
              class="table-header elevation-2"
            >
              <template v-slot:top>
                <v-toolbar color="secondary" dark dense>
                  預出/出院/轉出
                </v-toolbar>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

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
import BedPatDpt from '@/models/bed-pat-dpt';
import ClinicalUnit from '@/models/clinical-unit';
import Mi_mbed from '@/models/mi-mbed';
import Mi_mbed_Ext from '@/models/mi-mbed-ext';
import Mi_mbed_TranIn from '@/models/mi-mbed-tran-in';
import Mi_mbed_TranInternal from '@/models/mi-mbed-tran-internal';
import Mi_mbed_TranOut from '@/models/mi-mbed-tran-out';
import refreshParam from '@/params/refresh-param';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';
import store from '@/store';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      clinicalTranInfoTimer: null,
      bedPatDptContent: new ApiContent<ApiResult<BedPatDpt[]>>(),
      lockBedContent: new ApiContent<ApiResult<Mi_mbed_Ext[]>>(),
      tranInContent: new ApiContent<ApiResult<Mi_mbed_TranIn[]>>(),
      tranInternalContent: new ApiContent<ApiResult<Mi_mbed_TranInternal[]>>(),
      tranOutContent: new ApiContent<ApiResult<Mi_mbed_TranOut[]>>()
    };
  },

  computed: {
    clinicalSelected(): ClinicalUnit {
      return store.state.clinical.clinicalSelected;
    },
    bedPatDpts(): BedPatDpt[] {
      return this.bedPatDptContent.rst.Data ?? [];
    },
    bedPatDptHeaders() {
      return [
        { text: '科別', value: 'dptName' },
        { text: '在床數', value: 'beds' },
        { text: '出床數', value: 'obeds' },
        { text: '入床數', value: 'ibeds' }
      ];
    },
    lockBeds(): Mi_mbed_Ext[] {
      return this.lockBedContent.rst.Data ?? [];
    },
    lockBedHeaders() {
      return [
        { text: '床位', value: 'bed_bed' },
        { text: '不排床理由', value: 'bed_reason_name' }
      ];
    },
    tranIns(): Mi_mbed_TranIn[] {
      return this.tranInContent.rst.Data ?? [];
    },
    tranInHeaders() {
      return [
        { text: '床位', value: 'bed_bed' },
        { text: '來源', value: 'bed_i_pat_from' },
        { text: '病歷號', value: 'bed_i_pat_no' },
        { text: '姓名', value: 'bed_i_pat_name' },
        { text: '性別', value: 'bed_i_pat_sex' },
        { text: '需求床位', value: 'bed_i_need_bed_cls' }
      ];
    },
    tranInternals(): Mi_mbed_TranInternal[] {
      return this.tranInternalContent.rst.Data ?? [];
    },
    tranInternalHeaders() {
      return [
        { text: '轉入前', value: 'bed_i_bed' },
        { text: '轉入後', value: 'bed_bed' },
        { text: '備註', value: 'bed_note' }
      ];
    },
    tranOuts(): Mi_mbed_TranOut[] {
      return this.tranOutContent.rst.Data ?? [];
    },
    tranOutHeaders() {
      return [
        { text: '床位', value: 'bed_bed' },
        { text: '病歷號', value: 'bed_pat_no' },
        { text: '姓名', value: 'bed_pat_name' },
        { text: '性別', value: 'bed_pat_sex' },
        { text: '狀態', value: 'bed_tranout_st' },
        { text: '備註', value: 'bed_note' }
      ];
    },
    isLoading(): boolean {
      return (
        this.bedPatDptContent.loading ||
        this.lockBedContent.loading ||
        this.tranInContent.loading ||
        this.tranInternalContent.loading ||
        this.tranOutContent.loading
      );
    }
  },

  methods: {
    load() {
      this.getBedPatDpt();
      this.getLockBed();
      this.getTranIn();
      this.getTranInternal();
      this.getTranOut();
    },
    getBedPatDpt() {
      ndbApi.get(this.bedPatDptContent, ndbRoutes.Mi_mbed.GetBedPatDpt, {
        params: new Mi_mbed({ bed_unit: this.clinicalSelected.clinicalUnitId })
      });
    },
    getLockBed() {
      ndbApi.get(this.lockBedContent, ndbRoutes.Mi_mbed.GetLockBed, {
        params: new Mi_mbed({
          bed_unit: this.clinicalSelected.clinicalUnitId
        })
      });
    },
    getTranIn() {
      ndbApi.get(this.tranInContent, ndbRoutes.Mi_mbed.GetTranIn, {
        params: new Mi_mbed({ bed_unit: this.clinicalSelected.clinicalUnitId })
      });
    },
    getTranInternal() {
      ndbApi.get(this.tranInternalContent, ndbRoutes.Mi_mbed.GetTranInternal, {
        params: new Mi_mbed({ bed_unit: this.clinicalSelected.clinicalUnitId })
      });
    },
    getTranOut() {
      ndbApi.get(this.tranOutContent, ndbRoutes.Mi_mbed.GetTranOut, {
        params: new Mi_mbed({ bed_unit: this.clinicalSelected.clinicalUnitId })
      });
    }
  },

  watch: {
    clinicalSelected() {
      this.load();
    }
  },

  created() {
    this.load();
  },

  mounted() {
    this.clinicalTranInfoTimer = setInterval(
      this.load,
      refreshParam.clinicalTranInfo
    );
  },

  beforeDestroy() {
    if (this.clinicalTranInfoTimer) {
      clearInterval(this.clinicalTranInfoTimer);
    }
  }
});
</script>
