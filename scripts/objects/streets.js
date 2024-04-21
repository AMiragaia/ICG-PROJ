import * as THREE from 'three';

export function addGround(scene) {
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
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
