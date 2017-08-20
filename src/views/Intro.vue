<template lang='pug'>
  .intro
    transition(name='text-vertical-toggle')
      .intro-text(v-if='frameIdx == 0' key='intro')
        h3.subtitle Turn into a pixel with
        h1.title Pxlhead
      .info-text(v-else v-bind='{ key: frame.name, class: `${frame.name}-text` }')
        h1.title {{ frame.title }}
        p.description {{ frame.description }}
    nav.intro-nav
      a.nav-link(v-for='n in 5' @click='frameIdx = n - 1'
        v-bind:class='{ "nav-link--active": n == frameIdx + 1 }')
</template>

<script>
import { TweenLite, Power1 } from 'gsap'

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
  Points
} from 'three'

export default {
  name: 'intro',

  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,

      planet: null,
      starSystem: null,

      width: 0,
      height: 0,

      frameIdx: 0,
      framesData: [{
        name: 'intro',
        title: 'Pxlhead',
        camera: { xP: 0, yP: 10, zP: 180, xR: 0, yR: 0, zR: 0 },
        planet: { xR: 0, yR: 0, zR: 0 },
      }, {
        name: 'about',
        title: 'About us',
        description: 'Some description',
        camera: { xP: 50, yP: 20, zP: 100, xR: 0.5, yR: 0.2 },
        planet: { xR: 0, yR: 0, zR: 0 },
      }, {
        name: 'team',
        title: 'Our team',
        description: 'Some description',
        camera: { xP: 6, yP: 70, zP: 82, xR: -0.15, yR: -0.6, zR: -0.1 },
        planet: { xR: 1, yR: 1.7, zR: 1 },
      }, {
        name: 'projects',
        title: 'Our projects',
        description: 'Some description',
        camera: { xP: 34, yP: 55, zP: 62, xR: -0.06, yR: 0.15, zR: 0.1 },
        planet: { xR: -1, yR: 0.7, zR: -1 },
      }, {
        name: 'contacts',
        title: 'Contacts',
        description: 'Some description',
        camera: { xP: 11.4, yP: 60, zP: 55.5, xR: -0.25, yR: -0.16, zR: 0 },
        planet: { xR: 1, yR: 0.2, zR: -1.2 },
      }],

      distance: 0,
      speed: 0.1,
      delay: false
    }
  },

  beforeMount() {
    this.scene = new Scene()
    this.draw()
  },

  mounted() {
    this.setSize()

    this.init()
    this.animate()
  },

  methods: {
    // setting the scene
    init() {
      this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
      this.camera.position.set(0, 10, 180)

      this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.width, this.height)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = PCFSoftShadowMap

      this.$el.appendChild(this.renderer.domElement)

      window.addEventListener('resize', this.onResize)
      window.addEventListener('wheel', this.onWheel)
    },
    draw() {
      // draw planet
      const loader = new JSONLoader()

      loader.load('/public/models/planet.json', (geometry, materials) => {
        this.planet = new Mesh(geometry, materials)

        this.planet.castShadow = true
        this.planet.receiveShadow = true
        this.planet.position.set(50, -30, 0)
        this.scene.add(this.planet)
      })

      // draw stars
      const stars = new Geometry()
      const material = new PointsMaterial({
        color: 0xFFFFFF,
        size: 0.5
      })

      const randPos = () => (Math.random() - 0.5) * 300;
      for (let i = 0; i < 300; i++) {
        const star = new Vector3(randPos(), randPos(), randPos())
        stars.vertices.push(star)
      }

      this.starSystem = new Points(stars, material)
      this.scene.add(this.starSystem)

      // add lights
      const light = new DirectionalLight(0xDBF4F9, 1.8)
      light.position.set(-80, 80, 100)
      light.castShadow = true
      this.scene.add(light)
    },
    animate() {
      requestAnimationFrame(this.animate)

      this.starSystem.rotation.y += 0.0005

      this.renderer.render(this.scene, this.camera)
    },
    setSize() {
      this.width = window.innerWidth
      // TODO: fix scrollbar bug
      this.height = window.innerHeight - 2
    },
    onResize() {
      this.setSize()
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.width, this.height)
    },
    // actions
    onWheel() {
      if (event.deltaY > 0 && !this.delay) {
        this.distance += this.speed
        if (Math.floor(this.distance) > this.frameIdx) {
          this.frameIdx++
        }
      } else if (this.distance > 0 && !this.delay) {
        this.distance -= this.speed
        if (Math.ceil(this.distance) < this.frameIdx) {
          this.frameIdx--
        }
      }
    },
    // transition to frames
    changeFrame() {
      if (this.frameIdx === this.framesData.length) this.frameIdx = 0

      const data = this.framesData[this.frameIdx]
      const targets = ['camera', 'planet']
      targets.forEach(target => this.moveTo(this[target], data[target]))
    },
    moveTo(target, {
      xP = target.position.x,
      yP = target.position.y,
      zP = target.position.z,
      xR = target.rotation.x,
      yR = target.rotation.y,
      zR = target.rotation.z,
      ease = Power1.easeOut
    }) {
      TweenLite.to(target.position, 2, { x: xP, y: yP, z: zP, ease })
      TweenLite.to(target.rotation, 2, { x: xR, y: yR, z: zR, ease })
    },
  },

  computed: {
    frame() {
      return this.framesData[this.frameIdx]
    },
  },

  watch: {
    frameIdx() {
      this.changeFrame()
      this.delay = true

      setTimeout(() => this.delay = false, 2000)
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('wheel', this.onWheel)
  },
}
</script>

<style lang='scss'>
@import '~style';

.intro {
  background: $color-main;
  overflow: hidden;
  position: relative;
  .title {
    font-family: 'Montserrat', sans-serif;
    font-size: 7em;
    font-weight: 700;
    letter-spacing: 3px;
    color: $color-orange;
  }
  .subtitle {
    color: $color-white;
    letter-spacing: 2px;
    font-size: 2em;
  }
  .description {
    color: $color-white;
    font-size: 2em;
    font-weight: 400;
    margin-top: 4rem;
    opacity: 0.8;
  }
}
.intro-text {
  position: absolute;
  top: 60vh;
  left: 10rem;
  text-transform: uppercase;
}
.info-text {
  position: absolute;
  width: 40vw;
  text-align: center;
  text-transform: uppercase;
}
.about-text {
  top: 10rem;
  right: 22vw;
}
.team-text {
  top: 10rem;
  right: 27vw;
}
.projects-text {
  top: 15rem;
  right: 55vw;
}
.contacts-text {
  top: 35rem;
  right: 59vw;
}
.intro-nav {
  position: absolute;
  top: calc(50% - 20rem / 2);
  right: 6rem;
  width: 3rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .nav-link {
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
    height: 2.5rem;
    width: 2.5rem;
    opacity: 0.7;
    border: 0.3rem solid $color-orange;
    transition: ease-in-out 0.3s;
  }
}

.text-vertical-toggle-enter-active,
.text-vertical-toggle-leave-active {
  transition: all .8s ease-in-out;
}
.text-vertical-toggle-enter-active {
  transition-delay: 0.5s;
}
.text-vertical-toggle-enter,
.text-vertical-toggle-leave-to {
  transform: translateY(10rem);
  opacity: 0;
}
</style>
