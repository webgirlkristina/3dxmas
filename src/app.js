import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);
camera.up.set(0, 0, 1);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();

loader.load("gift_wrap.jpg", texture => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = 1;
    scene.add(cube);
});

loader.load("carpet.jpg", texture => {
    const carpet = new THREE.Mesh(
        new THREE.PlaneGeometry(15, 15),
        new THREE.MeshLambertMaterial({map: texture})
    );
    carpet.position.z = 0;
    scene.add(carpet);

});

const manager = new THREE.LoadingManager();
new MTLLoader(manager).load('12151_Christmas_Tree_l1.mtl', materials => {
    materials.preload();
    new OBJLoader(manager).setMaterials(materials).load("12151_Christmas_Tree_l1.obj", tree => {
        tree.scale.set(0.1, 0.1, 0.1);
        tree.position.y = 5;
        scene.add(tree);
    });
});


const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(200, 400, 300);
scene.add(spotLight);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();