import { Plugin } from '@nuxt/types'

class Video {
  elm: HTMLVideoElement | null

  constructor() {
    this.elm = null
  }

  async start(video: HTMLVideoElement): Promise<void> {
    this.elm = video
    let srcObject = null

    try {
      srcObject = await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: 1920,
            facingMode: 'user'
          }
        })
    } catch (error) {
      throw new Error('The webcam could not be enabled.')
    }

    this.elm.srcObject = srcObject
    this.elm.setAttribute('autoplay', 'autoplay')
    this.elm.setAttribute('playsinline', 'playsinline')
    this.elm.play()
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
