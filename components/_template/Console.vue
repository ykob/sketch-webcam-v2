<template lang="pug">
.console
  ExampleOutline.console__outline(
    :title = 'title'
    )
  ButtonBackIndex.console__back-index
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
  },
})
</script>

<style lang="scss" scoped>
.console {
  &__outline {
    position: absolute;
    z-index: z(console);
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
  }
  &__back-index {
    position: absolute;
    z-index: z(console);
    @include l-lg {
      top: 40px;
      right: 40px;
    }
    @include l-md {
      top: 32px;
      right: 32px;
    }
    @include l-sm {
      top: 24px;
      right: 24px;
    }
  }
}
</style>
