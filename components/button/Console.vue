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
      return `${48}px`
    },
  },
})
</script>

<style lang="scss" scoped></style>
