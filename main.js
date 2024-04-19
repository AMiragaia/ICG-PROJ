import * as THREE from 'three';
import { PointerLockControls } from 'PointerLockControls'; // Ensure this path is correct

let camera, scene, renderer, controls;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

function init() {
    scene = new THREE.Scene();
    setupCamera();
    setupRenderer();
    addLights();
    addObjects();

    controls = new PointerLockControls(camera, renderer.domElement);
    document.body.addEventListener('click', function () {
        controls.lock();
    });

    controls.addEventListener('lock', function () {
        document.getElementById('blocker').style.display = 'none';
        document.getElementById('instructions').style.display = 'none';
    });

    controls.addEventListener('unlock', function () {
        document.getElementById('blocker').style.display = 'block';
        document.getElementById('instructions').style.display = '';
    });

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    render();
}

function setupCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 1.6, 0); // Adjust if necessary to start the camera at street level
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
}

function addLights() {
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
}

function addObjects() {
    addGround();
    addBuilding(-30, 0, 10, 10, 30, 0xaabbcc);
    addBuilding(0, 30, 15, 15, 40, 0xccaabb);
    addBuilding(30, -40, 20, 20, 50, 0xcccccc);
    addStreet(0, 15, 100, 10);
    addStreet(0, -15, 100, 10);
    addStreet(0, -30, 10, 100);
}

function addGround() {
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
}

function addStreet(x, z, width, depth) {
    const streetGeometry = new THREE.PlaneGeometry(width, depth);
    const streetMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 });
    const street = new THREE.Mesh(streetGeometry, streetMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.set(x, 0.1, z);
    scene.add(street);
}

function addBuilding(x, z, width, depth, height, color) {
    const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
    const buildingMaterial = new THREE.MeshLambertMaterial({ color: color });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.set(x, height / 2, z);
    building.castShadow = true;
    scene.add(building);
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
