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

    // Add helpers
    const axesHelper = new THREE.AxesHelper(50);  // The number controls the size of the axes
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(100, 10);  // First param is size, second is divisions
    scene.add(gridHelper);

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
    camera.position.set(0, 1.6, 5); // Adjust if necessary to start the camera at street level
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
    addBuilding(-30, 0, 10, 10, 30, 'bricks.jpg');
    addBuilding(30, -40, 20, 20, 50, 'bricks.jpg');
    addStreet(0, -30, 10, 100, 'road.jpg');
    // Example values for the road and sidewalk parameters
    let roadX = 0; // X-coordinate of the road center
    let roadZ = -30; // Z-coordinate of the road center
    let roadWidth = 10; // The width of the road
    let roadDepth = 100; // The depth of the road
    let sidewalkWidth = 2; // The width of the sidewalk

    // Adding the road
    addStreet(roadX, roadZ, roadWidth, roadDepth, 'road.jpg');
    
    // Adding sidewalks on both sides of the road
    // Adjust the x-coordinate for the left sidewalk
    addSidewalk(roadX - roadWidth / 2 - sidewalkWidth / 2, roadZ, sidewalkWidth, roadDepth, 'passeio.jpg');
    // Adjust the x-coordinate for the right sidewalk
    addSidewalk(roadX + roadWidth / 2 + sidewalkWidth / 2, roadZ, sidewalkWidth, roadDepth, 'passeio.jpg');
    createHouse(12,-5, -Math.PI/2);
    createHouse(12,-20,-Math.PI/2);
}
function addWindow(building, width, height, offsetX, offsetY) {
    const windowGeometry = new THREE.PlaneGeometry(width, height);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.5
    });
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(offsetX, offsetY, building.geometry.parameters.depth / 2 + 0.01);
    building.add(window);
}

function addBalcony(building, width, depth, height, offsetX, offsetY) {
    const balconyGeometry = new THREE.BoxGeometry(width, height, depth);
    const balconyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
    balcony.position.set(offsetX, offsetY, building.geometry.parameters.depth / 2 + depth / 2);
    building.add(balcony);
}

function addGround() {
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
}
function addSidewalk(x, z, width, depth, texturePath) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath, function (tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(width / 2, depth / 2); // Adjust based on your texture's details and sidewalk size
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });

    const sidewalkGeometry = new THREE.PlaneGeometry(width, depth);
    const sidewalkMaterial = new THREE.MeshLambertMaterial({ map: texture });
    const sidewalk = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
    sidewalk.rotation.x = -Math.PI / 2;
    sidewalk.position.set(x, 0.1, z); // Adjust height as needed to be just above the street level
    sidewalk.receiveShadow = true;
    scene.add(sidewalk);
}

function addStreet(x, z, width, depth, texturePath) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath, function (tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(width / 10, depth / 10); // Adjust 10 to your texture's aspect ratio
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        tex.minFilter = THREE.LinearMipmapLinearFilter;
    });

    const streetGeometry = new THREE.PlaneGeometry(width, depth);
    const streetMaterial = new THREE.MeshLambertMaterial({ map: texture });
    const street = new THREE.Mesh(streetGeometry, streetMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.set(x, 0.1, z);
    street.receiveShadow = true;
    scene.add(street);
}

function addBuilding(x, z, width, depth, height, texturePath, normalMapPath) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(width / 10, height / 10); // Adjust based on the building's size

    const normalMap = textureLoader.load(normalMapPath);
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(width / 10, height / 10); // Match the main texture

    const material = new THREE.MeshStandardMaterial({ 
        map: texture,
        normalMap: normalMap 
    });

    const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
    const building = new THREE.Mesh(buildingGeometry, material);
    building.position.set(x, height / 2, z);
    building.castShadow = true;
    building.receiveShadow = true;
    scene.add(building);
}
function createHouse(x, z, rotationY = 0) {
    const loader = new THREE.TextureLoader();
    const houseGroup = new THREE.Group();

    // Base of the house
    const baseGeometry = new THREE.BoxGeometry(10, 5, 10);
    const baseMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('paredes.jpg'),
        normalMap: loader.load('paredes.jpg')  // Assuming a separate normal map
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 2.5, 0); // Center the base within the group
    houseGroup.add(base);

    // Roof
    const roofGeometry = new THREE.ConeGeometry(7, 4, 4); // Simple pyramid roof
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 7, 0); // Position relative to the group center
    roof.rotation.y = Math.PI / 4; // Align the roof properly
    houseGroup.add(roof);

    // Windows
    const windowGeometry = new THREE.PlaneGeometry(2, 1);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });

    // Left window
    const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
    windowLeft.position.set(-3, 3, 5.1); // Left window position
    houseGroup.add(windowLeft);

    // Right window
    const windowRight = new THREE.Mesh(windowGeometry, windowMaterial);
    windowRight.position.set(3, 3, 5.1); // Right window position
    houseGroup.add(windowRight);

    // Door
    const doorGeometry = new THREE.BoxGeometry(1.5, 2.5, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.25, 5.1); // Centered door position
    houseGroup.add(door);

    // Set the position and rotation of the entire group
    houseGroup.position.set(x, 0, z);
    houseGroup.rotation.y = rotationY; // Apply the rotation as specified by the argument

    scene.add(houseGroup);
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
