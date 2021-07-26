<template lang="pug">
.button(
  :is = 'tag'
  :to = 'to'
  :style = 'styles'
  :class = 'classnames'
  @click = '$emit("click", $event)'
  )
  slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '48px',
    },
    role: {
      type: String,
      default: 'transparent',
    },
    radius: {
      type: String,
      default: '24px',
    },
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.radius,
      }
    },
    classnames() {
      return [`${this.role}`]
    },
  },
})
</script>

<style lang="scss" scoped>
.button {
  appearance: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  transition-duration: 0.4s;
  &:active {
    transition-duration: 0.1s;
  }
  &.transparent {
    color: currentColor;
    background-color: transparent;
    transition-property: background-color;
    &:hover {
      background-color: rgba(#fff, 0.2);
    }
    &:active {
      background-color: rgba(#fff, 0.4);
    }
  }
}
</style>
