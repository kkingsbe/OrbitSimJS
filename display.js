var scene, camera, renderer, controls
const width = window.innerWidth
const height = window.innerHeight
const ratio = width / height
const trailLen = 1000 //How long the trail is
const trailDensity = 5 //How often new segments are added to the trail
var trails = true

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

let bodies = []
let sim

function switchScenario(name) {
  deleteOldBodies()
  
  bodies = []
  switch(name) {
    case "empty":
      break;
    case "EarthAndMoon":
      break;
    case "Oscillation":
      //Cool oscillation \/
      let body1 = new Body("Body 1", 1e13, 1, 0, 0, 0, 0, 0, 0)
      let body1Sprite = body1.newSprite()

      let body2 = new Body("Body 2", 1e13, 1, 30, 0, 0, 0, 0, 5)
      let body2Sprite = body2.newSprite()
      bodies.push(body1)
      bodies.push(body2)
      break;
    case "StarSystem":
      let star = new Body("Star", 1e14, 10, 0, 0, 0, 0, 0, 0)
      let starSprite = star.newSprite()

      let planet1 = new Body("Planet1", 1e12, 5, 60, 0, 0, 0, 0, 10)
      let planet1Sprite = planet1.newSprite()

      let planet2 = new Body("Planet2", 1e13, 5, 120, 0, 0, 1, 1, 8)
      let planet2Sprite = planet2.newSprite()

      let planet2Moon = new Body("moon", 1e5, 1, 130, 0, 0, 1, 3, 17)
      planet2Moon.newSprite()

      let planet2Moon2 = new Body("moon 2", 1e5, 1, 140, 0, 0, 1, 3, 13)
      planet2Moon2.newSprite()

      bodies.push(star)
      bodies.push(planet1)
      bodies.push(planet2)
      bodies.push(planet2Moon)
      bodies.push(planet2Moon2)
      break;
    case "chaos":
      for(let i = 0; i < 500; i++) {
        let body = new Body(i, 1 * Math.pow(10, (Math.random() * 1) + 10), 1, (Math.random() * 200) - 100, (Math.random() * 200) - 100, (Math.random() * 200) - 100, 0, 0, 0)
        let sprite = body.newSprite()
        bodies.push(body)
      }
      break;
  }
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
  populateBodiesSelect()
  sim = new Simulation(bodies, true)
}

function deleteOldBodies() {
  bodies.forEach(body => {
    scene.remove(body.sprite)
    scene.remove(body.trail)
  })
}

setInterval(function() {
  if(document.getElementById("pausebtn").innerHTML == "Pause") {
    for(let body of bodies) {
      body.sprite.position.set(body.x, body.y, body.z)
      if(trails) drawTrail(body)
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
  if(bodiesSelect.options.length == 0) return
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