import * as THREE from 'three';
//import { time } from 'three/tsl';

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
camera.position.set(5, -1, 0)
camera.lookAt(mesh.position)

// Scene
const scene = new THREE.Scene()

scene.add(mesh)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate

// let time = Date.now()

// const tick = () => {

//     // Time
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time;
//     time = currentTime

//     // Update objects
//     mesh.rotation.y += 0.01
//     mesh.rotation.z += 0.07

//     renderer.render(scene, camera)

//     window.requestAnimationFrame(tick)
// }

const clock = new THREE.Timer()

const tick = () =>
{
    clock.update()
    const elapsedTime = clock.getElapsed()

    // Update objects
    mesh.position.x = Math.cos(elapsedTime)
    mesh.position.y = Math.sin(elapsedTime)

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

}

tick()

