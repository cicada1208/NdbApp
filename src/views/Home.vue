<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="csAssignGroupHeaders"
          :items="csAssignGroups"
          :loading="csAssignGroupContent.loading"
          :items-per-page="-1"
          multi-sort
          hide-default-footer
          class="table-header elevation-2"
        >
          <template v-slot:top>
            <v-toolbar color="secondary" dark dense>
              護理組別

              <v-row class="ml-4">
                <v-item-group
                  v-model="timeIntervalSelected"
                  mandatory
                  class="d-flex"
                >
                  <v-col cols="auto" v-for="ti in timeInterval" :key="ti.key">
                    <v-item :value="ti.key" v-slot="{ active, toggle }">
                      <v-btn
                        @click="toggle"
                        :color="active ? 'color-basil' : 'white'"
                        :outlined="!active"
                        small
                        class="px-0"
                      >
                        {{ ti.text }}
                      </v-btn>
                    </v-item>
                  </v-col>
                </v-item-group>
              </v-row>
            </v-toolbar>
          </template>

          <template v-slot:item.checkItems="{ item }">
            <v-chip
              v-for="(check, idx) in splitContent(item.checkItems)"
              :key="idx"
              dark
              class="ma-1 color-terra-cotta"
            >
              <span>{{ check }}</span>
            </v-chip>
          </template>

          <template v-slot:item.beds="{ item }">
            <v-chip
              v-for="(bed, idx) in splitContent(item.beds)"
              :key="idx"
              dark
              class="ma-1 color-pine"
            >
              <span style="min-width: 50px">{{ bed }}</span>
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="12" md="5">
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="medicalTeamHeaders"
                  :items="medicalTeams"
                  :loading="medicalTeamContent.loading"
                  :items-per-page="5"
                  multi-sort
                  class="table-header elevation-2"
                >
                  <template v-slot:top>
                    <v-toolbar color="secondary" dark dense>
                      醫療團隊
                    </v-toolbar>
                  </template>

                  <template v-slot:item.VsName="{ item }">
                    <v-chip dark class="ma-1 indigo lighten-1">
                      {{ `${item.VsName} ${item.Mvpn}` }}
                    </v-chip>
                  </template>

                  <template v-slot:item.NPPGY="{ item }">
                    <v-chip
                      v-for="(nppgy, idx) in item.NPPGY"
                      :key="idx"
                      dark
                      class="ma-1 color-candy-pink"
                    >
                      <v-badge :content="nppgy.Type" color="info" inline left>
                        {{ `${nppgy.Name} ${nppgy.Mvpn}` }}
                      </v-badge>
                    </v-chip>
                  </template>
                </v-data-table>
              </v-col>

              <v-col cols="12">
                <v-data-table
                  :headers="drDutyScheduleHeaders"
                  :items="drDutySchedules"
                  :loading="drDutyScheduleContent.loading"
                  :items-per-page="5"
                  multi-sort
                  class="table-header elevation-2"
                >
                  <template v-slot:top>
                    <v-toolbar color="secondary" dark dense> 值班 </v-toolbar>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-row>
              <v-col cols="12">
                <v-toolbar color="secondary" dark dense>
                  <span>團隊說明</span>
                  <v-btn @click.stop="editTeamNote" icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-textarea
                  v-model="teamNote.Note"
                  :loading="teamNoteContent.loading"
                  readonly
                  rows="9"
                  outlined
                  filled
                  hide-details="auto"
                  class="elevation-2"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-data-table
                  :headers="disasterAssistanceHeaders"
                  :items="disasterAssistances"
                  :loading="disasterAssistanceContent.loading"
                  :items-per-page="-1"
                  hide-default-footer
                  multi-sort
                  class="table-header elevation-2"
                >
                  <template v-slot:top>
                    <v-toolbar color="secondary" dark dense>
                      災難協助
                    </v-toolbar>
                  </template>

                  <template v-slot:item.Beds="{ item }">
                    <v-chip
                      v-for="(bed, idx) in splitContent(item.Beds)"
                      :key="idx"
                      dark
                      class="ma-1 brown lighten-2"
                    >
                      <span style="min-width: 50px">{{ bed }}</span>
                    </v-chip>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-data-table
              :headers="teamContactHeaders"
              :items="teamContacts"
              :loading="teamContactContent.loading"
              :items-per-page="10"
              multi-sort
              class="table-header elevation-2"
            >
              <template v-slot:top>
                <v-toolbar color="secondary" dark dense>
                  <span>團隊聯繫</span>
                  <v-btn @click.stop="newTeamContact" icon>
                    <v-icon>mdi-pencil-plus</v-icon>
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.Action="{ item }">
                <v-icon class="mr-2" @click="editTeamContact(item)">
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <team-note-edit
      v-model="teamNoteEditParam.dialog"
      :teamNote="teamNoteEditParam.selected"
      @close="showDialogTeamNote"
      @save="saveTeamNote"
      :width="600"
      :hideOverlay="false"
    />

    <team-contact-edit
      v-model="teamContactEditParam.dialog"
      :teamContact="teamContactEditParam.selected"
      @close="showDialogTeamContact"
      @save="saveTeamContact"
      @delete="deleteTeamContact"
      :width="600"
      :hideOverlay="false"
    />

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
import CSAssignGroup from '@/models/cs-assign-group';
import DrDutySchedule from '@/models/dr-duty-schedule';
import MedicalTeam from '@/models/medical-team';
import TeamNote from '@/models/team-note';
import TeamContact from '@/models/team-contact';
import Users from '@/models/users';
import DisasterAssistance from '@/models/disaster-assistance';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';
import store from '@/store';
import moment from 'moment';
import Vue from 'vue';
import { TimeIntervalKey, timeInterval } from '@/types/time-interval';
import TeamContactEdit from '@/components/TeamContactEdit.vue';
import TeamNoteEdit from '@/components/TeamNoteEdit.vue';

export default Vue.extend({
  components: { TeamContactEdit, TeamNoteEdit },

  data() {
    return {
      csAssignGroupContent: new ApiContent<ApiResult<CSAssignGroup[]>>(),
      timeInterval,
      timeIntervalSelected: ((): TimeIntervalKey => 'D')(),
      medicalTeamContent: new ApiContent<ApiResult<MedicalTeam[]>>(),
      drDutyScheduleContent: new ApiContent<ApiResult<DrDutySchedule[]>>(),
      teamNoteContent: new ApiContent<ApiResult<TeamNote[]>>(),
      teamNoteEditParam: {
        dialog: false,
        selected: new TeamNote()
      },
      disasterAssistanceContent: new ApiContent<
        ApiResult<DisasterAssistance[]>
      >(),
      teamContactContent: new ApiContent<ApiResult<TeamContact[]>>(),
      teamContactEditParam: {
        dialog: false,
        selected: new TeamContact()
      }
    };
  },

  computed: {
    clinicalSelected(): ClinicalUnit {
      return store.state.clinical.clinicalSelected;
    },
    user(): Users {
      return store.state.auth.user;
    },
    csAssignGroups(): CSAssignGroup[] {
      return this.csAssignGroupContent.rst.Data ?? [];
    },
    csAssignGroupHeaders() {
      return [
        { text: '姓名', value: 'userName', class: 'text-no-wrap' },
        { text: '職級', value: 'proTitleLevelLabel', class: 'text-no-wrap' },
        { text: '班別', value: 'itemName', class: 'text-no-wrap' },
        {
          text: '班別',
          value: 'timeInterval',
          class: 'd-none',
          cellClass: 'd-none',
          filter: value => {
            if (value === this.timeIntervalSelected) return true;
            else return false;
          }
        },
        { text: '組別', value: 'teamName', class: 'text-no-wrap' },
        { text: '編組', value: 'checkItems' },
        { text: '床號', value: 'beds' }
      ];
    },
    medicalTeams(): MedicalTeam[] {
      return this.medicalTeamContent.rst.Data ?? [];
    },
    medicalTeamHeaders() {
      return [
        { text: '科別', value: 'PatDeptName', class: 'text-no-wrap' },
        { text: '主治醫師', value: 'VsName', class: 'text-no-wrap' },
        { text: '團隊聯繫', value: 'NPPGY' }
      ];
    },
    drDutySchedules(): DrDutySchedule[] {
      return this.drDutyScheduleContent.rst.Data ?? [];
    },
    drDutyScheduleHeaders() {
      return [
        { text: '值班線別', value: 'SchName', class: 'text-no-wrap' },
        { text: '團隊', value: 'DrType', class: 'text-no-wrap' },
        { text: '姓名', value: 'DrName', class: 'text-no-wrap' },
        { text: '聯繫', value: 'Mvpn', class: 'text-no-wrap' }
      ];
    },
    teamNote(): TeamNote {
      return this.teamNoteContent.rst.Data?.[0] ?? new TeamNote();
    },
    disasterAssistances(): DisasterAssistance[] {
      return this.disasterAssistanceContent.rst.Data ?? [];
    },
    disasterAssistanceHeaders() {
      return [
        { text: 'ADL', value: 'ADL', class: 'text-no-wrap' },
        { text: '床號', value: 'Beds' }
      ];
    },
    teamContacts(): TeamContact[] {
      return (
        this.teamContactContent.rst.Data?.filter(Boolean).sort((a, b) =>
          a.TeamType.localeCompare(b.TeamType)
        ) ?? []
      );
    },
    teamContactHeaders() {
      return [
        { text: '團隊', value: 'TeamType', class: 'text-no-wrap' },
        { text: '姓名', value: 'EmpName', class: 'text-no-wrap' },
        { text: '分機', value: 'Ext', class: 'text-no-wrap' },
        { text: 'MVPN', value: 'Mvpn', class: 'text-no-wrap' },
        {
          text: '',
          value: 'Action',
          sortable: false,
          align: 'end'
        }
      ];
    },
    isLoading(): boolean {
      return (
        this.csAssignGroupContent.loading ||
        this.medicalTeamContent.loading ||
        this.drDutyScheduleContent.loading ||
        this.teamNoteContent.loading ||
        this.disasterAssistanceContent.loading ||
        this.teamContactContent.loading
      );
    }
  },

  methods: {
    load() {
      this.getCSAssignGroup();
      this.getMedicalTeam();
      this.getDrDutySchedule();
      this.getTeamNote();
      this.getDisasterAssistance();
      this.getTeamContact();
    },
    getCSAssignGroup() {
      ndbApi.get(
        this.csAssignGroupContent,
        ndbRoutes.CSAssignMain.GetCSAssignGroup,
        {
          params: {
            clinicalUnitId: this.clinicalSelected.clinicalUnitId,
            assignDate: moment().format('YYYY-MM-DD')
          }
        }
      );
    },
    getMedicalTeam() {
      ndbApi.get(
        this.medicalTeamContent,
        ndbRoutes.MedicalTeam.GetMedicalTeam,
        {
          params: {
            clinicalUnitId: this.clinicalSelected.clinicalUnitId
          }
        }
      );
    },
    getDrDutySchedule() {
      ndbApi.get(
        this.drDutyScheduleContent,
        ndbRoutes.MedicalTeam.GetDrDutySchedule,
        {
          params: {
            clinicalUnitId: this.clinicalSelected.clinicalUnitId
          }
        }
      );
    },
    getTeamNote() {
      if (this.clinicalSelected.clinicalUnitId === '')
        this.teamNoteContent.rst.Data = [];
      else
        ndbApi.get(this.teamNoteContent, ndbRoutes.TeamNote.Controller, {
          params: new TeamNote({
            ClinicalUnitId: this.clinicalSelected.clinicalUnitId,
            REC_STATUS: ' '
          })
        });
    },
    getDisasterAssistance() {
      ndbApi.get(
        this.disasterAssistanceContent,
        ndbRoutes.MedicalTeam.GetDisasterAssistance,
        {
          params: { clinicalUnitId: this.clinicalSelected.clinicalUnitId }
        }
      );
    },
    getTeamContact() {
      if (this.clinicalSelected.clinicalUnitId === '')
        this.teamContactContent.rst.Data = [];
      else
        ndbApi.get(this.teamContactContent, ndbRoutes.TeamContact.Controller, {
          params: new TeamContact({
            ClinicalUnitId: this.clinicalSelected.clinicalUnitId,
            REC_STATUS: ' '
          })
        });
    },
    splitContent(content: string, split = ',') {
      if (content) return content.split(split);
      else return [];
    },
    showDialogTeamNote() {
      this.teamNoteEditParam.dialog = !this.teamNoteEditParam.dialog;
    },
    editTeamNote() {
      this.teamNoteEditParam.selected = new TeamNote(this.teamNote);
      this.showDialogTeamNote();
    },
    async saveTeamNote() {
      this.teamNoteEditParam.selected.ClinicalUnitId =
        this.clinicalSelected.clinicalUnitId;
      this.teamNoteEditParam.selected.MD_MAN = this.user.loginId;
      this.teamNoteEditParam.selected.MD_NAME = this.user.userName;

      const TeamNoteRst: ApiResult<TeamNote> = await ndbApi.methodPs(
        ndbRoutes.TeamNote.Controller,
        {
          method: this.teamNoteEditParam.selected.REC_NO ? 'PUT' : 'POST',
          data: this.teamNoteEditParam.selected
        }
      );

      if (TeamNoteRst.Succ) {
        this.showDialogTeamNote();
        this.getTeamNote();
      }
    },
    showDialogTeamContact() {
      this.teamContactEditParam.dialog = !this.teamContactEditParam.dialog;
    },
    newTeamContact() {
      this.teamContactEditParam.selected = new TeamContact();
      this.showDialogTeamContact();
    },
    editTeamContact(team: TeamContact) {
      this.teamContactEditParam.selected = new TeamContact(team);
      this.showDialogTeamContact();
    },
    async saveTeamContact() {
      this.teamContactEditParam.selected.ClinicalUnitId =
        this.clinicalSelected.clinicalUnitId;
      this.teamContactEditParam.selected.MD_MAN = this.user.loginId;
      this.teamContactEditParam.selected.MD_NAME = this.user.userName;

      const TeamContactRst: ApiResult<TeamContact> = await ndbApi.methodPs(
        ndbRoutes.TeamContact.Controller,
        {
          method: this.teamContactEditParam.selected.REC_NO ? 'PUT' : 'POST',
          data: this.teamContactEditParam.selected
        }
      );

      if (TeamContactRst.Succ) {
        this.showDialogTeamContact();
        this.getTeamContact();
      }
    },
    async deleteTeamContact() {
      const TeamContactRst: ApiResult<TeamContact> = await ndbApi.patchPs(
        ndbRoutes.TeamContact.Controller,
        {
          data: {
            REC_NO: this.teamContactEditParam.selected.REC_NO,
            REC_STATUS: 'D',
            MD_MAN: this.user.loginId,
            MD_NAME: this.user.userName
          }
        }
      );

      if (TeamContactRst.Succ) {
        this.showDialogTeamContact();
        this.getTeamContact();
      }
    }
  },

  watch: {
    clinicalSelected() {
      this.load();
    }
  },

  created() {
    this.load();
  }
});
</script>
