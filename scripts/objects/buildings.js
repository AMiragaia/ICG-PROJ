import * as THREE from 'three';

// You might want to pass the scene as an argument to these functions if they are not in the same module as your main scene setup.
export function addBuilding(scene, x, z, width, depth, height, texturePath, normalMapPath) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(width / 10, height / 10);

    const normalMap = textureLoader.load(normalMapPath);
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(width / 10, height / 10);

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

export function createHouse(scene, x, z, rotationY = 0) {
    const loader = new THREE.TextureLoader();
    const houseGroup = new THREE.Group();

    const baseGeometry = new THREE.BoxGeometry(10, 5, 10);
    const baseMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('assets/paredes.jpg'), // Ensure path is correct
        normalMap: loader.load('assets/paredes.jpg') // Assuming the normal map is the same
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 2.5, 0);
    houseGroup.add(base);

    const roofGeometry = new THREE.ConeGeometry(7, 4, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 7, 0);
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);

    const windowGeometry = new THREE.PlaneGeometry(2, 1);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });

    const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
    windowLeft.position.set(-3, 3, 5.1);
    houseGroup.add(windowLeft);

    const windowRight = new THREE.Mesh(windowGeometry, windowMaterial);
    windowRight.position.set(3, 3, 5.1);
    houseGroup.add(windowRight);

    const doorGeometry = new THREE.BoxGeometry(1.5, 2.5, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.25, 5.1);
    houseGroup.add(door);

    houseGroup.position.set(x, 0, z);
    houseGroup.rotation.y = rotationY;
    scene.add(houseGroup);
}
