import * as THREE from 'three'
import Camera from './Camera'
import Face from './Face'
import Video from './Video'

export default class WebGLContent {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  camera: Camera

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()
  video = new Video()
  face = new Face()

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

  start(faceUVCoords: number[][]): void {
    this.face.setUv(faceUVCoords)
    this.scene.add(this.face)
    this.clock.start()
  }

  update(predictions: any[]): void {
    const time = this.clock.running === true ? this.clock.getDelta() : 0

    this.face.update(time, predictions[0])
    this.renderer.render(this.scene, this.camera)
  }

  resize(video: HTMLVideoElement): void {
    this.resolution.set(window.innerWidth, window.innerHeight)
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