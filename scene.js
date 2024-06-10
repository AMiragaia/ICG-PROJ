// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
    control: null,
};


let building_colors = [0xff0000, 0xff0059, 0xd000ff, 0x5d00ff, 0x0091ff, 0x00ff95, 0x3cff00, 0Xffcc00, 0xff6600];

helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false, keyShift = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

// Update render image size and camera aspect when the window is resized
function resizeWindow() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
        case 16: //shift
            keyShift = true;
            break;
    }
}
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
        case 16: //shift
            keyShift = false;
            break;
    }
}

// Insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {
    // ************************** //
    // Create a ground plane
    // ************************** //
    const plane = createPlane(3200,4000);
    sceneGraph.add(plane);
    plane.name = "plane"

    const concrete = new THREE.Mesh(new THREE.PlaneGeometry(1180, 4000), new THREE.MeshPhongMaterial({color: 0x332e23, side : THREE.DoubleSide}));
    concrete.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    concrete.receiveShadow = true;
    concrete.position.set(810,5,0)


    sceneGraph.add(concrete);

     // ************************** //
    // Create roads and others
    // ************************** //

    sceneGraph.add(createRoad(3200, 150, -200, 0));
    sceneGraph.add(createRoad(150, 1950, 150, -1025));
    sceneGraph.add(createRoad(150, 1950, 150, 1025));
  
    sceneGraph.add(createCrossWalk());

    const othercross = createCrossWalk();
    othercross.rotation.y = Math.PI/2;
    othercross.position.set(150,0,155);
    sceneGraph.add(othercross);

    

    // ************************** //
    // Create vehicles
    // ************************** //

    const person = createPerson(-1200, 5, 40);
    sceneGraph.add(person);
    // Name
    person.name = "person";

    const redcar = createRedCar(-168, 800)
    redcar.rotation.y = Math.PI / 2
    redcar.name = "redcar"
    sceneGraph.add(redcar);

    sceneGraph.add(createClassicCar(1120, -800));
    

    // ************************** //
    // Create trees
    // ************************** //

    for (var i = -100; i > -1800; i-=400){ sceneGraph.add(createTree(i)); }

    // ************************** //
    // Create lightposts
    // ************************** //

    for (var i = -1700; i <= 1200; i+=200){ sceneGraph.add(createPost(i, 0)); }

    for (var i = -2000; i <= 1900; i+=200){ 
        const post = createPost(0,i);
        post.rotation.y = - Math.PI/2
        post.position.x += 100;
        sceneGraph.add(post); 
    }

    // ************************** //
    // Create buildings and parking lot
    // ************************** //

    sceneGraph.add(createRoad(100, 240, 880, -190));

    for (var z= -1850; z < -100; z+= 300 ){ sceneGraph.add(createBuilding(-100, z)); }

    

    sceneGraph.add(createParkingLot());
    
    sceneGraph.add(createShop1());
    sceneGraph.add(createShop2()); 
    

    // ************************** //
    // Create football field
    // ************************** //
    const field = createField();
    field.position.z = -1550
    field.position.x = -900
    field.scale.set(1.1, 1.1, 1.1)
    sceneGraph.add(field);

    for (var x = -1200; x <= -500; x+=550){
        for (var z = -1880; z <= -1200; z+=680){
            sceneGraph.add(createBench(x, z));
        }
    }


    // ************************** //
    // Create sun and moon
    // ************************** //

    // create sun and add pivot light
    const sun = createSun(0, 2800, 0);
    sceneGraph.add(sun);

    const sunPivot = new THREE.Object3D();
    sunPivot.add(sceneElements.sceneGraph.getObjectByName("sunlight"));
    sunPivot.add(sun);
    sceneElements.sceneGraph.add(sunPivot)
    sunPivot.name="sunPivot"
    

    // create moon and add pivot light
    const moon = createMoon(0, -2400, 0);
    sceneGraph.add(moon);

    const moonPivot = new THREE.Object3D();
    moonPivot.add(sceneElements.sceneGraph.getObjectByName("moonlight"));
    moonPivot.add(moon);
    sceneElements.sceneGraph.add(moonPivot)
    moonPivot.name="moonPivot"

   
}

////////////////////////////////



let firstperson = false;
let clicks = 0;
  
  let btn = document.querySelector('#firstperson');
  btn.addEventListener('click',function(event) {
    clicks++;
    if (clicks % 2 != 0) { firstperson = true; } 
    else { 
        sceneElements.camera.position.set(-3500, 2500, 0); 
        sceneElements.camera.lookAt(0,0,0);
        firstperson = false; 
    }
  });



////////////////////////////////
////////////////////////////////
////////////////////////////////

////////////////////////////////
////////////////////////////////
////////////////////////////////


////////////////////////////////
////////////////////////////////
////////////////////////////////



function computeFrame() {


    const sun = sceneElements.sceneGraph.getObjectByName("sun");
    const worldPosition = new THREE.Vector3();
    const sunpos = sun.getWorldPosition( worldPosition );

    // otherbuilding lights
    
    

    // get sunlight
    const sunlight = sceneElements.sceneGraph.getObjectByName("sunlight");

    // field lights
    const fl1 = sceneElements.sceneGraph.getObjectByName("light440")
    const fl2 = sceneElements.sceneGraph.getObjectByName("light-440")

    let post_lights = []
    // post lights
    for(var i = -1700; i <= 1200; i+=200){
        var p = 'postlight'.concat(i);
        p = sceneElements.sceneGraph.getObjectByName("postlight"+i);
        post_lights.push(p);
    }

    for (var i = -2000; i <= 1900; i+=200){ 
        var p = 'postlight'.concat(i);
        p = sceneElements.sceneGraph.getObjectByName("postlight"+i);
        post_lights.push(p);
    }

    let building_lights = []
    // post lights
    for (var i= -1850; i < -100; i+= 300 ){
        var b = 'buildinglight'.concat(i);
        b = sceneElements.sceneGraph.getObjectByName("buildinglight"+i);
        building_lights.push(b);
    }
    
    var r = building_colors[Math.floor(Math.random()*building_colors.length)];
    
    // if its day
    if (sunpos.y > 0) {

        createjs.Tween.get(sceneElements.sceneGraph.background).to(new THREE.Color(0x91c3ed), 1200)
        createjs.Tween.get(sceneElements.sceneGraph.fog).to(new THREE.Fog(0xffe680, 2500, 12000))
        
        for (var i in post_lights){ post_lights[i].intensity = 0; }
        for (var i in building_lights){ building_lights[i].intensity = 0; }
        

        
        
        sunlight.intensity = 1;
        fl1.intensity = 0;
        fl2.intensity = 0;
        

    } else {    // night

        createjs.Tween.get(sceneElements.sceneGraph.background).to(new THREE.Color(0x090f14), 1200)
        createjs.Tween.get(sceneElements.sceneGraph.fog).to(new THREE.Fog(0x1e2733, 1000, 10000))
        for (var i in post_lights){ post_lights[i].intensity = 2.8; }
        for (var i in building_lights){ building_lights[i].intensity = 1; }
        sunlight.intensity = 0;
        fl1.intensity = 1.6;
        fl2.intensity = 1.6;
        
    }

    // rotate sun and moon light
    const lightSun = sceneElements.sceneGraph.getObjectByName("sunPivot");
    const lightMoon = sceneElements.sceneGraph.getObjectByName("moonPivot");
    lightSun.rotation.x -= 0.005;
    lightMoon.rotation.x -= 0.005;

    
    const redcar = sceneElements.sceneGraph.getObjectByName("redcar");
    if (redcar.position.x > -2350){ redcar.position.x -= 14; }
    if (redcar.position.x <= -2350){ redcar.position.set(750, redcar.position.y, redcar.position.z)}

    
    
    const person = sceneElements.sceneGraph.getObjectByName("person");
    
    if (firstperson) {
        sceneElements.control = true;
        const cameraOffset = new THREE.Vector3(25, 25, 25); 

        // NOTE Assuming the camera is direct child of the Scene
        const carPosition = new THREE.Vector3();
        person.getWorldPosition(carPosition);

        sceneElements.camera.position.copy(carPosition).add(cameraOffset);
        // look at front of car
        sceneElements.camera.lookAt(person.position.x, person.position.y+100, person.position.z); 
    }


    var disp;
    // CONTROLING THE CAR WITH THE KEYBOARD
    if (person.position.x < 1340 && person.position.x > -1740 && person.position.z < 1940  && person.position.z > -1940){

        if (keyShift){ disp=22; } else { disp=14; }

        if (keyW) { 
            person.translateX(disp*1.2);
        }
        if (keyA) {
            person.rotation.y += 0.1;
            person.translateZ(-disp);
            person.translateX(disp);
        }
        if (keyS) {
            person.translateX(-disp*1.2);
        }
        if (keyD) {
            person.rotation.y -= 0.1;
            person.translateZ(disp);
            person.translateX(disp);
        }

    } else {
        const currx = person.position.x;
        const currz = person.position.z;

        if (currx >= 1340){ person.position.set( (-currx-400 ) +3.51, 0, currz ) } 
        if (currx <= -1740) { person.position.set( (-currx-400 ) -3.51, 0, currz )  }
        if (currz >= 1940){ person.position.set( currx, 0, -currz+3.51 )  } 
        if (currz <= -1940) { person.position.set( currx, 0, -currz-3.51 )  }
    }

    

    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}
