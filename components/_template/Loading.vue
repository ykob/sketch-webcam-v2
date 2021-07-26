<template lang="pug">
.loading
  IconLoading(
    size = '80'
    )
  div
    slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: z(setupVideo);
  color: #fff;
  background-color: #222;
  svg {
    animation-name: rotate;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}
</style>
