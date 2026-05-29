# Asset Generation Prompt Rules

This document is the single source of truth for future ChatGPT-generated visual assets for あわねこ湯屋.

This is planning and prompt-governance documentation only. Do not implement runtime code, add React/Vite, create `src/`, generate images, pack atlases, or modify `assets/asset_manifest.json` from this document yet.

## 1. Purpose

The purpose of this document is to prevent:

- visual drift
- inconsistent generation style
- layer misalignment
- non-composable sprite parts
- atlas packing problems
- manifest instability
- runtime memory problems
- accidental UI/background mixing

Every future image-generation request should inherit these rules before adding asset-specific details.

## 2. Should This Document Exist?

Yes.

Existing documents already cover important parts of the asset pipeline, but none of them act as the prompt-level rulebook for all future generated assets.

Responsibility split:

| Document | Responsibility |
| --- | --- |
| `docs/design_sheet.md` | visual source of truth and style direction |
| `assets/reference/awaneko_design_sheet.png` | visual reference image source of truth |
| `docs/image_prompts.md` | reusable prompt examples by asset category |
| `docs/sprite_spec.md` | cat sprite canvas, anchors, layer order, export rules |
| `docs/asset_pipeline_plan.md` | production master/runtime target, atlas, animation, mobile policy |
| `docs/mvp_asset_inventory.md` | MVP asset scope by screen/system/atlas/priority |
| `docs/p0_production_batch.md` | first production-batch gate and approved minimum generation scope |
| `docs/cat_generator.md` | stable `spriteLayerIds` / `animationSetIds` usage |
| `docs/ui_safe_area_spec.md` | ad-safe and mobile screen composition constraints |
| `docs/asset_generation_prompt_rules.md` | prompt rules to keep generated assets consistent and usable |

This document should not duplicate every prompt. It should define the rules that every prompt must obey.

## 3. Visual Source Of Truth

Every generated asset must match:

- `docs/design_sheet.md`
- `assets/reference/awaneko_design_sheet.png`

The reference image has been inspected for this document. Its key visual traits are:

- cream paper-board presentation
- cocoa-brown rounded section labels
- soft beige dividers and panel frames
- watercolor wash and pencil-like outlines
- compact but calm UI density
- rounded large-headed cats
- warm Japanese bathhouse interiors
- pale steam, translucent bubbles, soft sparkles
- low-stress rescue / healing mood

If a prompt conflicts with the design sheet, follow the design sheet.

## 4. Global Style Rules

Always include the relevant parts of this style direction:

```text
warm watercolor storybook
soft Japanese onsen bathhouse atmosphere
gentle healing tone
cozy rescue fantasy
low saturation
soft cream and cocoa-brown palette
pastel accents
soft edges
cocoa-brown pencil-like outlines
paper texture
gentle lighting
low contrast
rounded cute silhouettes
```

Asset prompts should feel handmade, warm, quiet, and caring.

## 5. Forbidden Directions

All generated assets must avoid:

- neon
- cyberpunk
- battle RPG presentation
- PvP or combat aesthetics
- gacha SSR effects
- metallic UI
- glossy mobile-game monetization styling
- hard shadows
- hard anime cel shading
- high-contrast anime rendering
- realistic cat anatomy
- realistic fur rendering
- western comic style
- aggressive impact effects
- sharp futuristic typography
- plastic buttons
- loud casino/pachinko reward feeling

Negative prompt baseline:

```text
no neon, no cyberpunk, no metallic UI, no glossy mobile game monetization look, no hard shadows, no realistic rendering, no western comic style, no aggressive effects, no PvP, no battle aesthetics, no high-saturation anime UI, no sharp futuristic typography, no gacha SSR effects
```

## 6. Asset Export Rules

Sprite, UI part, furniture, prop, icon, and effect assets:

- transparent PNG
- no green screen
- no colored matte background
- no checkerboard baked into the image
- no labels or explanatory text
- no generated watermark
- no background unless the asset is explicitly a background

Background assets:

- PNG or approved future runtime format
- no UI text baked into the background
- no important buttons or controls baked into the background
- preserve readable space for UI, cats, and steam overlays

Primary cat layer production masters:

- `768x768`
- transparent PNG
- same canvas size across primary layers
- full canvas preserved
- no crop to visible bounds
- sRGB
- no background

Runtime target planning:

- first test target: `512x512`
- `384x384` remains an alternate mobile test target from `docs/asset_pipeline_plan.md`
- do not request mixed runtime sizes for layers in the same cat composition

## 7. Production Identity And Sprite Safety Rules

Every production prompt must treat the stable asset id as the source of truth.

Rules:

- include exactly one `Asset id` in the prompt
- generate only the requested asset id
- do not add missing layers to "complete" the image
- do not add props, accessories, labels, UI, scenery, or effects unless the asset request explicitly asks for them
- do not reinterpret the asset as a scene, poster, mood board, or character sheet
- preserve future layer compositing compatibility over standalone illustration appeal
- maintain visual scale with the other assets in the same layer family
- keep the silhouette readable at `128px` display size
- avoid tiny decorative details that disappear at mobile runtime size
- avoid ambient shadows outside the intended asset silhouette
- avoid broad semi-transparent halos that waste atlas space or create packing artifacts
- keep soft watercolor edges, but do not leave dirty matte pixels, colored fringes, or green-screen remnants

The generated result should be production-safe game art, not concept art.

## 8. Canvas, Anchor, And Alignment Rules

Cat layer prompts must include:

```text
full 768x768 transparent canvas
same composition space as the round seated cat
bottom-center anchor
body anchor near x=384 y=640
face center near x=384 y=330
no cropping to visible bounds
```

Rules:

- same canvas size for composable cat layers
- same alignment for body, pattern, eyes, mouth, tail, dirt, and cat effects
- preserve transparent margins
- do not shift the cat body between variants
- do not let accessories change the body anchor
- do not let effects hide the face unless the asset is explicitly for reveal masking

## 9. Cat Layer Rules

Required cat layer slots:

- `body`
- `pattern`
- `eyes`
- `mouth`
- `tail`
- `accessory`
- `towel`
- `steamOverlay`

Each layer must:

- occupy the same canvas space
- remain composable
- align with the approved base layer set for the current body type
- avoid baked shadows from other layers
- avoid baked backgrounds
- avoid unrelated accessories
- avoid face parts unless the target layer is eyes or mouth
- avoid changing body silhouette unless the target layer is body
- use soft cocoa-brown outlines
- preserve rounded cute proportions

For the first round-cat production batch, cat-layer assets must align with:

- `cat_body_round_cream`
- `cat_pattern_calico_soft`
- `cat_eyes_gentle_green`
- `cat_mouth_tiny_smile`
- `cat_tail_curve_cream`
- `cat_accessory_head_towel`

Do not alter the shared anchor position, resize the body, shift the face, shift the tail base, crop transparent margins, or change the overall cat scale.

Layer-specific prompt rules:

| Layer | Required generation behavior |
| --- | --- |
| `body` | full silhouette, blank face area, no eyes/mouth, no accessories |
| `pattern` | overlay only, no silhouette change, no expression |
| `eyes` | transparent eye layer, no mouth, aligned to eye guide |
| `mouth` | tiny simple expression, no eyes |
| `tail` | behind/side compatible, does not shift body anchor |
| `accessory` | attach-point intent, does not obscure eyes |
| `towel` | lightweight head/bath accessory, attach-point intent |
| `steamOverlay` | warm air/depth/reveal masking, low opacity, not bubbles |

`cat_effect_bath_bubbles` and `cat_effect_steam_overlay_soft` must stay separate:

- `cat_effect_bath_bubbles`: bath / washing / bubble feeling
- `cat_effect_steam_overlay_soft`: warm steam / air / depth / CatEncounter / Reveal masking

## 10. One Asset Per Image Rule

Generate one final production asset per image unless the request explicitly asks for a review sheet or animation strip.

Rules:

- no multiple unrelated assets in one export
- no UI mixed into sprite assets
- no backgrounds baked into sprite layers
- no props mixed into cat layers unless the target is a prop/accessory
- no text labels in sprite exports
- no preview frames inside production files

Allowed exceptions:

- animation strips
- icon sets during ideation only
- bubble/sparkle effect sets when the manifest expects a set asset
- reference/review sheets that are clearly not production exports

## 11. Animation Strip Prompt Rules

Animation strip generation must follow Game Studio sprite-pipeline principles:

- start from one approved seed frame
- generate the whole strip at once
- do not generate isolated frames independently
- transparent canvas
- fixed slot size
- exact frame count
- same character
- same palette
- same silhouette
- same facing direction
- same anchor
- shared scale
- no scenery
- no labels

MVP frame limits:

- `idle`: 2-4 frames
- `walk`: 4-6 frames
- `sit`: 3-5 frames
- `sleep`: 2-4 frames
- `bathe`: 2-4 frames
- `look`: 2-4 frames
- max 6 frames unless explicitly reviewed

Do not high-frame animate every cat layer.

Synchronized layers:

- body
- pattern
- tail
- eyes

Lightweight overlays:

- accessory
- towel
- steamOverlay

Steam should be low-frequency, low opacity, and soft. It may use few frames or procedural drift later.

## 12. UI Asset Prompt Rules

UI asset prompts must follow the design sheet:

- cream paper panels
- soft tan / warm brown wood buttons
- cocoa-brown rounded outlines
- rounded section tabs
- small hand-drawn icons
- pastel fills only when useful
- no metallic/glossy/plastic treatment

UI generation rules:

- no text baked into buttons or panels
- no Japanese labels inside reusable UI parts
- keep icons simple and readable at mobile size
- keep panels compatible with ad-safe layouts
- avoid dense decorative borders that reduce usable content area

Buttons, panels, and icons may be used by DOM UI later, so generated parts should not assume fixed screen text or route state.

## 13. Background Prompt Rules

Backgrounds should be warm, readable, and not overbusy.

Rules:

- mobile portrait composition unless otherwise specified
- no UI text
- no important controls baked in
- leave readable areas for cats, panels, and overlays
- steam and fog may be painted softly, but large animated steam should be separate
- cats may appear in concept/background mood images only if the asset is not used as a gameplay layer
- avoid dense detail directly behind expected text panels

Home background should start mostly static. Puzzle background should feel like a hot spring surface area, not an arcade grid. Reveal background should support silhouette and steam masking.

## 14. Effect Prompt Rules

Effects should be soft, reusable, and low-cost.

Allowed effect vocabulary:

- pale steam
- warm fog
- translucent bubbles
- small sparkles
- soft hearts
- tear drops
- moon glow
- light rings
- warm reveal glow

Rules:

- low opacity
- no aggressive impact
- no explosions
- no high-saturation magic
- no screen-filling flash
- no face-covering effects except reveal masking
- keep density low enough for layering
- transparent PNG unless it is a full-scene background effect

Steam and bubbles are different responsibilities. Do not use bubble prompts to produce steam overlays.

## 15. Atlas And Manifest Safety Rules

Generation prompts must support future manifest and atlas registration.

Rules:

- use lowercase snake_case proposed ids
- treat `Asset id` as the stable manifest key for the generated asset
- one production asset should map cleanly to one manifest id unless it is a set/strip
- do not include temporary names in visual output
- do not create assets that require hidden file-path assumptions
- avoid giant transparent canvases beyond the planned master size
- avoid unnecessary detail that will not read at runtime target size
- avoid wide alpha halos that waste atlas space
- avoid semi-transparent edge noise that can create visible seams after atlas packing
- do not rely on runtime trimming unless source-size, pivot, and offset metadata are preserved

Atlas domains should follow:

- `atlas_cat_common`
- `atlas_cat_animation_round`
- `atlas_cat_fx`
- `atlas_home_environment`
- `atlas_puzzle_cleaning`
- `atlas_result_reveal`
- `atlas_ui_common`

## 16. Runtime And Save Safety Rules

Generated assets must remain compatible with:

```text
Save stores stable ids only.
Runtime reconstructs visuals/audio from asset ids and manifest data.
```

Prompts must not create assets that require saving:

- file paths
- texture objects
- render cache
- animation cache
- current animation frame
- current Home position
- UI transition state

Avoid assets that require:

- high frame counts
- full-screen continuous animation
- many independently animated layers
- heavy transparency over the whole viewport
- large always-loaded texture sets

## 17. Safe-Area And Screen Composition Rules

Generated screen mockups or backgrounds must respect:

- persistent top header
- persistent bottom banner ad area
- mobile safe areas
- LIFF/browser chrome
- popup/interstitial interruption possibility

Rules:

- no important button at bottom edge
- no important text under top header area
- no dense UI directly below top header
- no primary controls behind bottom banner space
- keep center content readable inside `GameplayArea`

For pure sprite assets, do not bake screen layout assumptions into the image.

## 18. Recommended Production Order

Future production should validate composition in small steps instead of generating large asset sets immediately.

Recommended order for the first cat-oriented batch:

1. Review `docs/asset_generation_prompt_rules.md`.
2. Review `docs/p0_production_batch.md`.
3. Generate the base body asset first.
4. Validate body canvas, anchor, silhouette, and `128px` readability.
5. Generate the pattern layer.
6. Validate composition with the approved body.
7. Generate eyes, mouth, tail, accessory, towel, dirt, bath bubbles, and steam overlay in small groups.
8. Validate every layer against the approved body composition.
9. Generate minimal animation seed frames only after the static composition is approved.
10. Generate full animation strips from approved seed frames, not isolated frames.
11. Only then expand production beyond the P0 batch.

Do not generate a large cat library before the first body, pattern, face, tail, accessory, dirt, and steam layers compose correctly.

## 19. Prompt Template

Use this structure for future asset prompts:

```text
Create one [asset type] for あわねこ湯屋.

Asset id: [stable_snake_case_id]
Intended category: [manifest category]
Intended atlas domain: [atlas domain]
Production master: [size]
Transparency: [transparent PNG / background]
Composition: [canvas, anchor, alignment]
Layer compatibility: [base layer set or "not applicable"]
Runtime readability target: readable at 128px

Style:
warm watercolor storybook, Japanese soft onsen atmosphere, cocoa-brown pencil-like outlines, soft cream/pastel palette, rounded cute silhouettes, gentle lighting, low contrast, handmade paper texture.

Asset-specific requirements:
[layer rules, pose, emotion, screen use, attachment point, frame count]

Forbidden:
no neon, no cyberpunk, no metallic UI, no glossy mobile game monetization look, no hard shadows, no realistic rendering, no western comic style, no aggressive effects, no PvP, no battle aesthetics, no high-saturation anime UI, no gacha SSR effects, no text labels, no green background, no extra layers, no extra props, no ambient shadow outside the requested asset.
```

## 20. Review Checklist

Before accepting a generated asset:

- Does it match `docs/design_sheet.md` and `assets/reference/awaneko_design_sheet.png`?
- Does it match the requested `Asset id` and only that asset?
- Does it follow the correct category rules?
- Is the style warm watercolor storybook?
- Does it avoid forbidden visual directions?
- Is the canvas size correct?
- Is transparency correct?
- Is there any green/matte background accidentally baked in?
- Does it preserve anchor and alignment?
- Does it align with the approved base layer set when it is a cat layer?
- Does it keep the silhouette readable at `128px` display size?
- Is it one asset, not a mixed sheet, unless intentionally a strip/set?
- Does it avoid baked UI/text/background where forbidden?
- Does it remain readable at runtime target size?
- Does it avoid oversized alpha halos?
- Does it avoid edge noise, colored matte pixels, or semi-transparent artifacts that would hurt atlas packing?
- Does it avoid ambient shadows outside the intended silhouette?
- Does it avoid unnecessary animation complexity?
- Does it map cleanly to a stable manifest id?
- Can it be used without saving file paths or runtime cache?

## 21. Missing Rules Identified During Review

The proposed rules were good, but the review found additional rules that should be official:

- distinguish sprite/layer transparent assets from non-transparent full backgrounds
- prohibit green screen and colored matte backgrounds explicitly
- require one asset per image except strips/sets/review sheets
- require animation strips to be generated as full strips, not isolated frames
- define frame count limits in generation rules
- distinguish bath bubbles from steam overlays
- require prompt-level manifest id, category, and atlas domain context
- require review against runtime target readability
- require `128px` readability checks for small mobile presentation
- prohibit oversized alpha halos that waste atlas space
- prohibit extra props, extra layers, and ambient shadows outside the requested asset
- require layer compatibility checks against the approved base round-cat set
- require small-step production order before large asset generation
- include safe-area rules for screen mockups/backgrounds
- state that prompts must not imply save data should store paths/cache

## 22. Risks If This Document Is Not Used

Visual risks:

- cats drift toward realistic, anime, or western-comic rendering
- UI becomes glossy, metallic, or monetization-like
- effects become too flashy or gacha-like
- watercolor texture becomes inconsistent between batches

Layering risks:

- different cat layers use different canvas sizes
- body/pattern/eyes/tail no longer align
- face position drifts between eyes, mouth, pattern, and body
- accessories cover eyes
- extra props are accidentally baked into core cat layers
- dirt or steam hides the face unintentionally
- shadows are baked into the wrong layer

Pipeline risks:

- generated assets do not map cleanly to manifest ids
- atlas space is wasted by huge transparent halos
- semi-transparent edge artifacts create atlas seams or dirty matte pixels
- animation frame counts grow too high
- frame-by-frame generation causes identity drift
- runtime target scaling makes assets blurry

Runtime risks:

- too many large transparent textures are loaded
- too many layers animate independently
- tiny details disappear at `128px` and make assets feel inconsistent
- mobile webview memory becomes unstable
- reload recovery depends on runtime-only cache

## 23. Non-Goals

This document does not:

- replace `docs/design_sheet.md`
- replace `docs/image_prompts.md`
- replace `docs/sprite_spec.md`
- replace `docs/asset_pipeline_plan.md`
- update `assets/asset_manifest.json`
- generate image assets
- define runtime loader code
- define final atlas packing output

It defines the shared prompt rules that future image-generation requests must obey.
