import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

/* eslint-disable no-param-reassign */
export default class World {
  constructor(container) {
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.lighthouse = null;
    this.monster = null;

    this.mouseDown = false;

    this.container = container;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
  }
  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 70, 110);
    this.camera.lookAt(this.scene.position);

    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.container.appendChild(this.renderer.domElement);

    this.addLights();
    this.drawWaves();
    this.drawLighthouse();
    this.drawMonster();

    window.addEventListener('resize', this.onResize.bind(this));

    this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.container.addEventListener('touchstart', this.onMouseDown.bind(this));
    this.container.addEventListener('touchend', this.onMouseUp.bind(this));
  }
  addLights() {
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);
    this.scene.add(ambientLight);

    const light1 = new THREE.DirectionalLight(0xFFE8FB, 0.6);
    light1.position.set(100, 100, 200);
    light1.castShadow = true;
    this.scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xFF9696, 0.4);
    light2.position.set(200, 100, 100);
    light2.castShadow = true;
    this.scene.add(light2);
  }
  drawWaves() {
    this.mixer = new THREE.AnimationMixer(this.scene);
    const objectLoader = new THREE.ObjectLoader();

    objectLoader.load('/static/models/waves.json', (group) => {
      const waves = group.children[0];
      waves.material.morphTargets = true;
      waves.material.needsUpdate = true;
      waves.material.bumpScale = 0.0005;
      waves.matrixAutoUpdate = false;
      waves.updateMatrix();
      waves.updateMorphTargets();

      if (group.animations) {
        this.mixer.clipAction(group.animations[0], waves)
          .setDuration(1)
          .startAt(-Math.random())
          .play();
      }
      group.scale.set(10, 10, 10);

      group.castShadow = true;
      group.receiveShadow = true;
      this.scene.add(group);
    });
  }
  drawLighthouse() {
    const loader = new THREE.JSONLoader();

    loader.load('/static/models/lighthouse.json', (geometry, materials) => {
      this.lighthouse = new THREE.Mesh(geometry, materials);
      this.lighthouse.position.set(-30, 0, 5);

      this.lighthouse.castShadow = true;
      this.lighthouse.receiveShadow = true;
      this.scene.add(this.lighthouse);

      const lampGeometry = new THREE.BoxGeometry(3, 3, 3);
      const lampMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFE86B,
        shading: THREE.FlatShading,
      });
      const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
      lamp.position.set(5, 43, 0);
      this.lighthouse.add(lamp);

      this.lampLight = new THREE.SpotLight(0xFFF3BA, 2, 200, 0.7, 0.3);
      this.lampLight.shadow.mapSize.width = 1024;
      this.lampLight.shadow.mapSize.height = 1024;
      this.lampLight.castShadow = true;
      this.lampLight.position.set(100, -20, 50);

      this.lighthouse.add(this.lampLight);
    });
  }
  drawMonster() {
    const loader = new THREE.JSONLoader();

    loader.load('/static/models/monster.json', (geometry, materials) => {
      this.monster = new THREE.Mesh(geometry, materials);
      this.monster.position.set(40, -20, 50);
      this.monster.rotation.set(0, -0.8, -0.1);

      this.monster.castShadow = true;
      this.monster.receiveShadow = true;

      this.scene.add(this.monster);
    });
  }
  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
  onMouseDown() {
    event.preventDefault();
    this.mouseDown = true;
  }
  onMouseUp() {
    event.preventDefault();
    this.mouseDown = false;
  }
  render() {
    this.renderer.render(this.scene, this.camera);

    if (this.mixer) {
      this.mixer.update(0.2 * this.clock.getDelta());
    }
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const timer = Date.now() * 0.001;
    const yPos = 2 * Math.sin(timer);
    const zRot = Math.cos(timer);

    if (this.lighthouse && this.monster) {
      this.lighthouse.position.y = yPos + 3;
      this.lighthouse.rotation.z = 0.04 * zRot;

      if (this.mouseDown && this.lampLight.position.y < 60) {
        this.monster.position.y += 0.3;
        this.lampLight.position.y += 0.8;
      }

      if (this.monster.position.y > 5) {
        this.monster.position.y = yPos + 7;
        this.monster.rotation.z = 0.02 * -zRot;
      }
    }

    this.render();
  }
}
