<template lang="pug">
IconBase(
  iconName = 'loading'
  v-bind = '$attrs'
  )
  path(
    :d = 'd'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiLoading } from '@mdi/js'

export default Vue.extend({
  computed: {
    d(): string {
      return mdiLoading
    },
  },
})
</script>
