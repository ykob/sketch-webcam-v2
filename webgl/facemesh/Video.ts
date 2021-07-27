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

  start(tVideo: THREE.VideoTexture) {
    const { uniforms } = this.material as THREE.RawShaderMaterial

    uniforms.tVideo.value = tVideo
  }

  update() {
    const { uniforms } = this.material as THREE.RawShaderMaterial

    if (uniforms.tVideo.value !== null) {
      uniforms.tVideo.value.update()
    }
  }

  resize(width: number, height: number) {
    this.scale.set(width, height, 1)
  }
}
