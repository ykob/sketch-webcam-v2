<template lang="pug">
ButtonBase(
  :width = 'size'
  :height = 'size'
  radius = '50%'
  role = 'white'
  tag = 'a'
  href = '/'
  @click = '$emit("click", $event)'
  )
  IconDotsVertical(
    :size = 'iconSize'
    )
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    breakPoint(): string {
      const { getters } = this.$store

      return getters.breakpoint
    },
    size(): string {
      const size = (): number => {
        switch (this.breakPoint) {
          case 'sm':
            return 36
          case 'md':
            return 48
          case 'lg':
          default:
            return 60
        }
      }
      return `${size()}px`
    },
    iconSize(): number {
      switch (this.breakPoint) {
        case 'sm':
          return 24
        case 'md':
          return 32
        case 'lg':
        default:
          return 40
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
