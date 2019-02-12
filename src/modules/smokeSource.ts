import { SmokeVelocity } from "./smoke";

@Component('smokeSource')
export class SmokeSource {
  smokeInterval: number = 3
  nextSmoke: number = this.smokeInterval
  constructor(interval: number = 3) {
    this.smokeInterval = interval
  }
}

// component group grid positions
const smokeHoles = engine.getComponentGroup(SmokeSource)

export class ThrowSmoke implements ISystem {
  update(dt: number) { 
    for (let hole of smokeHoles.entities) {
      let data = hole.get(SmokeSource)
      data.nextSmoke -= dt
      if (data.nextSmoke < 0) {
        data.nextSmoke = data.smokeInterval
        smokeSpawner.SpawnSmokePuff(hole)
      }
    }
  }
}



// Reusable material for smoke puffs
const smokeMaterial = new Material()
smokeMaterial.albedoTexture = 'textures/smoke-puff3.png'
smokeMaterial.hasAlpha = true
smokeMaterial.alpha = 1

// Reusable shape component for smoke puffs
const smokeShape = new PlaneShape()
smokeShape.billboard = BillboardMode.BILLBOARDMODE_ALL

// Spawner object to generate smoke puffs
export const smokeSpawner = {
  MAX_POOL_SIZE: 50,
  pool: [] as Entity[],

  getEntityFromPool(): Entity | null {
    for (let i = 0; i < smokeSpawner.pool.length; i++) {
      if (!smokeSpawner.pool[i].alive) {
        return smokeSpawner.pool[i]
      }
    }

    if (smokeSpawner.pool.length < smokeSpawner.MAX_POOL_SIZE) {
      const instance = new Entity()
      smokeSpawner.pool.push(instance)
      return instance
    }

    return null
  },

  SpawnSmokePuff(parent: Entity) {
    const ent = smokeSpawner.getEntityFromPool()

    if (!ent) return

    const newVel = {
      x: (Math.random() - Math.random()) / 6,
      y: Math.random() / 2 + 0.1,
      z: (Math.random() - Math.random()) / 6
    }

    const size = Math.random() / 2 + 0.2

    ent.set(smokeShape)
    ent.set(smokeMaterial)

    ent.setParent(parent)

    if (!ent.getOrNull(Transform)) {
      const t = new Transform()
      ent.set(t)
      t.scale.set(size, size, size)
      t.position.set(0, 0, 0)
    } else {
      const t = ent.get(Transform)
      t.scale.set(size, size, size)
      t.position.set(0, 0, 0)
    }

    if (!ent.getOrNull(SmokeVelocity)) {
      ent.set(new SmokeVelocity(newVel.x, newVel.y, newVel.z))
    } else {
      const vel = ent.get(SmokeVelocity)
      vel.set(newVel.x, newVel.y, newVel.z)
    }

    engine.addEntity(ent)
  }
}
