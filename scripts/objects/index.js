// objects/index.js
import { createHouse } from './buildings.js';
import { addStreet, addSidewalk, addTree , addGround  } from './streets.js';


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

    // Adding a tree
    addTree(scene, 12, -12.5);
}
