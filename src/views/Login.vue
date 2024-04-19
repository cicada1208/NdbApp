<template>
  <v-container fluid fill-height>
    <v-card class="mx-auto" :width="$vuetify.breakpoint.xsOnly ? '95%' : 500">
      <!-- <v-toolbar color="secondary" dark dense>
        <v-toolbar-title class="text-body-1">登入</v-toolbar-title>
      </v-toolbar> -->

      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-card-text>
          <v-row class="text-center">
            <v-col cols="12">
              <v-icon size="150">mdi-account-circle</v-icon>
            </v-col>

            <v-col cols="12">
              <v-text-field
                ref="loginId"
                label="使用者帳號"
                v-model="user.loginId"
                :rules="[ruleUtil.required()]"
                prepend-icon="mdi-account"
                @keydown.enter.prevent="passwordRef.focus()"
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                ref="password"
                label="使用者密碼"
                v-model="user.password"
                :rules="[ruleUtil.required()]"
                :type="showPw ? 'text' : 'password'"
                :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock"
                @click:append="showPw = !showPw"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col cols="12">
              <v-btn type="submit" :disabled="!valid" color="primary" block>
                登入
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn @click="formRef.reset()" block> 取消 </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Users from '@/models/users';
import Vue from 'vue';
import ruleUtil from '@/libs/rule-util';

export default Vue.extend({
  data() {
    return {
      valid: false,
      ruleUtil,
      showPw: false,
      user: new Users()
    };
  },

  computed: {
    formRef() {
      return this.$refs.form as HTMLFormElement;
    },
    loginIdRef() {
      return this.$refs.loginId as HTMLInputElement;
    },
    passwordRef() {
      return this.$refs.password as HTMLInputElement;
    }
  },

  methods: {
    submit() {
      if (this.valid) this.$store.dispatch('auth/login', this.user);
    }
  },

  mounted() {
    this.loginIdRef.focus();
  }
});
</script>
