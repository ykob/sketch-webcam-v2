<template lang="pug">
IconBase(
  iconName = 'dots-vertical'
  v-bind = '$attrs'
  )
  path(
    :d = 'd'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiDotsVertical } from '@mdi/js'

export default Vue.extend({
  computed: {
    d(): string {
      return mdiDotsVertical
    },
  },
})
</script>
