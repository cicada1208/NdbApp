<template>
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    v-on="$listeners"
  >
    <template v-slot:title>
      <pat-info-title title="診斷" :nisPatInfo="nisPatInfo" />
    </template>

    <v-card
      v-if="nisPatInfo.odrDiag"
      color="color-cornsilk"
      class="mb-4"
      outlined
      hover
    >
      <v-card-text class="text-pre-line">
        {{ nisPatInfo.odrDiag }}
      </v-card-text>
    </v-card>

    <v-card
      v-for="(diag, i) in diags"
      :key="i"
      color="color-cornsilk"
      class="mb-4"
      outlined
      hover
    >
      <v-list-item>
        <v-alert
          border="left"
          colored-border
          color="color-pine"
          class="mr-6 color-cornsilk text-body-2 my-auto"
          dense
          >{{ diag.encDiagTitle }}</v-alert
        >
        <v-chip class="mr-12" color="color-pine" dark small>
          {{ diag.encDiagNo }}
        </v-chip>
        <v-list-item-content>
          <v-list-item-subtitle class="text-wrap">
            {{ diag.encDiagCh }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-wrap">
            {{ diag.encDiagEn }}
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

export default Vue.extend({
  name: 'PatInfoDiag',

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

  computed: {
    diags() {
      interface IDiag {
        encDiagTitle?: string;
        encDiagNo?: string;
        encDiagCh?: string;
        encDiagEn?: string;
      }

      let result: IDiag[] = [];

      for (let i = 1; i <= 5; i++) {
        if (this.nisPatInfo?.[`encDiagNo${i}`] !== '') {
          result.push({
            encDiagTitle: `入院診斷 ${i}`,
            encDiagNo: this.nisPatInfo[`encDiagNo${i}`],
            encDiagCh: this.nisPatInfo[`encDiagCh${i}`],
            encDiagEn: this.nisPatInfo[`encDiagEn${i}`]
          });
        }
      }

      return result;
    }
  }
});
</script>
