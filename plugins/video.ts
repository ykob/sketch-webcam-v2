import { Plugin } from '@nuxt/types'
import Video from '@/utils/Video'

const video: Plugin = ({}, inject) => {
  inject('video', new Video())
}

export default video
