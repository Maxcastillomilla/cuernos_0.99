import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'


let entero = 'valor'


/* export const myModule = {
    foo: entero
}; */
let jsonMadera 
let typematerial = document.getElementById('qualitymaterial')



async function obtenerDatos() {
  try {
    const response = await fetch('/obtener');
    const data = await response.json();
    console.log(data);
    console.log('lista de precios');
    jsonMadera = data;
    console.log(jsonMadera);
    loadcuernos()   
  } catch (error) {
    console.error(error);
    alert('No pudimos cargar la Lista de precios, intenta mas tarde')
  }
}

obtenerDatos();


















/**
 * Base
 */
// Debug
/* const gui = new dat.GUI() */ 

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/* scene.background = new THREE.Color( 0xffffff ); */
scene.background = new THREE.Color( 0x595d64 );

function cambiocolor(){
    
    scene.background = new THREE.Color( backgroundcolor.value )

}



/**
 * Models
 */






const gltfLoader = new GLTFLoader()


let mixer = null

let metroscuadrados = 0

//changes
const backgroundcolor = document.getElementById('color');
backgroundcolor.addEventListener("change", () =>{
    cambiocolor() 

    /* console.log(backgroundcolor.value) */
    
    
});


const AlturaSlider = document.getElementById('myRange');
AlturaSlider.addEventListener("change", () =>{
    loadcuernos() 
    focus()
    
});

const HorizontalSlider = document.getElementById('myRange2');
HorizontalSlider.addEventListener("change", () =>{
    loadcuernos() 
    focus()
 
});

const Horizontaloffset = document.getElementById('myRange3');
Horizontaloffset.addEventListener("change", () =>{

    offsetH = Number(Horizontaloffset.value) 
    console.log(offsetH)
    loadcuernos() 
    focus()
 
});


const Verticaloffset = document.getElementById('myRange4');
Verticaloffset.addEventListener("change", () =>{

    offsetV = Number(Verticaloffset.value) 
    console.log(offsetV)
    loadcuernos() 
    focus()
 
});



typematerial.addEventListener("change", () =>{
    loadcuernos() 
    focus()
 
});

let objetos = document.getElementById('objetos')
objetos.addEventListener("change", () =>{
    loadcuernos() 
    focus()
 
});


let size = document.getElementById('size')
size.addEventListener("change", () =>{
    loadcuernos() 
    focus()
 
});


function makeTextSprite( message, parameters )
    {
        if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Courier New";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:255, a:1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText( message );
        var textWidth = metrics.width;

        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        context.fillText( message, borderThickness, fontsize + borderThickness);

        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        return sprite;  
    }






//material



const loader = new THREE.TextureLoader();

const pino = loader.load( 'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/79288a5366c588dbce91bf6e3e8eb1daea3cdc0a/mueble01/pino.png' );
const lenga = loader.load( 'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/79288a5366c588dbce91bf6e3e8eb1daea3cdc0a/mueble01/lenga.png' );
const haya = loader.load( 'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/79288a5366c588dbce91bf6e3e8eb1daea3cdc0a/mueble01/haya.png' );


const Mvertical = [null,'p1.gltf', 'p2.gltf', 'p3.gltf', 'p4.gltf', 'p5.gltf', 'p6.gltf']
const Mhorizontal = [null,'t1.gltf', 't2.gltf', 't3.gltf', 't4.gltf', 't5.gltf', 't6.gltf']
const cables = ['inicio.gltf', 'final.gltf','inicio2.gltf', 'final2.gltf']


let palovertical = null
let palohorizontal = null
let thecable = null

let typecable1 = []
let typecable2 = []

let distanciavertical = 4.9
let offsetH = Number(Horizontaloffset.value) 

let offsetV = Number(Verticaloffset.value)

function esPar(numero) 
{ 
  return (numero % 2) == 0; 
} 




let materialcolor = [pino, lenga, haya]




function loadcuernos(){

    

    let precio = document.getElementById('precio')

    

    
    
    while(scene.getObjectByName('Scene')){
        scene.remove(scene.getObjectByName('Scene'))
    }
    while(scene.getObjectByName('Scene')){
        scene.remove(scene.getObjectByName('Scene'))
    }



     //lineas 

     if (document.getElementById('size').checked) {



        let from = new THREE.Vector3(0, 0, 0);
let to = new THREE.Vector3(0, 1, 0);

let largoline = (Number(AlturaSlider.value)/2)*4.8

let arrowHelper11 = new THREE.ArrowHelper(to.normalize(), from, largoline, 0xFFFFFF, 0.3, 0.3);
let arrowHelper22 = new THREE.ArrowHelper(to.negate(), from, largoline, 0xFFFFFF, 0.3, 0.3);
arrowHelper11.name = 'Scene'
arrowHelper22.name = 'Scene'
            
scene.add( arrowHelper11, arrowHelper22 );  


let positiony = 5.6*(Number(AlturaSlider.value)/2) +0.5

arrowHelper11.position.set(-3,positiony,0)
arrowHelper22.position.set(-3,positiony,0)





let from2 = new THREE.Vector3(0, 0, 0);
let to2 = new THREE.Vector3(1, 0, 0);

let largoline2 = (Number(HorizontalSlider.value)/2)*5.7

let arrowHelper33 = new THREE.ArrowHelper(to2.normalize(), from2, largoline2, 0xFFFFFF, 0.3, 0.3);
let arrowHelper44 = new THREE.ArrowHelper(to2.negate(), from2, largoline2, 0xFFFFFF, 0.3, 0.3);
arrowHelper33.name = 'Scene'
arrowHelper44.name = 'Scene'
            
scene.add( arrowHelper33, arrowHelper44 );  

let positionx = 4.85*(Number(HorizontalSlider.value)/2)

arrowHelper33.position.set(positionx,0,4.2)
arrowHelper44.position.set(positionx,0,4.2)
    

let altomm = (123 + 30 + offsetV  * 2.25) + (318*AlturaSlider.value)
let spritey = makeTextSprite( altomm + " mm ", 
		{ fontsize: 18, textColor: {r:255, g:255, b:255, a:1.0}} );
	spritey.position.set(-5,positiony,0);
    spritey.name = 'Scene'
	scene.add( spritey );



    let anchomm = (334*HorizontalSlider.value) + (2*(50+(10*offsetH)))
    let spritey2 = makeTextSprite( anchomm + " mm ", 
		{ fontsize: 18, textColor: {r:255, g:255, b:255, a:1.0}} );
	spritey2.position.set(positionx,-0.01,9);
    spritey2.name = 'Scene'
	scene.add( spritey2 );







} 









    //vertical
    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble01/models/vertical/'+Mvertical[AlturaSlider.value],
        (gltf) =>
        {
            gltf.scene.traverse( function ( node ) {

                if ( node.isMesh || node.isLight ){
                    
                    
                    node.castShadow = true;
                    let texture = materialcolor[typematerial.value] 
                    texture.encoding = THREE.sRGBEncoding;
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;

                    

// UVs use the convention that (0, 0) corresponds to the upper left corner of a texture.
                    texture.flipY = false;
                    node.material.map = texture
                    
                    
                     
                } 
        
            } )
            gltf.scene.scale.set(0.015, 0.015 + (0.0004 * offsetV / Number(AlturaSlider.value) ), 0.015)
            palovertical = gltf.scene
            
            scene.add(palovertical)


            for (let i = 1; i < Number(HorizontalSlider.value) + 1; i++) {
                let clone = palovertical.clone()
                let distance = distanciavertical * i
                clone.position.set (distance,0,0)
                scene.add(clone)



             }
        }
    )
    //horizontal

    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/7ed9c4e66446d83267b01583a2b06ee35fa21dab/mueble01/models/horizontal/'+Mhorizontal[HorizontalSlider.value],
        (gltf) =>
        {
            
            gltf.scene.traverse( function ( node ) {

                if ( node.isMesh || node.isLight ){
                    node.castShadow = true;
                    let texture = materialcolor[typematerial.value] 
                    texture.encoding = THREE.sRGBEncoding;

// UVs use the convention that (0, 0) corresponds to the upper left corner of a texture.
                    texture.flipY = false;
                    node.material.map = texture
                    
                    
                } 
            } )


            gltf.scene.scale.set(0.015+(0.00052 * offsetH / Number(HorizontalSlider.value) ), 0.015, 0.015)
            palohorizontal = gltf.scene
            gltf.scene.position.x += 2.45 * HorizontalSlider.value
            
            scene.add(palohorizontal)


            for (let i = 1; i < Number(AlturaSlider.value) + 1; i++) {
                let clone = palohorizontal.clone()
                let distance2 = 4.78 * i
                
                clone.position.set(0,distance2,0)
                clone.position.x += 2.45 * HorizontalSlider.value
                scene.add(clone)

             }
        }
    )


    //cables 1

    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/7ed9c4e66446d83267b01583a2b06ee35fa21dab/mueble01/models/cable/'+cables[0],
        (gltf) =>
        {

            gltf.scene.traverse( function ( node ) {

                if ( node.isMesh || node.isLight ) node.castShadow = true;
            } )


            gltf.scene.scale.set(0.015, 0.015, 0.015)
            thecable = gltf.scene
            thecable.name = 'Scene'
            gltf.scene.position.x += 2.385 
            scene.add(thecable)

            typecable1.push(thecable)


            for (let i = 0; i < Number(HorizontalSlider.value); i++) {
                let clone = thecable.clone()
                let distance2 =+ distanciavertical * i
                
                clone.position.x += distance2 
                /* clone.position.x +=  */
                scene.add(clone)
                typecable1.push(clone)

                /* scene.add(typecable1) */
                

             }

             console.log(typecable1)
             console.log('aca')
        }
    )


    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/7ed9c4e66446d83267b01583a2b06ee35fa21dab/mueble01/models/cable/'+cables[1],
        (gltf) =>
        {

            gltf.scene.traverse( function ( node ) {

                if ( node.isMesh || node.isLight ) node.castShadow = true;
            } )


            gltf.scene.scale.set(0.015, 0.015, 0.015)
            thecable = gltf.scene
            thecable.name = 'Scene'
            gltf.scene.position.x +=  distanciavertical *  Number(HorizontalSlider.value) -2.38 
            scene.add(thecable)

            typecable1.push(thecable)

        }
        
    )



//cables2
    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/7ed9c4e66446d83267b01583a2b06ee35fa21dab/mueble01/models/cable/'+cables[2],
        (gltf) =>
        {

            gltf.scene.traverse( function ( node ) {

                if ( node.isMesh || node.isLight ) node.castShadow = true;
            } )



            gltf.scene.scale.set(0.015, 0.015, 0.015)
            thecable = gltf.scene
            thecable.name = 'Scene'
            gltf.scene.position.x += 2.385 
            /* scene.add(thecable) */

            typecable2.push(thecable)


            for (let i = 0; i < Number(HorizontalSlider.value); i++) {
                let clone = thecable.clone()
                let distance2 =+ distanciavertical * i
                
                clone.position.x += distance2 
                /* clone.position.x +=  */
                /* scene.add(clone) */
                typecable2.push(clone)

                /* scene.add(typecable1) */
                

             }

             console.log(typecable2)
             console.log('aca 2')
        }
    )


    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/7ed9c4e66446d83267b01583a2b06ee35fa21dab/mueble01/models/cable/'+cables[3],
        (gltf) =>
        {


            gltf.scene.traverse( function ( node ) {

                if ( node.isMesh || node.isLight ) node.castShadow = true;
            } )



            gltf.scene.scale.set(0.015, 0.015, 0.015)
            thecable = gltf.scene
            thecable.name = 'Scene'
            gltf.scene.position.x +=  distanciavertical *  Number(HorizontalSlider.value) -2.38 

            
            /* scene.add(thecable) */

            typecable2.push(thecable)

        }

        


    
        
    )











// series de cable
    
    setTimeout(function(){
       
        

        for (let i = 1; i < Number(AlturaSlider.value); i++) {
            

            if(esPar(i)){
                typecable1.forEach(e =>{
                    console.log(e)
                    let clonefinal = e.clone()
                    clonefinal.position.y += 4.78 * i
                    scene.add(clonefinal)
            
                   }) 

            }
            else{
                typecable2.forEach(e =>{
                    console.log(e)
                    let clonefinal = e.clone()
                    clonefinal.position.y += 4.78 * i
                    scene.add(clonefinal)
            
                   }) 
            }

            
        
               
    
        }
           
        


    }, 400);





    if (document.getElementById('objetos').checked) {

        //figura
        
        let figura = null
       
        
        gltfLoader.load(
            'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble03/models/figura/scene.gltf',
            (gltf) =>
            {
                
                gltf.scene.traverse( function ( node ) {
        
                    if ( node.isMesh || node.isLight ){
                        node.castShadow = true;
                        /* node.material.displacementMap = doorHeightTexture */
                    }             
                } )
        
        
                gltf.scene.scale.set(0.22, 0.22, 0.22)
                gltf.scene.rotation.set( 0, 2 * Math.PI * (90 / 360), 0 )
                
        
                
                
                figura = gltf.scene
                figura.position.y += 6.65
                figura.position.x += 2.2
                figura.position.z += -0.8
                figura.name = 'Scene'
        
                
                
                /* gltf.scene.position.x += 2.45 * HorizontalSlider.value */
                
                scene.add(figura)
            }
        )
        
        
        //planta
        
        let planta = null
        
        
        gltfLoader.load(
            'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble03/models/plant/scene.gltf',
            (gltf) =>
            {
                
                gltf.scene.traverse( function ( node ) {
        
                    if ( node.isMesh || node.isLight ){
                        node.castShadow = true;
                        /* node.material.displacementMap = doorHeightTexture */
                    }             
                } )
        
        
                gltf.scene.scale.set(13, 13, 13)
                gltf.scene.rotation.set( 0, 2 * Math.PI * (90 / 360), 0 )
                
        
                
                
                planta = gltf.scene
                planta.position.y += 3.5
                planta.position.x += 2.2
                planta.position.z += 0
                planta.name = 'Scene'
        
                
                
                /* gltf.scene.position.x += 2.45 * HorizontalSlider.value */
                
                scene.add(planta)
            }
        )
        }





    
       

    typecable1 = []
    typecable2 = []

    


    let altomm = (123 + 30 + offsetV  * 2.25) + (318*AlturaSlider.value) 
    let anchomm = (334*HorizontalSlider.value) + (2*(50+(10*offsetH)))
    
   // 286 
    console.log(parseFloat(AlturaSlider.value) + 1)

    let tablashorizontal = ((anchomm / 1000) * 0.29)*(parseFloat(AlturaSlider.value) + 1)
    let tablasvertical = (0.05 * (altomm / 1000)) * 2 * (parseFloat(HorizontalSlider.value)+1)

    metroscuadrados = tablashorizontal + tablasvertical
    
      
    console.log('jsonmadera = ' + jsonMadera)
    let materialmadera
    /* obtenerDatos(); */
    let preciomaderas = jsonMadera[typematerial.value].precio || 'ERROR';
    console.log('precio maderas= '+ preciomaderas )
    
    entero = Math.trunc(metroscuadrados *  preciomaderas) // [typematerial.value] 
    

    precio.innerHTML = '$ ' + entero.toLocaleString('es-MX')

        /* console.log('$ a ver  ' + p29 * ( parseFloat(altomm) / 10 )* ( parseFloat(AlturaSlider) + 1)  + 5 * (parseFloat(altomm)/10) * 2 * (parseFloat(HorizontalSlider) + 1))) */



 /*   document.getElementById('fff').innerHTML = `

   <div id="paypal-button-container"></div>

   ` */

}





/* loadcuernos() */

/* document.addEventListener('DOMContentLoaded', function() {
    loadcuernos()
}, false); */






/* const light = new THREE.AmbientLight( 0xffffff ); // soft white light
light.intensity = 10
scene.add( light ); */

let geometry = new THREE.BoxGeometry( 0.5, 3, 0.16 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
let cube = new THREE.Mesh( geometry, material );
/* scene.add( cube ); */










/**
 * Floor
 */
 const smaterial = new THREE.ShadowMaterial();
 smaterial.opacity = 0.35;
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    smaterial
)
/* scene.fog = new THREE.Fog(0x21232a , 150, 200); */
floor.receiveShadow = true

floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 70
directionalLight.shadow.camera.left = - 70
directionalLight.shadow.camera.top = 70
directionalLight.shadow.camera.right = 70
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 10, 14, 15)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: document.getElementById('conter').offsetWidth,
    height: document.getElementById('conter').offsetHeight
}

window.addEventListener('resize', () =>
{
    setTimeout(()=>{
        // Update sizes
    sizes.width = document.getElementById('conter').offsetWidth 
    sizes.height = document.getElementById('conter').offsetHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer

    renderer.setSize(sizes.width, sizes.height)
    /* renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) */
    renderer.setPixelRatio(2)
    renderer.antialias= true 
    }, 100)
    
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 200)
camera.position.set(-8, 20, 25)

scene.add(camera)



// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(2.5 * Number(HorizontalSlider.value), 2.6 * Number(AlturaSlider.value) , 0)
controls.enableDamping = true



//angulo
controls.maxPolarAngle = 2 * Math.PI * (90 / 360)
controls.maxDistance = 60
controls.minDistance = 14
controls.panSpeed = 0.5

controls.minAzimuthAngle = -2 * Math.PI * (115 / 360)
controls.maxAzimuthAngle = 2 * Math.PI * (115 / 360)



function focus(){
    controls.target.set( 2.5 * Number(HorizontalSlider.value), 2.6 * Number(AlturaSlider.value) , 0)
    let gradedistance = 0.5 + (Number(HorizontalSlider.value)*0.1) + (Number(AlturaSlider.value)*0.1)
    camera.position.set(-8*gradedistance, 20*gradedistance, 25*gradedistance)
    controls.update();
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
/* renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) */
renderer.setPixelRatio(2)
renderer.alpha = true
renderer.setClearColor( 0xffffff, 0);




renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.9




/* document.getElementById('precio')= (10 * (HorizontalSlider.value + offsetH *0.1) + 20 * (AlturaSlider.value + offsetV *0.1)) */



/* gui
    .add(renderer, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
    })
    .onFinishChange(() =>
    {
        renderer.toneMapping = Number(renderer.toneMapping)
        updateAllMaterials()
    })



gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001) */

const carrocompra = document.getElementById("carrocompra")
const recuadro = document.getElementById("recuadro")


let executed = true;

carrocompra.addEventListener("click", () =>{
  loadcuernos() 
  document.getElementById("preciomercado").value = metroscuadrados;
  document.getElementById("materialmercado").value = typematerial.value;
  console.log(document.getElementById("preciomercado").value )
   console.log('click carro')
   submitmercado()
   
    
})

const submitmercado = () =>{
  setTimeout(function(){
  let formulario = document.getElementById('formpago');
   formulario.submit();
   console.log('listo')
}, 300);
  
} 



/**
 * Animate
 */
let stop = false



const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    if(!stop){
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime

        // Model animation
        if(mixer)
        {
            mixer.update(deltaTime)
        }

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)

    }
    
}

tick()


// Agrega los listeners para los botones
/* document.getElementById("obtener").addEventListener("click", function() {
  fetch("/obtener")
    .then(res => res.json())
    .then(data => console.log("El color obtenido es " + data.color));
});

document.getElementById("generarpago").addEventListener("click", function() {

  document.getElementById("precio").value = 7800;
  let formulario = document.getElementById('formpago');
  formulario.submit();

}); */