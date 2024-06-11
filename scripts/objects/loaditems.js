
import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
///////////////////////////////////////////////////////////////////////////////////////////////////
// TREE
export function createTree(posx,poz) {
    const group = new THREE.Group();
  
      // Instantiate a loader
    const loader = new GLTFLoader();
  
    // Load a glTF resource
    loader.load(
      // resource URL
      'models/tree/scene.gltf',
      // called when the resource is loaded
      function ( gltf ) {
        gltf.scene.scale.set(1,1,1)
        gltf.scene.position.set(posx, 0, poz)

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
export function createCampoTenis(){
    const group = new THREE.Group();
    const loader = new GLTFLoader();
    loader.load(
        'models/campotenis/scene.gltf',
        function ( gltf ) {
            gltf.scene.scale.set(0.015,0.015,0.015)
            gltf.scene.position.set(-40, 0.2, 40)
            gltf.scene.rotation.y = Math.PI/2
            gltf.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add( gltf.scene );
        },
        function ( xhr ) {
            console.log( 'Campo de tenis ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( ' An error happened' +  error );
        }
    );
    return group;

}
export function createcinema(){
    const group = new THREE.Group();
    const loader = new GLTFLoader();
    loader.load(
        'models/cinema/scene.gltf',
        function ( gltf ) {
            gltf.scene.scale.set(0.025,0.025,0.025)
            gltf.scene.position.set(-25, 0.2, -65)
            gltf.scene.rotation.y = Math.PI/2
            gltf.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add( gltf.scene );
        },
        function ( xhr ) {
            console.log( 'Cinema ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( ' An error happened' +  error );
        }
    );
    return group;
}
/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// BENCH
export function createBench(x, z) {
  
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new GLTFLoader();


    // Load a glTF resource
    loader.load(
        // resource URL
        'models/bench/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
        gltf.scene.scale.set(1,1,1)
        gltf.scene.position.set(x, 0, z)
        gltf.scene.rotation.y = Math.PI/2

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
export function createMuscleCar(posx, posz) {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/musclecar/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(0.007,0.007,0.007)
            gltf.scene.rotation.y = Math.PI/2
            gltf.scene.position.set(posx, 0, posz)

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
export function createClassicCar(posx, posz) {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/classiccar/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(0.5,0.5,0.5)
            gltf.scene.rotation.y = -Math.PI/2
            gltf.scene.position.set(posx, 0.65, posz)

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
export function createRedCar(posx, posz) {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/redcar/scene.gltf',
        // called when the resource is loaded
        function (gltf) {
            gltf.scene.scale.set(0.03, 0.03, 0.03);  // Adjusted scale
            gltf.scene.rotation.y = Math.PI;
            gltf.scene.position.set(posx, 0.1, posz);

            gltf.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add(gltf.scene);
        },
        // called while loading is progressing
        function (xhr) {
            console.log('Red car ' + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened' + error);
        }
    );
    return group;
}
export function createHospital() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/hospital/scene.gltf',  // Adjust the path to your actual location
        // called when the resource is loaded
        function (gltf) {
            gltf.scene.scale.set(4, 4, 4);  // Adjust scale as necessary
            gltf.scene.position.set(20, 0, -45);  // Hardcoded position values
            gltf.scene.rotation.y = -Math.PI/2
            gltf.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            group.add(gltf.scene);
        },
        // called while loading is progressing
        function (xhr) {
            console.log('Hospital ' + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened: ' + error);
        }
    );
    return group;
}
/*  NEW FOR PROJECT 2 */
///////////////////////////////////////////////////////////////////////////////////////////////////
// BUS STOP
export function createBusStop() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/busstop/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(1.5,1.5,1.5)
            gltf.scene.rotation.y = -Math.PI/2
            gltf.scene.position.set(-10, 0, 30)

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
export function createBus() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/bus/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(1,1.3,1.3)
            gltf.scene.rotation.y = Math.PI
            gltf.scene.position.set(2, 0 , -30)

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
export function createShop1() {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'models/shop1/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(2,2,2)
            gltf.scene.rotation.y = 0
            gltf.scene.position.set(-15, 0, -45)

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

