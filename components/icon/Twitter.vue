<template lang="pug">
IconBase(
  iconName = 'twitter'
  v-bind = '$attrs'
  )
  path(
    :d = 'd'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiTwitter } from '@mdi/js'

export default Vue.extend({
  computed: {
    d(): string {
      return mdiTwitter
    },
  },
})
</script>
