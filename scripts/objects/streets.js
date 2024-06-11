import * as THREE from 'three';

export function addGround(scene) {
    const groundGeometry = new THREE.PlaneGeometry(100, 150);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
}

export function addSidewalk(scene, x, z, width, depth, texturePath) {

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(texturePath, (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(width / 2, depth / 2); // Adjust according to your scale

        const sidewalkMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const sidewalkGeometry = new THREE.PlaneGeometry(width, depth);
        const sidewalk = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);

        sidewalk.rotation.x = -Math.PI / 2;
        sidewalk.position.set(x, 0.1, z); // Slightly above ground to avoid z-fighting
        sidewalk.receiveShadow = true;

        scene.add(sidewalk);
    });
}
export function addStreet(scene, x, z, width, depth, texturePath) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(texturePath, function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(width / 10, depth / 10);

        const streetMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const streetGeometry = new THREE.PlaneGeometry(width, depth);
        const street = new THREE.Mesh(streetGeometry, streetMaterial);
        street.rotation.x = -Math.PI / 2;
        street.position.set(x, 0.1, z);
        street.receiveShadow = true;
        scene.add(street);
    });
}

export function addTree(scene, x, z) {
    const loader = new THREE.TextureLoader();
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('assets/tronco.jpg') // Correct path to your bark texture
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 2, z); // Position the trunk half its height above the ground
    scene.add(trunk);

    const leavesGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const leavesMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22, // Forest green
        map: loader.load('assets/folhas.jpg') // Correct path to your leaf texture
    });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, 6, z); // Positioned above the trunk
    scene.add(leaves);
}

// Função para criar uma lixeira
export function createTrashCan(x, z, rotationY = 0) {
    const trashCanGroup = new THREE.Group();

    // Corpo da lixeira
    const bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4a4a4a, shininess: 50 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 1, 0); // Posição do corpo da lixeira
    trashCanGroup.add(body);

    // Boca da lixeira
    const mouthGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8);
    const mouthMaterial = new THREE.MeshPhongMaterial({ color: 0xc0c0c0, shininess: 100 }); // Cor cinza claro
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 1.95, 0); // Posição da boca da lixeira
    trashCanGroup.add(mouth);

    // Borda da boca da lixeira
    const borderGeometry = new THREE.BoxGeometry(1, 0.1, 1);
    const borderMaterial = new THREE.MeshPhongMaterial({ color: 0x555555, shininess: 30 });
    const border = new THREE.Mesh(borderGeometry, borderMaterial);
    border.position.set(0, 2.0, 0); // Posição da borda da lixeira
    trashCanGroup.add(border);

    trashCanGroup.position.set(x, 0, z);
    trashCanGroup.rotation.y = rotationY;

    return trashCanGroup;
}

function createWheels() {
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    wheel.rotation.z = Math.PI / 2; // Rotaciona o cilindro para que fique na orientação correta
    return wheel;
}
  export function createCar(scene, x, z, rotationY = 0) {
    const car = new THREE.Group();
    
    const backLeftWheel = createWheels();
    backLeftWheel.position.set(-1.1, 0.35, 1.6); // Ajuste para as rodas traseiras
    car.add(backLeftWheel);
  
    const backRightWheel = createWheels();
    backRightWheel.position.set(1.1, 0.35, 1.6); // Ajuste para as rodas traseiras
    car.add(backRightWheel);
  
    const frontLeftWheel = createWheels();
    frontLeftWheel.position.set(-1.1, 0.35, -1.6); // Ajuste para as rodas dianteiras
    car.add(frontLeftWheel);
  
    const frontRightWheel = createWheels();
    frontRightWheel.position.set(1.1, 0.35, -1.6); // Ajuste para as rodas dianteiras
    car.add(frontRightWheel);
  
    const main = new THREE.Mesh(
      new THREE.BoxGeometry(3, 1.1, 4.5), // Corpo do carro menos largo e mais longo
      new THREE.MeshLambertMaterial({ color: 0xa52523 })
    );
    main.position.y = 1.0;
    car.add(main);
  
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 1.1, 2.2), // Dimensões ajustadas para a cabine
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    cabin.position.set(0, 1.55, 0);
    car.add(cabin);
  
    car.position.set(x, 0, z);
    car.rotation.y = rotationY;
    scene.add(car);
  
    return car;
  }