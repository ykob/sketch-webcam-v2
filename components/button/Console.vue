<template lang="pug">
ButtonBase(
  :width = 'size'
  :height = 'size'
  radius = '50%'
  role = 'white'
  :selected = 'selected'
  @click = '$emit("click", $event)'
  )
  slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    breakPoint(): string {
      const { getters } = this.$store

      return getters.breakpoint
    },
    size(): string {
      const size = (): number => {
        switch (this.breakPoint) {
          case 'sm':
            return 32
          case 'md':
            return 40
          case 'lg':
          default:
            return 48
        }
      }
      return `${size()}px`
    },
  },
})
</script>

<style lang="scss" scoped></style>
