<template>
  <info-dialog
    :value="value"
    :width="width"
    :fullscreen="fullscreen"
    :hideOverlay="hideOverlay"
    v-on="$listeners"
  >
    <template v-slot:title> 團隊說明 </template>

    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="teamNoteData.Note"
          rows="10"
          auto-grow
          outlined
          filled
          hide-details="auto"
          class="elevation-2"
        ></v-textarea>
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-card-actions>
          <v-btn @click="$emit('save')" color="primary">
            <v-icon left> mdi-content-save </v-icon>存檔
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </info-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import TeamNote from '@/models/team-note';
import InfoDialog from './utils/InfoDialog.vue';

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
    teamNote: {
      type: Object as PropType<TeamNote>
    }
  },

  data() {
    return {
      teamNoteData: this.teamNote
    };
  },

  methods: {
    initData() {
      this.teamNoteData = this.teamNote;
    }
  },

  watch: {
    teamNote() {
      this.initData();
    }
  }
});
</script>
