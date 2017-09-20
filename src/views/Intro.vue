<template lang='pug'>
  .intro
    transition(name='text-vertical-toggle')
      .intro-text(v-if='frameIdx == 0' key='intro')
        h3.intro-subtitle Turn into a pixel with
        h1.intro-title Pxlhead
      .info-text(v-else v-bind='{ key: frame.name, class: `${frame.name}-text` }')
        h1.intro-title {{ frame.title }}
        p.intro-description {{ frame.description }}
    nav.intro-nav
      a.nav-link(v-for='n in 5' @click='frameIdx = n - 1'
        v-bind:class='{ "nav-link--active": n == frameIdx + 1 }')
</template>

<script>
import { TweenLite, Power1 } from 'gsap'
import { drawSpace, drawPlanet } from '@/util/space'

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  DirectionalLight,
  JSONLoader,
  Group,
  Mesh
} from 'three'

export default {
  name: 'intro',

  data() {
    return {
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
        camera: { xP: 0, yP: 60, zP: 50, xR: 0.1, yR: -1 },
        planet: { xR: 1.9, yR: 0.6, zR: -3.4 },
      }, {
        name: 'projects',
        title: 'Our projects',
        description: 'Some description',
        camera: { xP: 40, yP: 60, zP: 80, xR: 0, yR: 0 },
        planet: { xR: -2, yR: -0.9, zR: 0 },
      }, {
        name: 'contacts',
        title: 'Contacts',
        description: 'Some description',
        camera: { xP: 30, yP: 73, zP: 40, xR: -0.3, yR: 0 },
        planet: { xR: 0.73, yR: 0.4, zR: 1 },
      }],

      distance: 0,
      speed: 0.1,
      delay: false
    }
  },

  title() {
    return 'Intro'
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
      const jsonLoader = new JSONLoader()
      jsonLoader.load('/public/assets/planet.json', (geometry, materials) => {
        // draw main planet
        this.planet = new Mesh(geometry, materials)
        this.planet.castShadow = true
        this.planet.receiveShadow = true
        this.planet.position.set(50, -10, 0)
        this.scene.add(this.planet)

        // draw side planets
        this.moons = new Group()
        this.moons.position.set(50, -10, 0)
        this.scene.add(this.moons)

        const planet1 = drawPlanet({ color: 0x00F2B6, size: 13 })
        planet1.position.set(-200, 0, -50)
        this.moons.add(planet1)

        const planet2 = drawPlanet({ color: 0xEC2242, size: 18 })
        planet2.position.set(200, 0, -150)
        this.moons.add(planet2)

        const planet3 = drawPlanet({ color: 0x3A2CAC, size: 10 })
        planet3.position.set(100, 0, 150)
        this.moons.add(planet3)
      })

      this.space = drawSpace()
      this.scene.add(this.space)

      // draw lights
      const light1 = new DirectionalLight(0xffffff, 1.3)
      light1.position.set(-180, 50, 50)
      light1.castShadow = true
      this.scene.add(light1)

      const light2 = new DirectionalLight(0xffffff, 0.6)
      light2.position.set(70, 50, 50)
      light2.castShadow = true
      this.scene.add(light2)
    },
    animate() {
      requestAnimationFrame(this.animate)

      if (this.planet) {
        this.planet.rotation.y += 0.0002
        this.moons.rotation.y += 0.0005
        this.space.rotation.y += 0.0005
      }

      this.renderer.render(this.scene, this.camera)
    },
    setSize() {
      document.documentElement.classList.add('hide-scrollbar')
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    onResize() {
      this.setSize()
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.width, this.height)
    },
    // actions
    onWheel(event) {
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
  }
}
</script>

<style lang='scss'>
@import '~style';

.intro {
  background: #14003C;
  overflow: hidden;
  position: relative;
}
.intro-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 8rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #00D6A0;
}
.intro-subtitle {
  color: $color-white;
  opacity: 0.8;
  letter-spacing: 1.5px;
  font-size: 2.6rem;
}
.intro-description {
  color: $color-white;
  font-size: 2rem;
  font-weight: 400;
  margin-top: 4rem;
  opacity: 0.8;
}
.intro-text {
  position: absolute;
  top: 60vh;
  left: 10rem;
  text-transform: uppercase;
}

// text positioning
.info-text {
  position: absolute;
  width: 40vw;
  .intro-title {
    font-size: 6rem;
    text-transform: uppercase;
  }
}
.about-text {
  top: 15rem;
  left: 22vw;
}
.team-text {
  top: 10rem;
  right: 27vw;
}
.projects-text {
  top: 25rem;
  right: 55vw;
}
.contacts-text {
  top: 35rem;
  right: 55vw;
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
    background-color: $color-blue;
    border-radius: 50%;
    opacity: 0.7;
    transition: ease-in-out 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  .nav-link--active {
    height: 1.5rem;
    width: 1.5rem;
    opacity: 1;
    background-color: #43A4F1;
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
