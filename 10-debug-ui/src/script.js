import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

//Parameters
const parameters = {
  color: 0xff0000,
  spin() {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
  },
};

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
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
  100
);
camera.position.z = 3;
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

/**
lil-gui debug interface
 */
const gui = new GUI();

gui.add(document, 'title');
//position
const folder1 = gui.addFolder('Mesh Position');
folder1.add(mesh.position, 'x', -3, 3, 0.1);
folder1.add(mesh.position, 'y', -3, 3, 0.1);
folder1.add(mesh.position, 'z', -3, 3, 0.1);
//rotation
const folder2 = gui.addFolder('Mesh Rotation');
folder2.add(mesh.rotation, 'x', -6, 6, 0.1);
folder2.add(mesh.rotation, 'y', -6, 6, 0.1);
folder2.add(mesh.rotation, 'z', -6, 6, 0.1);
//Visibility
const folder3 = gui.addFolder('Mesh Visibility');
folder3.add(mesh, 'visible');
//Wireframe
const folder4 = gui.addFolder('Mesh Wireframe');
folder4.add(material, 'wireframe');
//Color
const folder5 = gui.addFolder('Mesh Color');
folder5.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
});
//Spin button
const folder6 = gui.addFolder('Mesh Spin');
folder6.add(parameters, 'spin');

//Hidding lil-gui panel
window.addEventListener('keydown', (e) => {
  if (e.key === 'h') {
    if (gui._hidden) {
      gui.show();
    } else {
      gui.hide();
    }
  }
});
