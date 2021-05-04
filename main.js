import * as THREE from './three.js-master/build/three.module.js';

function main() {
  const canvas = document.querySelector('#c'); //enlazar canvas con html
  const renderer = new THREE.WebGLRenderer({canvas}); //se indica renderizador webgl para que corra three

  //configuracion camara
  const fov = 75;
  const aspect = 2;  
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 4;


  // se crea la escena donde va la luz y las geometrias
  const scene = new THREE.Scene();

  // se crea una luz
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  // se crea un objeto Mesh a partir de una geometria + un material
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue

  //guncion para ver si se tiene un tamaño distinto de canvas al de su resolucion y si es asi los iguala
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  //funcion para hacer varios mesh de cubos a partir de una geometria y un color
  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ];


  // detallito zorron de animacion
  function rendereale(time) {
    time *= 0.001;  // convert time to seconds

    //este if vigila si hubo cambios en el canvas para updetear cambios, en este caso la resolucion
    if (resizeRendererToDisplaySize(renderer)) {
    // se configura que para renderizar se actualize el canvas y el aspect al tamaño del dispositivo o cliente
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    }
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(rendereale);
  }
  requestAnimationFrame(rendereale);

}

//se llama a la funcion de arriba
main();