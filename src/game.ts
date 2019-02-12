import { SmokeSource, ThrowSmoke } from "./smokeSource";
import { SmokeSystem } from "./smoke";

// add fireplace
let fire = new Entity()
fire.add(new GLTFShape("models/Fireplace.glb"))
fire.add(new Transform({
  position: new Vector3(5, 0, 5)
}))

// Add a smoke source that creates a smoke puff every 0.2 seconds
fire.add(new SmokeSource(0.2))
engine.addEntity(fire)


// ground
let floor = new Entity()
floor.add(new GLTFShape("models/FloorBaseGrass.glb"))
floor.add(new Transform({
  position: new Vector3(5, 0, 5)
}))
engine.addEntity(floor)

// Initiate systems
engine.addSystem(new ThrowSmoke())
engine.addSystem(new SmokeSystem())

