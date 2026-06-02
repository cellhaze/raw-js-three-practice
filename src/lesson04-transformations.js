import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
const canvas = document.querySelector('canvas.webgl')

// Camera setup
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)

// Set x, y, and z at once with set()
camera.position.set(2, -1, 3)
// camera.position.x = 0
// camera.position.y = -1
// camera.position.z = 5

// Scaling Mesh
// mesh.scale.set(2, 0.25, 0.5)
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
// Axes Helper
const axesHelper = new THREE.AxesHelper(2)

// Scene
const scene = new THREE.Scene()

scene.add(mesh)
scene.add(camera)
scene.add(axesHelper)

//camera.lookAt(mesh)
//camera.lookAt(new THREE.Vector3(0, -1, 0))
//camera.lookAt(mesh.position)

//Group
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)

scene.add(group)

camera.lookAt(group.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//console.log(mesh.position.distanceTo(camera.position))