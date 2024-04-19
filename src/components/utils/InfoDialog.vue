<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    :width="width"
    :fullscreen="fullscreenData"
    :hide-overlay="hideOverlay"
    persistent
    scrollable
  >
    <v-card>
      <v-toolbar max-height="50" color="secondary" dark dense>
        <slot name="title" />
        <v-spacer></v-spacer>
        <v-btn @click.stop="fullscreenData = !fullscreenData" icon>
          <v-icon>mdi-open-in-new</v-icon
          ><!-- mdi-resize -->
        </v-btn>
        <v-btn @click.stop="$emit('close')" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="mt-4">
        <slot />
      </v-card-text>

      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InfoDialog',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 'none' // unset
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    hideOverlay: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      fullscreenData: this.fullscreen
    };
  }
});
</script>
