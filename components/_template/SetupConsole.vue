<template lang="pug">
.setup-console
  .setup-console__text
    |Let enable the webcam.
  ButtonSetupVideo(
    @click = '$emit("click", $event)'
    )
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.setup-console {
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
  &__text {
    margin-bottom: 16px;
  }
}
</style>
