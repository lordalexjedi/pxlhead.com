<template lang='pug'>
  .app-menu(@mousemove='onMouseMove')
    transition(name='overlay' mode='out-in')
      .overlay(v-show='open')
    a.app-menu-btn(@click='open = !open')
    span.app-menu-title PXLHEAD

    transition(name='scale' mode='out-in')
      .app-menu-modal(v-show='open' @click='changePage'
        :class='{ pointer: showPointer }')
        a.app-menu-esc(@click='open = !open')
        router-link.app-menu-link(v-show='topView' v-for='label in labels'
          :style='{ top: label.top, left: label.left }'
          :to='label.name'  :key='label.name') {{ label.name }}
        nav.app-menu-social
          a.social-link.link--facebook
          a.social-link.link--twitter
          a.social-link.link--link
        .btn-round
          a.btn-toggle(:class='{ "btn-toggle--on": pauseMusic }'
          @click='pauseMusic = !pauseMusic')
          .volume-set.toggle-up(@click='setVolume = setVolume + 0.2')
          .volume-set.toggle-down(@click='setVolume = setVolume - 0.2')
</template>

<script>
import { TweenLite } from 'gsap'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  Raycaster,
  DirectionalLight,
  Vector2,
  Group
} from 'three'
import { drawSpace, drawPlanet, drawOrbit } from '@/util/space'

export default {
  name: 'app-menu',

  data() {
    return {
      open: false,
      topView: false,
      showPointer: false,
      activeLink: '',
      labels: [],
      pauseMusic: false,
      setVolume: 1
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
    init() {
      this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
      this.camera.position.z = 300

      this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.width, this.height)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = PCFSoftShadowMap

      this.raycaster = new Raycaster()
      this.mouse = new Vector2()

      const container = this.$el.querySelector('.app-menu-modal')
      container.appendChild(this.renderer.domElement)

      window.addEventListener('resize', this.onResize)
      window.addEventListener('wheel', this.onWheel)
    },
    draw() {
      // draw stars
      this.starSystem = drawSpace()
      this.starSystem.rotation.x = -1.2
      this.scene.add(this.starSystem)

      // draw planets with page links
      this.orbitSystem = new Group()
      this.orbitSystem.rotation.x = -1.2
      this.orbitSystem.position.y = 20
      this.scene.add(this.orbitSystem)

      this.planets = []

      const mainPlanet = drawPlanet({ color: 0xD8DF72, size: 28 })
      mainPlanet.name = 'intro'
      this.orbitSystem.add(mainPlanet)
      this.planets.push(mainPlanet)

      this.linksData.forEach(data => {
        const planet = drawPlanet(data)
        planet.name = data.name

        const orbit = drawOrbit(data.radius)
        orbit.speed = data.speed
        this.orbitSystem.add(orbit)

        const xPos = Math.random() * data.radius * 2 - data.radius
        const factor = Math.random() < 0.5 ? -1 : 1
        const yPos = Math.sqrt(Math.pow(data.radius, 2) - Math.pow(xPos, 2)) * factor
        planet.position.set(xPos, yPos, 0)
        planet.name = data.name
        orbit.add(planet)
        this.planets.push(planet)
      })

      // draw lights
      const light1 = new DirectionalLight(0xffffff, 1.3)
      light1.position.set(-50, -50, 50)
      light1.castShadow = true
      mainPlanet.add(light1)

      const light2 = new DirectionalLight(0xffffff, 0.8)
      light2.position.set(80, 50, 50)
      light2.castShadow = true
      this.scene.add(light2)
    },
    onMouseMove(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)
      const metOrbits = this.raycaster.intersectObjects(this.orbitSystem.children)
      const metPlanets = this.raycaster.intersectObjects(this.planets)

      if (metOrbits.length > 0) {
        const orbit = metOrbits[0].object
        if (orbit.speed) {
          TweenLite.to(orbit.material, 1.5, { opacity: 0.8 })
          TweenLite.to(orbit.material, 1.5, { opacity: 0.2, delay: 1.5 })
        }
      }

      if (metPlanets.length > 0) {
        const planet = metPlanets[0].object
        this.activeLink = planet.name
        this.showPointer = true
      } else {
        this.activeLink = ''
        this.showPointer = false
      }
    },
    onWheel(event) {
      if (event.deltaY < 0) {
        TweenLite.to(this.orbitSystem.rotation, 2, { x: -1.2 })
        TweenLite.to(this.starSystem.rotation, 2, { x: -1.2 })
        this.topView = false
      } else {
        TweenLite.to(this.orbitSystem.rotation, 2, { x: 0 })
        TweenLite.to(this.starSystem.rotation, 2, { x: 0 })
        this.topView = true
      }
    },
    changePage() {
      if (this.activeLink) {
        this.$router.push(`/${this.activeLink}`)
      }
    },
    animate() {
      requestAnimationFrame(this.animate)

      if (this.open && this.starSystem) {
        this.starSystem.rotation.x -= 0.0004
        this.orbitSystem.children.forEach(orbit => {
          if (orbit.speed) {
            orbit.rotation.z += orbit.speed
          }
        })

        this.renderer.render(this.scene, this.camera)
      }
    },
    setSize() {
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.linksData.forEach(link => {
        link.top = this.height / 2 - 38 + link.radius * 1.8 + 'px'
        link.left = this.width / 2 - 50 + 'px'
      })
    },
    onResize() {
      this.setSize()
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.width, this.height)
    }
  },

  watch: {
    '$route' () {
      this.open = false
    },
    open() {
      if (this.open) {
        document.documentElement.classList.add('hide-scrollbar')
      } else {
        document.documentElement.classList.remove('hide-scrollbar')
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('wheel', this.onWheel)
  }
}
</script>

<style lang='scss'>
@import '~style';

.app-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
.app-menu ~ .intro {
  .app-menu-btn {
    display: none;
  }
}
.app-menu-btn {
  display: block;
  position: absolute;
  top: 3rem;
  left: 5rem;
  width: 5rem;
  height: 5rem;
  background-color: transparentize($color-blue, 0.6);
  border-radius: 50%;
  cursor: pointer;
  transition: transform ease-out 0.1s, background 0.2s;
  @include screen-style(iphone7) {
    left: 2rem;
  };
  @include screen-style(iphoneSE) {
    left: 2rem;
    width: 4rem;
    height: 4rem;
  };
  &:hover {
    background-color: transparentize($color-blue, 0.4);
    transform: scale(0.9);
    transition: transform ease-out 0.1s, background 0.2s;
    &::after {
      animation: sonar 1.3s ease-out 75ms;
    }
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-shadow: 0 0 0 2px transparentize($color-blue, 0.3);
    opacity: 0;
    transform: scale(0.7);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: content-box;
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('~@/assets/icons/logo.svg') no-repeat center / 40%;
  }
}
.app-menu-title {
  display: block;
  position: absolute;
  top: 4.5rem;
  left: 12rem;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 5px;
  color: $color-white;
  @include screen-style(iphone7) {
    display: none;
  };
  @include screen-style(iphoneSE) {
    display: none;
  };
}
.app-menu-modal {
  display: block;
  background-color: #14003C;
  overflow: hidden;
}
.app-menu-esc {
  position: absolute;
  display: block;
  top: 3rem;
  right: 5rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: transparentize(#E0E0E0, 0.8);
  transition: 0.3s ease-in-out;
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: calc(50% - 2rem / 2);
    left: calc(50% - 0.3rem / 2);
    transform: rotate(45deg);
    width: 0.3rem;
    height: 2rem;
    background-color: $color-white;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: calc(50% - 2rem / 2);
    left: calc(50% - 0.3rem / 2);
    transform: rotate(-45deg);
    width: 0.3rem;
    height: 2rem;
    background-color: $color-white;
  }
  &:hover {
    background-color: transparentize(#fff, 0.4);
    transition: 0.3s ease-in-out;
  }
}
.app-menu-link {
  display: block;
  position: absolute;
  font-size: 16px;
  width: 100px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  color: $color-white;
  transition: all 0.3s;
  opacity: 0.8;
  cursor: pointer;
}
.app-menu-social {
  position: absolute;
  right: 5rem;
  bottom: 5rem;
  width: 5rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.social-link {
  @extend %btn-icon;
  position: relative;
  flex-basis: 5rem;
  display: block;
  background-color: transparent;
  box-shadow: none;
  &:hover {
    background-color: transparentize(#fff, 0.9);
  }
  &::after {
    @include center-pos(2rem);
  }
}
.link--facebook {
  &::after {
    background: url('~@/assets/icons/facebook.svg') no-repeat center / 100%;
  }
}
.link--twitter {
  &::after {
    background: url('~@/assets/icons/twitter.svg') no-repeat center / 100%;
  }
}
.link--link {
  &::after {
    background: url('~@/assets/icons/link.svg') no-repeat center / 100%;
  }
}
.pointer {
  cursor: pointer;
}

// music player

.btn-round {
  width: 8rem;
  height: 8rem;
  position: absolute;
  bottom: 5rem;
  left: 5rem;
  border: 0.3rem solid $color-white;
  border-radius: 50%;
  transform: scale(0.6);
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  cursor: pointer;
  &:hover {
    transform: scale(1);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &:hover .btn-toggle{
    transform: scale(1);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
    animation: none;
  }
  &:hover .btn-toggle--on{
    border-radius: 5%;
    opacity: 1;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &:hover .toggle-up{
    transform: translateX(-2.4rem) scale(0.6);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &:hover .toggle-down{
    transform: translateX(2.4rem) scale(0.6);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: calc(50% - 12.1rem / 2);
    left: calc(50% - 12.1rem / 2);
    border: 0.05rem solid $color-white;
    border-radius: 50%;
    transform: scale(0.7);
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
    cursor: pointer;
    width: 12rem;
    height: 12rem;
    pointer-events: none;
  }
}
.btn-round:hover::after {
  transform: scale(1);
  transition: 0.7s 0.3s cubic-bezier(0.68, -0.15, 0.265, 1.35);
}
.toggle-up {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: calc(50% - 3rem / 2);
  left: calc(50% - 3rem / 2);
  border-radius: 1rem;
  transform: translateX(0rem) scale(0);
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  &::before {
    width: 1.8rem;
    height: 0.3rem;
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 0.3rem / 2);
    left: calc(50% - 1.8rem / 2);
    background-color: $color-white;
    border-radius: 1rem;
    transform: rotate(90deg);
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
  &::after {
    width: 1.8rem;
    height: 0.3rem;
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 0.3rem / 2);
    left: calc(50% - 1.8rem / 2);
    background-color: $color-white;
    border-radius: 1rem;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
}
.toggle-down {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: calc(50% - 3rem / 2);
  left: calc(50% - 3rem / 2);
  border-radius: 1rem;
  transform: translateX(0rem) scale(0);
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  &::after {
    width: 1.8rem;
    height: 0.3rem;
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 0.3rem / 2);
    left: calc(50% - 1.8rem / 2);
    background-color: $color-white;
    border-radius: 1rem;
    transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  }
}
.btn-toggle {
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: calc(50% - 2rem / 2);
  left: calc(50% - 2rem / 2);
  background-color: $color-white;
  border-radius: 50%;
  transform: scale(1.4);
  cursor: pointer;
  z-index: 100;
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
  animation: scale 0.7s cubic-bezier(0.68, -0.15, 0.265, 1.35) 1s infinite;
}
.btn-toggle--on {
  opacity: 0;
  transition: 0.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
}

@keyframes sonar {
  0% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.5;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1),
                0 0 10px 10px transparentize($color-blue, 0.6),
                0 0 0 10px rgba(255, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1),
                0 0 10px 10px transparentize($color-blue, 0.6),
                0 0 0 10px rgba(255, 255, 255, 0.3);
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes scale {
  0% {
    transform: scale(1.4);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1.4);
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $color-pink;
  opacity: 0;
  z-index: 99999;
  pointer-events: none;
}
// .overlay:nth-child(2) {
//   background-color: $color-blue;
//   animation: overlay 1s ease-in-out 0.1s forwards;
// }
// .overlay:nth-child(3) {
//   background-color: $color-green;
//   animation: overlay 1s ease-in-out 0.2s forwards;
// }

.overlay-enter-active{
  animation: overlay 1s ease-in-out;
  transition: all 0.1s linear 0.9s;
}
.overlay-leave-active {
  opacity: 1;
}
.overlay-enter, .overlay-leave-to {
  opacity: 1;
}
.overlay-leave-to {
  animation: overlay 1s ease-in-out reverse;
  transition: all 0.1s linear 0.9s;
}

@keyframes overlay {
  0% {
    transform: translateY(-100%);
  }
  25% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
