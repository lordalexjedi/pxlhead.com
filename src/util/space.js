import {
  Group,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  AdditiveBlending,
  TextureLoader,
  TetrahedronGeometry,
  MeshStandardMaterial,
  Mesh,
  CircleBufferGeometry,
  LineBasicMaterial,
  EdgesGeometry,
  LineSegments
} from 'three'

function drawStars({ size, texture }) {
  const stars = new BufferGeometry()
  const starPositions = new Float32Array(200 * 3)

  for (let i = 0; i < 200; i++) {
    const randPos = () => Math.random() * 400 - 200
    starPositions[i * 3] = randPos() * 1.5
    starPositions[i * 3 + 1] = randPos()
    starPositions[i * 3 + 2] = randPos()

    stars.setDrawRange(0, 200)
    stars.addAttribute('position', new BufferAttribute(starPositions, 3).setDynamic(true))
  }

  const sMaterial = new PointsMaterial( {
    color: 0xD3CCFF,
    size: size,
    map: texture,
    blending: AdditiveBlending,
    transparent: true,
    sizeAttenuation: false
  })

  return new Points(stars, sMaterial)
}

export function drawSpace() {
  const group = new Group()

  const textureLoader = new TextureLoader()
  textureLoader.load('/public/assets/dot.png', texture => {
    const space1 = drawStars({ size: 2, texture })
    const space2 = drawStars({ size: 1, texture })
    group.add(space1)
    group.add(space2)
  })

  return group
}

export function drawPlanet({ color, size }) {
  const geometry = new TetrahedronGeometry(size, 2)
  const material = new MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: 0.8
  })

  const noise = 3
  geometry.vertices.forEach(v => {
    v.x += -noise / 2 + Math.random() * noise
    v.y += -noise / 2 + Math.random() * noise
    v.z += -noise / 2 + Math.random() * noise
  })
  return new Mesh(geometry, material)
}

export function drawOrbit(size) {
  const geometry = new CircleBufferGeometry(size, 64)
  const material = new LineBasicMaterial({
    color: 0xD3CCFF,
    transparent: true,
    opacity: 0.2
  })
  const edges = new EdgesGeometry(geometry)
  return new LineSegments(edges, material)
}
