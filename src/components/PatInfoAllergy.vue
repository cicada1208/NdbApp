<template>
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    v-on="$listeners"
  >
    <template v-slot:title>
      <pat-info-title title="過敏內容" :nisPatInfo="nisPatInfo" />
    </template>

    <v-card
      v-for="(allergy, i) in nisPatInfo.Allergy"
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
          >{{ allergy.AllergyTypeName }}</v-alert
        >
        <v-list-item-content>
          <v-list-item-subtitle>
            {{ allergy.PRSNAME }}
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
  name: 'PatInfoAllergy',

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
  }
});
</script>
