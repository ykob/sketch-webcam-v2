import { Plugin } from '@nuxt/types'

class Video {
  elm: HTMLVideoElement | null

  constructor() {
    this.elm = null
  }

  async start(video: HTMLVideoElement): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let srcObject = null
      this.elm = video

      await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: 1920,
            facingMode: 'user'
          }
        })
        .then(stream => {
          srcObject = stream
        })
        .catch(() => {
          reject()
        })

      this.elm.srcObject = srcObject
      this.elm.setAttribute('autoplay', 'autoplay')
      this.elm.setAttribute('playsinline', 'playsinline')
      this.elm.play()
      resolve()
    })
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $video: Video
  }
}

const video: Plugin = ({}, inject) => {
  inject('video', new Video())
}

export default video
