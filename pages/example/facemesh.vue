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
import * as tf from '@tensorflow/tfjs';
import * as fld from '@tensorflow-models/face-landmarks-detection';

let webgl: WebGLContent | null = null
let model: any = null

export default Vue.extend({
  data: () => ({
    timePrev: Date.now(),
    timeNow: Date.now(),
    isInitialized: false,
    isLoadingCamera: false,
    isLoadedCamera: false,
  }),
  async mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement

    window.addEventListener('resize', this.resize)
    window.addEventListener('deviceorientation', this.resize)

    webgl = new WebGLContent(canvas)
    await webgl.start()
    await this.$utils.sleep(1000)

    await tf.setBackend('webgl');
    model = await fld.load(fld.SupportedPackages.mediapipeFacemesh)

    this.resize()
    this.update()
    this.isInitialized = true
  },
  methods: {
    async update() {
      this.timeNow = Date.now()
      if (this.timeNow - this.timePrev >= 1 / 30 * 1000 && this.isLoadedCamera === true) {
        const predictions = await model.estimateFaces({
          input: this.$refs.video
        })
        this.timePrev = this.timeNow;
      }
      if (webgl !== null) webgl.update()
      requestAnimationFrame(() => {
        this.update()
      })
    },
    resize() {
      const video = this.$refs.video as HTMLVideoElement

      if (webgl !== null) webgl.resize(video)
    },
    async setupVideo() {
      const video = this.$refs.video as HTMLVideoElement

      this.isLoadingCamera = true
      await this.$video
        .start(video)
        .catch(() => {
          alert('カメラを有効にできませんでした。')
        })

      const intervalId = setInterval(() => {
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          if (webgl !== null) webgl.setVideo(video)
          this.isLoadedCamera = true
          clearInterval(intervalId)
        }
      }, 500)
    },
  },
})
</script>

<style lang="scss" scoped>
video {
  width: 25vw;
  max-width: 240px;
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
