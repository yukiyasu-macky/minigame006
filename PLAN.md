# PLAN: あわねこ湯屋 Asset Planning

## Design Summary

あわねこ湯屋 is a low-stress healing rescue game about finding dirty or lost cats, washing them in a warm onsen, and sending them gently onward. The visual direction is defined by `docs/design_sheet.md` and `assets/reference/awaneko_design_sheet.png`: warm watercolor storybook rendering, Japanese soft onsen atmosphere, rounded cute cat silhouettes, cream paper panels, cocoa-brown wood UI, pastel accents, and gentle steam/fog effects.

The mood should feel handmade, quiet, and safe. The UI should support short mobile sessions without pressure, battle language, hard contrast, neon colors, or glossy monetization styling.

## Source Of Truth Status

- Game Studio plugin/skill: available for this repository. Planning and future implementation should follow Game Studio-style separation between systems/game logic, rendering/components, assets/pipeline, and save/state.
- `docs/design_sheet.md`: available in the repository and paired with the reference image.
- Design sheet image: stored in the repository at `assets/reference/awaneko_design_sheet.png` so future reviewers and PRs can inspect the same visual source.

## Design Sheet Observations

- Layout structure: the design sheet is organized as a cream paper board with thin beige dividers, cocoa-brown pill section labels, compact reference panels, and dense but calm spacing.
- Component hierarchy: title/logo and concept sit at the top, then palette/type/icon/cat style references, followed by mobile screen mocks, reveal flow, room layout, furniture, UI parts, effects, icons, and information flow.
- Reusable UI patterns: rounded brown headers, cream panels, soft tan buttons, small icon tabs, coin/gem counters, compact status meters, bottom navigation icons, and bordered mobile frames.
- Color palette: dark cocoa brown, medium warm brown, soft cream, pale yellow, mint, muted sky blue, light periwinkle, blush pink, and white.
- Typography mood: rounded, friendly Japanese display lettering for the logo and approachable rounded sans text for UI labels. Text should feel warm and legible, not futuristic or sharp.
- Cat proportions: large heads, short rounded bodies, small paws, soft cheek shapes, rounded ears, simple tails, and expressive but gentle eyes.
- Rendering softness: watercolor wash, pencil-like brown outlines, low contrast, feathered shadows, warm light, and paper texture.
- Icon style: simple rounded line icons with brown outlines and occasional pastel fills.
- Panel framing: soft cream panels with thin brown/tan borders; section labels use dark rounded wood-tab shapes.
- Effect style: translucent bubbles, pale steam, small sparkles, hearts, tears, moon glow, and subtle light rings.
- Environment art: cozy wooden bathhouse interiors, tatami/wood textures, plants, lanterns, noren, small onsen tubs, mountain forest exteriors, and misty night baths.
- Spacing density: compact reference-sheet density, but actual game screens should keep clear touch targets and readable labels.
- Interaction tone: tap to discover, wash, reveal, inspect details, and send off. Interactions should feel gentle and ceremonial rather than competitive.
- Sprite layering hints: separate cat bodies, fur colors, patterns, eyes, ears, tails, accessories, dirt, steam, bubbles, sparkles, and reveal silhouettes.

## Engine And Rendering Decision

No runtime implementation should begin until `PLAN.md` and `assets/asset_manifest.json` are reviewed.

Planning assumption for future implementation:

- App shell: React/Vite is a likely future fit for LIFF compatibility and mobile UI, but it must not be added yet.
- Rendering: layered 2D sprite rendering should be planned for a canvas-capable renderer or DOM/canvas hybrid. A future asset loader can map manifest ids to image paths and stack layers by category.
- Game logic: deferred. No gameplay, LIFF, storage, or runtime code is part of this planning stage.
- Persistence: future state should keep localStorage first and allow migration to Firebase without changing asset ids or save data keys.

## Screen Flow And Gameplay Loop

- `docs/mvp_scope.md` is the planning baseline for MVP boundaries, screen priority, vertical-slice requirements, and pre-implementation stabilization gates.
- `docs/screen_flow.md` is the planning baseline for screen hierarchy, route relationships, and shared overlays.
- `docs/game_loop.md` is the planning baseline for the Home-centered exploration, puzzle, result, reveal, and reward loop.
- `docs/puzzle_design.md` is the final direction for Puzzle gameplay feel, onsen-cleaning presentation, ZABAA, dirt/rock rules, and non-arcade UI/audio/animation tone.
- `docs/reward_table.md` is the planning baseline for MVP reward tiers, stamina, adoption circulation, Result presentation, and config-driven tuning values.
- `docs/result_reward_mapping.md` is the planning baseline for one Puzzle play mapping to one pre-decided RunReward, idempotent SavePatch, Tier-based Result presentation, and quiet Home reflection.
- `docs/save_patch_flow.md` is the planning baseline for RunSession recovery, idempotent SavePatch application, ad-safe reload handling, ResultPresentation recovery, and HomeReflection repeat prevention.
- `docs/home_growth.md` is the planning baseline for how Puzzle rewards create Home atmosphere, cat interaction points, recipes, and emotional observation value.
- `docs/cat_generator.md` is the planning baseline for CatGenerator responsibility, SpeciesMaster/CatInstance separation, stable cat ids, sprite layer ids, animation set ids, CatDex integration, and Home instance behavior inputs.
- `docs/asset_pipeline_plan.md` is the planning baseline for production master resolution, runtime target resolution, atlas domains, animation naming, frame limits, mobile-safe texture policy, and watercolor asset preservation.
- `docs/mvp_asset_inventory.md` is the planning baseline for MVP asset scope by screen, system, atlas domain, and priority.
- `docs/asset_generation_prompt_rules.md` is the prompt-governance source of truth for future ChatGPT-generated visual assets, preventing visual drift, layer misalignment, and runtime-incompatible exports.
- `docs/p0_production_batch.md` is the first production-batch gate for the minimum assets needed to validate the Home -> Puzzle -> Result -> CatEncounter -> CatResult -> Home Reflection emotional loop.
- `docs/data_schema.md` is the planning baseline for minimum SaveData structure, operation-confirmed patches, and future localStorage/Firebase compatibility.
- `HomeScreen` is the main hub.
- `HomeScreen -> PuzzleScreen -> ResultScreen` is the core play path.
- `ResultScreen -> RevealScreen` happens only when an exploration result includes a cat.
- Non-cat results should still feed Home growth, furniture, onsen upgrades, collections, or events.
- Album and CatDex are related but separate concerns: CatDex tracks cat discovery; Album also covers adopted-cat memories, rewards, progress, and achievements.

The MVP is not full-screen coverage or placeholder navigation. It is a playable vertical slice that proves the emotional loop from Title to Home, Puzzle, Result, conditional Reveal, CatDetail, and back to Home.

## Ad-Safe Layout Constraint

`docs/ui_safe_area_spec.md` is the permanent source of truth for ad-safe layout planning.

All future screens and gameplay systems must assume:

- persistent top header area
- persistent bottom banner ad area
- mobile safe areas and notch devices
- LIFF/browser chrome
- popup/interstitial ad interruption

Gameplay must pause during popup/interstitial ads. Timers, stamina, rewards, puzzle logic, reveal animations, progression, and input must not continue behind ads.

## Asset Pipeline

1. Review `PLAN.md` and `assets/asset_manifest.json`.
2. Fill missing design decisions by updating `docs/design_sheet.md` and the asset manifest together.
3. Generate or hand-paint assets using the prompts in `docs/image_prompts.md`.
4. Export transparent PNGs for sprites, UI icons, effects, furniture, and layered cat parts.
5. Export full-background PNGs for home, puzzle, and reveal scenes.
6. Keep all future assets under `assets/images/`.
7. Update `assets/asset_manifest.json` status from `planned` to `generated`, `approved`, or `needs_revision`.

## Sprite Layering Approach

`docs/sprite_spec.md` is the future production standard for layered cat sprite canvas size, coordinates, anchors, layer order, export rules, file naming, prompt guidance, and validation.

Future cat rendering should use a stable center-bottom anchor and predictable layer order:

1. shadow or floor contact
2. body
3. tail
4. pattern
5. dirt
6. eyes
7. mouth
8. accessory
9. foreground effect

Reveal scenes may add a silhouette/fog layer above the body before the clean cat is shown. Dirt and bubbles should be independent overlays so washing and reveal effects can be animated later without changing the base cat art.

## Asset Production Workflow

- Create one small approved batch first: one home background, one puzzle background, one round cat body, one fur pattern, one eyes set, one dirt overlay, one steam effect, one panel, one button, and one icon.
- Compare every batch against `assets/reference/awaneko_design_sheet.png` for palette, softness, outline weight, and cat proportions.
- Keep prompts specific about watercolor, warm cream paper, cocoa-brown outlines, pastel accents, rounded shapes, and gentle onsen lighting.
- Avoid terms that imply neon, metal, hard shadows, realistic rendering, PvP, battle, or high-saturation anime UI.
- Store source prompts in `docs/image_prompts.md` and generated filenames in the manifest before production begins.

## Naming Conventions

- Use lowercase snake_case filenames.
- Use category folders that match the manifest category.
- Keep ids stable after first review.
- Prefer descriptive names over numeric-only names.

Example:

`assets/images/cat/body/cat_body_round_cream.png`

## Implementation Phases

1. Planning review: validate this plan, the manifest, naming conventions, and source-of-truth gaps.
2. MVP stabilization: review `docs/mvp_scope.md`, `docs/reward_table.md`, `docs/data_schema.md`, `docs/cat_generator.md`, `docs/save_patch_flow.md`, Home growth linkage rules, and exploration -> reward -> Home progression mapping.
3. Asset exploration: review `docs/asset_pipeline_plan.md`, `docs/mvp_asset_inventory.md`, `docs/asset_generation_prompt_rules.md`, and `docs/p0_production_batch.md`, then produce the first visual test batch only after review.
4. Asset approval: compare generated assets against `docs/design_sheet.md` and `assets/reference/awaneko_design_sheet.png`.
5. Static mock composition: create non-interactive mock screens after core assets are approved.
6. Runtime setup: add React/Vite only after planning and MVP stabilization gates are complete.
7. Layered rendering prototype: load manifest-defined sprites and test alignment.
8. Gameplay vertical slice: implement only the Tier 1 MVP loop before expanding broad screens.
9. LIFF/storage phase: add platform assumptions and persistence migration path.

## Risks And Open Questions

- The design sheet should remain the source of truth; future prompt or manifest edits should be checked against both `docs/design_sheet.md` and `assets/reference/awaneko_design_sheet.png`.
- Game Studio planning conventions should stay aligned with the eventual React/Vite implementation.
- Premature full-screen implementation could distract from proving the MVP emotional loop.
- Cat parts need strict anchor and canvas-size rules to avoid misalignment.
- Mobile safe areas, bottom navigation, and LIFF browser chrome need early layout tests.
- Persistent top header, bottom banner ads, and popup/interstitial ad pauses need early layout and state tests.
- Watercolor softness can become inconsistent if generated assets are produced in separate batches without strong prompt discipline.
- Runtime scaling mismatch can blur cats or break layer alignment if production masters and runtime derivatives are not standardized.
- Backgrounds and UI panels must stay readable under steam/fog effects.
- Future storage schema should not bake in temporary asset filenames.
- Reward, stamina, adoption, and result presentation values must remain config-driven rather than hardcoded.
- CatGenerator must stay separate from rendering, Home runtime behavior state, image generation, and animation caches.
- SavePatch recovery must handle the case where a reward is already saved but ResultPresentation has not yet been seen.
- Puzzle implementation must preserve the onsen-cleaning mood and must not drift into generic arcade bubble shooter presentation.
- Home growth must preserve the relaxing observation-space mood and must not drift into facility management, resource factory, or optimization gameplay.

## Planning-Stage Limitations

- No dependencies were installed.
- No React/Vite files were added.
- No `src/` directory was created.
- No gameplay, LIFF, localStorage, Firebase, or runtime/game logic was implemented.
- No actual image files were created.
- No asset loader was created. A future loader may read `assets/asset_manifest.json`, group entries by category, and compose cat sprites by stable ids.
