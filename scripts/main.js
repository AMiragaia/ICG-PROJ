import * as THREE from 'three';
import { PointerLockControls } from 'PointerLockControls';
import { addObjects } from './objects/index.js';

let camera, scene, renderer, controls;
let cars = {};
let streetLights = [];
let dayMode = true;
let clock = new THREE.Clock();

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0); // Center of the screen

function createCamera() {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 1.6, 5); // Adjust if necessary to start the camera at street level
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}

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

export function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048; // Adjust shadow quality
    directionalLight.shadow.mapSize.height = 2048; // Adjust shadow quality
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Store the lights to toggle them later
    scene.userData.ambientLight = ambientLight;
    scene.userData.directionalLight = directionalLight;
}

function init() {
    scene = new THREE.Scene();
    camera = createCamera();
    setupRenderer();

    addLights(scene);
    cars = addObjects(scene, streetLights); // Assign the return value of `addObjects` to the `cars` variable
    controls = createControls(camera, renderer.domElement);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('click', onMouseClick, false);

    const modeButton = document.getElementById('modeButton');
    modeButton.addEventListener('click', toggleDayNightMode);

    render();
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0x87CEEB)); // Blue sky for day
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
}

function toggleDayNightMode() {
    dayMode = !dayMode;

    const button = document.getElementById('modeButton');
    const { ambientLight, directionalLight } = scene.userData;

    if (dayMode) {
        button.textContent = 'Night Mode';
        renderer.setClearColor(new THREE.Color(0x87CEEB)); // Blue sky
        ambientLight.intensity = 0.4;
        directionalLight.intensity = 0.5;
        setStreetLightsVisibility(false);
    } else {
        button.textContent = 'Day Mode';
        renderer.setClearColor(new THREE.Color(0x000000)); // Black sky
        ambientLight.intensity = 0.1;
        directionalLight.intensity = 0.2;
        setStreetLightsVisibility(true);
    }
}

function setStreetLightsVisibility(visible) {
    streetLights.forEach(light => {
        light.visible = visible;
    });
}

function onMouseClick(event) {
    // Raycaster uses the center of the screen
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log('Intersects:', intersects); // Debugging: log intersected objects

    intersects.forEach(intersect => {
        console.log('Intersected object name:', intersect.object.name); // Debugging: log the name of the intersected object
        if (intersect.object.name.startsWith('Cube_Material001_0')) {
            console.log('Bench clicked'); // Debugging: log when the bench is clicked
            // Rotate the bench to the ground
            intersect.object.rotation.z = Math.PI / 2;
        } else if (intersect.object.name.startsWith('garbageContainer')) {
            console.log('Garbage container clicked'); // Debugging: log when the container is clicked
            // Rotate the garbage container to the ground
            intersect.object.rotation.z = Math.PI / 2;
        } else if (intersect.object.name === 'Bus_Stop_01_glass_Glass_0') {
            console.log('Bus stop clicked'); // Debugging: log when the bus stop is clicked
            spawnBus();
        }
    });
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

function swayTrees(delta) {
    scene.traverse(obj => {
        if (obj.name === 'Plane_0') {
            obj.rotation.z += Math.sin(delta);
        }
    });
}

function spawnBus() {
    if (!cars.autocarro) {
        cars.autocarro = createBus();
        cars.autocarro.position.set(3, 0, -3); // Adjust the position in front of the bus stop
        scene.add(cars.autocarro);
    } else {
        cars.autocarro.position.set(3, 0, -3); // Reset the position of the existing bus
    }
}

function render() {
    const delta = clock.getDelta();
    requestAnimationFrame(render);

    // Car movement logic
    const carSpeed = 0.1;

    if (cars.redcar) {
        cars.redcar.position.z += carSpeed;
        if (cars.redcar.position.z > 75) {
            cars.redcar.position.z = -75;
        }
    }

    // Bus movement logic
    const busSpeed = 0.1; // Lower speed for smooth movement

    if (cars.autocarro) {
        if (cars.autocarro.position.z < -35 && cars.autocarro.position.z > -30) {
            // Stop for 3 seconds
            setTimeout(function () {
                cars.autocarro.position.z -= 0.01;
            }, 3000);
        }
        if (cars.autocarro.position.z < -75) {
            cars.autocarro.position.z = 75;
        }
        cars.autocarro.position.z -= busSpeed;
    }

    if (moveForward) controls.moveForward(0.1);
    if (moveBackward) controls.moveForward(-0.1);
    if (moveLeft) controls.moveRight(-0.1);
    if (moveRight) controls.moveRight(0.1);

    swayTrees(delta);

    renderer.render(scene, camera);
}

window.onload = init;
