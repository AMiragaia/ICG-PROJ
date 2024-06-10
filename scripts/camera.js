// camera.js
import * as THREE from 'three';

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 1.6, 5); // Adjust if necessary to start the camera at street level
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}
