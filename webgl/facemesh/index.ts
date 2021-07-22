import * as THREE from 'three'
import Camera from './Camera'

export default class WebGLContent {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  camera: Camera

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    this.camera = new Camera(this.resolution.x, this.resolution.y)
  }

  start(): void {
    console.log(this.resolution)
  }

  resize(): void {
    this.resolution.set(
      window.innerWidth,
      window.innerHeight
    )
    this.camera.resize(
      this.resolution.x,
      this.resolution.y
    )
  }
}