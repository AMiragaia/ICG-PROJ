import * as THREE from 'three';
import { PointerLockControls } from 'PointerLockControls';
import { addObjects } from './objects/index.js';

let camera, scene, renderer, controls;
let cars = {};
let streetLights = [];
let dayMode = true;

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

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
    scene.add(directionalLight);
}

function init() {
    scene = new THREE.Scene();
    camera = createCamera();
    setupRenderer();

    addLights(scene);
    cars = addObjects(scene, streetLights); // Atribua o retorno da função `addObjects` à variável `cars`
    controls = createControls(camera, renderer.domElement);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    const modeButton = document.getElementById('modeButton');
    modeButton.addEventListener('click', toggleDayNightMode);

    // Handlers for pointer lock
    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', function () {
        controls.lock();
    });

    controls.addEventListener('lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
    });

    render();
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0x87CEEB)); // Céu azul para o dia
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
}

function toggleDayNightMode() {
    dayMode = !dayMode;

    const button = document.getElementById('modeButton');
    if (dayMode) {
        button.textContent = 'Night Mode';
        renderer.setClearColor(new THREE.Color(0x87CEEB)); // Céu azul
        setStreetLightsVisibility(false);
    } else {
        button.textContent = 'Day Mode';
        renderer.setClearColor(new THREE.Color(0x000000)); // Céu preto
        setStreetLightsVisibility(true);
    }
}

function setStreetLightsVisibility(visible) {
    streetLights.forEach(light => {
        light.visible = visible;
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

function render() {
    requestAnimationFrame(render);

    // Movimento dos carros
    const speed = 0.1;
    if (cars.car1) {
        cars.car1.position.z -= speed;
        if (cars.car1.position.z < -75) {
            cars.car1.position.z = 75;
        }
    }

    if (cars.car2) {
        cars.car2.position.z += speed;
        if (cars.car2.position.z > 75) {
            cars.car2.position.z = -75;
        }
    }

    if (cars.redcar) {
        cars.redcar.position.z += speed;
        if (cars.redcar.position.z > 75) {
            cars.redcar.position.z = -75;
        }
    }

    if (moveForward) controls.moveForward(0.1);
    if (moveBackward) controls.moveForward(-0.1);
    if (moveLeft) controls.moveRight(-0.1);
    if (moveRight) controls.moveRight(0.1);

    renderer.render(scene, camera);
}

window.onload = init;