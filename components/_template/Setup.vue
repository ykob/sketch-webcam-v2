<template lang="pug">
.setup
  div
    div
      |カメラを有効にしてください。
    ButtonSetupVideo.btn(
      @click = '$emit("click", $event)'
      )
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.setup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: z(setupVideo);
  color: #fff;
  background-color: #222;
}
</style>
