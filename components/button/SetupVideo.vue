<template lang="pug">
ButtonBase(
  :width = 'size.width'
  :height = 'size.width'
  :radius = 'size.radius'
  role = 'white'
  @click = '$emit("click", $event)'
  )
  IconVideo(
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
    size(): { [key: string]: string } {
      const size = (): number => {
        switch (this.breakPoint) {
          case 'sm':
            return 48
          case 'md':
            return 60
          case 'lg':
          default:
            return 72
        }
      }
      return {
        width: `${size()}px`,
        radius: `${size() / 2}px`,
      }
    },
    iconSize(): number {
      switch (this.breakPoint) {
        case 'sm':
          return 32
        case 'md':
          return 40
        case 'lg':
        default:
          return 48
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
