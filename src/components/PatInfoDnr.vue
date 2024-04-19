<template>
  <!-- v-on="$listeners" 替換下列
    @input="$emit('input', $event)"
    @close="$emit('close')" 
  -->
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    v-on="$listeners"
  >
    <template v-slot:title>
      <pat-info-title title="末期醫療紀錄" :nisPatInfo="nisPatInfo" />
    </template>

    <v-list dense class="ma-n4">
      <template v-for="(dnr, dnrIdx) in nisPatInfo.DNR">
        <v-divider v-if="dnrIdx !== 0" :key="`${dnrIdx}-divider`" />
        <v-list-item :key="`${dnrIdx}-item`">
          <v-list-item-content v-text="dnr.dnr_info" />
        </v-list-item>
        <v-list :key="`${dnrIdx}-chklist`" v-if="dnr.dnr_chk_item.length > 0">
          <v-list-item
            v-for="(chk, chkInx) in dnr.dnr_chk_item"
            :key="`${chkInx}-chkitem`"
          >
            <v-list-item-icon>
              <v-icon color="success">mdi-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="chk" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-list>
  </info-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import NisPatInfo from '@/models/nis-pat-info';
import PatInfoTitle from './PatInfoTitle.vue';
import InfoDialog from './utils/InfoDialog.vue';

export default Vue.extend({
  name: 'PatInfoDnr',

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
