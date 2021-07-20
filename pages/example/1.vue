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
    this.$video.start(video)
  },
})
</script>
