import React from 'react';
//0. Get THREE instance
import * as THREE from "three";
// 9: Orbig Controls: This makes it able to control dragging!!
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



class Test extends React.Component {

  initializeCamera = (camera) => {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 4;
  }

  componentDidMount() {
    // 1. make a div ref and get the size of the canvas
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // 2. To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.
    this.scene = new THREE.Scene();
                      //(field of view(degrees), aspect ratio )
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000); // we can set it here but it can be changed later.
    this.renderer = new THREE.WebGLRenderer();

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.setSize(width, height);

    // 3. Append the created "canvas" to the div below
    this.mount.appendChild(this.renderer.domElement);

    // 4. To create a cube, we need a BoxGeometry
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    this.cube = new THREE.Mesh( geometry, material );
    // everytime you make an entity, you have to add it to the "scene"
    this.scene.add( this.cube );

    //nothing shows because camera is on the same position as the cube

    //5. You can either change cube position or camera position!
    this.camera.position.z = 4; // how far this is
    this.camera.position.x = 0; // change to 2
    this.camera.position.y = 0; // change to 2

    // cube.position.z = -3;
    // cube.rotation.x = 10;
    // cube.rotation.y = 5;

    // 10-2. Orbit Controls
    // this.controls.rotateSpeed = 1.0; //change the things in here to test
    // this.controls.zoomSpeed = 1.2;  //change the things in here to test
    // this.controls.panSpeed = 0.8; //change the things in here to test

    // 6. Last but noot least! You have to add this 
    // this.renderer.render(this.scene, this.camera);

    this.animate(this.cube);
  }

  comoponentWillUnMount() {
    // 7. Using "this" instead of "let" lets you access from different lifecycles like this

    // Task: renderer to "this"
    // this.mount.removeChild(renderer.domElement);
    //  cancelAnimationFrame(this.cubeAnimation);
  }

  // 8. Make Animate() Task: renderer to "this"
  animate = () => {
    // It MUST be all INSIDE: because this is looping!!
    this.cube.rotation.x += 0.01; //Do just x in the beginning
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
    this.cubeAnimation = requestAnimationFrame(this.animate)
  }
  
  render() {
    return (
      <div
        id="boardCanvas"
        style={{ width: "100vw", height: "100vh" }}
        ref={mount => { this.mount = mount;}}
      />
    );
  }
}

export default Test;