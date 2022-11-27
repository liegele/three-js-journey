import './style.css';
import * as THREE from 'three';

// Creating the scene
const scene = new THREE.Scene();

//Create a object to show in scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Defining the size o the scene
const sizes = {
  widht: window.innerWidth,
  height: window.innerHeight,
};

//Creating a camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.widht / sizes.height,
  0.1,
  1000
);
camera.position.z = 3;
scene.add(camera);

//Creating a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.widht, sizes.height);
document.body.appendChild(renderer.domElement);

//Rendering a scene
renderer.render(scene, camera);
