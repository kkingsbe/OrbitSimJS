class Simulation {
  constructor(bodies, elasticCollisions) {
    this.bodies = bodies
    this.t = 0
    this.G = 6.6742e-11
    this.warp = 1
    this.elasticCollisions = elasticCollisions
  }

  step() {
    let dT = this.warp * (simSubStep / 0.01667)
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

        if(body.colliding()) {
          if(this.elasticCollisions) {
            let vx = (body.vx * (body.mass - tBody.mass) + 2 * tBody.mass * tBody.vx) / (body.mass + tBody.mass);
            let vy = (body.vy * (body.mass - tBody.mass) + 2 * tBody.mass * tBody.vy) / (body.mass + tBody.mass);
            let vz = (body.vz * (body.mass - tBody.mass) + 2 * tBody.mass * tBody.vz) / (body.mass + tBody.mass);

            let vx2 = (tBody.vx * (tBody.mass - body.mass) + 2 * body.mass * body.vx) / (tBody.mass + body.mass);
            let vy2 = (tBody.vy * (tBody.mass - body.mass) + 2 * body.mass * body.vy) / (tBody.mass + body.mass);
            let vz2 = (tBody.vz * (tBody.mass - body.mass) + 2 * body.mass * body.vz) / (tBody.mass + body.mass);

            body.vx = vx
            body.vy = vy
            body.vz = vz
            tBody.vx = vx2
            tBody.vy = vy2
            tBody.vz = vz2

            //this.warp = 0.05
          }
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

  newSprite() {
    let geometry = new THREE.SphereGeometry(this.radius, 32, 32)
    let material = new THREE.MeshPhongMaterial({color: parseInt(randomColor().replace("#", "0x"), 16)})
    console.log(material.color)
    this.sprite = new THREE.Mesh(geometry, material)
    return this.sprite
  }

  colliding() {
    for(let tBody of sim.bodies) {
      if(tBody != this) {
        return Math.abs(this.distanceTo(tBody)) <= this.radius + tBody.radius
      }
    }
  }
}
