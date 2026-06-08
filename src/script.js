import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { depth } from "three/tsl";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Fonts
 */
const textParams = {
  curveSegments: 8,
  depth: 0.05,
  bevelSegments: 3,
};

const fontLoader = new FontLoader();

fontLoader.load("/fonts/Hybrid_Bold.json", (font) => {
  const buildText = () => {
    const textGeometry = new TextGeometry("The Beginning", {
      font: font,
      size: 0.5,
      depth: textParams.depth,
      curveSegments: textParams.curveSegments,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: textParams.bevelSegments,
    });
    textGeometry.computeBoundingBox();
    console.log(textGeometry.boundingBox);
    textGeometry.center();
    return textGeometry;
  };

  const text = new THREE.Mesh(buildText(), material);
  scene.add(text);

  const rebuild = () => {
    text.geometry.dispose();
    text.geometry = buildText();
  };

  gui.add(textParams, "curveSegments", 1, 20, 1).onChange(rebuild);
  gui.add(textParams, "depth", 0.01, 1, 0.01).onChange(rebuild);
  gui.add(textParams, "bevelSegments", 1, 10, 1).onChange(rebuild);
});

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/7.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial(),
// );

// scene.add(cube);

//  Donut
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
//const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

for (let i = 0; i < 100; i++)
{
    const donut = new THREE.Mesh(donutGeometry, material)

//Randomize position
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
