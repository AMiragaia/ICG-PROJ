///////////////////////////////////////////////////////////////////////////////////////////////////
// TREE
function createTree(posx) {
    const group = new THREE.Group();
  
      // Instantiate a loader
    const loader = new THREE.GLTFLoader();
  
    // Load a glTF resource
    loader.load(
      // resource URL
      'models/tree/scene.gltf',
      // called when the resource is loaded
      function ( gltf ) {
        gltf.scene.scale.set(80,80,80)
        gltf.scene.position.set(posx, 0, -1000+getRandomNumberBetween(-50,50))

        gltf.scene.traverse(function (child) {
  
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
      });
  
        group.add( gltf.scene );
      },
      // called while loading is progressing
      function ( xhr ) {
        console.log( 'Tree ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {
        console.log( ' An error happened' +  error );
      }
    );
    return group;
}  
  
/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// BENCH
function createBench(x, z) {
  
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();


    // Load a glTF resource
    loader.load(
        // resource URL
        'models/bench/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
        gltf.scene.scale.set(110,110,110)
        gltf.scene.position.set(x, 0, z)

        gltf.scene.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            }
        });
        group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Bench ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( ' An error happened' +  error );
        }
    );
    return group;
  }

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// MUSCLE CAR
function createMuscleCar(posx, posz) {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/musclecar/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(0.16,0.16,0.16)
            gltf.scene.rotation.y = Math.PI/2
            gltf.scene.position.set(posx, 6, posz)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Muscle car ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( ' An error happened' +  error );
        }
    );
    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// CLASSIC CAR
function createClassicCar(posx, posz) {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/classiccar/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(11,11,11)
            gltf.scene.rotation.y = -Math.PI/2
            gltf.scene.position.set(posx, 22, posz)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                }
            });

        group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Classic car ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( ' An error happened' +  error );
        }
    );
    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// RED CAR
function createRedCar(posx, posz) {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/redcar/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(0.8,0.8,0.8)
            gltf.scene.rotation.y = Math.PI/2
            gltf.scene.position.set(posx, 6, posz)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Red car ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );
    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// BUS STOP
function createBusStop() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/busstop/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(50,50,50)
            gltf.scene.rotation.y = Math.PI/2
            gltf.scene.position.set(320, 0, 900)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0.5})
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Bus stop ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );
    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// BUS 
function createBus() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/bus/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(30,40,40)
            gltf.scene.rotation.y = Math.PI
            gltf.scene.position.set(190, 0, 900)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    //child.material = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0.5})
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Bus ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );
    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// STATUE 
function createStatue() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/statue/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(40,40,40)
            gltf.scene.rotation.y = - Math.PI / 2
            gltf.scene.position.set(-100, -70, -100)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Statue ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );
    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Bridge 
function createBridge() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/bridge/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(1.2,1.2,1.2)
            //gltf.scene.rotation.y = - Math.PI / 2
            gltf.scene.position.set(-1200, 140, -500)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshPhongMaterial({color: 0xff9e54})
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Bridge ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );
    const floor = new THREE.Mesh(new THREE.BoxBufferGeometry(200, 400, 15), new THREE.MeshPhongMaterial({color: 0xff9e54}))
    floor.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    floor.position.set(-1200, 0, -500)
    group.add(floor)
    return group;
}


/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Another Statue 
function createOtherStatue() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/otherstatue/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(0.15,0.15,0.15)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshPhongMaterial({color: 0xffffff})
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Another statue ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );
  
    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// PLANE 
function createAirPlane() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/plane/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(0.5,0.5,0.5)
            gltf.scene.rotation.y = - Math.PI / 2
            gltf.scene.position.set(-100, 1800, -1500)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Airplane ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );

    const helice = new THREE.Mesh(new THREE.BoxBufferGeometry(2, 115, 8), new THREE.MeshPhongMaterial({color: 0xffffff}))
    helice.position.set(-300, 1775, -1500)
    helice.name = 'helice'
    group.add(helice)
    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// POSTER 
function createPoster() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/poster/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(30,30,30)
            gltf.scene.rotation.y = - Math.PI / 2
            gltf.scene.position.set(-255, 30, -5)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Poster ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );

    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Antena
function createAntena() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/antena/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(8,8,8)
            gltf.scene.rotation.y = - Math.PI / 2
            gltf.scene.position.set(0, 700, 0)

            gltf.scene.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Antena ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );

    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// shop
function createShop1() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/shop1/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(105,105,105)
            gltf.scene.rotation.y = Math.PI
            gltf.scene.position.set(520, 0, 450)

            gltf.scene.traverse(function (child) {
            
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Shop ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );

    return group;
}

/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// othershop
function createShop2() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/shop2/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(160,100,160)
            gltf.scene.rotation.y = Math.PI
            gltf.scene.position.set(550, 0, 2050)

            gltf.scene.traverse(function (child) {
            
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Other Sho+ ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );

    return group;
}


/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// uni
function createUni() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/uni/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(35,35,35)
            gltf.scene.rotation.y = Math.PI / 2
            gltf.scene.position.set(-950, 0, 1780)

            gltf.scene.traverse(function (child) {
            
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( 'Uni ' +( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
            function ( error ) {
        console.log( ' An error happened' +  error );
        }
    );

    return group;
}

// HELPER
function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }