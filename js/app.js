function init() {
    var aspect = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    camera.position.z = 50;
    camera.position.y = 100;
    camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
    scene = new THREE.Scene();

    mesh = new THREE.Mesh(new THREE.ConeGeometry( 5, 10, 20 ),
                            new THREE.MeshPhongMaterial({shading: THREE.SmoothShading}));

    enemyObj = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 1), 
                                new THREE.MeshPhongMaterial({shading:THREE.SmoothShading}));

    enemyObj2 = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 1), 
                                new THREE.MeshPhongMaterial({shading:THREE.SmoothShading}));

    enemyObj3 = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 1), 
                                new THREE.MeshPhongMaterial({shading:THREE.SmoothShading}));


    mesh.rotation.x += -2;
    
    enemyObj.position.x += 20;
    enemyObj.position.z = -60;

    enemyObj3.position.x -= 20;
    enemyObj3.position.z = -80;

    enemyObj2.position.z = -40;



   scene.add(mesh);
   scene.add(enemyObj);
   scene.add(enemyObj2);
   scene.add(enemyObj3);

   var light = new THREE.PointLight(0xffff,2,1000);
   light.position.set(0,100,0);
   scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);   
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);



}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


// if ((hero.x < (enemy.x + enemy.w)) &&
// ((hero.x + hero.w) >enemy.x) &&
// (hero.y < (enemy.y + enemy.h)) &&
// ((hero.y + hero.h) > enemy.y)) {
//     console.log('HIT!');
//     return true;
// }

function collisionCheck(hero, enemy) {
        // console.log("Hero "+hero.position.z);
        // console.log("Enemy "+enemy.position.z);
    if(hero.position.x == enemy.position.x ) {
        if((hero.position.z >= (enemy.position.z - 9)) && (hero.position.z <= (enemy.position.z + 8  ))) {
            console.log("hit");
        }
    }
}

function animate() {

    // mesh.position.z -= 0.1;
    enemyObj.position.z += 0.5;
    enemyObj2.position.z += 0.5;
    enemyObj3.position.z += 0.5;

    collisionCheck(mesh, enemyObj);
    collisionCheck(mesh, enemyObj3);
    collisionCheck(mesh, enemyObj2);
    // console.log("Enemy: " + enemyObj.position.z);
    // console.log("Hero: " + mesh.position.z);

    if(enemyObj.position.z > 50 ) enemyObj.position.z = -60;
    if(enemyObj2.position.z > 50 ) enemyObj2.position.z = -60;
    if(enemyObj3.position.z > 50 ) enemyObj3.position.z = -60;
    
    

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function main() {
    animate();
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 37) {
        if(mesh.position.x >= 0) {
            mesh.position.x -= 20;
        }
        
    } else if (keyCode == 39) {
        if(mesh.position.x <= 0) {
            mesh.position.x += 20;
        }
     
    } 
};


// TODO:
//  Dodać losowe generowanie przeszkód
//  Dodać punkty za przebyty dystans
//  Dodać tekstury do przeszkód i statku
//  Dodać strukture którą będą surowce kosmiczne
//  Dodać możliowść zbierania ich i wyświetlania

