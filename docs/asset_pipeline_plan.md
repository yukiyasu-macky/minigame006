# Asset Pipeline Plan

This document defines production asset rules for あわねこ湯屋.

This is pre-implementation planning only. Do not implement React/Vite, runtime systems, rendering, asset loaders, HomeScreen, Puzzle runtime, save systems, or placeholder production assets from this document yet.

## 1. Purpose

The asset pipeline must keep the game visually consistent, mobile-safe, and compatible with future Game Studio-style runtime separation.

The production direction is:

```text
lightweight layered sprites
+
small frame animations
+
stable manifest ids
+
disposable runtime cache
```

The pipeline must support:

- stable asset ids in `assets/asset_manifest.json`
- `spriteLayerIds` and `animationSetIds` from `docs/cat_generator.md`
- layered cat rendering from `docs/sprite_spec.md`
- future React/Vite compatibility
- future Phaser scene + DOM UI separation
- mobile LIFF/webview safety
- save data that stores stable ids only

## 2. Source Documents

This plan must stay aligned with:

- `docs/design_sheet.md`
- `assets/reference/awaneko_design_sheet.png`
- `assets/asset_manifest.json`
- `docs/sprite_spec.md`
- `docs/cat_generator.md`
- `docs/home_growth.md`
- `docs/home_layout.md`
- `docs/puzzle_design.md`
- `docs/image_prompts.md`

Visual style remains:

- warm watercolor storybook
- Japanese soft onsen atmosphere
- cocoa-brown pencil-like outlines
- soft cream/pastel palette
- rounded cute cat silhouettes
- gentle steam/fog effects
- cozy rescue fantasy

## 3. Game Studio Findings

The connected Game Studio plugin favors:

- Phaser for 2D browser-game runtime when implementation begins
- TypeScript + Vite for future runtime setup
- DOM overlays for text-heavy HUD, menus, settings, and panels
- canvas/Phaser scenes for world rendering, motion, sprites, and effects
- stable manifest keys instead of direct file-path references
- simulation/save state outside renderer objects
- disposable sprite, tween, texture, and audio runtime objects

The sprite pipeline guidance favors:

- one approved in-game seed frame
- full animation strip generation instead of isolated frame generation
- fixed frame normalization
- shared scale across a strip
- shared anchor, usually bottom-center
- preview sheets before approval

For あわねこ湯屋, this confirms the current direction:

```text
layered 2D sprites
+
small frame strips
+
domain-separated atlases
+
manifest-driven runtime lookup
```

## 4. Production Master Resolution

Production masters are the source-quality files used for review, future derivatives, and re-export.

Cat primary layer masters:

- `768x768`
- transparent PNG
- sRGB
- no background
- full canvas preserved
- 64px transparent margin where possible
- bottom-center anchor compatible with `docs/sprite_spec.md`

Cat accessory masters:

- `512x512` allowed for source production
- must define attachment intent
- must be placeable inside the `768x768` cat composition space
- may be normalized to `768x768` later if runtime testing needs simpler alignment

Background masters:

- `1080x1920` for mobile portrait planning
- no UI text baked into backgrounds
- steam/fog may be painted softly, but large animated steam should remain separate

UI and effect masters:

- source resolution should be large enough to preserve watercolor texture
- UI panels and icons should avoid over-sharp vector-like edges
- effects should be produced with transparent backgrounds unless they are full-scene backgrounds

Do not crop cat layer masters to visible bounds. Cropping breaks future layer alignment.

## 5. Runtime Target Resolution

Runtime target resolution may be smaller than production master resolution.

Planning targets:

| Asset type | Production master | Runtime target |
| --- | --- | --- |
| primary cat layer | `768x768` | `384x384` or `512x512` after testing |
| cat accessory | `512x512` or normalized `768x768` | `256x256`, `384x384`, or composed target size |
| cat effect overlay | `768x768` | `384x384` or `512x512` |
| mobile background | `1080x1920` | viewport-sized compressed derivative |
| UI icon | source as needed | `64x64`, `96x96`, or atlas packed |
| UI panel | source as needed | 9-slice or compressed image derivative |

Rules:

- Runtime derivatives must preserve aspect ratio.
- Runtime derivatives must not shift anchors.
- Runtime scaling mismatch must be avoided.
- Use one canonical runtime display scale per cat body type whenever possible.
- Do not mix 384px and 512px derivatives for the same cat layer set in one composition.

The first sprite batch should test `384x384` and `512x512` runtime targets before the team commits to a large asset set.

## 6. Anchor And Pivot Rules

Cat composition must follow `docs/sprite_spec.md`.

Primary production anchor:

```text
body_anchor: x=384, y=640 on 768x768 master
```

Runtime normalized anchor:

```text
bottom-center
```

Rules:

- Keep the same canvas size for synchronized cat layers.
- Keep the same pivot for all synchronized layers.
- Body, pattern, tail, and eyes must share the same composition space.
- Mouth should follow the same composition space even when animated lightly.
- Dirt and reveal overlays must align full-canvas unless explicitly documented.
- Accessory and towel assets must define attachment point and offset.
- Steam overlay should align to full-canvas or to a documented effect anchor.

Do not let runtime trim transparent pixels unless the trim metadata preserves original source size, pivot, and offsets.

## 7. Sprite Naming Rules

Use lowercase snake_case.

Static cat layer pattern:

```text
assets/images/cat/{category}/cat_{category}_{descriptor}_{variant}.png
```

Examples:

- `assets/images/cat/body/cat_body_round_cream.png`
- `assets/images/cat/pattern/cat_pattern_calico_soft.png`
- `assets/images/cat/eyes/cat_eyes_gentle_green.png`
- `assets/images/cat/tail/cat_tail_curve_cream.png`
- `assets/images/cat/accessory/cat_accessory_head_towel.png`
- `assets/images/cat/effect/cat_effect_steam_overlay_soft.png`

Animation source strip pattern:

```text
assets/images/cat/animation/{animation_id}/cat_anim_{animation_id}_{descriptor}_strip.png
```

Normalized frame pattern:

```text
assets/images/cat/animation/{animation_id}/cat_anim_{animation_id}_{descriptor}_{frame_index}.png
```

Frame index format:

```text
01, 02, 03, ...
```

Manifest ids must be stable and should not expose temporary production filenames.

## 8. Animation Naming Rules

Animation ids should match `animationSetIds` slots.

Required planning slots:

- `idle`
- `walk`
- `sit`
- `sleep`
- `bathe`
- `look`

Animation id pattern:

```text
cat_anim_{body_type}_{animation_name}_{variant}
```

Examples:

- `cat_anim_round_idle_soft`
- `cat_anim_round_walk_slow`
- `cat_anim_round_sit_settle`
- `cat_anim_round_sleep_breathe`
- `cat_anim_round_bathe_relax`
- `cat_anim_round_look_gentle`

Clip names should stay calm and descriptive. Avoid arcade words such as `attack`, `hit`, `burst`, `combo`, or `critical`.

## 9. Atlas Naming And Domain Rules

Use domain-separated atlases.

Recommended atlas domains:

- `atlas_cat_common`
- `atlas_cat_animation_round`
- `atlas_cat_fx`
- `atlas_home_environment`
- `atlas_puzzle_cleaning`
- `atlas_result_reveal`
- `atlas_ui_common`

Rules:

- Do not create one mega-atlas for the whole game.
- Keep cat layers separate from puzzle dirt and UI where practical.
- Keep frequently loaded Home assets separate from less common Result/Reveal assets.
- Keep seasonal/event assets in future event-specific atlases.
- Atlas names should be stable and lowercase snake_case.
- Atlas packing should preserve source-size and pivot metadata if transparent trimming is used.

Planning texture size:

- prefer `2048x2048` as the initial atlas ceiling
- avoid `4096x4096` for MVP until mobile testing proves safe
- avoid loading every atlas at TitleScene

## 10. Cat Layer Animation Policy

Cats use:

```text
layered sprite
+
small frame animation
```

Do not high-frame animate every layer.

Synchronized layers:

- body
- pattern
- tail
- eyes

These layers should move together when a frame animation is used. They must share:

- frame count
- frame size
- frame timing
- anchor
- pivot
- runtime scale

Lightweight overlay layers:

- accessory
- towel
- steamOverlay

These should usually be static or low-frequency overlays. They should not require a full frame strip unless the visual benefit is clear.

Steam rules:

- steam is low-frequency animation
- use low opacity
- use few frames or procedural alpha/position drift
- never obscure the cat face for normal Home behavior
- stronger steam is allowed only for Reveal or Result moments

Do not animate all seven `spriteLayerIds` at high frame count. That would increase memory, atlas size, draw calls, QA burden, and visual drift.

## 11. Animation Timing Philosophy

Animation must feel like:

```text
quiet breathing, warm water, soft observation
```

Not:

```text
arcade action, combat feedback, reward explosion
```

Initial timing guidance:

| Animation | Frames | Loop | Timing |
| --- | --- | --- | --- |
| `idle` | 2-4 | loop | slow breathing, 900-1600ms per loop |
| `walk` | 4-6 | loop while moving | slow steps, 900-1400ms per loop |
| `sit` | 3-5 | one-shot into idle/sit | gentle settle |
| `sleep` | 2-4 | loop | very slow breathing |
| `bathe` | 2-4 | loop | subtle bob/steam |
| `look` | 2-4 | short loop or one-shot | small head/eye attention |

Transition rules:

- avoid sudden scale changes
- avoid hard snapping between poses
- first frame may match idle/base pose when possible
- use short crossfade or hold frames later if runtime supports it
- keep reduced-motion compatibility in mind

## 12. Frame Count Limits

MVP frame count limits:

- normal Home cat animations: max 6 frames per clip
- idle/sleep/bathe: prefer 2-4 frames
- walk: max 6 frames
- Result/Reveal cat motion: max 6 frames unless approved
- steam/fog loops: max 4-6 frames or lightweight procedural drift
- UI button animation: prefer CSS/tween, not frame strips

Any animation above 6 frames needs explicit review because it increases:

- generation drift
- atlas size
- memory use
- QA time
- mobile webview risk

## 13. Active Home Cat Limits

MVP Home should stay visually alive but mobile-safe.

Planning limits:

- visible active cats: 3 max for MVP
- animated cats at the same time: 2 max for MVP
- cats with full frame animation at the same time: 1-2 max
- inactive/background cats may use static poses or very slow idle

Rules:

- Do not animate every visible cat every frame.
- Use staggered low-frequency animation.
- Prefer calm idle loops and occasional look/sit transitions.
- Pause or reduce animation during popup/interstitial ads.
- Keep Home observation readable inside the ad-safe layout.

These limits can be raised only after mobile viewport and memory testing.

## 14. Result FX Limits

Result and Reveal effects must stay gentle.

MVP limits:

- no aggressive particle bursts
- no screen shake spam
- no high-saturation gacha glow
- no large full-screen flashing
- use soft steam, pale bubbles, small sparkles, warm light
- keep cat face readable

Tier 3 cat reveal may use:

- soft bell cue
- steam shift
- silhouette
- water reflection hint
- warm reveal glow

Effect animation should be short and low-cost. Result FX should not become a permanent background system.

## 15. Static Vs Animated Home Background Rules

Home background should begin as mostly static.

Static background can include painted:

- wooden bathhouse structure
- tub
- lanterns
- plants
- distant steam atmosphere
- warm light

Animated overlays should be separate:

- steam wisps
- lantern glow
- small water shimmer
- occasional floating leaf/petal for seasonal themes

Rules:

- do not bake important animated UI or cat positions into backgrounds
- do not make the full background a large video-like animation
- keep large background motion extremely subtle
- prefer a static watercolor background plus small reusable overlays
- ensure cats remain visually readable over steam and warm lighting

## 16. Alpha, Compression, And Scaling Safety

Alpha rules:

- transparent PNG for layered sprites and effects
- avoid semi-transparent dirty edges from poor cutouts
- premultiplied-alpha behavior should be tested before final export rules
- keep soft watercolor edges, but avoid invisible oversized alpha halos

Compression rules:

- production masters should remain high-quality PNG or source files
- runtime derivatives may be compressed after testing
- avoid compression that creates banding in steam/fog
- avoid compression that damages cocoa-brown outlines

Scaling rules:

- scale down from production masters, not up from runtime derivatives
- do not mix differently scaled layers in one cat composition
- preserve nearest visual softness without making the cat blurry
- test at expected mobile display sizes before approving asset batches

## 17. Watercolor Texture Preservation Rules

The design sheet depends on soft handmade texture.

Preserve:

- paper-like wash
- soft edge variation
- cocoa-brown pencil-like outlines
- low contrast shadows
- muted pastel accents
- gentle warmth

Avoid:

- hard vector edges
- pure black outlines
- harsh white highlights
- over-sharpened exports
- noisy texture that flickers in animation
- over-compressed gradients
- inconsistent texture density between layers

When generating animation strips, texture must not crawl aggressively between frames. If watercolor texture flickers too much, prefer:

- static layer plus transform tween
- fewer frames
- less detailed texture in moving parts
- locking frame 01 to the approved seed frame

## 18. Mobile-Safe Texture Policy

Mobile policy:

- load only assets needed for current scene
- use domain-separated atlases
- prefer `2048x2048` atlas ceiling for initial MVP tests
- avoid large always-loaded transparent sprites
- avoid loading all cat variants at startup
- cap active Home animations
- release scene-specific caches when leaving Puzzle/Result if future runtime supports it
- reconstruct runtime cache from stable ids after reload

Cat texture caution:

```text
7 layers x multiple cats x multiple animations
```

can become expensive quickly.

Therefore:

- keep static layer combinations cheap
- animate synchronized core layers only when needed
- keep towel/steamOverlay as lightweight overlays
- keep Result/Reveal FX short-lived
- keep CatDex/Album preview assets separate from live Home runtime assets if needed later

## 19. Manifest Metadata Recommendations

Future manifest entries may add:

- `productionMasterSize`
- `runtimeTargetSize`
- `anchor`
- `pivot`
- `atlasDomain`
- `animationId`
- `frameCount`
- `frameRate`
- `loop`
- `syncLayerGroup`
- `layerOrder`
- `opacityDefault`
- `scaleDefault`
- `memoryTier`
- `preloadGroup`
- `cachePolicy`

Example planning metadata:

```json
{
  "id": "cat_body_round_cream",
  "productionMasterSize": "768x768",
  "runtimeTargetSize": "512x512",
  "anchor": { "x": 384, "y": 640 },
  "pivot": "bottom_center",
  "atlasDomain": "atlas_cat_common",
  "syncLayerGroup": "cat_round_core",
  "memoryTier": "mvp_core",
  "preloadGroup": "home_core"
}
```

Do not add these fields broadly until the first runtime composition test proves the names and values useful.

## 20. MVP Asset Batch

The first production test batch should be small.

Recommended static batch:

- `cat_body_round_cream`
- `cat_pattern_calico_soft`
- `cat_eyes_gentle_green`
- `cat_mouth_tiny_smile`
- `cat_tail_curve_cream`
- `cat_accessory_head_towel`
- `cat_effect_steam_overlay_soft`
- `bg_home_bathhouse_main`
- `effect_steam_wisps_soft`
- `ui_panel_paper_large`

Recommended animation batch:

- `cat_anim_round_idle_soft`
- `cat_anim_round_walk_slow`
- `cat_anim_round_sleep_breathe`
- `cat_anim_round_bathe_relax`

This is enough to test:

- anchor stability
- runtime target scaling
- synchronized layer animation
- lightweight overlays
- Home active cat limits
- watercolor texture preservation
- atlas packing assumptions
- mobile memory assumptions

## 21. Validation Checklist

Before approving an asset batch:

- Does it match `docs/design_sheet.md` and `assets/reference/awaneko_design_sheet.png`?
- Does it use the correct production master resolution?
- Does it have the expected runtime target derivative?
- Does it preserve anchor/pivot alignment?
- Does the filename use lowercase snake_case?
- Is the manifest id stable?
- Is the layer transparent where required?
- Does watercolor texture remain soft after scaling?
- Does it avoid hard black outlines and hard white highlights?
- Does it avoid neon, glossy, metal, PvP, or battle aesthetics?
- Does the animation stay within frame count limits?
- Do synchronized layers share frame count, timing, and pivot?
- Are towel and steam overlays lightweight?
- Does steam remain low-frequency and low-opacity?
- Does it work with 3 visible Home cats in a mobile viewport?
- Does it respect top header and bottom banner ad-safe layout?
- Can runtime reconstruct it from stable ids without save paths?

## 22. Non-Goals

Do not implement:

- runtime asset loader
- Phaser scenes
- React/Vite setup
- animation state machine
- HomeRuntime
- Puzzle runtime
- save system
- ad SDK integration
- actual generated production image files
- atlas packing output
- compressed runtime derivatives

This document defines production rules only.

## 23. Open Questions

- Should the first runtime target be `384x384` or `512x512` for live Home cats?
- Should accessory masters remain `512x512`, or should all shipped cat parts normalize to `768x768`?
- Which atlas packing tool will be used after runtime setup is approved?
- Should UI panels use image assets, CSS backgrounds, or 9-slice images in the first implementation?
- What is the maximum acceptable Home memory budget on LIFF target devices?
- Should CatDex thumbnails use precomposed static derivatives instead of live layered rendering?
- How much seasonal/event content can be loaded without breaking the mobile-safe texture policy?
