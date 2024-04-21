import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createControls } from './controls.js';
import { addLights } from './lights.js';
import { addObjects } from './objects/index.js';  // Ensure this path is correct

let camera, scene, renderer, controls;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

function init() {
    scene = new THREE.Scene();
    camera = createCamera();  // Ensure this function returns a camera and it's being assigned here
    setupRenderer();
    
    // Correctly pass 'scene' to these functions
    addLights(scene);
    addObjects(scene);  // Make sure addObjects also correctly receives 'scene'

    // Add helpers
    const axesHelper = new THREE.AxesHelper(50);  // The number controls the size of the axes
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(100, 10);  // First param is size, second is divisions
    scene.add(gridHelper);

    controls = createControls(camera, renderer.domElement);  // Ensure this returns controls and is initialized after the camera
    
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    render();
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyD': moveRight = true; break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW': moveForward = false; break;
        case 'KeyS': moveBackward = false; break;
        case 'KeyA': moveLeft = false; break;
        case 'KeyD': moveRight = false; break;
    }
}

function render() {
    requestAnimationFrame(render);
    if (moveForward) controls.moveForward(0.1);
    if (moveBackward) controls.moveForward(-0.1);
    if (moveLeft) controls.moveRight(-0.1);
    if (moveRight) controls.moveRight(0.1);
    renderer.render(scene, camera);
}

window.onload = init;
