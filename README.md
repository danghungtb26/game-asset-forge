# Game Asset Forge

Experimental web playground for previewing modular 2D character rigs and animation timelines.

## Demo

The current prototype demonstrates a chibi character built from modular body parts. A single shared 8-key walk timeline drives all limbs, so the character stays visually consistent while the transforms change.

Features:

- modular head / torso / arms / legs / shield / scarf
- shared walk-cycle animation clock
- play / pause and 0.5x / 1x / 2x speed
- bone overlay
- pivot overlay
- frame scrubber
- responsive desktop/mobile layout
- demo modular-parts SVG under `public/assets/rig-parts-demo.svg`

## Run

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Why this prototype

Instead of asking an image model to redraw a full character for every animation frame, this approach keeps artwork fixed and stores animation as deterministic transforms. Animated sub-parts can later be synchronized to the same timeline, while special VFX remain separate assets.

## Next experiments

- import real PNG body parts
- drag/edit pivots in the browser
- save/load rig JSON
- inverse kinematics for feet/hands
- bake the rig into a PNG spritesheet/GIF
- export Godot `Skeleton2D` / `AnimationPlayer` data
