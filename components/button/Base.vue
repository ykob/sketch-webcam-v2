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
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles(): { [key: string]: string } {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.radius,
      }
    },
    classnames(): string[] {
      return [
        `${this.role}`,
        ...Object
          .entries({
            'is-selected': this.selected,
          })
          .filter(o => {
            return o[1] === true
          })
          .map(o => {
            return o[0]
          }),
      ]
    },
  },
})
</script>

<style lang="scss" scoped>
.button {
  appearance: none;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
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
  &.white {
    color: #222;
    background-color: #fff;
    font-weight: 700;
    transition-property: color, background-color;
    &.is-selected {
      background-color: #fb3;
    }
    &:hover {
      background-color: #fb3;
    }
    &:active {
      background-color: #ff9;
    }
  }
}
</style>
