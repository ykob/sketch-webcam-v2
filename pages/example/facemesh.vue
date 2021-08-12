<template lang="pug">
div
  Loading(
    v-if = 'isInitialized === false'
    )
    |Initializing...
  Setup(
    v-else-if = 'isLoadingCamera === false'
    @click = 'setupVideo'
    )
  Loading(
    v-else-if = 'isLoadedCamera === false'
    )
    |In progress to enable the webcam...
  SetupBack(
    v-if = 'isLoadedCamera === false'
    )
  Console(
    title = 'facemesh'
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
import * as tf from '@tensorflow/tfjs'
import * as fld from '@tensorflow-models/face-landmarks-detection'

let webgl: WebGLContent | null = null
let model: any = null
let predictions: any[] = []

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

    await this.$utils.sleep(1000)
    await tf.setBackend('webgl');
    model = await fld.load(fld.SupportedPackages.mediapipeFacemesh)
    webgl = new WebGLContent(canvas)
    webgl.start()
    this.resize()
    this.update()
    this.isInitialized = true
  },
  methods: {
    async update() {
      const video = this.$refs.video as HTMLVideoElement

      this.timeNow = Date.now()
      if (this.timeNow - this.timePrev >= 1 / 30 * 1000 && this.isLoadedCamera === true) {
        predictions = await model.estimateFaces({
          input: this.$refs.video
        })
        this.timePrev = this.timeNow;
      }
      if (webgl !== null) webgl.update(video, predictions)
      requestAnimationFrame(() => {
        this.update()
      })
    },
    resize() {
      const { state, commit } = this.$store
      const video = this.$refs.video as HTMLVideoElement

      commit('resize')
      if (webgl !== null) webgl.resize(state.resolution.x, state.resolution.y, video)
    },
    async setupVideo() {
      const video = this.$refs.video as HTMLVideoElement

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
