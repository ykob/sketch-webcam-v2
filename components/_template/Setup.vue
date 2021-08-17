<template lang="pug">
div
  Loading(
    v-if = 'isInitialized === false'
    )
    |Initializing...
  SetupConsole(
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
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isInitialized: {
      type: Boolean,
      default: false,
    },
    isLoadingCamera: {
      type: Boolean,
      default: false,
    },
    isLoadedCamera: {
      type: Boolean,
      default: false,
    },
    setupVideo: {
      type: Function,
      default: null,
    },
  },
})
</script>

<style lang="scss" scoped></style>
