## Smoke scene

This simple scene shows how to handle a particle system to create smoke. There are two modules being used 

- `SmokeSource` defines a place from where smoke puffs spawn and an interval. To instance smoke puffs, it either uses idle entities from an object pool or creates new ones if they don't exist yet. 
- `Smoke` updates the position of the existing smoke puffs so that they rise and slowly move in a direction set by their `SmokeVelocity` component. When a smoke puff is too far from the source, it's removed from the scene.

![](screenshot/screenshot.png)

[Explore the scene](https://smoke-iqntujtjgb.now.sh): this link takes you to a copy of the scene deployed to a remote server where you can interact with it just as if you were running `dcl start` locally.

**Install the CLI**

Download and install the Decentraland CLI by running the following command

```bash
npm i -g decentraland
```

For a more details, follow the steps in the [Installation guide](https://docs.decentraland.org/documentation/installation-guide/).


**Previewing the scene**

Once you've installed the CLI, download this example and navigate to its directory from your terminal or command prompt.

_from the scene directory:_

```
$:  dcl start
```

Any dependencies are installed and then the CLI will open the scene in a new browser tab automatically.

**Usage**

Note how smoke starts rising from the fireplace. Puffs of smoke have random sizes and move in random directions, but they gradually grow and straighten upwards as time goes by.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.