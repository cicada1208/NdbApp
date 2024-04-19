<template>
  <v-main>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>

    <msg-snackbar v-model="msgShow" v-bind="msg" />

    <v-btn
      v-show="toTopVisible"
      v-scroll="scroll"
      @click="toTop"
      fixed
      right
      bottom
      fab
      small
      color="primary"
      style="opacity: 70%"
    >
      <v-icon> mdi-chevron-up </v-icon>
    </v-btn>
  </v-main>
</template>

<script lang="ts">
import Msg from '@/models/msg';
import Vue from 'vue';
import MsgSnackbar from '@/components/utils/MsgSnackbar.vue';
import store from '@/store';

export default Vue.extend({
  components: { MsgSnackbar },

  data: () => ({
    toTopVisible: false
  }),

  computed: {
    msg(): Msg {
      return store.state.alert.msg;
    },
    msgShow: {
      get() {
        return store.state.alert.msg.show;
      },
      set() {
        this.$store.dispatch('alert/setMsg', {});
      }
    }
  },

  methods: {
    scroll(e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.toTopVisible = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
});
</script>
