<template>
  <v-app>
    <app-bar @nav-click="nav = !nav" />

    <app-nav v-model="nav" />

    <app-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from './components/AppBar.vue';
import AppNav from './components/AppNav.vue';
import AppView from './components/AppView.vue';

export default Vue.extend({
  name: 'App',

  components: { AppBar, AppNav, AppView },

  data: () => ({
    nav: false
  })
});
</script>
