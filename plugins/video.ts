import { Plugin } from '@nuxt/types'

class Video {
  async start(video: HTMLVideoElement): Promise<void> {
    let srcObject = null

    try {
      srcObject = await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: 1920,
            facingMode: 'user',
          },
        })
    } catch (error) {
      throw new Error('The webcam could not be enabled.')
    }

    video.srcObject = srcObject
    video.setAttribute('autoplay', 'autoplay')
    video.setAttribute('playsinline', 'playsinline')
    video.play()
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $video: Video
  }
}

const video: Plugin = (_, inject) => {
  inject('video', new Video())
}

export default video
