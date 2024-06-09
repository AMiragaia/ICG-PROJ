// PLANE
function createPlane(l,w){

  const g = new THREE.Group();

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(l, w), new THREE.MeshPhongMaterial({color: 0x409111, side : THREE.DoubleSide}));
  plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  plane.receiveShadow = true;
  plane.position.set(-200,0,0)
  plane.name = "name";

  const ground = new THREE.Mesh(new THREE.BoxGeometry(l, w, w), new THREE.MeshPhongMaterial({color: 0x409111}));
  ground.position.y = -w/2
  ground.position.x = -200
  ground.receiveShadow = true;

  g.add(plane, ground)
  return g;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
  
  // CAR
  function createCar(posx, posy, posz) {
    const car = new THREE.Group();
    
    createWheels(-20, 12);  
    createWheels(-20, -12);
    createWheels(20, -12);
    createWheels(20, 12);
    
    const main = new THREE.Mesh( new THREE.BoxBufferGeometry(60, 15, 30), new THREE.MeshPhongMaterial({ color: 'blue' }) );
    main.position.y = 12;
    main.castShadow = true; main.receiveShadow = true;
    main.name = "car_main";
      
    const cabin = new THREE.Mesh( new THREE.BoxBufferGeometry(33, 11, 24), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    cabin.position.x = -6;
    cabin.position.y = 24.5;
    cabin.castShadow = true; cabin.receiveShadow = true;

    const windowcolor = new THREE.MeshPhongMaterial({ color: 0x333333 });

    const windowback = new THREE.Mesh( new THREE.BoxBufferGeometry(10, 8, 18), windowcolor );
    windowback.position.x = -17.8;
    windowback.position.y = 23;

    const sidewindowsback = new THREE.Mesh( new THREE.BoxBufferGeometry(10, 8, 24.3), windowcolor );
    sidewindowsback.position.x = -15;
    sidewindowsback.position.y = 23;
          
    const sidewindowsfront = new THREE.Mesh( new THREE.BoxBufferGeometry(14, 8, 24.3), windowcolor );
    sidewindowsfront.position.x = 0;
    sidewindowsfront.position.y = 23;
            
    const sidewindowsfront2 = new THREE.Mesh( new THREE.CylinderGeometry(5.5, 5.5, 24.3, 3), windowcolor );
    sidewindowsfront2.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    sidewindowsfront2.position.x = 7;
    sidewindowsfront2.position.y = 21.5;
      
    const frontwindow = new THREE.Mesh( new THREE.CylinderGeometry(7, 7, 24, 3), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    frontwindow.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    frontwindow.position.x = 10.6;
    frontwindow.position.y = 23;
        
    const frontwindow2 = new THREE.Mesh( new THREE.CylinderGeometry(6.5, 6.5, 20, 3), windowcolor );
    frontwindow2.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    frontwindow2.position.x = 12;
    frontwindow2.position.y = 21.5;
    
    // lights
    let bulb1 = new THREE.Mesh(new THREE.BoxBufferGeometry(4,4,4), new THREE.MeshBasicMaterial({ color: 0xffffff}) );
    bulb1.position.set(30, 15, -9.5);
  
    let light1 = new THREE.SpotLight(0xffffff, 2.2, 400, THREE.Math.degToRad(30), 0.4);
    light1.position.set(30, 15, -9.5);
    light1.name = "light1";
    
    let lightTarget1 = new THREE.Object3D();
    lightTarget1.position.set(30.01, 15, -9.5);
    light1.target = lightTarget1;
    light1.castShadow = true;

    let bulb2 = new THREE.Mesh(new THREE.BoxBufferGeometry(4,4,4), new THREE.MeshBasicMaterial({ color: 0xffffff}) );
    bulb2.position.set(30, 15, 9.5);
  
    let light2 = new THREE.SpotLight(0xffffff, 2.2, 400, THREE.Math.degToRad(30), 0.4);
    light2.position.set(30, 15, 9.5);
    light2.name = "light2";
  
    let lightTarget2 = new THREE.Object3D();
    lightTarget2.position.set(30.01, 15, 9.5);
    light2.target = lightTarget2;
    light2.castShadow = true;
  
    car.add(windowback, frontwindow, frontwindow2, sidewindowsback, sidewindowsfront, sidewindowsfront2,  )
    car.add(bulb1, bulb2, light1, light2, lightTarget1, lightTarget2)
    car.add(main, cabin);
    
    // WHEELS
    function createWheels(x,z) {

      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 8, 8), new THREE.MeshPhongMaterial({ color: 0x333333 }));
      wheel.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      wheel.position.set( x, 6, z )

      wheel.castShadow = true; wheel.receiveShadow = true;
      
      car.add(wheel)
    }

    car.position.set(posx, posy, posz);
    car.scale.set(1.5, 1.5, 1.5)
    return car;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////
// ROAD
function createRoad(l, w, posx, posz) {

  const fullroad = new THREE.Group();

  const roadGeometry1 = new THREE.PlaneGeometry(l, w);
  const roadMaterial1 = new THREE.MeshPhongMaterial({ color: 0x0F0F0F, side: THREE.DoubleSide });
  road = new THREE.Mesh(roadGeometry1, roadMaterial1);
  road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  road.position.set(posx, 5, posz);
  road.receiveShadow = true;
  
  const geometry = new THREE.PlaneGeometry( l/40, w/20 );
  const material = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
  
  if (l>w){
    for (var i=posx+50; i < l+posx; i+=100){
      white_line = new THREE.Mesh( geometry, material );
      white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      white_line.position.set(-l/2+i, 5.5, posz)
      white_line.receiveShadow = true;
      
      const sidewalk = new THREE.Mesh(new THREE.PlaneGeometry(l, w+80, 1, 1), new THREE.MeshPhongMaterial({ color: 0x332e23, side: THREE.DoubleSide }));
      sidewalk.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      sidewalk.position.set(posx, 2, posz);
      
      fullroad.add(white_line, sidewalk);
    }
  }

  if (w>l){
    for (var i=posz+50; i < w+posz; i+=100){
      white_line = new THREE.Mesh( geometry, material );
      white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      white_line.position.set(posx, 5.5, -w/2+i)
      white_line.receiveShadow = true;

      const sidewalk = new THREE.Mesh(new THREE.PlaneGeometry(l+80, w, 1, 1), new THREE.MeshPhongMaterial({ color: 0x332e23, side: THREE.DoubleSide }));
      sidewalk.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      sidewalk.position.set(posx, 2, posz);

      fullroad.add(white_line, sidewalk);
    }
  }
 
  fullroad.add(road);
  return fullroad;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// GARBAGE
function createGarbage(posz, color){
  const can = new THREE.Group();

  const garbage = new THREE.Mesh( new THREE.BoxBufferGeometry(24, 40, 24), new THREE.MeshPhongMaterial({ color: color }) );
  const gcolor = new THREE.Mesh( new THREE.BoxBufferGeometry(8, 8, 15), new THREE.MeshPhongMaterial({ color: 0x1c1c1c }) );
  garbage.position.set(-80,-180, posz);
  gcolor.position.set(-90, -170, posz);
  
  garbage.castShadow = true; garbage.receiveShadow = true;
  can.add(garbage, gcolor);

  return can;
}

// WINDOWS
function createBuildingWindows(posy, posz, z){
  const windows = new THREE.Group();  

  for (var x = -60; x < 80; x +=60){
    for (var y = 150; y > -160; y-=70){
      const window = new THREE.Mesh( new THREE.PlaneGeometry( 35, 45 ), new THREE.MeshPhongMaterial({ color: 0x82fff0, side: THREE.DoubleSide }) );
      const r = new THREE.Mesh( new THREE.BoxBufferGeometry(40, 5, 70), new THREE.MeshPhongMaterial({ color: 0x362d20 }) );
      
      r.castShadow = true; r.receiveShadow = true;
      
      r.position.set(x, y-posy, posz);
      window.position.set(x, y, z)
      windows.add(window, r);
    }
  }
  return windows;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// BUILDING
function createBuilding(posx, posz) {

  const building = new THREE.Group();  

  const main = new THREE.Mesh( new THREE.BoxBufferGeometry(200, 400, 100), new THREE.MeshPhongMaterial({ color: 0x8f6d53 }) );
  main.castShadow = true; main.receiveShadow = true;
  
  const top = new THREE.Mesh( new THREE.BoxBufferGeometry(160, 420, 80), new THREE.MeshPhongMaterial({ color: 0xedd75c }) );
  top.castShadow = true; top.receiveShadow = true;
  
  const r1 = new THREE.Mesh( new THREE.BoxBufferGeometry(40, 5, 70), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
  r1.position.set(-100, -110, 0);
  r1.castShadow = true; r1.receiveShadow = true;
  
  const door = new THREE.Mesh( new THREE.PlaneGeometry( 35, 70 ), new THREE.MeshPhongMaterial({ color: 0x303030 }) );
  door.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);
  door.position.set(-103, -165, 0);
  door.castShadow = true; door.receiveShadow = true;

  let light = new THREE.PointLight(0xffffff, 1, 150);
  light.position.set(-120, -115, 0);
  light.target = new THREE.Vector3();
  
  light.name = "buildinglight"+posz

  building.add( main, top, door, r1, light);
  building.add( createGarbage(80, 0x34eb23), createGarbage(120, 0xfff821), createGarbage(160, 0x339de8) );
  building.add( createBuildingWindows(23, 25, 55), createBuildingWindows(-23, -25, -55) );

  building.scale.set(1.2, 1.2, 1.2)
  building.position.set(posx+480, 240, posz)
  return building
}


/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// ANOTHER BUILDING WINDOWS
function createAnotherBuildingWindows(){
  const windows = new THREE.Group();  

  for (var x = -60; x < 80; x +=60){
    for (var y = 200; y > -220; y-=150){
      const window = new THREE.Mesh( new THREE.BoxBufferGeometry( 280, 95, 100 ), new THREE.MeshPhongMaterial({ color: 0x82fff0, side: THREE.DoubleSide }) );
      
      const cover = new THREE.Mesh( new THREE.BoxBufferGeometry(320, 120, 100), new THREE.MeshPhongMaterial({ color: 0x808080 }) );
      cover.castShadow = true; cover.receiveShadow = true;
      
      cover.position.set(x, y, 180);
      window.position.set(x, y, 186)
      windows.add(window, cover);
    }
  }

  return windows;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// ANOTHER BUILDING
function createAnotherBuilding(posx, posz){
  const building = new THREE.Group();  
  
  const texture = new THREE.TextureLoader().load( "resources/wall.jpg" )

  const main = new THREE.Mesh( new THREE.BoxBufferGeometry(500, 600, 400), new THREE.MeshPhongMaterial({ color: 0xc7c7c7,  map: texture }) );
  main.castShadow = true; main.receiveShadow = true;


  const main2 = new THREE.Mesh( new THREE.BoxBufferGeometry(400, 400, 300), new THREE.MeshPhongMaterial({ color: 0xdedede, map: texture }) );
  main2.position.y = 400
  main2.castShadow = true; main.receiveShadow = true;

  const main3 = new THREE.Mesh( new THREE.BoxBufferGeometry(250, 100, 200), new THREE.MeshPhongMaterial({ color: 0xededed,  map: texture }) );
  main3.position.y = 650
  main3.castShadow = true; main.receiveShadow = true;

  
  const door = new THREE.Mesh( new THREE.PlaneGeometry( 260, 120 ), new THREE.MeshPhongMaterial({ color: 0x303030 }) );
  door.position.set(0, -240, 205);
  door.castShadow = true; door.receiveShadow = true;

  const handle = new THREE.Mesh( new THREE.BoxBufferGeometry( 35, 5, 15 ), new THREE.MeshPhongMaterial({ color: 0xffda21 }) );
  handle.position.set(0, -240, 206);
  handle.castShadow = true; handle.receiveShadow = true;

  const sep = new THREE.Mesh( new THREE.BoxBufferGeometry( 5, 5, 120 ), new THREE.MeshPhongMaterial({ color: 0xc7c7c7 }) );
  sep.rotation.x = Math.PI / 2;
  sep.position.set(0, -240, 206);
  sep.castShadow = true; sep.receiveShadow = true;

  const rgb1 = new THREE.Mesh( new THREE.BoxBufferGeometry(450, 30, 450), new THREE.MeshPhongMaterial({ color: 0xff0000 }) );
  rgb1.position.y = 450
  rgb1.rotateOnAxis(new THREE.Vector3(0.5, 0, 0), Math.PI / 2)
  rgb1.castShadow = true; main.receiveShadow = true;
  rgb1.name = 'rgb1'

  const rgb2 = new THREE.Mesh( new THREE.BoxBufferGeometry(450, 30, 450), new THREE.MeshPhongMaterial({ color: 0xff0000 }) );
  rgb2.position.y = 450
  rgb2.rotateOnAxis(new THREE.Vector3(0.5, 0, 0), -Math.PI / 2)
  rgb2.castShadow = true; main.receiveShadow = true;
  rgb2.name = 'rgb2'

  // bulb1
  const otherbulb1 = new THREE.Group();
   
  const bulb1 = new THREE.Mesh( new THREE.BoxBufferGeometry( 20, 20, 20 ), new THREE.MeshPhongMaterial({ color: 0xffda21 }) );
  bulb1.position.set(-185, -230, 200);
  bulb1.castShadow = true; bulb1.receiveShadow = true;

  let otherbuildinglight1 = new THREE.PointLight(0xffffff, 1.5, 150);
  otherbuildinglight1.position.set(-185, -230, 206);
  otherbuildinglight1.target = new THREE.Vector3();
  otherbuildinglight1.name = "otherbuildinglight1"

  otherbulb1.add(bulb1, otherbuildinglight1);
  
  // bulb2
  const otherbulb2 = new THREE.Group();

  const bulb2 = new THREE.Mesh( new THREE.BoxBufferGeometry( 20, 20, 20 ), new THREE.MeshPhongMaterial({ color: 0xffda21 }) );
  bulb2.position.set(185, -230, 200);
  bulb2.castShadow = true; bulb2.receiveShadow = true;

  let otherbuildinglight2 = new THREE.PointLight(0xffffff, 1.5, 150);
  otherbuildinglight2.position.set(185, -230, 206);
  otherbuildinglight2.target = new THREE.Vector3();
  otherbuildinglight2.name = "otherbuildinglight2"

  otherbulb2.add(bulb2, otherbuildinglight2);

  // building
  building.add( main, main2, main3, door, handle, sep, otherbulb1, otherbulb2, rgb1, rgb2);
  
  const back = createAnotherBuildingWindows();
  back.rotation.y = Math.PI;

  const right = createAnotherBuildingWindows();
  right.rotation.set(0, Math.PI / 2, Math.PI / 2)
  right.scale.set(1.2, 0.85, 1)
  right.position.x += 50;
  right.position.z -= 44;
  
  building.add( createAnotherBuildingWindows(), back, right, createPoster(), createAntena() );

  building.position.set(posx+1000, 300, posz)
  return building
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// CROSS WALK
function createCrossWalk(){
  const cross = new THREE.Group();

  for (var x=0; x<= 300; x+= 300 ){    
    for (var i=-65; i < 70; i+=33){
      white_line = new THREE.Mesh( new THREE.PlaneGeometry( 19, 80 ), new THREE.MeshPhongMaterial( {color: 0xe6e6e6, side: THREE.DoubleSide} ) );
      white_line.rotation.z = Math.PI/2
      white_line.rotation.x = Math.PI/2
      white_line.receiveShadow = true;
      white_line.position.set(x,6,i)
      cross.add(white_line);
    }
  }
  return cross;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// PARKING LOT
function createParkingLot() {
  const park = new THREE.Group();

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(600, 1100), new THREE.MeshPhongMaterial({color: 0x0F0F0F, side : THREE.DoubleSide}));
  plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  plane.receiveShadow = true;
  plane.position.set(-200,5,100)

  park.add(plane);

  // parking spaces
  const geometry = new THREE.PlaneGeometry( 600/55, 1100/8 );
  const material = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
  
  for (var x = -125; x <= 500; x +=450){
    for (var z = -450; z <= 450; z+=100){
      white_line = new THREE.Mesh( geometry, material );
      white_line.rotation.z = Math.PI/2
      white_line.rotation.x = Math.PI/2
      white_line.position.set(-300+x, 5, z+100)
      white_line.receiveShadow = true;
      park.add(white_line);
    }
  }

  const cube = new THREE.Mesh( new THREE.BoxGeometry( 20, 60, 20 ), new THREE.MeshPhongMaterial( {color: 0x968575} ) );
  cube.position.set(-120, 30, 660)

  const cube2 = new THREE.Mesh( new THREE.BoxGeometry( 10, 200, 5 ), new THREE.MeshPhongMaterial( {color: 0xffffff} ) );
  cube2.rotation.z = Math.PI / 2
  cube2.position.set(-180, 50, 660)
  
  const cube3 = new THREE.Mesh( new THREE.BoxGeometry( 10, 10, 10 ), new THREE.MeshPhongMaterial( {color: 0x000000} ) );
  cube3.position.set(-120, 50, 670)

  park.add( cube );
  park.add( cube2 );
  park.add( cube3 );

  park.position.set(1100,3,-900)
  return park;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LIGHT POSTS
function createPost(posx, posz) {
  const lightpost = new THREE.Group();  

  const post = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, 120, 50 ), new THREE.MeshPhongMaterial( {color: 0x242424} ) );
  post.position.set(50,60,50)
  post.receiveShadow = true; post.castShadow = true;
  
  const holder = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, 50, 50 ), new THREE.MeshPhongMaterial( {color: 0x242424} ) );
  holder.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  holder.position.set(50,120,29);
  holder.receiveShadow = true; holder.castShadow = true;
  
  let bulb = new THREE.Mesh(new THREE.BoxBufferGeometry(4,4,15), new THREE.MeshBasicMaterial({ color: 0xffffff}) );
  bulb.position.set(50, 117.5, 12);
  bulb.receiveShadow = true; bulb.castShadow = true;
  
  let light = new THREE.PointLight(0xffffff, 2, 180);
  light.position.set(50, 120, -39);
  
  if (posx === 0){
    light.name = "postlight"+posz
  } else { light.name = "postlight"+posx }

  lightpost.add(post, holder, bulb, light);

  lightpost.position.set(posx, 0, posz+50);
  return lightpost
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// SUN
function createSun(posx, posy, posz){
  const texture = new THREE.TextureLoader().load( "resources/sun.jpg" )
  const geometry = new THREE.SphereGeometry(150, 64, 64 );
  const material = new THREE.MeshBasicMaterial( { map: texture, color: 0xfbff7a } );
  
  const sun = new THREE.Mesh( geometry, material );
  sun.position.set(posx, posy, posz);
  sun.name = "sun";

  return sun;
}

// MOON
function createMoon(posx, posy, posz){
  const texture = new THREE.TextureLoader().load( "resources/moon.jpg" );
  const geometry = new THREE.SphereGeometry( 70, 64, 64 );
  const material = new THREE.MeshBasicMaterial( { map: texture } );
  
  const moon = new THREE.Mesh( geometry, material );
  moon.position.set(posx, posy, posz);
  moon.name = "moon";

  return moon;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// GOAL POSTS
function createGoalPost(posx, movx, angle){
  const goal = new THREE.Group();
  
  const postGeometry = new THREE.CylinderGeometry( 2, 2, 60, 50 );
  const barGeometry = new THREE.CylinderGeometry( 2, 2, 105, 50 );
  const backbarGeometry = new THREE.CylinderGeometry( 2, 2, 71, 50 );
  const sidepostGeometry = new THREE.CylinderGeometry( 2, 2, 38, 50 );
  const postMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff} );
  
  const lp = new THREE.Mesh( postGeometry, postMaterial );
  lp.position.set(posx,30,-50)
  lp.receiveShadow = true; lp.castShadow = true;

  const rp = new THREE.Mesh( postGeometry, postMaterial );
  rp.position.set(posx,30,50)
  rp.receiveShadow = true; rp.castShadow = true;
  
  const blp = new THREE.Mesh( backbarGeometry, postMaterial );
  blp.rotateOnAxis(new THREE.Vector3(0, 0, angle), Math.PI/6);
  blp.position.set(posx-movx,30,-50)
  blp.receiveShadow = true; blp.castShadow = true;

  const brp = new THREE.Mesh( backbarGeometry, postMaterial );
  brp.rotateOnAxis(new THREE.Vector3(0, 0, angle), Math.PI/6);
  brp.position.set(posx-movx,30, 50)
  brp.receiveShadow = true; brp.castShadow = true;

  const cb = new THREE.Mesh( barGeometry, postMaterial );
  cb.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  cb.position.set(posx,60,0)
  cb.receiveShadow = true; cb.castShadow = true;
  
  const bp = new THREE.Mesh( barGeometry, postMaterial );
  bp.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  bp.position.set(posx-movx*2,1,0)
  bp.receiveShadow = true; bp.castShadow = true;
  
  const lsp = new THREE.Mesh( sidepostGeometry, postMaterial );
  lsp.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  lsp.position.set(posx-movx,1,-50)
  lsp.receiveShadow = true; lsp.castShadow = true;

  const rsp = new THREE.Mesh( sidepostGeometry, postMaterial );
  rsp.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  rsp.position.set(posx-movx,1,50)
  rsp.receiveShadow = true; rsp.castShadow = true;

  goal.add(lp, blp, brp, rp, blp, cb, bp, lsp, rsp);

  return goal;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// FIELD LINES
function createFieldLine(w,h, posx, posz){
  
  const line = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshPhongMaterial({color: 0xffffff, side : THREE.DoubleSide}));
  line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  line.receiveShadow = true;

  line.position.set(posx, 5.5, posz)

  return line;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// FOOTBALL FIELD
function createField(){
  const field = new THREE.Group();

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(900, 500), new THREE.MeshPhongMaterial({color: 0x8a3333, side : THREE.DoubleSide}));
  floor.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  floor.receiveShadow = true;
  
  const goal1 = createGoalPost(-380, 17.5, -1)
  const goal2 = createGoalPost(380, -17.5, 1)

  const array = [0, -380, 380]
  for (var i in array){ field.add(createFieldLine(5, 450, array[i], 0)); }

  const array2 = [-223, 223]
  for (var i in array2){ field.add(createFieldLine(765, 5, 0, array2[i])); }

  // center ring
  const mesh = new THREE.Mesh( new THREE.RingGeometry( 110, 115, 32 ), new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.DoubleSide }) );
  mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  mesh.position.y = 5;
  mesh.receiveShadow = true;

  // FIELD LIGHTS
  function createFieldLight(posx, posz){

    const lightpost = new THREE.Group();  

    const post = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, 240, 50 ), new THREE.MeshPhongMaterial( {color: 0x242424} ) );
    post.position.set(posx, 120, posz)
    post.receiveShadow = true; post.castShadow = true;
    
    let light = new THREE.SpotLight(0xffffff, 1.6, 1400, Math.PI/4, 0.8);
    light.position.set(posx, 120*2, posz);
    light.target = field;

    light.name = "light"+posx
    
    let bulb = new THREE.Mesh(new THREE.SphereGeometry(10,10,30), new THREE.MeshPhongMaterial({ color: 0xffffff}) );
    bulb.position.set(posx, 120*2, posz);
    bulb.receiveShadow = true; bulb.castShadow = true;
     
    let light2 = new THREE.PointLight(0xffffff, 1, 300);
    light2.position.set(posx, 120*2+100, posz);
    
    field.add(post, light, bulb, light2);

    return lightpost;
  }

  // lightposts
  createFieldLight(440, 240)
  createFieldLight(-440, -240)

  field.add(goal1, goal2);
  field.add(floor, mesh);

  field.position.set(-500,5,500);
  return field;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LAKE
function createLake(){
  const lake = new THREE.Group();

  createDuck();
  createWater();

  // WATER
  function createWater(){
    const texture = new THREE.TextureLoader().load( 'resources/water.jpg' );

    const water = new THREE.Mesh(new THREE.BoxBufferGeometry(600, 600, 20), new THREE.MeshPhongMaterial({map: texture}));
    water.translateY(10);
    water.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    water.receiveShadow = true;

    const water2 = new THREE.Mesh(new THREE.BoxBufferGeometry(1000, 200, 20), new THREE.MeshPhongMaterial({map: texture}));
    water2.translateY(10);
    water2.translateX(-800);
    water2.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    water2.receiveShadow = true;

    const floor1 = new THREE.Mesh(new THREE.BoxBufferGeometry(680, 680, 15), new THREE.MeshPhongMaterial({color: 0xffffff}));
    floor1.translateY(7.5);
    floor1.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    floor1.receiveShadow = true;

    const floor2 = new THREE.Mesh(new THREE.BoxBufferGeometry(1100, 280, 15), new THREE.MeshPhongMaterial({color: 0xffffff}));
    floor2.translateY(7.5);
    floor2.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    floor2.translateX(-800);
    floor2.receiveShadow = true;

    const wall1 = new THREE.Mesh( new THREE.BoxBufferGeometry(600, 30, 10), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    wall1.position.set(0, 15, -305);
    wall1.castShadow = true; wall1.receiveShadow = true;

    const wall2 = new THREE.Mesh( new THREE.BoxBufferGeometry(600, 30, 10), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    wall2.position.set(0, 15, 305);
    wall2.castShadow = true; wall2.receiveShadow = true;

    const wall3_1 = new THREE.Mesh( new THREE.BoxBufferGeometry(210, 30, 10), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    wall3_1.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    wall3_1.position.set(-305, 15, 205);
    wall3_1.castShadow = true; wall3_1.receiveShadow = true;

    const wall3_2 = new THREE.Mesh( new THREE.BoxBufferGeometry(210, 30, 10), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    wall3_2.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    wall3_2.position.set(-305, 15, -205);
    wall3_2.castShadow = true; wall3_2.receiveShadow = true;

    const wall4 = new THREE.Mesh( new THREE.BoxBufferGeometry(620, 30, 10), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    wall4.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    wall4.position.set(305, 15, 0);
    wall4.castShadow = true; wall4.receiveShadow = true;

    const wall5_1 = new THREE.Mesh( new THREE.BoxBufferGeometry(1000, 30, 10), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    wall5_1.position.set(-800, 15, 100);
    wall5_1.castShadow = true; wall5_1.receiveShadow = true;

    const wall5_2 = new THREE.Mesh( new THREE.BoxBufferGeometry(1000, 30, 10), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    wall5_2.position.set(-800, 15, -100);
    wall5_2.castShadow = true; wall5_2.receiveShadow = true;

    const wall6 = new THREE.Mesh( new THREE.BoxBufferGeometry(210, 30, 10), new THREE.MeshPhongMaterial({ color: 0xffffff }) );
    wall6.position.set(-1300, 15, 0);
    wall6.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    wall6.castShadow = true; wall6.receiveShadow = true;


    lake.add( water, water2, wall1, wall2, wall3_1, wall3_2, wall4, wall5_1, wall5_2, wall6, floor1, floor2 );
  }

  function createDuck(){
    const duck = new THREE.Group();

    const bodycolor = new THREE.MeshPhongMaterial( {color: 0xf8fc03} );
 
    const body = new THREE.Mesh( new THREE.BoxBufferGeometry( 24, 12, 14 ), bodycolor );
    body.position.set( 0, 26, 200 );
    body.castShadow = true; body.receiveShadow = true;

    const wings = new THREE.Mesh( new THREE.BoxBufferGeometry( 10, 6, 18 ), bodycolor );
    wings.position.set( 4, 28, 200 );
    wings.castShadow = true; wings.receiveShadow = true;

    const head = new THREE.Mesh( new THREE.BoxBufferGeometry( 10, 8, 8 ), bodycolor );
    head.position.set( -6, 36, 200 );
    head.castShadow = true; head.receiveShadow = true;

    const geometrybeak = new THREE.BoxBufferGeometry( 6, 2, 4 );
    const materialbeak = new THREE.MeshPhongMaterial( {color: 0xfc5a03} );
    const beak = new THREE.Mesh( geometrybeak, materialbeak );
    beak.position.set( -14, 34, 200 );
    beak.castShadow = true; beak.receiveShadow = true;

    const eye = new THREE.SphereGeometry( 2.1, 32, 32 )
    const eyecolor = new THREE.MeshBasicMaterial( { color: 0x000000});

    const leye = new THREE.Mesh(eye, eyecolor);
    leye.position.set( -8, 36.5, 197 );

    const reye = new THREE.Mesh( eye, eyecolor);
    reye.position.set( -8, 36.5, 203 );
    
    duck.add(body, wings, head, beak, leye, reye)
    duck.name = "duck";

    lake.add(duck)
  }

  // models
  const statue = createStatue();
  lake.add(statue)

  let light = new THREE.PointLight(0xffffff, 5, 180);
  light.position.set(0, 50, 0);
  lake.add(light)

  light.name = "statuelight"

  lake.position.set(-400, 0, -500)
  return lake;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Uni
function createUniversity() {
  const group = new THREE.Group();

  var texture = new THREE.TextureLoader().load( 'resources/stone.png' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set( 1, 8 );

  // path
  path = new THREE.Mesh(new THREE.PlaneGeometry(150, 1300), new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: texture }));
  path.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  path.position.set(-950, 5, 765);
  path.receiveShadow = true;

  // picnic table
  pz = [455, 755, 1055]
  for (i in pz){ group.add(createPicnicTable(-385, pz[i])) }
  for (i in pz){ group.add(createPicnicTable(-1485, pz[i])) }

  // lights
  for (var posz = 200; posz <= 1200; posz+= 200){ group.add(createUniLight(-800, posz), createUniLight(-1100, posz));  }

  group.add(path, createUni())
  return group
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Picnic
function createPicnicTable(posx, posz){
  const group = new THREE.Group();

  // picnic table
  const table = new THREE.Mesh(new THREE.BoxBufferGeometry(70, 10, 120), new THREE.MeshPhongMaterial({ color: 0xffc490 }));
  table.position.set(posx, 40, posz-55)
  table.receiveShadow = true; table.castShadow = true;

  const sit1 = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 20, 100), new THREE.MeshPhongMaterial({ color: 0xffc490 }));
  sit1.position.set(posx+70, 10, posz-55)
  sit1.receiveShadow = true; sit1.castShadow = true;

  const sit2 = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 20, 100), new THREE.MeshPhongMaterial({ color: 0xffc490 }));
  sit2.position.set(posx-70, 10, posz-55)
  sit2.receiveShadow = true; sit2.castShadow = true;

  const side1 = new THREE.Mesh(new THREE.BoxBufferGeometry(70, 5, 5), new THREE.MeshPhongMaterial({ color: 0xffc490 }));
  const side2 = new THREE.Mesh(new THREE.BoxBufferGeometry(70, 5, 5), new THREE.MeshPhongMaterial({ color: 0xffc490 }));
  const side3 = new THREE.Mesh(new THREE.BoxBufferGeometry(70, 5, 5), new THREE.MeshPhongMaterial({ color: 0xffc490 }));
  const side4 = new THREE.Mesh(new THREE.BoxBufferGeometry(70, 5, 5), new THREE.MeshPhongMaterial({ color: 0xffc490 }));
  
  side1.rotateOnAxis(new THREE.Vector3(0, 0, -1), Math.PI/4);
  side1.position.set(posx, 15, posz)
  side1.receiveShadow = true; side1.castShadow = true;
  group.add(side1)

  side2.rotateOnAxis(new THREE.Vector3(0, 0, -1), Math.PI/4);
  side2.position.set(posx, 15, posz-100)
  side2.receiveShadow = true; side2.castShadow = true;
  group.add(side2)

  side3.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/4);
  side3.position.set(posx, 15, posz)
  side3.receiveShadow = true; side3.castShadow = true;
  group.add(side3)

  side4.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/4);
  side4.position.set(posx, 15, posz-100)
  side4.receiveShadow = true; side4.castShadow = true;
  group.add(side4)

  group.add(table, sit1, sit2)
  return group;
  
}

/* NEW FOR PROJECT 2*/
///////////////////////////////////////////////////////////////////////////////////////////////////
// Uni ligths
function createUniLight(posx, posz){

  const lightpost = new THREE.Group();  

  const post = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, 160, 50 ), new THREE.MeshPhongMaterial( {color: 0x242424} ) );
  post.position.set(posx, 80, posz)
  post.receiveShadow = true; post.castShadow = true;
  
  const obj = new THREE.Object3D();
  obj.position.set(posx, 0, posz)
  
  let bulb = new THREE.Mesh(new THREE.SphereGeometry(12,12,30), new THREE.MeshPhongMaterial({ color: 0xffffff}) );
  bulb.position.set(posx, 80*2, posz);
  bulb.receiveShadow = true; bulb.castShadow = true;
  
  let light = new THREE.SpotLight(0xffffff, 1.5, 300);
  light.position.set(posx, 80*2+100, posz);
  light.target = obj
  light.name = "unilight"+posx+posz
  
  lightpost.add(post, obj, bulb, light);

  return lightpost;
}

// HELPER
function getRandomNumberBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}