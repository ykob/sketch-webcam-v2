import Video from '@/utils/Video'

declare module 'vue/types/vue' {
  interface Vue {
    $video: Video
  }
}
