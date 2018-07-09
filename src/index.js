import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

{
  const light = new THREE.AmbientLight('0x404040');  // soft white light
  scene.add(light);
}
{
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);
}

// Box geometry
let cube;
{
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({color: 0x00ff00});
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

// Lines
{
  const material = new THREE.LineBasicMaterial({color: 0x0000ff, linewidth: 2});
  const geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 1, 0));
  geometry.vertices.push(new THREE.Vector3(1, 0, 0));
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

// Loading model
{
  const loader = new GLTFLoader();
  loader.load(
      './assets/simple.gltf',
      gltf => {
        scene.add(gltf.scene);
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
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();