
// Custom component for smoke puffs
@Component('smokevelocity')
export class SmokeVelocity extends Vector3 {
  constructor(x: number, y: number, z: number) {
    super(x, y, z)
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

// Component group listing all smoke puffs
export const smokePuffs = engine.getComponentGroup(SmokeVelocity)

// System to update the position of all smoke puffs based on their velocity
export class SmokeSystem implements ISystem {
  update(dt: number) {

    for (let entity of smokePuffs.entities) {
      const transform = entity.get(Transform)
      const velocity = entity.get(SmokeVelocity)

      transform.position.x += velocity.x * dt
      transform.position.y += velocity.y * dt
      transform.position.z += velocity.z * dt

      let newScale = transform.scale.x * 1.0025

      transform.scale.setAll(newScale)

      velocity.x *= 0.995
      velocity.z *= 0.995

      if (isOutOfBounds(transform)) {
        engine.removeEntity(entity)
      }
    }
  }
}

// Function to check if smoke is too far from source
function isOutOfBounds(transform: Transform) {
  if (
    transform.position.y > 4 ||
    transform.position.x > 1.5 ||
    transform.position.z > 1.5 ||
    transform.position.x < -1.5 ||
    transform.position.z < -1.5
  ) {
    return true
  }
  return false
}
