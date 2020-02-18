let timeslider = document.getElementById("time-slider")
let pausebtn = document.getElementById("pausebtn")

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
