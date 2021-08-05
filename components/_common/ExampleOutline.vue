<template lang="pug">
.example-outline
  .example-outline__site-title
    |sketch-of-webcam v2
  .example-outline__title
    |{{ title }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.example-outline {
  position: absolute;
  z-index: z(console);
  color: #fff;
  @include l-lg {
    top: 40px;
    left: 40px;
  }
  @include l-md {
    top: 32px;
    left: 32px;
  }
  @include l-sm {
    top: 24px;
    left: 24px;
  }
  &__site-title {
    line-height: 1;
    margin-top: 0;
    margin-bottom: 12px;
    @include l-lg {
      font-size: 14px;
    }
    @include l-md {
      font-size: 14px;
    }
    @include l-sm {
      font-size: 12px;
    }
  }
  &__title {
    line-height: 1;
    margin-top: 0;
    margin-bottom: 12px;
    @include l-lg {
      font-size: 32px;
    }
    @include l-md {
      font-size: 28px;
    }
    @include l-sm {
      font-size: 24px;
    }
  }
}
</style>
