<template lang="pug">
IconBase(
  iconName = 'video'
  v-bind = '$attrs'
  )
  path(
    :d = 'd'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiVideo } from '@mdi/js'

export default Vue.extend({
  computed: {
    d(): string {
      return mdiVideo
    },
  },
})
</script>
