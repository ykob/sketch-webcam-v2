import * as THREE from 'three'

import vs from './glsl/EyeIrisPoints.vs'
import fs from './glsl/EyeIrisPoints.fs'

export default class EyeIrisPoints extends THREE.Points {
  constructor() {
    // Define Geometry
    const geometry = new THREE.BufferGeometry()
    const baPositions = new THREE.BufferAttribute(new Float32Array(10 * 3), 3)
    geometry.setAttribute('position', baPositions)

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
          time: {
            value: 0,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
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
      ...leftEyeIris,
      ...rightEyeIris,
    ]

    uniforms.time.value += time
    for (let i = 0, ul = positions.length; i < ul; i++) {
      let x = -positions[i][0] / video.videoWidth * resolution.x + resolution.x / 2
      let y = -positions[i][1] / video.videoHeight * resolution.y + resolution.y / 2
      const z = positions[i][2] / video.videoWidth
      if (screenAspect > videoAspect) {
        y = y * screenAspect / videoAspect
      } else {
        x = x * videoAspect / screenAspect
      }
      attributes.position.setXYZ(i, x, y, z)
    }
    attributes.position.needsUpdate = true
  }
}