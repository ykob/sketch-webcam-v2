import * as THREE from 'three'

import vs from './glsl/EyeIris.vs'
import fs from './glsl/EyeIris.fs'

export default class EyeIris extends THREE.Points {
  constructor() {
    // Define Geometry
    const geometry = new THREE.BufferGeometry()
    const baPositions = new THREE.BufferAttribute(new Float32Array(2 * 3), 3)
    const baPointSizes = new THREE.BufferAttribute(new Float32Array(2), 1)
    geometry.setAttribute('position', baPositions)
    geometry.setAttribute('pointSize', baPointSizes)

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
          time: {
            value: 0
          },
          texture: {
            value: null
          }
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide,
      transparent: true
    })

    super(geometry, material)
  }
  update(time: number, resolution: THREE.Vector2, video: HTMLVideoElement, prediction: any) {
    if (!video || !prediction) {
      this.visible = false
      return
    } else {
      this.visible = true
    }

    const { attributes } = this.geometry
    const { uniforms } = this.material as THREE.RawShaderMaterial
    const { leftEyeIris, rightEyeIris } = prediction.annotations
    const screenAspect = resolution.x / resolution.y
    const videoAspect = video.videoWidth / video.videoHeight
    const positions = [
      [leftEyeIris[0], leftEyeIris[1], leftEyeIris[3]],
      [rightEyeIris[0], rightEyeIris[1], rightEyeIris[3]],
    ]

    uniforms.time.value += time
    for (var i = 0, ul = positions.length; i < ul; i++) {
      let x = -positions[i][0][0] / video.videoWidth * resolution.x + resolution.x / 2
      let y = -positions[i][0][1] / video.videoHeight * resolution.y + resolution.y / 2
      let z = positions[i][0][2] / video.videoWidth
      if (screenAspect > videoAspect) {
        y = y * screenAspect / videoAspect
      } else {
        x = x * videoAspect / screenAspect
      }
      const size = Math.abs(positions[i][1][0] - positions[i][2][0]) * 1.02
      attributes.position.setXYZ(i, x, y, z)
      attributes.pointSize.setX(i, size)
    }
    attributes.position.needsUpdate = true
    attributes.pointSize.needsUpdate = true
  }
  setTexture(texture: THREE.Texture) {
    const { uniforms } = this.material as THREE.RawShaderMaterial
    uniforms.texture.value = texture
  }
}