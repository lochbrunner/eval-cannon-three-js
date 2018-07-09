import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

import TrackballControls from 'three-trackballcontrols';

import simple_bin from '../assets/simple.bin';
import simple from '../assets/simple.gltf';

console.log(simple);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new TrackballControls(camera, renderer.domElement);
controls.addEventListener('change', render);

{
  const light = new THREE.AmbientLight('0x404040');  // soft white light
  scene.add(light);
}
{
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);
}


// Floor
{
  const geometry = new THREE.PlaneGeometry(5, 5, 0);
  const material =
      new THREE.MeshBasicMaterial({color: 0x808080, side: THREE.DoubleSide});
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = 90;
  plane.translateZ(2);
  scene.add(plane);
}

// Loading model
let model;
{
  const loader = new GLTFLoader();
  loader.load(
      'assets/simple.gltf',
      gltf => {
        scene.add(gltf.scene);
        model = gltf.scene;
      },
      xhr => {},
      error => {
        console.log(`Error while loading model: ${error}`);
      });
}


camera.position.set(0, 0, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

render();
animate();