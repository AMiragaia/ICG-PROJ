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
export function addStreetLight(scene, x, z, height = 5, rotationY = 0) {
    const loader = new THREE.TextureLoader();
    const streetLightGroup = new THREE.Group(); // Create a group for the street light

    // Metal texture
    const metalTexture = loader.load('assets/metal.jpg');

    // Post
    const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, height - 1, 32);
    const postMaterial = new THREE.MeshStandardMaterial({ map: metalTexture });
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.y = (height - 1) / 2;
    streetLightGroup.add(post);

    // Curved top
    const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(0.2, 0.4, 0),
        new THREE.Vector3(0.5, 0.5, 0)
    );
    const curveGeometry = new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
    const curveMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const curveMesh = new THREE.Mesh(curveGeometry, curveMaterial);
    curveMesh.position.y = height - 1;
    streetLightGroup.add(curveMesh);

    // Lampshade 
    const coneGeometry = new THREE.ConeGeometry(0.2, 0.35, 32);
    const coneMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, transparent: false, opacity: 0.8 });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(0.5, height - 0.6, 0);

    streetLightGroup.add(cone);

    // Light bulb
    const bulbGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const bulbMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00 });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(0.5, height - 0.8, 0);
    streetLightGroup.add(bulb);

    // Point light
    const light = new THREE.PointLight(0xffff00, 1, 5);
    light.position.set(0.5, height - 0.8, 0);
    streetLightGroup.add(light);

    // Set the position and rotation of the entire group
    streetLightGroup.position.set(x, 0, z);
    streetLightGroup.rotation.y = rotationY;

    scene.add(streetLightGroup);
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
