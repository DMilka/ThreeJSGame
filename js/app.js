// Variables to which the object is assigned after loading

let loadedHero;
let loadedObject;
let loadedReward;

let lastTmp ;
let tmpp;


let objectsArr = [];
const enemiesAmount = 9;

let rewardArr = [];
const rewardAmount = 3;
let bodyLength;

var clock = new THREE.Clock();
const txtLoader = new THREE.TextureLoader();
var speed = 0.5; //units a second
var speedIncrease = 0;
var delta = 0;
let time  = 0;



// const map2Obj = [];
// let speed = 0;
let isAllOutOfMap = [];

let enemiesAmountOutOfMap;

let userReward;
let gameOver;

var hero;


var manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onLoad = function ( ) {

    console.log( 'Loading complete!');
    document.querySelector('.init-container').innerHTML = '<button class="game-start" id="game-start">Rozpocznij grę</button>';
    // console.log(document);

};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};




var loader = new THREE.OBJLoader( manager );
loader.load( '../explorer-space-ship.obj', function ( object ) {
   
    var map = txtLoader.load('../spaceShip.jpg');
    var material = new THREE.MeshBasicMaterial({map: map});

    var objMap = txtLoader.load('../rock.jpg');
    var objMaterial = new THREE.MeshBasicMaterial({map: objMap});
    loadedObject = objMaterial;

    var rewMap = txtLoader.load('../reward.jpg');
    var rewMaterial = new THREE.MeshBasicMaterial({map: rewMap});
    loadedReward = rewMaterial;

    object.traverse( function ( node ) {
        if ( node.isMesh )  {
            node.material = material;
            // node.material.ambient.setHex(0xFF0000);
            // node.material.color.setHex(0x00FF00);
            }
        });

    object.rotation.x = Math.PI;
    object.scale.set(1.5,1.5,1.5);
    // object.position.y = -20;
    object.position.z = 25;
    
    loadedHero = object;
    

});

// var mtlLoader = new THREE.MTLLoader();
//     mtlLoader.load('../explorer-space-ship.mtl', loadMaterials);

// function loadMaterials(materials) {
//     materials.preload();
//     // var objLoader = new THREE.OBJLoader();
//     loader.setMaterials(materials).load('../explorer-space-ship.obj', loadObjects);
// }


// function loadObjects(objects) {
//     var length = objects.children.length;

//     meshes = new THREE.Group();
//     for (var i = 0; i < length; i++) {
//         var geometry = new THREE.Geometry().fromBufferGeometry(objects.children[i].geometry);
//         geometry.mergeVertices();
//         var mesh = new THREE.Mesh(geometry, objects.children[i].material);
//         meshes.add(mesh);
//     }

//     var box = new THREE.Box3().setFromObject(meshes);
//     var center = box.getCenter();
//     for (var i = 0; i < length; i++)
//         meshes.children[i].geometry.translate(-center.x, -center.y, -center.z);

//     scene.add(meshes);
// }


function initVariables() {
    objectsArr = [];
    rewardArr = [];
    userReward = 0;
    enemiesAmountOutOfMap = 0;
    isAllOutOfMap = [];
    gameOver = false;
    lastTmp = 0;
    tmpp = 0;
    speedIncrease = 0;
}

document.querySelector('.end-game-screen').classList.add('hidden');
document.querySelector('.game-screen').classList.add('hidden');


// function loadModel() {
//     var loader = new THREE.OBJLoader();
    

// // load a resource
//  loader.load(
//     // resource URL
//     'explorer-space-ship.obj',
//     // called when resource is loaded
//     function ( object ) {
//         hero = object;
        
//        scene.add(hero);
//         // console.log(object);
//     },
//     // called when loading is in progresses
//     function ( xhr ) {

//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

//     },
//     // called when loading has errors
//     function ( error ) {

//         console.log( 'An error happened' );

//     });

// }



  function init() {
    var aspect = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    camera.position.z = 50;
    camera.position.y = 100;
    camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
    scene = new THREE.Scene();
    
    // loader.load('explorer-space-ship.obj', (obj) => {
    //     // obj = new THREE.Mesh(g,m);
    //     scene.add(obj);
    // })

    

    // renderer = new THREE.WebGLRenderer();
    /**
     * 
     *  HERO
     * 
     */

    // mesh = new THREE.Mesh(new THREE.ConeGeometry( 5, 10, 20 ),
    //                       new THREE.MeshPhongMaterial({
    //                         shading: THREE.SmoothShading
    //                       }));

    hero = loadedHero;
    scene.add(hero);  

    
    
  

        

    // console.log(hero);

    // console.log(scene.children);
    // console.log(mesh);
    // console.log(mesh);
        
    for(let i =0; i < rewardAmount; i++) {
        rewardObj = new THREE.Mesh(new THREE.OctahedronGeometry(4, 0), loadedReward);   
                                   
        rewardArr.push(rewardObj);
        rewardArr.isOutOfMap = false;
    }

    rewardArr.forEach(el => {
        scene.add(el);
    });


    for(let i = 0; i < enemiesAmount; i++) {
        enemyObj = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 0), loadedObject);      

        if(i < 3) {
            enemyObj.position.x = -20;
            // enemyObj.position.z = -20;
        } else if ( i < 6) {
            enemyObj.position.x = 20;
            // enemyObj.position.z = 20;
        } else {
            enemyObj.position.x = 0;
            // enemyObj.position.z = 0;
        }

        // enemyObj.position.z = 0;
        enemyObj.isOutOfMap = false;

        objectsArr.push(enemyObj);
    }
   
    objectsArr.forEach(el => {
        el.position.z = 0;
        scene.add(el);
        
    });
    // randomObjectsPosition(objectsArr);
    // console.log(objectsArr);
    generateMap();  

    // console.log(scene);


   var light = new THREE.PointLight(0xffff,2,1000);
   light.position.set(0,100,0);
   scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: false,alpha:true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);   
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    document.querySelector('.game').appendChild(renderer.domElement);
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
        if((hero.position.z >= (enemy.position.z - 8)) && (hero.position.z <= (enemy.position.z + 8  ))) {
            return true;
        }
    }
};

function getReward(hero, rewardObj) {
    const collision = collisionCheck(hero, rewardObj);

    if(collision) {
        rewardObj.position.z = 200;

        userReward++;
        // console.log(userReward);
        document.querySelector('.points').innerHTML = userReward;
    } 
}

function stopGame(hero, enemyObj) {
    const collision = collisionCheck(hero, enemyObj);

    if(collision) {
       
        cancelAnimationFrame(animate);
        gameOver = true;
    } 

    

}

function randomObjectsPosition(objArr) {
    let randomNumsArr = [];
    let random = 0;

    
    for(let i = 0; i < objArr.length; i++) {
        
        while(true) {
            random = Math.floor((Math.random() * 9)) * 40 + 60;
            if(!randomNumsArr.includes(-random)) {
                randomNumsArr.push(-random);
                break;
            } 
        }
    }


    // console.log(randomNumsArr);

    return randomNumsArr;

}

function animate() {
    // console.log(hero);
    objectsArr.forEach(el => {
        el.position.z += (0.5 + (speedIncrease * 0.20 ));   
        if(el.position.z > 50)  {
            el.isOutOfMap = true;
        } else {
            el.isOutOfMap = false;
        }  
    });
    rewardArr.forEach(el => {
        el.position.z += (0.5 + (speedIncrease * 0.20 ));    
        if(el.position.z > 50)  {
            el.isOutOfMap = true;
        } else {
            el.isOutOfMap = false;
        }  
    });

    objectsArr.forEach(el => {
        el.rotation.x += 0.01;   
        el.rotation.y += 0.01;
    });
    rewardArr.forEach(el => {
        el.rotation.x += -0.01;   
        el.rotation.y += 0.01;
    });

    // objectsArr.forEach( el => {
    //     console.log(el.isOutOfMap);
    //     if(el.isOutOfMap === true) {
           
    //         
    //     }
    // });

    objectsArr.forEach( (el, indx) => {
        if(el.isOutOfMap === true) {
            isAllOutOfMap[indx] = true;
        } else {
            isAllOutOfMap[indx] = false;
        }
    });

    // console.log(isAllOutOfMap);

    let tmp = 0;
    for(let i = 0; i < isAllOutOfMap.length; i++) {
        
        
        if(isAllOutOfMap[i] === true) {
            tmp++;
        } 

        // console.log(tmp);
        if(tmp >= 9) {
            generateMap();
            
        }  
    }
    tmp = 0;

    rewardArr.forEach(el => {
        getReward(hero, el);

    });


    objectsArr.forEach(el => {
        stopGame(hero, el);
        // console.log(gameOver);
    });

    if(gameOver) {
        // console.log('Koniec');
        cancelAnimationFrame( animate );    
        //  console.log(document.children[0].children[1].children[bodyLength - 1]);
        //  console.log(bodyLength);
    //   document.children[0].children[1].children[bodyLength - 1].parentElement.children[bodyLength -1].remove();

    //    document.children[0].children[1].children[bodyLength - 1].parentElement.children[bodyLength - 1].remove();

    //    console.log(document.querySelector(canvas).parentElement);
        
    document.querySelector('.game').children[0].remove();
        document.querySelector('.end-game-screen').classList.remove('hidden');
        document.querySelector('.init-game-screen').classList.add('hidden');
        document.querySelector('.game-screen').classList.add('hidden');
        console.log('koniec gry');
    }
    


    delta = clock.getDelta();

    time += speed * delta;
    // console.log(time);

    let tmpp = Math.floor(time / 5);
    
    if(tmpp > lastTmp) {
        if(speedIncrease <= 7) {
            console.log(speedIncrease);
            // console.log("xd");
            speedIncrease += 1;
            lastTmp = tmpp;
        }
        
    }

    

    
    

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


function generateMap() {
    let respArr = [];
    // Wygeneruj 6 losowe miejsca respu przeszkod 
    const resps = randomObjectsPosition(objectsArr);
    const rewardsResp = randomObjectsPosition(rewardArr);

    objectsArr.forEach((el, indx) => {
        el.position.z = resps[indx];

    })

    rewardArr.forEach( (el,indx) => {
        el.position.z = rewardsResp[indx];
        const pos = Math.floor(Math.random() * 3);
        // console.log(pos);
        if(pos === 0) {
            el.position.x = -20;
        } else if (pos === 1) {
            el.position.x = 0;
        } else {
            el.position.x = 20;
        }
    })

    // Wygeneruj liczbe mowiaca o szansie na resp surowca do zebrania

    // Jesli jest szansa na resp surowca
        // Wygeneruj surowiec

    // Podepnij mape do glownej mapy

    
}



function main() {

    // randomObjectsPosition(objectsArr);
     animate();
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 37) {
        if(hero.position.x >= 0) {
            hero.position.x -= 20;
        }
        
    } else if (keyCode == 39) {
        if(hero.position.x <= 0) {
            hero.position.x += 20;
        }
     
    } 
};


// var manager = new THREE.LoadingManager();
// manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

//    init();
//    loadModel();

// };

// manager.onLoad = function ( ) {

//     main();

// };


// TODO:
//  Dodać losowe generowanie przeszkód
//  Dodać punkty za przebyty dystans
//  Dodać tekstury do przeszkód i statku
//  Dodać strukture którą będą surowce kosmiczne
//  Dodać możliowść zbierania ich i wyświetlania

const start = ()  => {  
    document.querySelector('.init-game-screen').classList.add('hidden');
    document.querySelector('.end-game-screen').classList.add('hidden');
    document.querySelector('.game-screen').classList.remove('hidden');
    initVariables();
    init();
    bodyLength = document.children[0].children[1].children.length;
    main();
};

// const restart = () => {
//     document.querySelector('.init-game-screen').classList.add('hidden');
//     document.querySelector('.end-game-screen').classList.add('hidden');
//     document.querySelector('.game-screen').classList.remove('hidden');
//     initVariables();
//     main();
//     // console.log(hero);
// }

document.addEventListener('click',e => {
    if(e.target.id == 'game-start') {
        start();
    }
});
document.querySelector('.game-restart').addEventListener('click', start);
