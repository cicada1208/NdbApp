<template>
  <div>
    <v-dialog
      v-if="dialog"
      :value="loading"
      @input="$emit('input', $event)"
      :hide-overlay="hideOverlay"
      persistent
      width="300"
    >
      <v-card color="primary" dark style="opacity: 85%">
        <v-card-text class="pt-1">
          loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-else
      :value="loading"
      @input="$emit('input', $event)"
      :timeout="-1"
      app
      centered
      color="transparent"
      elevation="0"
      content-class="text-center"
    >
      <v-progress-circular indeterminate color="primary" size="70">
        loading
      </v-progress-circular>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoadingDialog',

  model: {
    prop: 'loading',
    event: 'input'
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    hideOverlay: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: true
    }
  }
});
</script>
