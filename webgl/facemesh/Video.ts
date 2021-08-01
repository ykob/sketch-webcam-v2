import * as THREE from 'three'

import vs from './glsl/Video.vs'
import fs from './glsl/Video.fs'

export default class Video extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
          tVideo: {
            value: null,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
    })
    super(geometry, material)
  }

  start(video: HTMLVideoElement) {
    const { uniforms } = this.material as THREE.RawShaderMaterial
    const tVideo = new THREE.VideoTexture(video)
    tVideo.wrapS = THREE.RepeatWrapping

    uniforms.tVideo.value = tVideo
  }

  update() {
    const { uniforms } = this.material as THREE.RawShaderMaterial

    if (uniforms.tVideo.value !== null) {
      uniforms.tVideo.value.update()
    }
  }

  resize(width: number, height: number, video: HTMLVideoElement) {
    const screenAspect = width / height
    const videoAspect = video.videoWidth / video.videoHeight
    const { uniforms } = this.material as THREE.RawShaderMaterial

    if (screenAspect > videoAspect) {
      uniforms.uvTransform.value.set(
        -1,
        0,
        0,
        0,
        (videoAspect / screenAspect),
        (1 - videoAspect / screenAspect) / 2,
        0,
        0,
        1
      )
    } else {
      uniforms.uvTransform.value.set(
        -(screenAspect / videoAspect),
        0,
        (1 - screenAspect / videoAspect) / -2,
        0,
        1,
        0,
        0,
        0,
        1
      )
    }
    this.scale.set(width, height, 1)
  }
}
