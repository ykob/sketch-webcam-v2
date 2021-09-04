import * as THREE from 'three'
import Camera from './Camera'
import Glass from './Glass'
import Video from './Video'

export default class WebGLContent {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  camera: Camera

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()
  video = new Video()
  glass = new Glass()

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    this.renderer.setClearColor(0x000000, 1.0)
    this.camera = new Camera(1, 1)
  }

  start(): void {
    this.scene.add(this.glass)
    this.clock.start()
  }

  update(video: HTMLVideoElement, predictions: any[]): void {
    // const time = this.clock.running === true ? this.clock.getDelta() : 0

    this.glass.update(this.resolution, video, predictions[0])
    this.renderer.render(this.scene, this.camera)
  }

  resize(width: number, height: number, video: HTMLVideoElement): void {
    this.resolution.set(width, height)
    this.camera.resize(this.resolution.x, this.resolution.y)
    this.video.resize(this.resolution.x, this.resolution.y, video)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
  }

  setVideo(video: HTMLVideoElement): void {
    this.video.start(video)
    this.video.resize(this.resolution.x, this.resolution.y, video)
    this.scene.add(this.video)
  }
}