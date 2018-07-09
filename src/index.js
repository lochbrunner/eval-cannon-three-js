import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

import TrackballControls from 'three-trackballcontrols';

import simple_bin from '../assets/simple.bin';
import simple from '../assets/simple.gltf';

console.log(simple);

let scene;
scene = new THREE.Scene();

let camera;


let renderer = new THREE.WebGLRenderer();
let controls;
let plane;
let ball;
let model;

function init() {
  camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  controls = new TrackballControls(camera, renderer.domElement);
  controls.addEventListener('change', render);

  {
    const light = new THREE.AmbientLight('0x202020');  // soft white light
    scene.add(light);
  }
  {
    const light = new THREE.DirectionalLight(0xffffff, 0.7);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;   // default
    light.shadow.mapSize.height = 1024;  // default
    light.shadow.camera.near = 0.5;      // default
    light.shadow.camera.far = 500;       // default
    scene.add(light);
  }


  // Floor
  {
    const geometry = new THREE.PlaneGeometry(5, 5, 0);
    const material = new THREE.MeshStandardMaterial(
        {color: 0x808080, side: THREE.DoubleSide});
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.translateZ(2);
    plane.receiveShadow = true;
    scene.add(plane);
  }

  // Ball
  {
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshLambertMaterial({color: 0xaf0000});
    ball = new THREE.Mesh(geometry, material);
    // ball.translateY(-1.9);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);
  }

  // Loading model
  {
    const loader = new GLTFLoader();
    loader.load(
        'assets/simple.gltf',
        gltf => {
          model = gltf.scene;
          model.traverse(node => {
            if (node instanceof THREE.Mesh) {
              node.castShadow = true;
            }
          });
          scene.add(model);
        },
        xhr => {},
        error => {
          console.log(`Error while loading model: ${error}`);
        });
  }

  camera.position.set(0, 0, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  render();
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    // model.rotation.x += 0.01;
    // model.rotation.y += 0.01;
    model.rotation.z += 0.01;
  }
  controls.update();
  renderer.render(scene, camera);
}

function render() {
  renderer.render(scene, camera);
}

init();