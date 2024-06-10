import { addBuilding, createHouse, addStreetLight, createHouseBricks, createCottageStyleHouse, createAFrameHouse } from './buildings.js';
import { addStreet, addSidewalk, addTree, addGround, createTrashCan, createCar } from './streets.js';
import {createRedCar,createBusStop,createHospital} from './loaditems.js';



export function addObjects(scene, streetLights) {
    // Adding ground
    addGround(scene);

    // Road and sidewalk parameters
    let roadX = 0; // X-coordinate of the road center
    let roadZ = 0; // Z-coordinate of the road center
    let roadWidth = 10; // The width of the road
    let roadDepth = 150; // The depth of the road
    let sidewalkWidth = 2; // The width of the sidewalk

    // Adding streets and sidewalks
    addStreet(scene, roadX, roadZ, roadWidth, roadDepth, './assets/road.jpg');
    addSidewalk(scene, roadX - roadWidth / 2 - sidewalkWidth / 2, roadZ, sidewalkWidth, roadDepth, './assets/passeio.jpg');
    addSidewalk(scene, roadX + roadWidth / 2 + sidewalkWidth / 2, roadZ, sidewalkWidth, roadDepth, './assets/passeio.jpg');
    
    // Adding houses
    createHouse(scene, 12, -5, -Math.PI / 2);
    createHouse(scene, 12, -20, -Math.PI / 2);
    createHouse(scene, 12, 10, -Math.PI / 2);
    createHouseBricks(scene, 12, 25, -Math.PI / 2);
    createHouse(scene, 12, 40, -Math.PI / 2);
    // otherside of the street
    createHouse(scene, -12, 0, Math.PI / 2);
    createCottageStyleHouse(scene, -12, 15, Math.PI / 2);
    createAFrameHouse(scene, -12, 45, Math.PI / 2);
    
    // Adding trees
    addTree(scene, 12, -12.5);
    addTree(scene, 12, 2.5);

    // Adding buildings across the street
    addBuilding(scene, 15, -12, 10, 10, 20, './assets/paredes.jpg', './assets/paredes.jpg');

    // Adding street lights between the houses
    addStreetLight(scene, 9, -11, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, 4, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, 1, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, -14, 5, Math.PI,streetLights);

    // Adding trash cans between street lights
    createTrashCan(scene, 9, -12, Math.PI);
    createTrashCan(scene, 9, 2, Math.PI);
    const redcar = createRedCar(3, 6)
    redcar.rotation.y = Math.PI / 2
    redcar.name = "redcar"
    scene.add(redcar);

    const busstop = createBusStop(9, 0)
    busstop.rotation.y = Math.PI
    scene.add(busstop);

    const hospital = createHospital()
    scene.add(hospital);

    // Adding cars
    const car1 = createCar(scene, -2, 75); // Carro na faixa da esquerda, início no topo
    const car2 = createCar(scene, 2, -75);  // Carro na faixa da direita, início na parte inferior

    return { car1, car2, redcar };
}