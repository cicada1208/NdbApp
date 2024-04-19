<template>
  <v-toolbar-title>
    <span class="mr-1 text-body-1">{{ title }}</span>
    <v-chip outlined small>{{ nisPatInfo.bedLabel }}</v-chip>
    <v-chip outlined small>{{ nisPatInfo.PatName }}</v-chip>
    <v-chip outlined small>{{ nisPatInfo.PatNo }}</v-chip>
  </v-toolbar-title>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import NisPatInfo from '@/models/nis-pat-info';

export default Vue.extend({
  name: 'PatInfoTitle',

  props: {
    title: String,
    nisPatInfo: {
      type: Object as PropType<NisPatInfo>
    }
  }
});
</script>
