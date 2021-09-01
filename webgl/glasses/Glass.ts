import * as THREE from 'three'

import vs from './glsl/FaceWireFrame.vs'
import fs from './glsl/FaceWireFrame.fs'

export default class Glass extends THREE.Mesh {
  size: THREE.Vector2
  imgRatio: THREE.Vector2
  a: THREE.Vector3
  anchor: THREE.Vector3
  sv: number
  sa: number

  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry()

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {},
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      wireframe: true,
    })

    super(geometry, material)

    this.size = new THREE.Vector2()
    this.imgRatio = new THREE.Vector2()
    this.a = new THREE.Vector3()
    this.anchor = new THREE.Vector3()
    this.sv = 0
    this.sa = 0

    this.scale.set(0, 0, 0)
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
    const p0 = new THREE.Vector3()
    const p1 = new THREE.Vector3()
    const p2 = new THREE.Vector3()
    const p3 = new THREE.Vector3()
    const p4 = new THREE.Vector3()

    p0.fromArray(scaledMesh[5])
    p0.x = p0.x - resolution.x * 0.5
    p0.y = p0.y - resolution.y * 0.5

    p1.fromArray(mesh[5])
    p2.fromArray(mesh[44])
    p3.fromArray(mesh[274])

    const x = p3
      .clone()
      .sub(p2)
      .normalize()
    const y = p1
      .clone()
      .sub(p2)
      .normalize()
    const z = new THREE.Vector3().crossVectors(x, y)
    const y2 = new THREE.Vector3().crossVectors(x, z).normalize()
    const z2 = new THREE.Vector3().crossVectors(x, y2).normalize()
    const rotateMat = new THREE.Matrix4().makeBasis(x, y2, z2)
    this.rotation.setFromRotationMatrix(rotateMat)

    const normal = p0.clone().normalize()
    const x3 = ((p0.x / -resolution.x) * this.size.x) / this.imgRatio.x
    const y3 = (((p0.y + 10) / -resolution.y) * this.size.y) / this.imgRatio.y
    const z3 = normal.z * (x3 / normal.x) - 2
    this.anchor.set(x3, y3, z3)
    const a = this.anchor
      .clone()
      .sub(this.position)
      .multiplyScalar(0.4)
    this.a.add(a)
    this.a.add(this.a.clone().multiplyScalar(-0.4))
    this.position.add(this.a)

    p4.fromArray(scaledMesh[10])
    const x4 = ((p4.x / -resolution.x) * this.size.x) / this.imgRatio.x
    const y4 = ((p4.y / -resolution.y) * this.size.y) / this.imgRatio.y
    const z4 = normal.z * (x4 / normal.x)
    const p4a = new THREE.Vector3(x4, y4, z4)

    const p5 = new THREE.Vector3().fromArray(scaledMesh[152])
    const x5 = ((p5.x / -resolution.x) * this.size.x) / this.imgRatio.x
    const y5 = ((p5.y / -resolution.y) * this.size.y) / this.imgRatio.y
    const z5 = normal.z * (x5 / normal.x)
    const p5a = new THREE.Vector3(x5, y5, z5)

    const sv = p4a.distanceTo(p5a) / 40
    this.sa += (sv - this.sv) * 0.1
    this.sa += this.sa * -0.4
    this.sa = Math.min(this.sa, 1)
    this.sv += this.sa
    this.scale.set(this.sv, this.sv, this.sv)
  }
}