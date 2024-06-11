import * as THREE from 'three';
export function addParkingLot(scene, x, z, width, depth, rotationZ = 0) {
    const parkingLotGeometry = new THREE.PlaneGeometry(width, depth);
    const parkingLotMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const parkingLot = new THREE.Mesh(parkingLotGeometry, parkingLotMaterial);
    parkingLot.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
    parkingLot.rotation.z = rotationZ; // Apply the rotation around the Z-axis
    parkingLot.position.set(x, 0.02, z); // Slightly raise the parking lot to avoid z-fighting
    parkingLot.receiveShadow = true;
    scene.add(parkingLot);

    // Add parking lines
    const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const lineWidth = 0.1;
    const spaceWidth = (width - lineWidth * 5) / 4; // Calculate the width of each parking space
    for (let i = 0; i < 5; i++) {
        const lineGeometry = new THREE.PlaneGeometry(lineWidth, depth);
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
        line.rotation.y = 0; // Rotate the plane to be vertical
        line.rotation.z = rotationZ; // Apply the same rotation
        line.position.set(x - width / 2 + lineWidth / 2 + i * (spaceWidth + lineWidth), 0.03, z); // Offset a bit on the y-axis to avoid z-fighting
        scene.add(line);
    }

    // Add entrance
    const entranceWidth = width / 4;
    const entranceGeometry = new THREE.PlaneGeometry(entranceWidth, depth / 4);
    const entranceMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
    entrance.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
    entrance.rotation.z = rotationZ; // Apply the same rotation
    entrance.position.set(x, 0.03, z - depth / 2 - depth / 8); // Adjust the position to face the road
    entrance.receiveShadow = true;
    scene.add(entrance);
}
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

    // Add door
    const doorGeometry = new THREE.BoxGeometry(2, 4, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(x, 2, z + depth / 2 + 0.05);
    door.castShadow = true;
    door.receiveShadow = true;

    // Add windows
    const windowGeometry = new THREE.BoxGeometry(2, 2, 0.1);
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, opacity: 0.6, transparent: true });

    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(x - 3, 8, z + depth / 2 + 0.05);
    window1.castShadow = true;
    window1.receiveShadow = true;

    const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
    window2.position.set(x + 3, 8, z + depth / 2 + 0.05);
    window2.castShadow = true;
    window2.receiveShadow = true;

    const window3 = new THREE.Mesh(windowGeometry, windowMaterial);
    window3.position.set(x + 3, 12, z + depth / 2 + 0.05);
    window3.castShadow = true;
    window3.receiveShadow = true;
    
    const window4 = new THREE.Mesh(windowGeometry, windowMaterial);
    window4.position.set(x - 3, 12, z + depth / 2 + 0.05);
    window4.castShadow = true;
    window4.receiveShadow = true;
    
    const window5 = new THREE.Mesh(windowGeometry, windowMaterial);
    window5.position.set(x + 3, 16, z + depth / 2 + 0.05);
    window5.castShadow = true;
    window5.receiveShadow = true;
    
    const window6 = new THREE.Mesh(windowGeometry, windowMaterial);
    window6.position.set(x - 3, 16, z + depth / 2 + 0.05);
    window6.castShadow = true;
    window6.receiveShadow = true;

    // Add everything to the group
    const group = new THREE.Group();
    group.add(building);
    group.add(door);
    group.add(window1);
    group.add(window2);
    group.add(window3);
    group.add(window4);
    group.add(window5);
    group.add(window6);
    group.rotateY(Math.PI / 2);
    scene.add(group);
}
export function addStreetLight(scene, x, z, height = 5, rotationY = 0, streetLights) {
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

    streetLights.push(light); // Adiciona a luz da rua à lista
}



// Function to "erase" part of the crosswalk
export function eraseCrosswalk(scene, x, z, width, depth) {
    const eraseGeometry = new THREE.PlaneGeometry(width, depth);
    const eraseMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Match the road color
    const erasePlane = new THREE.Mesh(eraseGeometry, eraseMaterial);
    erasePlane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
    erasePlane.position.set(x, 0.01, z); // Slightly raise to avoid z-fighting
    erasePlane.receiveShadow = true;
    scene.add(erasePlane);
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

    const handle = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshStandardMaterial({ color: 0x808080 }));
    handle.position.set(0.5, 1.25, 5.15);
    houseGroup.add(handle);
    houseGroup.position.set(x, 0, z);
    houseGroup.rotation.y = rotationY;
    scene.add(houseGroup);
}
export function createHouseBricks(scene, x, z, rotationY = 0) {
    const loader = new THREE.TextureLoader();
    const houseGroup = new THREE.Group();
    
    // Base geometry adjusted to be rectangular
    const baseGeometry = new THREE.BoxGeometry(15, 5, 10);
    const baseMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('assets/bricks.jpg'), // Ensure path is correct
        normalMap: loader.load('assets/bricks.jpg') // Assuming the normal map is the same
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 2.5, 0);
    houseGroup.add(base);

    // Adjusted window geometry and materials
    const windowGeometry = new THREE.PlaneGeometry(2, 1);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000, // Black windows
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });

    const windowBorderMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White border

    const createWindowWithBorder = (x, y, z) => {
        const windowGroup = new THREE.Group();

        const windowFrameGeometry = new THREE.PlaneGeometry(2.2, 1.2);
        const windowFrame = new THREE.Mesh(windowFrameGeometry, windowBorderMaterial);
        windowFrame.position.set(0, 0, -0.01); // Slight offset to prevent z-fighting

        const window = new THREE.Mesh(windowGeometry, windowMaterial);

        windowGroup.add(windowFrame);
        windowGroup.add(window);

        windowGroup.position.set(x, y, z);

        return windowGroup;
    };

    const windowLeft = createWindowWithBorder(-5, 3, 5.1);
    houseGroup.add(windowLeft);

    const windowRight = createWindowWithBorder(5, 3, 5.1);
    houseGroup.add(windowRight);

    // Adjusted door position to fit the new base dimensions
    const doorGeometry = new THREE.BoxGeometry(1.5, 2.5, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.25, 5.1);
    houseGroup.add(door);

    const handle = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshStandardMaterial({ color: 0x808080 }));
    handle.position.set(0.75, 1.25, 5.15);
    houseGroup.add(handle);

    houseGroup.position.set(x, 0, z);
    houseGroup.rotation.y = rotationY;
    scene.add(houseGroup);
}



export function createCottageStyleHouse(scene, x, z, rotationY = 0) {
    const loader = new THREE.TextureLoader();
    const houseGroup = new THREE.Group();

    // Base geometry
    const baseGeometry = new THREE.BoxGeometry(8, 6, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('assets/paredes.jpg'), // Ensure path is correct
        normalMap: loader.load('assets/paredes.jpg') // Assuming the normal map is different
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 3, 0);
    houseGroup.add(base);

    // Roof geometry
    const roofGeometry = new THREE.CylinderGeometry(0, 8, 6, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 9, 0);
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);

    const chimneyGeometry = new THREE.BoxGeometry(1, 5, 1);

    // Load brick texture
    const textureLoader = new THREE.TextureLoader();
    const brickTexture = textureLoader.load('./assets/bricks.jpg'); // Adjust the path to your texture image

    // Create material with brick texture
    const chimneyMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });

    // Create chimney mesh with the textured material
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);

    chimney.position.set(2, 10, -1);
    houseGroup.add(chimney);

    // Windows and door
    const windowGeometry = new THREE.PlaneGeometry(2, 2);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5
    });

    const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
    windowLeft.position.set(-3, 3, 4.1);
    houseGroup.add(windowLeft);

    const windowRight = new THREE.Mesh(windowGeometry, windowMaterial);
    windowRight.position.set(3, 3, 4.1);
    houseGroup.add(windowRight);

    const doorGeometry = new THREE.BoxGeometry(2, 3, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.5, 4.1);
    houseGroup.add(door);
    const handle = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshStandardMaterial({ color: 0x808080 }));
    handle.position.set(0.75, 1.25, 4.15);
    houseGroup.add(handle);
    houseGroup.position.set(x, 0, z);
    houseGroup.rotation.y = rotationY;
    scene.add(houseGroup);
}
export function createAFrameHouse(scene, x, z, rotationY = 0) {
    const loader = new THREE.TextureLoader();
    const houseGroup = new THREE.Group();

    // Base geometry
    const baseGeometry = new THREE.BoxGeometry(12, 6, 12);
    const baseMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('assets/paredes.jpg'), // Ensure path is correct
        normalMap: loader.load('assets/paredes.jpg') // Assuming the normal map is different
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 3, 0);
    houseGroup.add(base);

    // A-Frame roof geometry
    const roofGeometry = new THREE.ConeGeometry(10, 12, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 12, 0);
    roof.rotation.y = Math.PI / 4; // Ensure the roof aligns properly with the base
    houseGroup.add(roof);

    // Windows and door
    const windowGeometry = new THREE.PlaneGeometry(2, 2);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5
    });

    const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
    windowLeft.position.set(-3, 3, 6.1);
    houseGroup.add(windowLeft);

    const windowRight = new THREE.Mesh(windowGeometry, windowMaterial);
    windowRight.position.set(3, 3, 6.1);
    houseGroup.add(windowRight);

    const doorGeometry = new THREE.BoxGeometry(2, 3, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.5, 6.1);
    houseGroup.add(door);
    

    const handle = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshStandardMaterial({ color: 0x808080 }));
    handle.position.set(0.75, 1.25, 6.15);
    houseGroup.add(handle);

    houseGroup.position.set(x, 0, z);
    houseGroup.rotation.y = rotationY;
    scene.add(houseGroup);
}




