# Game Asset Forge

Experimental web playground for previewing modular 2D character rigs and animation timelines.

## Demo

The current prototype demonstrates a chibi character assembled from a **real raster PNG atlas**. A single shared 8-key walk timeline drives all limbs, so the character stays visually consistent while the transforms change.

Features:

- PNG atlas under `public/assets/rig-parts-atlas.png`
- modular head / torso / arms / legs / boots / shield / scarf
- shared walk-cycle animation clock
- play / pause and 0.5x / 1x / 2x speed
- bone overlay
- pivot overlay
- frame scrubber
- atlas preview panel
- responsive desktop/mobile layout

## Run

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Why this prototype

Instead of asking an image model to redraw a full character for every animation frame, this approach keeps raster artwork fixed and stores animation as deterministic transforms. Each body part is cropped from one PNG atlas and attached to a shared skeleton timeline.

This is intentionally close to a production asset workflow: later the generated demo atlas can be replaced by AI-generated transparent PNG parts without changing the animation system.

## Next experiments

- import user/AI-generated PNG body parts
- drag/edit pivots in the browser
- save/load rig JSON
- inverse kinematics for feet/hands
- secondary sprite animation for hair/cape synced to the same clock
- bake the rig into a PNG spritesheet/GIF
- export Godot `Skeleton2D` / `AnimationPlayer` data
