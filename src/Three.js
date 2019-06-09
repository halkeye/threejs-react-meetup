import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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


    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.initializeOrbits();
    this.initializeCamera();

    var texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif');
    // var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var material = new THREE.MeshBasicMaterial({ map: texture});
    const geometry = new THREE.BoxGeometry( 1, 1, 1 ); // change this and you will get rectangle
    
    this.cube= new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );
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
    this.camera.position.z = 4;
  }

  animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.cube.rotation.x += 0.01;     
    this.cube.rotation.y += 0.01;
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