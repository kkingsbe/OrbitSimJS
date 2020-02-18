let timeslider = document.getElementById("time-slider")
let pausebtn = document.getElementById("pausebtn")

let bodiesSelect = document.getElementById("bodies-select")
let massSlider = document.getElementById("mass-slider")
let radiusSlider = document.getElementById("radius-slider")
let xSlider = document.getElementById("x-slider")
let ySlider = document.getElementById("y-slider")
let zSlider = document.getElementById("z-slider")
let xvSlider = document.getElementById("xv-slider")
let yvSlider = document.getElementById("yv-slider")
let zvSlider = document.getElementById("zv-slider")

let massval = document.getElementById("massval")
let radiusval = document.getElementById("radiusval")
let xval = document.getElementById("xval")
let yval = document.getElementById("yval")
let zval = document.getElementById("zval")
let xvelocityval = document.getElementById("xvelocityval")
let yvelocityval = document.getElementById("yvelocityval")
let zvelocityval = document.getElementById("zvelocityval")

timeslider.oninput = function(event) {
  let warpval = Math.pow(2, event.target.value)
  sim.warp = warpval
  document.getElementById("timesliderval").innerHTML = `Time Warp: ${warpval}x`
}
pausebtn.onclick = function() {
  if(pausebtn.innerHTML == "Pause") {
    pausebtn.innerHTML = "Play"
  }
  else {
    pausebtn.innerHTML = "Pause"
  }
}

for(let body of bodies) {
  let option = document.createElement("option")
  option.innerHTML = body.name
  bodiesSelect.appendChild(option)
}

function updateBodyModification() {
  let bodyName = bodiesSelect.options[bodiesSelect.selectedIndex].text
  let body
  for(let i of bodies) {
    if(i.name == bodyName) {
      body = i
      break
    }
  }
  massSlider.value = body.mass
  massval.innerHTML = `Mass (kg): ${body.mass}`
  radiusSlider.value = body.radius
  radiusval.innerHTML = `Radius (m): ${body.radius}`
  xSlider.value = body.x
  xval.innerHTML = `X (m): ${body.x}`
  ySlider.value = body.y
  yval.innerHTML = `Y (m): ${body.y}`
  zSlider.value = body.z
  zval.innerHTML = `Z (m): ${body.z}`
  xvSlider.value = body.vx
  xvelocityval.innerHTML = `X Velocity (m/s): ${body.vx}`
  yvSlider.value = body.vy
  yvelocityval.innerHTML = `Y Velocity (m/s): ${body.vy}`
  zvSlider.value = body.vz
  zvelocityval.innerHTML = `Z Velocity (m/s): ${body.vz}`
}
