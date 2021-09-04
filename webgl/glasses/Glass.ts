import * as THREE from 'three'

import vs from './glsl/FaceWireFrame.vs'
import fs from './glsl/FaceWireFrame.fs'

export default class Glass extends THREE.Mesh {
  a: THREE.Vector3
  anchor: THREE.Vector3
  sv: number
  sa: number

  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(1, 0.5)

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {},
      ]),
      vertexShader: vs,
      fragmentShader: fs,
    })

    super(geometry, material)

    this.a = new THREE.Vector3()
    this.anchor = new THREE.Vector3()
    this.sv = 0
    this.sa = 0
  }

  update(resolution: THREE.Vector2, video: HTMLVideoElement, prediction: any) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    if (!video || !prediction) {
      this.visible = false
      return
    } else {
      this.visible = true
    }

    const { mesh, scaledMesh } = prediction
    const screenAspect = resolution.x / resolution.y
    const videoAspect = video.videoWidth / video.videoHeight
    const p0 = new THREE.Vector3()
    const p1 = new THREE.Vector3()
    const p2 = new THREE.Vector3()
    const p3 = new THREE.Vector3()
    const p4 = new THREE.Vector3()
    const p5 = new THREE.Vector3()

    p0.fromArray(scaledMesh[6])
    p1.fromArray(mesh[5])
    p2.fromArray(mesh[44])
    p3.fromArray(mesh[274])

    let x = -p0.x / video.videoWidth * resolution.x + resolution.x / 2
    let y = -p0.y / video.videoHeight * resolution.y + resolution.y / 2
    const z = p0.z / video.videoWidth

    if (screenAspect > videoAspect) {
      y = y * screenAspect / videoAspect
    } else {
      x = x * videoAspect / screenAspect
    }
    this.position.set(x, y, z)

    const x2 = p3
      .clone()
      .sub(p2)
      .normalize()
    const y2 = p1
      .clone()
      .sub(p2)
      .normalize()
    const z2 = new THREE.Vector3().crossVectors(x2, y2)
    const y3 = new THREE.Vector3().crossVectors(x2, z2).normalize()
    const z3 = new THREE.Vector3().crossVectors(x2, y3).normalize()
    const rotateMat = new THREE.Matrix4().makeBasis(x2, y3, z3)
    this.rotation.setFromRotationMatrix(rotateMat)

    p4.fromArray(scaledMesh[10])
    p5.fromArray(scaledMesh[152])

    const sv = p4.distanceTo(p5)
    this.scale.set(sv, sv, 1)
  }
}