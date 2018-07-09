import * as CANNON from 'cannon';
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
let ball = {};
let model;
let world;

function copy(source, target) {
  target.position.x = source.position.x;
  target.position.y = source.position.y;
  target.position.z = source.position.z;
  target.quaternion.x = source.quaternion.x;
  target.quaternion.y = source.quaternion.y;
  target.quaternion.z = source.quaternion.z;
  target.quaternion.w = source.quaternion.w;
}

function init() {
  // init cannon
  world = new CANNON.World();
  world.gravity.set(0, -2, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10

  // init three
  camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  controls = new TrackballControls(camera, renderer.domElement);
  controls.addEventListener('change', render);

  // Add items
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
    plane.rotation.x = 3 * Math.PI / 2;
    plane.translateZ(-2);
    plane.receiveShadow = true;
    scene.add(plane);
    const shape = new CANNON.Plane();
    const body = new CANNON.Body({mass: 0});

    copy(plane, body);

    body.addShape(shape);
    world.addBody(body);
  }

  // Ball
  {
    const RADIUS = 0.3;
    const geometry = new THREE.SphereGeometry(RADIUS, 16, 16);
    const material = new THREE.MeshLambertMaterial({color: 0xaf0000});
    ball.mesh = new THREE.Mesh(geometry, material);
    ball.mesh.translateZ(1);
    ball.mesh.castShadow = true;
    ball.mesh.receiveShadow = true;
    ball.body = new CANNON.Body({mass: 1});
    const shape = new CANNON.Sphere(RADIUS);
    ball.body.addShape(shape);
    copy(ball.mesh, ball.body);
    world.addBody(ball.body);
    scene.add(ball.mesh);
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
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.z += 0.01;
  }
  controls.update();
  const TIMESTEP = 1 / 60;
  world.step(TIMESTEP);
  ball.mesh.position.copy(ball.body.position);
  ball.mesh.quaternion.copy(ball.body.quaternion);
  renderer.render(scene, camera);
}

function render() {
  renderer.render(scene, camera);
}

init();