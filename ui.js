let timeslider = document.getElementById("time-slider")
let pausebtn = document.getElementById("pausebtn")
let bodiesSelect = document.getElementById("bodies-select")

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
  alert(body.name)
  option.innerHTML = body.name
  bodiesSelect.appendChild(option)
}
