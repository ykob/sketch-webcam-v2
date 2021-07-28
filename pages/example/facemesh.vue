<template lang="pug">
div
  Loading(
    v-if = 'isInitialized === false'
    )
    |初期化しています
  Setup(
    v-else-if = 'isLoadingCamera === false'
    @click = 'setupVideo'
    )
  Loading(
    v-else-if = 'isLoadedCamera === false'
    )
    |カメラを有効にしています
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
    isInitialized: false,
    isLoadingCamera: false,
    isLoadedCamera: false,
  }),
  async mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement

    webgl = new WebGLContent(canvas)
    await webgl.start()

    window.addEventListener('resize', this.resize)
    window.addEventListener('deviceorientation', this.resize)

    this.resize()
    this.update()
    this.isInitialized = true
  },
  methods: {
    update() {
      if (webgl !== null) webgl.update()
      requestAnimationFrame(() => {
        this.update()
      })
    },
    resize() {
      if (webgl !== null) webgl.resize()
    },
    async setupVideo() {
      const video = this.$refs.video as HTMLVideoElement

      this.isLoadingCamera = true
      await this.$video
        .start(video)
        .then(() => {
          this.isLoadedCamera = true
        })
        .catch(() => {
          alert('カメラを有効にできませんでした。')
        })
      
      if (webgl !== null) webgl.setVideo(video)
    },
  },
})
</script>

<style lang="scss" scoped>
video {
  width: 240px;
  display: block;
  position: absolute;
  bottom: 24px;
  right: 24px;
  z-index: z(video);
}
canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: z(canvas);
}
</style>
