//########################################################################
//Start up your scene with a rotating cube
//########################################################################

var scene, camera, renderer, light, spotLight, controls;

//########################################################################
//SCENE
//########################################################################
scene = new THREE.Scene();

//########################################################################
//CAMERA
//########################################################################
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 0, 2, 5);

controls = new THREE.OrbitControls( camera );

//########################################################################
//LIGHTS
//########################################################################
light = new THREE.AmbientLight(0x000000);

spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );
	//shadows
spotLight.castShadow = true;
spotLight.shadowDarkness = 0.5;
spotLight.shadowMapWidth = 2048;
spotLight.shadowMapHeight = 2048;
spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 4000;
spotLight.shadowCameraFov = 0.1; //shadow quality

scene.add( light, spotLight );

//########################################################################
//RENDERER
//########################################################################
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
	//bg color
renderer.setClearColor(0x21ccff, 1);
	//for shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //soft shadow
	//add the scene
document.body.insertBefore(renderer.domElement, document.body.firstChild);


//########################################################################
//OBJECTS
//########################################################################
	//Materials
var boxMaterialBasic, boxMaterialLambert, boxMaterialPhong;
	//Geo
var boxGeometry, box;

boxMaterialBasic = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.VertexColors });
boxMaterialLambert = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
boxMaterialPhong = new THREE.MeshPhongMaterial({ color: 0x2194ce, 
												emissive: 0x2194ce, 
												specular: 0x111111, 
												shininess: 100,
												shading: THREE.FlatShading  });
var data = [2,4,5,6,2,4,5,6, 2,4,5,6,2,4,5,6];
var x = 0
for (var i =0; i < data.length; i++ ){
	

	boxGeometry = new THREE.BoxGeometry(1, data[i], 1);
	box = new THREE.Mesh( boxGeometry, boxMaterialLambert );
	box.position.set( x, 0, 0);
	box.castShadow = true;
	// if ( data[i] >= 4 ){
	// 	box.material.color.setRGB(200,1,1)	
	// }
	
	box.receiveShadow = true;
	scene.add( box );
	x += 2
}


	//setup colors for Basic Material




var ground = new THREE.Mesh( new THREE.PlaneGeometry(100, 100, 1), new THREE.MeshPhongMaterial( { color: 0xffdd99 } ) );
ground.rotateX( - Math.PI / 2 );
ground.castShadow = false;
ground.receiveShadow = true;

scene.add( ground );

//########################################################################
//FUNCTIONS
//########################################################################

var onWindowResize = function(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var render = function () {
	requestAnimationFrame( render );

	//Animations
	// box.rotation.y += 0.01;
	// box.rotation.x += 0.01;

	controls.update();
	renderer.render( scene, camera );
}

//ON PAGE LOAD
document.addEventListener("DOMContentLoaded", function(event){
	render();
	window.addEventListener( 'resize', onWindowResize, false );
});