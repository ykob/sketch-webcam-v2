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

let webgl: WebGLContent | null = null

export default Vue.extend({
  async mounted() {
    const video = this.$refs.video as HTMLVideoElement
    const canvas = this.$refs.canvas as HTMLCanvasElement

    webgl = new WebGLContent(canvas)
    webgl.start()
    await this.$video.start(video)

    window.addEventListener('resize', this.resize)
    window.addEventListener('deviceorientation', this.resize)
  },
  methods: {
    resize() {
      if (webgl !== null) webgl.resize()
    },
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
