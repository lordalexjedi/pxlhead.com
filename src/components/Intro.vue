<template lang='pug'>
  .intro
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  DirectionalLight,
  JSONLoader,
  Mesh,
  Geometry,
  PointsMaterial,
  Vector3,
  Points,
} from 'three';

export default {
  name: 'intro',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,

      planet: null,
      island1: null,
      island2: null,
      starSystem: null,

      width: 0,
      height: 0,

      vAngle: 0,
    };
  },
  mounted() {
    this.setSize();

    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.scene = new Scene();
      this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
      // this.camera.position.set(10, -10, 80);
      this.camera.position.set(0, 30, 200);
      this.camera.lookAt(this.scene.position);

      this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = PCFSoftShadowMap;

      this.draw();
      this.addLights();

      this.$el.appendChild(this.renderer.domElement);

      window.addEventListener('resize', this.onResize);
    },
    draw() {
      const loader = new JSONLoader();

      loader.load('/static/models/planet.json', (geometry, materials) => {
        this.planet = new Mesh(geometry, materials);

        this.planet.castShadow = true;
        this.planet.receiveShadow = true;
        this.planet.position.set(50, -30, 0);
        // this.planet.position.set(20, -70, 0);
        this.scene.add(this.planet);
      });

      loader.load('/static/models/island1.json', (geometry, materials) => {
        this.island1 = new Mesh(geometry, materials);

        this.island1.castShadow = true;
        this.island1.receiveShadow = true;
        this.island1.position.set(-30, 60, 30);
        this.scene.add(this.island1);
      });

      loader.load('/static/models/island2.json', (geometry, materials) => {
        this.island2 = new Mesh(geometry, materials);

        this.island2.castShadow = true;
        this.island2.receiveShadow = true;
        this.island2.position.set(160, 40, -20);
        this.scene.add(this.island2);
      });

      this.drawStars();
    },
    drawStars() {
      const stars = new Geometry();
      const material = new PointsMaterial({
        color: 0xFFFFFF,
        size: 0.5,
      });

      for (let i = 0; i < 300; i += 1) {
        const pos = {
          x: (Math.random() - 0.5) * 300,
          y: (Math.random() - 0.5) * 300,
          z: (Math.random() - 0.5) * 300,
        };
        const star = new Vector3(pos.x, pos.y, pos.z);
        stars.vertices.push(star);
      }

      this.starSystem = new Points(stars, material);

      this.scene.add(this.starSystem);
    },
    addLights() {
      const light1 = new DirectionalLight(0xDBF4F9, 1.8);
      light1.position.set(-80, 80, 100);
      light1.castShadow = true;
      this.scene.add(light1);

      // const light2 = new DirectionalLight(0xffffff, 0.8);
      // light2.position.set(-70, 50, 60);
      // light2.castShadow = true;
      // this.scene.add(light2);
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.starSystem.rotation.y += 0.0005;
      this.planet.rotation.y += 0.001;

      // this.vAngle += 0.03;
      // this.island2.position.y = (Math.cos(this.vAngle) * 2) + 30;

      this.renderer.render(this.scene, this.camera);
    },
    onResize() {
      this.setSize();
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    },
    setSize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style>
.intro {
  background: #475C82;
  background-image:
    radial-gradient(circle farthest-side at top left, #4B80A0 0%, #12233f 70%);
  overflow: hidden;
}
</style>
