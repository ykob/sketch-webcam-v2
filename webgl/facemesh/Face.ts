import * as THREE from 'three'

import { TRIANGULATION } from '@/const/triangulation';

import vs from './glsl/Face.vs'
import fs from './glsl/Face.fs'

export default class Face extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.BufferGeometry()
    const baPositions = new THREE.BufferAttribute(new Float32Array(468 * 3), 3)
    const baIndices = new THREE.BufferAttribute(new Uint16Array(TRIANGULATION), 1)
    geometry.setAttribute('position', baPositions)
    geometry.setIndex(baIndices)

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        texture: {
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide,
      transparent: true,
    })

    super(geometry, material)
  }
  update(time: number, prediction: any) {
    if (!prediction) return
    const { uniforms } = this.material as THREE.RawShaderMaterial
    const { scaledMesh } = prediction

    uniforms.time.value += time;

    for (var i = 0, ul = scaledMesh.length; i < ul; i++) {
      const x = scaledMesh[i][0] * -1 + 1920 / 2
      const y = scaledMesh[i][1] * -1 + 1080 / 2
      const z = scaledMesh[i][2] / 1000
      this.geometry.attributes.position.setXYZ(i, x, y, z);
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
  setUv(arr: number[][]) {
    const uvs: number[] = arr.reduce((pre: number[], current: number[]) => {
      pre.push(...current)
      return pre
    }, [])
    const baUvs = new THREE.BufferAttribute(new Float32Array(uvs), 2)
    this.geometry.setAttribute('uv', baUvs);
  }
  setTexture(texture: THREE.Texture) {
    const { uniforms } = this.material as THREE.RawShaderMaterial

    uniforms.texture.value = texture;
  }
}