let timeslider = document.getElementById("time-slider")
timeslider.oninput = function(event) {
  let warpval = Math.pow(2, event.target.value)
  sim.warp = warpval
  document.getElementById("timesliderval").innerHTML = `Time Warp: ${warpval}x`
}