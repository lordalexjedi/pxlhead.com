<template lang='pug'>
  .intro(@click='tooltipShow = false')
    transition(name='slide-left' appear)
      .intro-textgroup(v-if='showNavigation')
        .intro-text(v-if='frameIdx == 0' key='intro')
          h3.intro-subtitle Turn into a pixel with
          h1.intro-title Pxlhead
        .info-text(v-else v-bind='{ key: frame.name, class: `${frame.name}-text` }')
          h1.intro-title {{ frame.title }}
          p.intro-description {{ frame.description }}
    transition-group(name='slide-right' appear)
      nav.intro-nav(v-if='showNavigation' key='nav')
        li.nav-link(v-for='n in 5' @click='frameIdx = n - 1'
          v-bind:class='{ "nav-link--active": n == frameIdx + 1 }')
          a.nav-point
      .mouse-tip(v-if='showNavigation' key='mouse')
        .mouse-wheel
    .tooltip(v-show='tooltipShow')
      p.tooltip-text Click here to launch menu!
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
      tooltipShow: true,
      showNavigation: false,
      frameIdx: 0,
      framesData: [{
        name: 'intro',
        title: 'Pxlhead',
        camera: { xP: 0, yP: 10, zP: 200, xR: 0, yR: 0, zR: 0 },
        planet: { xR: 0, yR: 0, zR: 0 },
      }, {
        name: 'about',
        title: 'About us',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
        Donec blandit consectetur hendrerit. Curabitur eget nibh a magna tempor\
        pulvinar. Vivamus non elementum sem, eget dapibus dui. Ut tristique nulla\
        at ante elementum dictum. Donec non sagittis mi. Nunc congue turpis.',
        camera: { xP: 50, yP: 20, zP: 120, xR: 0.5, yR: 0.2 },
        planet: { xR: 0, yR: 0, zR: 0 },
      }, {
        name: 'team',
        title: 'Our team',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
        Donec blandit consectetur hendrerit. Curabitur eget nibh a magna tempor\
        pulvinar. Vivamus non elementum sem, eget dapibus dui. Ut tristique nulla\
        at ante elementum dictum. Donec non sagittis mi. Nunc congue turpis.',
        camera: { xP: 0, yP: 60, zP: 70, xR: 0.1, yR: -1 },
        planet: { xR: 1.9, yR: 0.6, zR: -3.4 },
      }, {
        name: 'projects',
        title: 'Our projects',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
        Donec blandit consectetur hendrerit. Curabitur eget nibh a magna tempor\
        pulvinar. Vivamus non elementum sem, eget dapibus dui. Ut tristique nulla\
        at ante elementum dictum. Donec non sagittis mi. Nunc congue turpis.',
        camera: { xP: 40, yP: 60, zP: 100, xR: 0, yR: 0 },
        planet: { xR: -2, yR: -0.9, zR: 0 },
      }, {
        name: 'contacts',
        title: 'Contacts',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
        Donec blandit consectetur hendrerit. Curabitur eget nibh a magna tempor\
        pulvinar. Vivamus non elementum sem, eget dapibus dui. Ut tristique nulla\
        at ante elementum dictum. Donec non sagittis mi. Nunc congue turpis.',
        camera: { xP: 30, yP: 73, zP: 60, xR: -0.3, yR: 0 },
        planet: { xR: 0.73, yR: 0.2, zR: 1 },
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

    setTimeout(() => {
      TweenLite.to(this.camera.position, 3, { z: 200, ease: Power1.easeOut })
      this.showNavigation = true
    }, 2000)
  },

  methods: {
    // setting the scene
    init() {
      this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
      this.camera.position.set(0, 10, 350)

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
  background: linear-gradient(to top, #0e0844, #251f6b, #1f1f60);
  overflow: hidden;
  position: relative;
  user-select: none;
}
.intro-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 8rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #00D6A0;
  margin: 0;
  @media (orientation: portrait) {
    font-size: 6rem;
  }
  @include screen-style(iphone7) {
    font-size: 5rem;
  };
  @include screen-style(iphoneSE) {
    font-size: 4rem;
  }
}
.intro-subtitle {
  color: $color-white;
  opacity: 0.9;
  letter-spacing: 1.5px;
  font-size: 2.6rem;
  @media (orientation: portrait) {
    font-size: 2rem;
  }
  @include screen-style(iphoneSE) {
    font-size: 1.5rem;
  }
}
.intro-description {
  color: $color-white;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.8rem;
  margin-top: 4rem;
  margin-left: 4rem;
  opacity: 0.7;
  @media (orientation: portrait) {
    margin-left: 0;
  }
  @include screen-style(iphone7) {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: 2rem;
  };
  @include screen-style(iphoneSE) {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: 2rem;
  }
}
.intro-text {
  position: absolute;
  top: 60vh;
  left: 10rem;
  text-transform: uppercase;
  @media (orientation: portrait) {
    left: 5rem;
  }
  @include screen-style(iphone7) {
    top: 20vh;
  };
  @include screen-style(iphoneSE) {
    top: 20vh;
  }
}

// text positioning
.info-text {
  position: absolute;
  width: 40vw;
  @media (orientation: portrait) {
    width: 60%;
  }
  @include screen-style(iphone7) {
    width: 80%;
  };
  @include screen-style(iphoneSE) {
    width: 80%;
  }
  .intro-title {
    font-size: 6rem;
    text-transform: uppercase;
    @include screen-style(iphone7) {
      font-size: 3rem;
    };
    @include screen-style(iphoneSE) {
      font-size: 3rem;
    }
  }
}
.about-text {
  top: 12rem;
  left: 22vw;
  @include screen-style(iphone7) {
    top: 12rem;
    left: 12vw;
  };
  @include screen-style(iphoneSE) {
    top: 12rem;
    left: 12vw;
  }
  .intro-title {
    font-size: 6rem;
    text-transform: uppercase;
    @include screen-style(iphone7) {
      font-size: 3rem;
    };
    @include screen-style(iphoneSE) {
      font-size: 3rem;
    }
  }
}
.team-text {
  top: 10rem;
  right: 27vw;
  @media (orientation: portrait) {
    top: 12rem;
    left: 22vw;
  }
  @include screen-style(iphone7) {
    top: 12rem;
    left: 12vw;
  };
  @include screen-style(iphoneSE) {
    top: 12rem;
    left: 12vw;
  }
  .intro-title {
    font-size: 6rem;
    text-transform: uppercase;
    @include screen-style(iphone7) {
      font-size: 3rem;
    };
    @include screen-style(iphoneSE) {
      font-size: 3rem;
    }
  }
}
.projects-text {
  top: 20rem;
  right: 55vw;
  @media (orientation: portrait) {
    top: 12rem;
    left: 22vw;
  }
  @include screen-style(iphone7) {
    top: 12rem;
    left: 12vw;
  };
  @include screen-style(iphoneSE) {
    top: 12rem;
    left: 12vw;
  }
  .intro-title {
    font-size: 6rem;
    text-transform: uppercase;
    @include screen-style(iphone7) {
      font-size: 3rem;
    };
    @include screen-style(iphoneSE) {
      font-size: 3rem;
    }
  }
}
.contacts-text {
  top: 20rem;
  right: 55vw;
  @media (orientation: portrait) {
    top: 12rem;
    left: 22vw;
  }
  @include screen-style(iphone7) {
    top: 12rem;
    left: 12vw;
  };
  @include screen-style(iphoneSE) {
    top: 12rem;
    left: 12vw;
  }
  .intro-title {
    font-size: 6rem;
    text-transform: uppercase;
    @include screen-style(iphone7) {
      font-size: 3rem;
    };
    @include screen-style(iphoneSE) {
      font-size: 3rem;
    }
  }
}

.intro-nav {
  position: absolute;
  top: calc(50% - 20rem / 2);
  right: 6rem;
  width: 4rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @include screen-style(iphone7) {
    flex-direction: row;
    width: 25rem;
    height: 4rem;
    top: auto;
    bottom: 5%;
  };
  @include screen-style(iphoneSE) {
    flex-direction: row;
    width: 25rem;
    height: 4rem;
    top: auto;
    bottom: 5%;
    right: calc(50% - 25rem / 2);
  }
  .nav-link {
    height: 1rem;
    width: 1rem;
    padding: 1rem;
    display: block;
    cursor: pointer;
    @media (orientation: portrait) {
      height: 2rem;
      width: 2rem;
    }
    @include screen-style(iphone7) {
      height: 1rem;
      width: 1rem;
    };
    @include screen-style(iphoneSE) {
      height: 1rem;
      width: 1rem;
    }
  }
  .nav-point {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: $color-blue;
    opacity: 0.7;
    transition: ease-in-out 0.3s;
    &:hover {
      opacity: 1;
      transition: ease-in-out 0.3s;
    }
  }
  .nav-link--active {
    .nav-point {
      transform: scale(1.5);
      opacity: 1;
      background-color: #43A4F1;
      transition: ease-in-out 0.3s;
    }
  }
}
.tooltip {
  position: absolute;
  top: 10rem;
  left: 5rem;
  padding: 2rem;
  border-radius: 6rem;
  background-color: darken($color-blue, 30%);
  &::after {
    display: block;
    content: '';
    top: -5rem;
    left: 2rem;
    border: solid transparent;
    height: 4rem;
    width: 0rem;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-width: 0rem 1rem 2rem 1rem;
    border-bottom-color: darken($color-blue, 30%);
    margin-bottom: -10px;
  }
}
.tooltip-text {
  color: $color-white;
  font-size: 1.5rem;
}
.mouse-tip {
  position: absolute;
  bottom: 10rem;
  right: 7rem;
  width: 2rem;
  height: 3.5rem;
  opacity: 0.7;
  border: 2px solid $color-white;
  border-radius: 1.5rem;
  @media (orientation: portrait) {
    width: 3rem;
    height: 5rem;
  }
  @include screen-style(iphone7) {
    display: none;
  };
  @include screen-style(iphoneSE) {
    display: none;
  }
}
.mouse-wheel {
  position: absolute;
  top: 1rem;
  left: calc(50% - 0.3rem / 2);
  width: 0.3rem;
  height: 0.6rem;
  background-color: $color-white;
  border-radius: 1.5rem;
  animation: scroll 1s ease-in-out infinite;
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: all 1.3s ease-in-out 0.5s;
}
.slide-left-enter, .slide-left-leave-to {
  transform: translateX(-300%);
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.8s ease-in-out 0.5s;
}
.slide-right-enter, .slide-right-leave-to {
  transform: translateX(300%);
  opacity: 0;
}

@keyframes scroll {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
