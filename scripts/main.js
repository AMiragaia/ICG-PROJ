import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createControls } from './controls.js';
import { addLights } from './lights.js';
import { addObjects } from './objects/index.js';  // Ensure this path is correct
//import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/FBXLoader.js';


let camera, scene, renderer, controls;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

function init() {
    scene = new THREE.Scene();
    camera = createCamera();  // Ensure this function returns a camera and it's being assigned here
    setupRenderer();
    
    // Correctly pass 'scene' to these functions
    addLights(scene);
    addObjects(scene);  // Make sure addObjects also correctly receives 'scene'

    
    controls = createControls(camera, renderer.domElement);  // Ensure this returns controls and is initialized after the camera
    
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    // Check if removeFromParent exists, if not, add it.
    THREE.Object3D.prototype.removeFromParent = THREE.Object3D.prototype.removeFromParent || function() {
        if (this.parent !== null) {
            this.parent.remove(this);
        }
    };

   //loadFBXModel(); 

    render();
}


function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
}
/*function loadFBXModel() {
    const loader = new FBXLoader();
    loader.setPath('/assets/');  // Ensure this path is correct and points to your FBX files
    loader.load('House.fbx', (fbx) => {
        fbx.scale.set(10, 10, 10);  // Adjust the scale as needed
        fbx.rotation.y = -Math.PI / 2; // Adjust the rotation if necessary

        // Add the loaded model to the scene
        scene.add(fbx);

        // Apply shadow properties
        fbx.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true;
                c.receiveShadow = true;
            }
        });
    // Check for animations and create a mixer if necessary
    if (fbx.animations && fbx.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(fbx);
        fbx.animations.forEach((animation) => {
            const action = mixer.clipAction(animation);
            action.play();
        });

        // Update the mixer on each frame
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            mixer.update(delta);
            renderer.render(scene, camera);
        }
        animate();
    }

console.log('FBX model has been loaded and added to the scene.');

}, (xhr) => {
// Called while loading is progressing
console.log(`FBX Loading progress: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
}, (error) => {
// Called when loading has errors
console.error('An error happened during the loading of the FBX file:', error);
});
}*/



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
