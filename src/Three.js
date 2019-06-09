import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const textures = [
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif',
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/brick_bump.jpg',
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/metal.jpg'
];

function randomTexture() {
  const cnt = Math.floor(Math.random()*textures.length)
  console.log('cnt', cnt)
  return textures[cnt]
}
class ThreeComp extends Component {

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    //To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    //(field of view(degrees), aspect ratio )
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.textureLoader =  new THREE.TextureLoader();

    this.initializeOrbits();
    this.initializeCamera();
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    this.cubes = [];
    for (let i in [0,1,2,3,4]) {
      var texture = this.textureLoader.load(randomTexture());
      // var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
      var material = new THREE.MeshBasicMaterial({ map: texture});
      const geometry = new THREE.BoxGeometry( 1, 1, 1 ); // change this and you will get rectangle
      
      this.cubes[i] = new THREE.Mesh( geometry, material );
      this.cubes[i].direction = Math.round(Math.random());
      this.cubes[i].position.x = i// + (i*0.0001);
      this.cubes[i].position.y = i// + (i*0.0001);
      this.cubes[i].position.z = i// + (i*0.0001);
      this.scene.add( this.cubes[i] );
    }


    this.animate(this);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }
  initializeOrbits = () => {
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
  }
  initializeCamera = () => {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 7;
  }

  animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    const date = Date.now() * 0.001;
    
    for (let i = 0; i < this.cubes.length; i++) {
      this.cubes[i].position.y = Math.cos(date) * i;
      this.cubes[i].position.x = Math.sin(date) * i;

      if (this.cubes[i].direction === 0) {
        this.cubes[i].rotation.x += 0.01;
        this.cubes[i].rotation.y += 0.01;
        this.cubes[i].rotation.z += 0.01;
      } else {
        this.cubes[i].rotation.x -= 0.01;
        this.cubes[i].rotation.y -= 0.01;
        this.cubes[i].rotation.z -= 0.01;
      }
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: 'red' }}>
        <div
          //this will not update the canvas size: only happens once when component loads
          style={{ width: "100vw", height: "100vh" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default ThreeComp;