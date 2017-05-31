import * as THREE from 'three';

export default class World {
  constructor(container) {
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.container = container;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
  }
  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 200);
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onResize.bind(this));
  }
  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
