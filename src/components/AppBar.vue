<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('nav-click')"></v-app-bar-nav-icon>

    <v-toolbar-title class="ml-n3 mr-6">
      <template v-if="!isProd"> 【{{ appRun }}】 </template>
      {{ appTitle }}：{{ routeTitle }}
    </v-toolbar-title>

    <clinical-select v-model="clinicalSelected" />

    <v-spacer />

    <v-toolbar-items>
      <v-menu
        open-on-hover
        :close-on-content-click="false"
        transition="slide-y-transition"
        origin="top left"
        rounded
        min-width="200px"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar color="grey darken-1" size="40">
              <span class="white--text text-body-1">{{
                user.loggedIn ? user.userTerseName : '登入'
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text v-if="user.loggedIn" class="text-center">
            <v-avatar color="grey darken-1" size="60">
              <span class="white--text text-h5">{{ user.userTerseName }}</span>
            </v-avatar>
            <!-- <div class="text-body-1 mt-2">{{ user.UserName }}</div> -->
            <div class="text-body-1 mt-2">
              {{ user.loginId }}
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn
              v-if="!user.loggedIn"
              @click="login"
              rounded
              text
              outlined
              block
            >
              <v-icon left> mdi-login </v-icon> 登入
            </v-btn>
            <v-btn v-else @click="logout" rounded text outlined block>
              <v-icon left> mdi-logout </v-icon> 登出
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import Users from '@/models/users';
import store from '@/store';
import Vue from 'vue';
import ClinicalSelect from './ClinicalSelect.vue';
// import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  components: { ClinicalSelect },

  data: () => ({
    // routeTitle: ''
    appTitle: process.env.VUE_APP_TITLE,
    appRun: process.env.VUE_APP_RUN
  }),

  computed: {
    // ...mapState('auth', ['user']),
    user(): Users {
      return store.state.auth.user;
    },
    clinicalSelected: {
      get() {
        return store.state.clinical.clinicalSelected;
      },
      set(value) {
        this.$store.dispatch('clinical/setClinicalSelected', value);
      }
    },
    routeTitle() {
      return this.$store.state.route.meta.title; // current route title
    },
    isProd() {
      return this.appRun === 'prod' ? true : false;
    }
  },

  methods: {
    login() {
      if (this.$router.currentRoute.path != '/login')
        this.$router.push('/login');
    },
    logout() {
      this.$store.dispatch('auth/logout');
    }
    // ...mapActions('auth', ['logout'])
  }

  // watch: {
  //   $route(route) {
  //     this.routeTitle = route.meta.title;
  //   }
  // }
});
</script>
