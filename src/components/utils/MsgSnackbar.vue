<template>
  <!-- or using @input="visibleChange" -->
  <v-snackbar
    v-if="show"
    :value="show"
    :color="msgColor"
    :timeout="timeout"
    @input="$emit('input', $event)"
    :centered="centered"
    :top="top"
    :bottom="bottom"
    app
  >
    <span class="text-break">{{ msgText }}</span>
    <template v-slot:action="{ attrs }">
      <v-icon v-bind="attrs" @click="$emit('input', false)">
        mdi-close-circle
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import msgParam from '@/params/msg-param';

export default Vue.extend({
  name: 'MsgSnackbar',

  model: {
    prop: 'show',
    event: 'input'
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: [Boolean, String],
      default: false,
      //required: true,
      validator: function (value) {
        return (
          [true, false, 'success', 'error', 'warning', 'info'].indexOf(
            value
          ) !== -1
        );
      }
    },
    msg: {
      type: [String, Object],
      default: ''
    },
    timeout: {
      type: Number,
      default: 5000
    },
    centered: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: true
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    msgText(): string {
      let result = this.msg;
      if (!this.show) return this.msg; // 處理訊息消失時的訊息變化
      if (!this.msg) {
        if (!this.type || this.type === 'error') result = msgParam.apiFailure;
        else result = msgParam.apiSuccess;
      }
      return result;
    },
    msgColor(): string {
      let result: string;
      if (!this.show) return 'transparent'; // 處理訊息消失時的顏色變化
      if (!this.type) result = 'error';
      else if (this.type === true) result = 'success';
      else result = this.type;
      return result;
    }
  },

  methods: {
    visibleChange(visible) {
      console.log('visible:', visible);
      this.$emit('input', visible);
    }
  }
});
</script>
