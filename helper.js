const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();
        sceneElements.sceneGraph.background = new THREE.Color(0x47bcff)
        sceneElements.sceneGraph.fog = new THREE.Fog(0xffe680, 2500, 12000)
        
        const width = window.innerWidth;
        const height = window.innerHeight;

        // ************************** //
        // Add Perpective camera
        // ************************** //
        const camera = new THREE.PerspectiveCamera(45, width / height, 10, 10000);
        sceneElements.camera = camera;
        camera.position.set(-3500, 2500, 0);

        // ************************** //
        // Illumination
        // ************************** //

        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add spotlight (with shadows)
        // ***************************** //
        const sunLight = new THREE.SpotLight(0xffffff, 1.5, 6000, Math.PI / 2.5);
        sunLight.position.set(0, 2800, 0);
        sceneElements.sceneGraph.add(sunLight);

        // Setup shadow properties for the sunlight
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;

        sunLight.name = "sunlight";

        const moonLight = new THREE.SpotLight(0xffffff, 0.05, 0, 2);
        moonLight.position.set(0, -2400, 0);
        sceneElements.sceneGraph.add(moonLight);

        // Setup shadow properties for the moonlight
        moonLight.castShadow = true;
        moonLight.shadow.mapSize.width = 2048;
        moonLight.shadow.mapSize.height = 2048;

        moonLight.name = "moonlight";

        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#big-town");
        htmlElement.appendChild(renderer.domElement);

        // NEW --- Control for the camera
        // ************************** //
        const control = new THREE.OrbitControls(camera, renderer.domElement);
        sceneElements.control = control

        // new a interaction, then you can add interaction-event with your free style
        new THREE.Interaction(sceneElements.renderer, sceneElements.sceneGraph, sceneElements.camera);

    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};