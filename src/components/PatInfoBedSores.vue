<template>
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    v-on="$listeners"
  >
    <template v-slot:title>
      <pat-info-title title="壓力性損傷評估" :nisPatInfo="nisPatInfo" />
    </template>

    <v-card
      v-for="(item, i) in bedSoresASEItems"
      :key="i"
      class="mb-1"
      outlined
      hover
    >
      <v-list-item dense>
        <v-alert class="ml-n4 text-body-2 my-auto" dense icon="mdi-pin">
          {{ item.Title }}</v-alert
        >
        <v-list-item-content class="text-right">
          <v-list-item-subtitle>
            {{ item.Value }} {{ item.Unit }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </info-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import NisPatInfo from '@/models/nis-pat-info';
import PatInfoTitle from './PatInfoTitle.vue';
import InfoDialog from './utils/InfoDialog.vue';
import ASEItem from '@/models/ase-item';
import ApiContent from '@/models/api-content';
import ApiResult from '@/models/api-result';
import { ndbApi } from '@/services';
import ndbRoutes from '@/services/ndb-routes';
import BedSoresASE from '@/models/bed-sores-ase';

export default Vue.extend({
  name: 'PatInfoBedSores',

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
      bedSoresContent: new ApiContent<ApiResult<ASEItem[]>>()
    };
  },

  computed: {
    bedSoresASEItems(): ASEItem[] {
      return this.bedSoresContent.rst.Data?.filter(f => f.Value) ?? [];
    }
  },

  methods: {
    getLatestBedSoresASEItem() {
      ndbApi.get(
        this.bedSoresContent,
        ndbRoutes.BedSoresASE.GetLatestBedSoresASEItem,
        {
          params: new BedSoresASE({
            ptEncounterID: this.nisPatInfo.ptEncounterId
          })
        }
      );
    }
  },

  watch: {
    value(show) {
      if (show) this.getLatestBedSoresASEItem();
    },
    'nisPatInfo.ptEncounterId': function (ptEncounterId) {
      if (!ptEncounterId) this.$emit('input', false);
      else if (this.value) this.getLatestBedSoresASEItem();
    }
  }
});
</script>
