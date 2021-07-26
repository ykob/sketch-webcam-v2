<template lang="pug">
div
  Setup(
    v-if = '!isCameraLoaded'
    @click = 'setupVideo'
    )
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
  data: () => ({
    isCameraLoaded: false,
  }),
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement

    webgl = new WebGLContent(canvas)
    webgl.start()

    window.addEventListener('resize', this.resize)
    window.addEventListener('deviceorientation', this.resize)
  },
  methods: {
    resize() {
      if (webgl !== null) webgl.resize()
    },
    async setupVideo() {
      const video = this.$refs.video as HTMLVideoElement

      await this.$video
        .start(video)
        .then(() => {
          this.isCameraLoaded = true
        })
        .catch(() => {
          alert('カメラを有効にできませんでした。')
        })
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
