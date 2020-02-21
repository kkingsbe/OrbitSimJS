class Simulation {
  constructor(bodies) {
    this.bodies = bodies
    this.t = 0
    this.G = 6.6742e-11
  }

  step(dT) {
    for(let body of this.bodies) {
      let f = this.calculateExternalForces(body)
      body.vx += (f.x / body.mass) * dT
      body.vy += (f.y / body.mass) * dT
      body.vz += (f.z / body.mass) * dT

      body.x += body.vx * dT
      body.y += body.vy * dT
      body.z += body.vz * dT

      let state = {
        x: body.x,
        y: body.y,
        z: body.z,
        vx: body.vx,
        vy: body.vy,
        vz: body.vz,
        ax: (f.x / body.mass),
        ay: (f.y / body.mass),
        az: (f.z / body.mass)
      }
      body.stateOverTime.push(state)
      this.t += dT
    }
  }

  calculateExternalForces(body) {
    let fx = 0, fy = 0, fz = 0

    for(let tBody of this.bodies) {
      if(tBody != body) {
        let Fg = this.G * ((tBody.mass * body.mass) / Math.pow(body.distanceTo(tBody), 2))
        let Fgx = ((this.G * tBody.mass * body.mass) / Math.pow(body.distanceTo(tBody), 3)) * (tBody.x - body.x)
        let Fgy = ((this.G * tBody.mass * body.mass) / Math.pow(body.distanceTo(tBody), 3)) * (tBody.y - body.y)
        let Fgz = ((this.G * tBody.mass * body.mass) / Math.pow(body.distanceTo(tBody), 3)) * (tBody.z - body.z)

        if(Math.abs(body.distanceTo(tBody)) <= body.radius || Math.abs(body.distanceTo(tBody)) <= tBody.radius) {
          Fg = 0
          Fgx = 0
          Fgy = 0
          Fgz = 0
          body.vx = 0
          body.vy = 0
          body.vz = 0
          body.ax = 0
          body.ay = 0
          body.az = 0
          tBody.vx = 0
          tBody.vy = 0
          tBody.vz = 0
          tBody.ax = 0
          tBody.ay = 0
          tBody.az = 0
        }

        fx += Fgx
        fy += Fgy
        fz += Fgz
      }
    }

    let force = new Vector3D(fx, fy, fz)
    return force
  }
}

class Vector3D {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}

class Body {
  constructor(name, mass, radius, x, y, z, vx, vy, vz) {
    this.name = name
    this.mass = mass
    this.radius = radius
    this.x = x
    this.y = y
    this.z = z
    this.vx = vx
    this.vy = vy
    this.vz = vz
    this.stateOverTime = []
  }

  distanceTo(body) {
    let dist = Math.sqrt(Math.pow((this.x - body.x), 2) + Math.pow((this.y - body.y), 2) + Math.pow((this.z - body.z), 2))
    return dist
  }
}