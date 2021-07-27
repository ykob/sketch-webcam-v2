import * as THREE from 'three'
import Camera from './Camera'
import Video from './Video'

export default class WebGLContent {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  camera: Camera

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()
  video = new Video()

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
    this.clock.start()
  }

  update(): void {
    this.video.update()
    this.renderer.render(this.scene, this.camera)
  }

  resize(): void {
    this.resolution.set(window.innerWidth, window.innerHeight)
    this.camera.resize(this.resolution.x, this.resolution.y)
    this.video.resize(this.resolution.x, this.resolution.y)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
  }

  setVideo(video: HTMLVideoElement): void {
    const tVideo = new THREE.VideoTexture(video)
    this.video.start(tVideo)
    this.scene.add(this.video)
  }
}