<template>
  <v-navigation-drawer
    app
    :value="nav"
    @input="$emit('input', $event)"
    :disable-resize-watcher="true"
  >
    <v-list-item two-line>
      <v-list-item-avatar color="transparent">
        <v-img :src="logo" max-width="40" contain />
      </v-list-item-avatar>

      <v-list-item-title
        class="text-body-1 font-weight-bold grey--text text--darken-2 text-wrap"
      >
        {{ now }}
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3" />

    <v-list nav dense>
      <v-list-item-group active-class="primary--text">
        <v-list-item v-for="(route, idx) in routes" :to="route.path" :key="idx">
          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ route.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import routes from '@/router/routes';
import logo from '@/assets/logo.png';
import moment from 'moment';

export default Vue.extend({
  model: {
    prop: 'nav',
    event: 'input'
  },

  props: {
    nav: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    routes: routes.filter(r => r.nav),
    logo,
    appTitle: process.env.VUE_APP_TITLE,
    now: '',
    timer: null
  }),

  mounted() {
    this.timer = setInterval(
      () => (this.now = moment().format('YYYY 年 MM 月 DD 日 dddd HH:mm')),
      1000
    );
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
});
</script>
