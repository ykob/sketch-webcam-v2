<template lang="pug">
div
  Setup(
    :isInitialized = 'isInitialized'
    :isLoadingCamera = 'isLoadingCamera'
    :isLoadedCamera = 'isLoadedCamera'
    :setupVideo = 'setupVideo'
    )
  Console(
    title = 'glasses'
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
import WebGLContent from '@/webgl/glasses/'
import * as tf from '@tensorflow/tfjs'
import * as fld from '@tensorflow-models/face-landmarks-detection'
import { MediaPipePrediction } from '@tensorflow-models/face-landmarks-detection/dist/types'

let webgl: WebGLContent | null = null
let model: any = null
let predictions: MediaPipePrediction[] = []

export default Vue.extend({
  data: () => ({
    timePrev: Date.now(),
    timeNow: Date.now(),
    isInitialized: false,
    isLoadingCamera: false,
    isLoadedCamera: false,
  }),
  async mounted() {
    const { canvas } = this.$refs

    if (!(canvas instanceof HTMLCanvasElement)) return

    window.addEventListener('resize', this.resize)
    window.addEventListener('deviceorientation', this.resize)

    await this.$utils.sleep(1000)
    await tf.setBackend('webgl')
    model = await fld.load(fld.SupportedPackages.mediapipeFacemesh)
    webgl = new WebGLContent(canvas)
    webgl.start()
    this.resize()
    this.update()
    this.isInitialized = true
  },
  methods: {
    async update() {
      const { video } = this.$refs

      if (!(video instanceof HTMLVideoElement)) return
      this.timeNow = Date.now()
      if (this.timeNow - this.timePrev >= 1 / 30 * 1000 && this.isLoadedCamera === true) {
        predictions = await model.estimateFaces({
          input: video,
        })
        this.timePrev = this.timeNow
      }
      if (webgl !== null) webgl.update(video, predictions)
      requestAnimationFrame(() => {
        this.update()
      })
    },
    resize() {
      const { state, commit } = this.$store
      const { video } = this.$refs

      if (!(video instanceof HTMLVideoElement)) return
      commit('resize')
      if (webgl !== null) webgl.resize(state.resolution.x, state.resolution.y, video)
    },
    async setupVideo() {
      const { video } = this.$refs

      if (!(video instanceof HTMLVideoElement)) return
      this.isLoadingCamera = true
      await this.$video.start(video).catch(result => {
        alert(result.message)
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

<style lang="scss" scoped></style>
