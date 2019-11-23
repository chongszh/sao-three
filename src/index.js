import * as THREE from 'three'
import Stats from 'stats.js'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(-30, 30, 30)
camera.lookAt(scene.position)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const stats = initStats()
const gui = new dat.GUI()

class Control {
  rotationSpeed = 0.01
}

const controls = new Control()
gui.add(controls, 'rotationSpeed', 0, 1)

const cubeGeometry = new THREE.BoxGeometry(5, 5, 5)
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x7777ff,
  wireframe: true
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

render()

function render() {
  stats.update()
  cube.rotation.x += controls.rotationSpeed
  cube.rotation.y += controls.rotationSpeed
  cube.rotation.z += controls.rotationSpeed
  window.requestAnimationFrame(render)
  renderer.render(scene, camera)
}

function initStats() {
  const stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)
  return stats
}
