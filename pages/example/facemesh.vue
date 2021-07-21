<template lang="pug">
div
  video(
    ref = 'video'
    )
  canvas(
    ref = 'canvas'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import WebGLContent from '@/webgl/facemesh/'

let webgl

export default Vue.extend({
  async mounted() {
    const video = this.$refs.video as HTMLVideoElement
    const canvas = this.$refs.canvas as HTMLCanvasElement

    webgl = new WebGLContent(canvas)
    webgl.start()
    this.$video.start(video)
  },
})
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
