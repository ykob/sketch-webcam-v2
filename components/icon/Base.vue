<template lang="pug">
svg(
  xmlns="http://www.w3.org/2000/svg"
  :width = 'size'
  :height = 'size'
  viewBox = '0 0 24 24'
  :aria-labelledby = 'iconName'
  role = 'presentation'
  v-bind = '$attrs'
  )
  title(
    :id = 'iconName'
    lang = 'en'
    )
    |{{ iconName }} icon
  g(
    :fill = 'fill'
    )
    slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    iconName: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 24,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
})
</script>

<style lang="scss" scoped>
svg {
  display: block;
  flex-shrink: 0;
}
</style>

