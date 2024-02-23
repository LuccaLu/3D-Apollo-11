import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from './js/GLTFLoader.js';
import { OrbitControls } from './js/OrbitControls.js';

const scene = new THREE.Scene();

const container = document.getElementById('viewer-container');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x123456, 0.8); 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(70,container.clientWidth / container.clientHeight, 0.1, 2000);
camera.position.set(200, -3, -60);

function onWindowResize() {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', onWindowResize, false);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(-200, 30, 20);
scene.add(directionalLight);
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 100);
// scene.add(directionalLightHelper);

const loader = new GLTFLoader();
loader.load('./models/apollo_interior-medium_resolution.gltf', function (gltf) {
    const object = gltf.scene;
    object.scale.set(1, 1, 1);
    object.position.set(0, 0, 0);
    scene.add(object);
    animate();
}, undefined, function (error) {
    console.error(error);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

animate();

document.getElementById('zoom-in').addEventListener('click', function () {
    camera.fov *= 0.9;
    camera.updateProjectionMatrix();
});

document.getElementById('zoom-out').addEventListener('click', function () {
    camera.fov *= 1.1;
    camera.updateProjectionMatrix();
});