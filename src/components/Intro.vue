<template lang='pug'>
  .intro
    transition(name='text-toggle')
      .intro-text(v-if='frame === 0')
        h3 Turn into a pixel with
        h1 Pxlhead
    transition(name='text-toggle')
      .about-text(v-if='frame === 1')
        h1 ABOUT US
        p
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          | tempor incididunt ut labore et dolore magna aliqua.
    transition(name='text-toggle')
      .team-text(v-if='frame === 2')
        h1 OUR TEAM
        p
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          | tempor incididunt ut labore et dolore magna aliqua.
    transition(name='text-toggle')
      .project-text(v-if='frame === 3')
        h1 OUR PROJECTS
        p
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          | tempor incididunt ut labore et dolore magna aliqua.
    transition(name='text-toggle')
      .contact-text(v-if='frame === 4')
        h1 CONTACTS
        p
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          | tempor incididunt ut labore et dolore magna aliqua.
    nav.main-nav
      a.nav-link(v-for='n in 5')
</template>

<script>
import { TweenLite, Power1 } from 'gsap';

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

// TODO: remove in production
/* eslint-disable global-require */
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

      frame: 0,
      frameData: [{
        // intro
        camera: { xP: 0, yP: 10, zP: 180, xR: 0, yR: 0, zR: 0 },
        planet: { xR: 0, yR: 0, zR: 0 },
      }, {
        // basic info
        camera: { xP: 50, yP: 20, zP: 100, xR: 0.5, yR: 0.2 },
      }, {
        // about us
        camera: { xP: 22.4, yP: 55, zP: 82, xR: -0.15, yR: -0.6, zR: -0.1 },
        planet: { xR: 1, yR: 1.7, zR: 1 },
      }, {
        // what we do
        camera: { xP: 50, yP: 55, zP: 62, xR: -0.06, yR: 0.15, zR: 0.1 },
        planet: { xR: -1, yR: 0.9, zR: -1 },
      }, {
        // contacts
        camera: { xP: 11.4, yP: 60, zP: 55.5, xR: -0.25, yR: -0.16, zR: 0 },
        planet: { xR: 1, yR: 0.2, zR: -1.2 },
      }],

      distance: 0,
      speed: 0.1,
      delay: false,
    };
  },
  mounted() {
    this.setSize();

    this.init();
    this.animate();
  },
  methods: {

    // setting the scene
    init() {
      this.scene = new Scene();
      this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
      this.camera.position.set(0, 10, 180);

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
        this.scene.add(this.planet);

        window.addEventListener('wheel', this.onWheel);
      });

      loader.load('/static/models/island1.json', (geometry, materials) => {
        this.island1 = new Mesh(geometry, materials);

        this.island1.castShadow = true;
        this.island1.receiveShadow = true;
        this.island1.position.set(-40, 60, -30);
        this.island1.rotation.x = 0.5;
        this.scene.add(this.island1);
      });

      loader.load('/static/models/island2.json', (geometry, materials) => {
        this.island2 = new Mesh(geometry, materials);

        this.island2.castShadow = true;
        this.island2.receiveShadow = true;
        this.island2.position.set(200, 80, -150);
        this.island2.rotation.x = 0.3;
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
      const light = new DirectionalLight(0xDBF4F9, 1.8);
      light.position.set(-80, 80, 100);
      light.castShadow = true;
      this.scene.add(light);
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.starSystem.rotation.y += 0.0005;

      this.renderer.render(this.scene, this.camera);
    },
    setSize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight - 3;
    },
    onResize() {
      this.setSize();
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    },

    // TODO: remove in production
    test() {
      if (!this.controls) {
        const THREE = require('three');
        const OrbitControls = require('three-orbit-controls')(THREE);
        this.controls = new OrbitControls(this.camera);
      }
      if (this.camera) {
        // console.log(this.camera.position);
        // console.log(this.camera.rotation);
      }
    },

    // actions
    onWheel() {
      if (event.deltaY > 0 && !this.delay) {
        this.distance += this.speed;
        if (Math.floor(this.distance) > this.frame) {
          this.frame += 1;
        }
      } else if (this.distance > 0 && !this.delay) {
        this.distance -= this.speed;
        if (Math.ceil(this.distance) < this.frame) {
          this.frame -= 1;
        }
      }
    },

    // transition to frames
    changeFrame() {
      this.frame = this.frame < this.frameData.length ? this.frame : 0;
      const data = this.frameData[this.frame];
      Object.keys(data).forEach((key) => {
        this.moveTo(this[key], data[key]);
      });
    },
    moveTo(target, {
      xP = target.position.x,
      yP = target.position.y,
      zP = target.position.z,
      xR = target.rotation.x,
      yR = target.rotation.y,
      zR = target.rotation.z,
      ease = Power1.easeOut,
    }) {
      TweenLite.to(target.position, 2, { x: xP, y: yP, z: zP, ease });
      TweenLite.to(target.rotation, 2, { x: xR, y: yR, z: zR, ease });
    },
  },
  watch: {
    frame() {
      this.changeFrame();
      this.delay = true;
      setTimeout(() => {
        this.delay = false;
      }, 2000);
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
  },
};
</script>

<style lang='scss' scoped>
$color-white: #F4FFFF;

.intro {
  background: #12233f;
  // background-image:
  //   radial-gradient(circle farthest-side at top left, #4B80A0 0%, #12233f 70%);
  overflow: hidden;
  position: relative;
}
.intro-text {
  position: absolute;
  top: 60vh;
  left: 10rem;
  text-transform: uppercase;
}
h3 {
  color: $color-white;
  letter-spacing: 2px;
  font-size: 2em;
}
h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 7em;
  font-weight: 700;
  letter-spacing: 3px;
  color: #F79B22;
}
p {
  color: $color-white;
  font-size: 2em;
  font-weight: 400;
  margin-top: 4rem;
  opacity: 0.8;
}
.about-text {
  position: absolute;
  top: 10rem;
  right: 22vw;
  width: 40vw;
  text-align: center;
}
.team-text {
  position: absolute;
  top: 5rem;
  right: 40vw;
  width: 40vw;
  text-align: center;
}
.project-text {
  position: absolute;
  top: 11rem;
  right: 49vw;
  width: 40vw;
  text-align: center;
}
.contact-text {
  position: absolute;
  top: 50rem;
  right: 59vw;
  width: 40vw;
  text-align: center;
}
.music-btn {
  position: absolute;
  bottom: 4rem;
  right: 6rem;
  height: 1rem;
  width: 1rem;
  background-color: $color-white;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
  transform: scale(0.8);
  transition: ease-in-out 0.5s;
  &:hover {
    transform: scale(1);
    transition: ease-in-out 0.5s;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    bottom: -1.7rem;
    right: -1.7rem;
    height: 4rem;
    width: 4rem;
    border: 0.2rem solid $color-white;
    border-radius: 50%;
  }
}
.main-nav {
  position: absolute;
  top: calc(50% - 20rem / 2);
  right: 6rem;
  width: 1.5rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.nav-link {
  // flex-basis: 12%;
  height: 1rem;
  width: 1rem;
  display: block;
  cursor: pointer;
  border: 0.7rem solid $color-white;
  border-radius: 50%;
  opacity: 0.5;
  transition: ease-in-out 0.3s;
  &:hover {
    opacity: 0.7;
  }
}
.nav-link--active {
  height: 1.9rem;
  width: 1.9rem;
  opacity: 0.7;
  border: 0.3rem solid $color-white;
  transition: ease-in-out 0.3s;
}

.text-toggle-enter-active,
.text-toggle-leave-active {
  transition: all .8s ease-in-out;
}
.text-toggle-enter,
.text-toggle-leave-to {
  transform: translateY(10rem);
  opacity: 0;
}
</style>L
