<template lang="pug">
ButtonBase(
  width = '72px'
  height = '72px'
  @click = '$emit("click", $event)'
  )
  IconVideo(
    size = '48'
    )
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped></style>
