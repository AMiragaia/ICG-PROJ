import { eraseCrosswalk,addBuilding,addParkingLot ,createHouse, addStreetLight, createHouseBricks, createCottageStyleHouse, createAFrameHouse } from './buildings.js';
import { addStreet, addSidewalk, addTree, addGround, createTrashCan, createCar } from './streets.js';
import {createBench,createTree,createcinema,createBus,createRedCar,createClassicCar,createMuscleCar,createBusStop,createHospital,createShop1, createCampoTenis} from './loaditems.js';



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
    createHouse(scene, 12, 25, -Math.PI / 2);
    // otherside of the street
   
    createCottageStyleHouse(scene, -12, 10, Math.PI / 2);
    createAFrameHouse(scene, -14, 25, Math.PI / 2);
    
    // Adding trees
    addTree(scene, 12, -12.5);
    addTree(scene, 12, 2.5);
    addTree(scene, 12, 17.5);
    addTree(scene, 12, 32.5);

    // Adding buildings across the street
    addBuilding(scene, 15, -12, 10, 10, 20, './assets/paredes.jpg', './assets/paredes.jpg');
    addParkingLot(scene, -30, -15, 20, 10,Math.PI);
    // Adding street lights between the houses
    addStreetLight(scene, 9, -11, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, 4, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, 1, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, -14, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, 16, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, 19, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, 34, 5, Math.PI,streetLights);
    addStreetLight(scene, 9, 31, 5, Math.PI,streetLights);


    
    // Erase part of the crosswalk
    eraseCrosswalk(scene, -15, -25, 35, 5); // Adjust as necessary
    // Adding trash cans between street lights
    
    const arvore1 = createTree(-22,2);
    scene.add(arvore1);

    const arvore2 = createTree(-24,2);
    scene.add(arvore2);

    const arvore3 = createTree(-26,2);
    scene.add(arvore3);

    const arvore4 = createTree(-28,2);
    scene.add(arvore4);

    const arvore5 = createTree(-30,2);
    scene.add(arvore5);

    const arvore6 = createTree(-32,2);
    scene.add(arvore6);

    const arvore7 = createTree(-34,2);
    scene.add(arvore7);

    const arvore8 = createTree(-36,2);
    scene.add(arvore8);

    const arvore9 = createTree(-38,2);
    scene.add(arvore9);

    const arvore10 = createTree(-40,2);
    scene.add(arvore10);

    const arvore11 = createTree(-42,2);
    scene.add(arvore11);


    const trashcan1 = createTrashCan(9, -12, Math.PI);
    trashcan1.name = "garbageContainer1";
    scene.add(trashcan1);

    const trashcan2 = createTrashCan(9, 2, Math.PI);
    trashcan2.name = "garbageContainer2";
    scene.add(trashcan2);

    const trashcan3 = createTrashCan(9, 17, Math.PI);
    trashcan3.name = "garbageContainer3";
    scene.add(trashcan3);

    const trashcan4 = createTrashCan(9, 33, Math.PI);
    trashcan4.name = "garbageContainer4";
    scene.add(trashcan4);

    const redcar = createRedCar(3, 6)
    redcar.rotation.y = Math.PI / 2
    redcar.name = "redcar"
    scene.add(redcar);

    const classiccar = createClassicCar(-15, 27)
    classiccar.rotation.y = -Math.PI / 2
    scene.add(classiccar);

    const musclecar = createMuscleCar(15, -22.5)
    musclecar.rotation.y = Math.PI / 2
    scene.add(musclecar);


    const busstop = createBusStop(9, 0)
    busstop.rotation.y = Math.PI
    scene.add(busstop);

    const hospital = createHospital()
    scene.add(hospital);
    
    const shop1 = createShop1()
    scene.add(shop1);

    const campotenis = createCampoTenis();
    scene.add(campotenis);

    const autocarro = createBus()
    autocarro.name = "autocarro"
    scene.add(autocarro);
    

    const bancohospital = createBench(15,-37)
    scene.add(bancohospital);

    const bancohospital2 = createBench(15, -52)
    scene.add(bancohospital2);

    const bancotenis = createBench(-45, 10)
    scene.add(bancotenis);

    const bancotenis2 = createBench(-45, 15)
    scene.add(bancotenis2);

    const bancotenis3 = createBench(-45, 20)
    scene.add(bancotenis3);

    const bancotenis4 = createBench(-45, 25)
    scene.add(bancotenis4);

    const bancotenis5 = createBench(-45, 30)
    scene.add(bancotenis5);

    const bancotenis6 = createBench(-45, 35)
    scene.add(bancotenis6);
    // Adding cars

    const cinema = createcinema()
    scene.add(cinema);

    

    
    return { redcar,autocarro,classiccar,musclecar,trashcan1,trashcan2,trashcan3,trashcan4 };
}