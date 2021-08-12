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
    title = 'Makeup'
    )
    ButtonConsole.mt-2(
      value = '0'
      :selected = 'selectedId === 0'
      @click = 'changeColor'
      )
      |0
    ButtonConsole.mt-2(
      value = '1'
      :selected = 'selectedId === 1'
      @click = 'changeColor'
      )
      |1
    ButtonConsole.mt-2(
      value = '2'
      :selected = 'selectedId === 2'
      @click = 'changeColor'
      )
      |2
    ButtonConsole.mt-2(
      value = '3'
      :selected = 'selectedId === 3'
      @click = 'changeColor'
      )
      |3
  video(
    ref = 'video'
    )
  canvas(
    ref = 'canvas'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import WebGLContent from '@/webgl/makeup/'
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
    selectedId: 1,
  }),
  async mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement

    window.addEventListener('resize', this.resize)
    window.addEventListener('deviceorientation', this.resize)

    await this.$utils.sleep(1000)
    await tf.setBackend('webgl');
    model = await fld.load(fld.SupportedPackages.mediapipeFacemesh)
    webgl = new WebGLContent(canvas)
    await webgl.start(model.constructor.getUVCoords())
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
    changeColor(e: Event) {
      if (e.target instanceof HTMLButtonElement) {
        const { value } = e.target
        if (webgl !== null) {
          this.selectedId = parseInt(value)
          webgl.changeColor(parseInt(value))
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
