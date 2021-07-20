<template lang="pug">
video(
  ref = 'video'
  )
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async mounted() {
    const video = this.$refs.video as HTMLVideoElement
    const facingMode = 'user'
    let srcObject = null

    await navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: 1920,
          facingMode: facingMode
        }
      })
      .then(stream => {
        srcObject = stream
      })
      .catch(() => {})
    
    video.srcObject = srcObject
    video.setAttribute('playsinline', 'playsinline')
    // video.setAttribute('controls', 'controls')
    video.play()
  },
})
</script>
