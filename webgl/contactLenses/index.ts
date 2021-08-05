import * as THREE from 'three'
import Camera from './Camera'
import EyeIris from './EyeIris'
import Video from './Video'

const texLoader = new THREE.TextureLoader()

export default class WebGLContent {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  camera: Camera

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()
  video = new Video()
  eyeIris = new EyeIris()
  textures: THREE.Texture[] = []

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

  async start(): Promise<void> {
    this.textures = await Promise.all([
      texLoader.loadAsync(require('@/assets/img/example/contact-lenses/texture0.jpg')),
      texLoader.loadAsync(require('@/assets/img/example/contact-lenses/texture1.jpg')),
      texLoader.loadAsync(require('@/assets/img/example/contact-lenses/texture2.jpg')),
      texLoader.loadAsync(require('@/assets/img/example/contact-lenses/texture3.jpg')),
    ])
    this.eyeIris.setTexture(this.textures[1])
    this.scene.add(this.eyeIris)
    this.clock.start()
  }

  update(video: HTMLVideoElement, predictions: any[]): void {
    const time = this.clock.running === true ? this.clock.getDelta() : 0

    this.eyeIris.update(time, this.resolution, video, predictions[0])
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

  changeTexture(index: number) {
    this.eyeIris.setTexture(this.textures[index])
  }
}