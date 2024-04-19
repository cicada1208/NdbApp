<template>
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    :hideOverlay="hideOverlay"
    v-on="$listeners"
  >
    <template v-slot:title> 團隊聯繫 </template>

    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-combobox
            label="團隊"
            v-model="teamContactData.TeamType"
            :items="teamTypes"
            :loading="teamTypeContent.loading"
            :rules="[ruleUtil.required(), ruleUtil.maxLen(30)]"
            auto-select-first
            clearable
          ></v-combobox>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="姓名"
            v-model="teamContactData.EmpName"
            :rules="[ruleUtil.required()]"
            readonly
          >
            <template v-slot:prepend-inner>
              <v-menu
                :close-on-content-click="false"
                transition="slide-y-transition"
                origin="top left"
                offset-y
                rounded
                open-on-click
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-text="'mdi-magnify'"
                    v-on="on"
                    v-bind="attrs"
                  ></v-icon>
                </template>
                <v-card width="auto" height="auto" class="pa-2">
                  <v-autocomplete
                    label="尋找嘉基人"
                    v-model="userInfoParam.selected"
                    :items="userInfoContent.rst"
                    :loading="userInfoContent.loading"
                    item-text="name"
                    return-object
                    auto-select-first
                    clearable
                    :search-input.sync="userInfoParam.search"
                    :filter="filterEmp"
                    flat
                    solo-inverted
                    hide-details
                  ></v-autocomplete>
                </v-card>
              </v-menu>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="分機"
            v-model="teamContactData.Ext"
            clearable
            :rules="[ruleUtil.maxLen(10)]"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="MVPN"
            v-model="teamContactData.Mvpn"
            clearable
            :rules="[ruleUtil.maxLen(10)]"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-card-actions>
            <v-btn :disabled="!valid" @click="$emit('save')" color="primary">
              <v-icon left> mdi-content-save </v-icon>存檔
            </v-btn>
            <v-btn
              :disabled="!teamContact.REC_NO"
              @click="$emit('delete')"
              color="primary"
            >
              <v-icon left> mdi-delete </v-icon>刪除
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </info-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import TeamContact from '@/models/team-contact';
import InfoDialog from './utils/InfoDialog.vue';
import { hrApi, ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';
import hrRoutes from '@/services/hr-routes';
import RecShortCode from '@/models/rec-short-code';
import ApiResult from '@/models/api-result';
import ApiContent from '@/models/api-content';
import UserInfo from '@/models/user-info';
import ruleUtil from '@/libs/rule-util';

export default Vue.extend({
  components: { InfoDialog },

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
    hideOverlay: {
      type: Boolean,
      default: true
    },
    teamContact: {
      type: Object as PropType<TeamContact>
    }
  },

  data() {
    return {
      teamContactData: this.teamContact,
      teamTypeContent: new ApiContent<ApiResult<RecShortCode[]>>(),
      userInfoContent: new ApiContent<UserInfo[]>({ rst: [] }),
      userInfoParam: {
        search: null,
        selected: ((): UserInfo => null)(),
        timer: null
      },
      ruleUtil,
      valid: false
    };
  },

  computed: {
    teamTypes(): string[] {
      return this.teamTypeContent.rst.Data?.map(t => t.FULLNAME) ?? [];
    }
  },

  methods: {
    initConfig() {
      this.getTeamType();
      this.userInfoParam.selected = null;
    },
    initData() {
      this.teamContactData = this.teamContact;
    },
    getTeamType() {
      ndbApi.get(
        this.teamTypeContent,
        ndbRoutes.RecShortCode.GetRecShortCode + 1,
        {
          params: new RecShortCode({
            RECMODEL: 'TeamContact',
            GROUPCODE: 'TeamType',
            isActive: '1'
          })
        }
      );
    },
    searchEmp() {
      if (!this.userInfoParam.search?.trim()) return;
      console.log('searchEmp');
      hrApi.get(
        this.userInfoContent,
        hrRoutes.SearchEmp.UserInfos + this.userInfoParam.search
      );
    },
    filterEmp(emp: UserInfo, filterText: string) {
      filterText = filterText.toLowerCase();
      return (
        emp.empid.includes(filterText) ||
        emp.name.toLowerCase().includes(filterText) ||
        emp.ext.includes(filterText) ||
        emp.mvpn.includes(filterText) ||
        emp.depPos_Name.toLowerCase().includes(filterText)
      );
    }
  },

  watch: {
    value(show) {
      if (show) this.initConfig();
    },
    teamContact() {
      // prop teamContact 參考若有異動，teamContactData 便指向 prop teamContact
      this.initData();
    },
    'userInfoParam.search': function () {
      // cancel pending call
      clearTimeout(this.userInfoParam.timer);
      // delay new call
      this.userInfoParam.timer = setTimeout(this.searchEmp, 1000);
    },
    'userInfoParam.selected': function (emp: UserInfo) {
      if (!emp) return;
      this.teamContactData.EmpNo = emp?.empid ?? '';
      this.teamContactData.EmpName = emp?.name ?? '';
      this.teamContactData.Ext = emp?.ext ?? '';
      this.teamContactData.Mvpn = emp?.mvpn ?? '';
    }
  }
});
</script>
