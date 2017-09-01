<template lang='pug'>
  .app-menu(@mousemove='onMouseMove')
    a.app-menu-btn(@click='open = !open')
    span.app-menu-title PXLHEAD

    .app-menu-modal(v-show='open' @click='changePage')
    h2.app-menu-link {{ activeLink }}
</template>

<script>
import { TweenLite } from 'gsap'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  Raycaster,
  AmbientLight,
  Vector2,
  Vector3,
  Mesh,
  Group,
  Geometry,
  PointsMaterial,
  Points,
  SphereGeometry,
  MeshLambertMaterial
} from 'three'

export default {
  name: 'app-menu',

  data() {
    return {
      open: false,
      activeLink: '',

      scene: null,
      camera: null,
      renderer: null,
      raycaster: null,
      mouse: null,
      starSystem: null,
      head: null,
      socials: null,

      headStars: [],
      socialStars: [],

      width: 0,
      height: 0,
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
      this.camera.position.z = 300

      this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.width, this.height)
      this.renderer.setClearColor(0x0E2255)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = PCFSoftShadowMap

      this.raycaster = new Raycaster()
      this.mouse = new Vector2()

      const container = this.$el.querySelector('.app-menu-modal')
      container.appendChild(this.renderer.domElement)

      window.addEventListener('resize', this.onResize)
    },
    draw() {
      this.scene.add(new AmbientLight())

      this.starSystem = new Group()
      this.scene.add(this.starSystem)

      this.starSystem.add(this.createStarSystem(200, 0xFFFFFF, 0.8, 250))
      this.starSystem.add(this.createStarSystem(200, 0x4BD6C6, 1, 200))

      this.head = new Group()
      this.head.scale.set(1.2, 1.2, 1.2)
      this.scene.add(this.head)

      // draw main links
      const headLinkParams = [
        { name: 'projects', position: [-70, 70] },
        { name: 'articles', position: [70, 70] },
        { name: 'music', position: [70, 0] },
        { name: 'art', position: [40, -70] },
        { name: 'experiments', position: [-70, -70] },
        { name: 'intro', position: [10, 25] },
        { name: 'middle', position: [40, 0] }
      ]
      headLinkParams.forEach(link => {
        const star = this.drawLinkStar(link.name, link.position, 5)
        this.head.add(star)
        this.headStars.push(star)
      })

      // draw star lines between links
      const headLineParams = [
        [this.headStars[0].position, this.headStars[1].position, 16],
        [this.headStars[0].position, this.headStars[4].position, 16],
        [this.headStars[1].position, this.headStars[2].position, 8],
        [this.headStars[6].position, this.headStars[2].position, 4],
        [this.headStars[6].position, this.headStars[3].position, 8],
        [this.headStars[4].position, this.headStars[3].position, 12]
      ]
      headLineParams.forEach((param) => {
        this.head.add(this.drawStarLine(1, ...param))
        this.head.add(this.drawStarLine(0.5, ...param))
      })

      this.socials = new Group()
      this.socials.position.set(-300, -40, 0)
      this.scene.add(this.socials)

      const socialLinkParams = [
        { name: 'github', position: [0, 0] },
        { name: 'twitter', position: [20, 100] },
        { name: 'facebook', position: [40, -70] },
        { name: 'dribble', position: [-10, -120] }
      ]
      socialLinkParams.forEach(link => {
        const star = this.drawLinkStar(link.name, link.position, 4)
        this.socials.add(star)
        this.socialStars.push(star)
      })

      const socialLineParams = [
        [this.socialStars[0].position, this.socialStars[1].position, 8],
        [this.socialStars[0].position, this.socialStars[2].position, 8],
        [this.socialStars[2].position, this.socialStars[3].position, 8]
      ]
      socialLineParams.forEach((param) => {
        this.socials.add(this.drawStarLine(0.8, ...param))
        this.socials.add(this.drawStarLine(0.3, ...param))
      })
    },
    createStarSystem(density, color, size, spread) {
      const stars = new Geometry()
      const material = new PointsMaterial({ color, size })

      const randPos = () => Math.random() * spread * 2 - spread
      for (let i = 0; i < density; i++) {
        const star = new Vector3(randPos(), randPos(), randPos())
        stars.vertices.push(star)
      }

      return new Points(stars, material)
    },
    drawLinkStar(name, position, size) {
      const star = new Group()
      star.position.x = star.origX = position[0]
      star.position.y = star.origY = position[1]
      star.name = name

      if (name === 'middle') size = 0.5

      const frontGeometry = new SphereGeometry(size, 16, 16)
      const backGeometry = new SphereGeometry(size * 1.5, 16, 16)
      const frontMaterial = new MeshLambertMaterial()
      const backMaterial = new MeshLambertMaterial({
        transparent: true,
        opacity: 0.2
      })

      const backStar = new Mesh(backGeometry, backMaterial)
      star.add(backStar)
      const frontStar = new Mesh(frontGeometry, frontMaterial)
      star.add(frontStar)

      if (name !== 'intro') this.moveStar(star)

      return star
    },
    drawStarLine(size, from, to, density) {
      const line = new Group()

      const geometry = new SphereGeometry(size, 16, 16)
      const material = new MeshLambertMaterial()

      const axis = Math.abs(from.x - to.x) > Math.abs(from.y - to.y) ? 'x' : 'y'
      const mainStep = (to[axis] - from[axis]) / density
      const sideStep = axis == 'x'
      ? (to.y - from.y) / density
      : (to.x - from.x) / density

      for (let i = 1; i <= density; i++) {
        const star = new Mesh(geometry, material)

        star.position.x = star.origX = axis === 'x'
        ? from.x + mainStep * i : from.x + sideStep * i
        star.position.y = star.origY = axis === 'y'
        ? from.y + mainStep * i : from.y + sideStep * i
        line.add(star)

        this.moveStar(star)
      }

      return line
    },
    moveStar(star) {
      const randDist = (orig) => orig + Math.random() * 14 - 7
      // const randScale = Math.random() * 0.8 + 0.8
      // TweenLite.to(star.scale, Math.random() + 0.8,
      //   { x: randScale, y: randScale, z: randScale }
      // )
      TweenLite.to(star.position, Math.random() + 2,
        { x: randDist(star.origX),
          y: randDist(star.origY),
          z: 0,
          onComplete: this.moveStar,
          onCompleteParams: [star]
        }
      )
    },
    onMouseMove(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)
      const intersects = this.raycaster.intersectObjects(
        [...this.headStars, ...this.socialStars],
        true)

      if (intersects.length > 0) {
        const star = intersects[0].object
        TweenLite.to(star.scale, 0.8, { x: 1.8, y: 1.8, z: 1.8 })
        TweenLite.to(star.scale, 0.8, { x: 1, y: 1, z: 1, delay: 0.8 })

        if (this.activeLink !== star.parent.name) this.activeLink = star.parent.name
      }
    },
    changePage() {
      this.raycaster.setFromCamera(this.mouse, this.camera)
      const intersects = this.raycaster.intersectObjects(
        [...this.headStars, ...this.socialStars],
        true)

      if (intersects.length > 0) {
        const type = intersects[0].object.parent.name
        this.$router.push(`/${type}`)
        this.open = false
      }
    },
    animate() {
      requestAnimationFrame(this.animate)

      if (this.open) {
        this.starSystem.children[0].rotation.y += 0.0005
        this.starSystem.children[1].rotation.y -= 0.0005

        this.renderer.render(this.scene, this.camera)
      }
    },
    setSize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    onResize() {
      this.setSize()
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.width, this.height)
    },

  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
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
.app-menu-btn {
  display: block;
  position: absolute;
  top: 3rem;
  left: 5rem;
  width: 5rem;
  height: 5rem;
  background-color: transparentize($color-white, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: transform ease-out 0.1s, background 0.2s;
  &:hover {
    background-color: transparentize($color-white, 0.9);
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
    box-shadow: 0 0 0 2px transparentize($color-white, 0.9);
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
  color: $color-white;
}
.app-menu-link {
  display: block;
  position: absolute;
  top: 10rem;
  right: 12rem;
  font-size: 2rem;
  font-weight: 600;
  color: $color-white;
}
@keyframes sonar {
  0% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.5;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1),
                0 0 10px 10px #12233f,
                0 0 0 10px rgba(255, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1),
                0 0 10px 10px #12233f,
                0 0 0 10px rgba(255, 255, 255, 0.3);
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
