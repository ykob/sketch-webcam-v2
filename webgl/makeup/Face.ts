import * as THREE from 'three'

import { TRIANGULATION } from '@/const/triangulation'

import vs from './glsl/Face.vs'
import fs from './glsl/Face.fs'

export default class Face extends THREE.Mesh {
  colors: THREE.Color[]

  constructor() {
    // Define Geometry
    const geometry = new THREE.BufferGeometry()
    const baPositions = new THREE.BufferAttribute(new Float32Array(468 * 3), 3)
    const baIndices = new THREE.BufferAttribute(new Uint16Array(TRIANGULATION), 1)
    geometry.setAttribute('position', baPositions)
    geometry.setIndex(baIndices)

    // Define Material
    const colors = [
      new THREE.Color(0x000000),
      new THREE.Color(0x773355),
      new THREE.Color(0x445577),
      new THREE.Color(0x996633),
    ]
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
          time: {
            value: 0
          },
          texture: {
            value: null
          },
          color: {
            value: colors[1]
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide,
      transparent: true
    })

    super(geometry, material)
    this.colors = colors
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
    const { scaledMesh } = prediction
    const screenAspect = resolution.x / resolution.y
    const videoAspect = video.videoWidth / video.videoHeight

    uniforms.time.value += time
    for (var i = 0, ul = scaledMesh.length; i < ul; i++) {
      let x = -scaledMesh[i][0] / video.videoWidth * resolution.x + resolution.x / 2
      let y = -scaledMesh[i][1] / video.videoHeight * resolution.y + resolution.y / 2
      let z = scaledMesh[i][2] / video.videoWidth
      if (screenAspect > videoAspect) {
        y = y * screenAspect / videoAspect
      } else {
        x = x * videoAspect / screenAspect
      }
      attributes.position.setXYZ(i, x, y, z)
    }
    attributes.position.needsUpdate = true
  }
  setUv(arr: number[][]) {
    const { uniforms } = this.material as THREE.RawShaderMaterial
    const uvs: number[] = arr.reduce((pre: number[], current: number[]) => {
      pre.push(...current)
      return pre
    }, [])
    const baUvs = new THREE.BufferAttribute(new Float32Array(uvs), 2)
    this.geometry.setAttribute('uv', baUvs)
    uniforms.uvTransform.value.set(
      -1,
      0,
      -1,
      0,
      -1,
      -1,
      0,
      0,
      1
    )
  }
  setTexture(texture: THREE.Texture) {
    const { uniforms } = this.material as THREE.RawShaderMaterial

    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    uniforms.texture.value = texture
  }
  changeColor(index: number) {
    const { uniforms } = this.material as THREE.RawShaderMaterial

    uniforms.color.value.copy(this.colors[index])
  }
}