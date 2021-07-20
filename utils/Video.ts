class Video {
  elm: HTMLVideoElement | null

  constructor() {
    this.elm = null
  }

  async start(video: HTMLVideoElement) {
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
      .catch(() => {})
    
    this.elm.srcObject = srcObject
    this.elm.setAttribute('playsinline', 'playsinline')
    // this.elm.setAttribute('controls', 'controls')
    this.elm.play()
  }
}

export default Video
