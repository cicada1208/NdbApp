<template>
  <v-row align="center">
    <v-col cols="auto">
      <v-autocomplete
        label="臨床單位"
        :value="value"
        @input="$emit('input', $event)"
        :items="clinicals"
        item-text="label"
        return-object
        :loading="clinicalContent.loading"
        :readonly="bedInfoContent.loading"
        auto-select-first
        flat
        solo-inverted
        hide-details
      >
        <template v-slot:prepend-inner>
          <v-menu
            open-on-hover
            :close-on-content-click="false"
            transition="slide-y-transition"
            origin="top left"
            offset-y
            rounded
          >
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-text="'mdi-magnify'" v-on="on" v-bind="attrs"></v-icon>
            </template>
            <v-card width="100" height="auto">
              <v-row class="flex-column mx-auto my-auto">
                <v-item-group v-model="bedInfoSelected" mandatory dark>
                  <template v-for="bi in bedInfoBadges">
                    <v-col cols="auto" :key="bi.key">
                      <v-item :value="bi.key" v-slot="{ active, toggle }">
                        <v-btn
                          :loading="bedInfoContent.loading"
                          :disabled="bedInfoContent.loading"
                          @click="getBedInfo(toggle)"
                          :color="active ? 'color-basil' : 'primary'"
                          :outlined="!active"
                          class="px-0"
                        >
                          <v-badge
                            :content="bi.value"
                            :value="bi.value"
                            color="info"
                            overlap
                            offset-x="0"
                            offset-y="4"
                          >
                            {{ bi.text }}
                          </v-badge>
                        </v-btn>
                      </v-item>
                    </v-col>
                  </template>
                </v-item-group>
              </v-row>
            </v-card>
          </v-menu>
        </template>
      </v-autocomplete>
    </v-col>

    <v-item-group v-model="bedInfoSelected" mandatory class="d-flex">
      <template v-for="bi in bedInfoBadges">
        <v-col
          cols="auto"
          :key="bi.key"
          v-if="$vuetify.breakpoint.width > 1010"
        >
          <v-item :value="bi.key" v-slot="{ active, toggle }">
            <v-btn
              :loading="bedInfoContent.loading"
              :disabled="bedInfoContent.loading"
              @click="getBedInfo(toggle)"
              :color="active ? 'color-basil' : 'white'"
              :outlined="!active"
              class="px-0"
            >
              <v-badge
                :content="bi.value"
                :value="bi.value"
                color="info"
                overlap
                offset-x="0"
                offset-y="4"
              >
                {{ bi.text }}
              </v-badge>
            </v-btn>
          </v-item>
        </v-col>
      </template>
    </v-item-group>
  </v-row>
</template>

<script lang="ts">
import ApiContent from '@/models/api-content';
import ApiResult from '@/models/api-result';
import Bed from '@/models/bed';
import BedInfo from '@/models/bed-info';
import ClinicalUnit from '@/models/clinical-unit';
import Users from '@/models/users';
import refreshParam from '@/params/refresh-param';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';
import store from '@/store';
import { BedInfoBadgeKey, IBedInfoBadge } from '@/types/bed-info-badge';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'ClinicalSelect',

  props: {
    value: {
      type: Object as PropType<ClinicalUnit>
    }
  },

  data() {
    return {
      clinicalContent: new ApiContent<ApiResult<ClinicalUnit[]>>(),
      bedInfoContent: new ApiContent<ApiResult<BedInfo>>(),
      bedInfoTimer: null
    };
  },

  computed: {
    user(): Users {
      return store.state.auth.user;
    },
    clinicals(): ClinicalUnit[] {
      return this.clinicalContent.rst.Data ?? [];
    },
    bedInfo(): BedInfo {
      return this.bedInfoContent.rst.Data ?? new BedInfo();
    },
    bedInfoBadges(): IBedInfoBadge[] {
      let result: IBedInfoBadge[] = [
        { key: 'all', text: '總床數', value: this.bedInfo.all },
        { key: 'inbed', text: '在床數', value: this.bedInfo.inbed },
        { key: 'empty', text: '空床數', value: this.bedInfo.empty },
        { key: 'add', text: '加床', value: this.bedInfo.add }
      ];

      return result;
    },
    bedInfoSelected: {
      get() {
        return store.state.clinical.bedInfoSelected;
      },
      set(value: BedInfoBadgeKey) {
        this.$store.dispatch('clinical/setBedInfoSelected', value);
      }
    }
  },

  methods: {
    getMyClinicalUnit() {
      ndbApi.get(
        this.clinicalContent,
        ndbRoutes.ClinicalUnit.GetMyClinicalUnit + 2,
        {
          params: {
            userId: this.user.userId
          }
        }
      );
    },
    getBedInfo(toggle = undefined) {
      if (toggle) toggle();
      ndbApi.get(this.bedInfoContent, ndbRoutes.Bed.GetBedInfo + 2, {
        params: new Bed({ clinicalUnitId: this.value?.clinicalUnitId })
      });
    }
  },

  watch: {
    'clinicalContent.loading': function (loading) {
      // 載入完畢預選第一筆
      if (!loading) this.$emit('input', this.clinicals?.[0]);
    },
    value() {
      this.getBedInfo();
    },
    'user.loginId': function () {
      this.getMyClinicalUnit();
    }
  },

  // created() {
  //   this.getMyClinicalUnit();
  // },

  mounted() {
    this.bedInfoTimer = setInterval(this.getBedInfo, refreshParam.bedInfo);
  },

  beforeDestroy() {
    if (this.bedInfoTimer) {
      clearInterval(this.bedInfoTimer);
    }
  }
});
</script>
