var scene, camera, renderer, controls
const width = window.innerWidth
const height = window.innerHeight
const ratio = width / height
const trailLen = 1000 //How long the trail is
const trailDensity = 5 //How often new segments are added to the trail

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, ratio, 1, 1000)
  camera.position.z = 30

  controls = new THREE.OrbitControls(camera, document.getElementById("viewport"))
  axis = new THREE.AxisHelper(300)
  scene.add(axis)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor("#000000")
  renderer.setSize(width, height)

  document.getElementById("viewport").append(renderer.domElement)

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  const animate = () => {
    //sphere.position.y += 0.1
  }

  const render = () => {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
    controls.update()
    animate()
    //WebGLUniformLocation.open()
  }
  render()
}

const getPointLight = (color, intensity, distance) => {
  let light = new THREE.PointLight(color, intensity, distance)
  return light
}

init()

let light = new THREE.AmbientLight(0xffffff)
scene.add(light)

let ball1 = new Body("Ball1", 1, 1, 0, 0, 0, 15, 0, 0)
let ball1Sprite = ball1.newSprite()

let ball2 = new Body("Ball2", 1, 1, 30, 0, 0, 0, 0, 0)
let ball2Sprite = ball2.newSprite()

let bodies = [ball1, ball2]

for(let body of bodies) {
  let geometry = new THREE.Geometry()
  geometry.vertices.push(new THREE.Vector3(body.x, body.y, body.z))
  let line = new MeshLine()
  line.setGeometry(geometry)
  let material = new MeshLineMaterial()
  let trailMesh = new THREE.Mesh(line.geometry, material)
  body.trail = trailMesh
  scene.add(body.sprite)
  scene.add(trailMesh)
}

let sim = new Simulation(bodies, true)

setInterval(function() {
  if(document.getElementById("pausebtn").innerHTML == "Pause") {
    for(let body of bodies) {
      body.sprite.position.set(body.x, body.y, body.z)
      drawTrail(body)
    }
    updateBodyModification()
    sim.step()
  }
}, 16.67)

function drawTrail(body) {
  let geometry = new THREE.Geometry()
  let i = (body.stateOverTime.length - trailLen > 0) ? body.stateOverTime.length - trailLen : 0
  while(i < body.stateOverTime.length) {
    let point = body.stateOverTime[i]
    let v = new THREE.Vector3(point.x, point.y, point.z)
    geometry.vertices.push(v)
    i += trailDensity
  }
  let line = new MeshLine()
  line.setGeometry(geometry)
  let material = new MeshLineMaterial()
  let trailMesh = new THREE.Mesh(line.geometry, material)

  body.trail.geometry.dispose()
  body.trail.material.dispose()
  scene.remove(body.trail)

  body.trail = trailMesh
  scene.add(trailMesh) 
}

function getSelectedBody() {
  let bodyName = bodiesSelect.options[bodiesSelect.selectedIndex].text
  let body
  for(let i of bodies) {
    if(i.name == bodyName) {
      body = i
      break
    }
  }
  return body
}
