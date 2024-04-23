// objects/index.js
import { addBuilding, createHouse, addStreetLight } from './buildings.js';
import { addStreet, addSidewalk, addTree , addGround } from './streets.js';


export function addObjects(scene) {
    // Adding ground
    addGround(scene);

    // Road and sidewalk parameters
    let roadX = 0; // X-coordinate of the road center
    let roadZ = -30; // Z-coordinate of the road center
    let roadWidth = 10; // The width of the road
    let roadDepth = 100; // The depth of the road
    let sidewalkWidth = 2; // The width of the sidewalk

    // Adding streets and sidewalks
    addStreet(scene, roadX, roadZ, roadWidth, roadDepth, './assets/road.jpg');
    addSidewalk(scene, roadX - roadWidth / 2 - sidewalkWidth / 2, roadZ, sidewalkWidth, roadDepth, './assets/passeio.jpg');
    addSidewalk(scene, roadX + roadWidth / 2 + sidewalkWidth / 2, roadZ, sidewalkWidth, roadDepth, './assets/passeio.jpg');
    
    // Adding houses
    createHouse(scene, 12, -5, -Math.PI / 2);
    createHouse(scene, 12, -20, -Math.PI / 2);
    createHouse(scene,12,10, -Math.PI / 2);

    // Adding a tree
    addTree(scene, 12, -12.5);
    addTree(scene, 12, 2.5);

    //Adding builduings across the street
    addBuilding(scene, -12.5, -12, 10, 10, 20, './assets/paredes.jpg', './assets/paredes.jpg');
    //Adding street lights between the houses
    addStreetLight(scene, 9, -11, 5, Math.PI);
    addStreetLight(scene, 9, 4, 5, Math.PI);
    addStreetLight(scene, 9, 1, 5, Math.PI);
    addStreetLight(scene, 9, -14, 5, Math.PI);
    
    
}
