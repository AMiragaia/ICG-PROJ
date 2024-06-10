// controls.js
import { PointerLockControls } from 'PointerLockControls';
import * as THREE from 'three';

export function createControls(camera, domElement) {
    const controls = new PointerLockControls(camera, domElement);

    document.body.addEventListener('click', function () {
        controls.lock();
    });

    controls.addEventListener('lock', () => {
        document.getElementById('blocker').style.display = 'none';
        document.getElementById('instructions').style.display = 'none';
    });

    controls.addEventListener('unlock', () => {
        document.getElementById('blocker').style.display = 'block';
        document.getElementById('instructions').style.display = '';
    });

    return controls;
}
