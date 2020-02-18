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
massSlider.oninput = function(event) {
  let body = getSelectedBody()
  body.mass = event.target.value
  massval = event.target.value
  alert(body.mass)
}
radiusSlider.oninput = function(event) {
  let body = getSelectedBody()
  body.radius = event.target.value
  radiusval = event.target.value
}
xSlider.oninput = function(event) {
  let body = getSelectedBody()
  body.x = event.target.value
  xval = event.target.value
}
ySlider.oninput = function(event) {
  let body = getSelectedBody()
  body.y = event.target.value
  yval = event.target.value
}
zSlider.oninput = function(event) {
  let body = getSelectedBody()
  body.z = event.target.value
  zval = event.target.value
}
xvSlider.oninput = function(event) {
  let body = getSelectedBody()
  body.vx = event.target.value
  xvelocityval = event.target.value
}
yvSlider.oninput = function(event) {
  let body = getSelectedBody()
  body.vy = event.target.value
  yvelocityval = event.target.value
}
zvSlider.oninput = function(event) {
  let body = getSelectedBody()
  body.vz = event.target.value
  zvelocityval = event.target.value
}

for(let body of bodies) {
  let option = document.createElement("option")
  option.innerHTML = body.name
  bodiesSelect.appendChild(option)
}

function updateBodyModification() {
  let body = getSelectedBody()
  massSlider.value = body.mass
  massval.innerHTML = `Mass (kg): ${body.mass.toFixed(3)}`
  radiusSlider.value = body.radius
  radiusval.innerHTML = `Radius (m): ${body.radius.toFixed(3)}`
  xSlider.value = body.x
  xval.innerHTML = `X (m): ${body.x.toFixed(3)}`
  ySlider.value = body.y
  yval.innerHTML = `Y (m): ${body.y.toFixed(3)}`
  zSlider.value = body.z
  zval.innerHTML = `Z (m): ${body.z.toFixed(3)}`
  xvSlider.value = body.vx
  xvelocityval.innerHTML = `X Velocity (m/s): ${body.vx.toFixed(3)}`
  yvSlider.value = body.vy
  yvelocityval.innerHTML = `Y Velocity (m/s): ${body.vy.toFixed(3)}`
  zvSlider.value = body.vz
  zvelocityval.innerHTML = `Z Velocity (m/s): ${body.vz.toFixed(3)}`
}
