# P0 Production Batch

This document defines the minimum approved production asset batch needed to validate the MVP emotional loop for あわねこ湯屋.

This is planning only. Do not implement runtime code, add React/Vite, create `src/`, generate images, pack atlases, or update `assets/asset_manifest.json` from this document yet.

## 1. Purpose

The P0 production batch exists to create a small, reviewable set of production-quality assets before broader asset generation begins.

The batch should validate this emotional loop:

```text
Home
  -> Puzzle
  -> Result
  -> CatEncounter
  -> CatResult
  -> Home Reflection
```

The player experience to prove is:

```text
I found a cat.
I returned home.
The bathhouse feels more alive.
```

This document is not a complete MVP asset inventory, not a manifest update, and not an implementation plan.

## 2. Source Documents Reviewed

This batch inherits direction from:

- `docs/design_sheet.md`
- `assets/reference/awaneko_design_sheet.png`
- `docs/mvp_scope.md`
- `docs/puzzle_design.md`
- `docs/home_growth.md`
- `docs/result_reward_mapping.md`
- `docs/cat_generator.md`
- `docs/save_patch_flow.md`
- `docs/asset_pipeline_plan.md`
- `docs/mvp_asset_inventory.md`
- `docs/asset_generation_prompt_rules.md`
- `PLAN.md`
- `TODO.md`
- `assets/asset_manifest.json`

The reference design sheet image was inspected for warm watercolor storybook tone, rounded cat proportions, cocoa-brown UI framing, soft steam and bubble effects, compact panel language, and Japanese onsen atmosphere.

## 3. Why This Layer Is Needed

The project should not move directly from `docs/mvp_asset_inventory.md` to open-ended asset generation.

`docs/mvp_asset_inventory.md` is the broad MVP asset map:

- all known MVP asset needs
- screen/system/atlas grouping
- P0/P1/P2 priority candidates
- existing manifest coverage and proposed future candidates

`docs/p0_production_batch.md` is the first production gate:

- minimum approved production set
- loop-validation assets only
- small enough to review visually
- strict enough to prevent prompt drift
- useful before runtime implementation begins

Without this layer, the project risks producing too many variants, generating assets before anchor/style rules are validated, or polishing support screens before the core emotional loop is proven.

## 4. Scope

The P0 production batch should cover:

- Home observation scene
- one visible Home growth/reflection change
- Puzzle cleaning feel
- Tier 1 / Tier 2 non-cat Result presentation
- Tier 3 cat anticipation and reveal
- one composable cat instance
- minimal cat animation proof
- soft UI framing for Result and Home return

The batch should not cover:

- all MVP assets
- all screen navigation assets
- full furniture catalog
- all cat variants
- rare/fantasy cats
- event or seasonal content
- complete audio ambience
- implementation-specific generated derivatives

## 5. Required Screens

| Screen / Moment | Production asset requirement | Placeholder policy |
| --- | --- | --- |
| Home | Production Home background and one Home-growth prop are required. | Do not use a generic placeholder for the core Home scene. |
| Puzzle | Production puzzle surface, dirt pieces, rock, bubble, and ZABAA visual are required. | UI chrome can remain simple, but cleaning objects should not be placeholder blocks. |
| Result | Production panel/button language and at least material/recipe icons are required. | A distinct full Result background is optional if the panel, steam, and warm lighting read correctly. |
| CatEncounter | Production steam/fog, silhouette, and soft bell cue are required for emotional validation. | Do not use loud badges, SSR language, or generic mystery effects. |
| CatResult | Production cat layer set and soft presentation framing are required. | Do not use a temporary unrelated cat image. |
| Home Reflection | Production Home scene must show the same cat and one small bathhouse change. | Large reward popups are out of scope. |

## 6. Required Asset Set

Use existing manifest ids when available. Proposed ids are candidates only; they should be reviewed before being added to `assets/asset_manifest.json`.

### 6.1 Home And Reflection

| Asset id | Status | Atlas domain | Why required |
| --- | --- | --- | --- |
| `bg_home_bathhouse_main` | in manifest | `atlas_home_environment` | Core observation space and return point. |
| `effect_steam_wisps_soft` | in manifest | `atlas_home_environment` | Warm onsen atmosphere and soft motion. |
| `furniture_onsen_lantern` | in manifest | `atlas_home_environment` | First visible Home growth/reflection change. |
| `ui_button_main_tan` | in manifest | `atlas_ui_common` | Explore CTA and Result CTA style validation. |
| `ui_panel_paper_large` | in manifest | `atlas_ui_common` | Result/CatResult/CatDetail framing language. |
| `ui_panel_wood_header` | in manifest | `atlas_ui_common` | Header and section-label visual language. |

`furniture_onsen_lantern` is normally a P1 inventory item, but it should be included in this first production batch because Home reflection needs one visible, warm environmental change.

### 6.2 Puzzle Cleaning Feel

| Asset id | Status | Atlas domain | Why required |
| --- | --- | --- | --- |
| `bg_puzzle_bubble_room` | in manifest | `atlas_puzzle_cleaning` | Puzzle atmosphere base. |
| `puzzle_surface_onsen_water` | proposed | `atlas_puzzle_cleaning` | Makes the board read as hot spring water, not a grid. |
| `puzzle_dirt_leaf` | proposed | `atlas_puzzle_cleaning` | Basic natural cleaning target. |
| `puzzle_dirt_mud` | proposed | `atlas_puzzle_cleaning` | Heavier cleaning-feel target. |
| `puzzle_dirt_moss` | proposed | `atlas_puzzle_cleaning` | Onsen-specific sticky target. |
| `puzzle_obstacle_rock_round` | proposed | `atlas_puzzle_cleaning` | Fixed scenery obstacle and route shaper. |
| `puzzle_bubble_projectile_soft` | proposed | `atlas_puzzle_cleaning` | Player action must feel like washing, not attacking. |
| `puzzle_aim_arrow_soft` | proposed | `atlas_puzzle_cleaning` | Gentle aiming affordance. |
| `puzzle_zabaa_water_flow` | proposed | `atlas_puzzle_cleaning` | Core emotional reset / clear transition. |
| `effect_bubbles_small_set` | in manifest | `atlas_puzzle_cleaning` / `atlas_cat_fx` | Bubble pop and washing feedback. |

`puzzle_dirt_flower` can wait. Three dirt types plus rocks are enough to validate the cleaning loop without increasing production scope.

### 6.3 Result And Reward Presentation

| Asset id | Status | Atlas domain | Why required |
| --- | --- | --- | --- |
| `result_icon_furniture_material` | proposed | `atlas_result_reveal` | Tier 1 material Result proof. |
| `result_icon_onsen_material` | proposed | `atlas_result_reveal` | Tier 1 Home-growth Result proof. |
| `result_icon_recipe_scroll` | proposed | `atlas_result_reveal` | Tier 2 unlock Result proof. |
| `effect_steam_fog_layer` | in manifest | `atlas_result_reveal` | Result transition and CatEncounter masking. |
| `effect_sparkles_warm_set` | in manifest | `atlas_result_reveal` | Optional warm recipe/reveal accent. |

`result_icon_bubble_reward` can wait unless the first test specifically needs bubble support items. The first production batch should prove material, onsen, recipe, and cat reward language.

### 6.4 CatEncounter And CatResult

| Asset id | Status | Atlas domain | Why required |
| --- | --- | --- | --- |
| `bg_reveal_steam_stage` | in manifest | `atlas_result_reveal` | CatEncounter / Reveal stage. |
| `cat_silhouette_round_soft` | proposed | `atlas_result_reveal` | Quiet anticipation before the reveal. |
| `cat_effect_steam_overlay_soft` | proposed | `atlas_cat_fx` | Dedicated cat steam overlay for air, depth, and reveal masking. |
| `cat_effect_bath_bubbles` | in manifest | `atlas_cat_fx` | Bath / washing / bubble feeling only. |
| `cat_effect_reveal_glow` | in manifest | `atlas_cat_fx` | Optional gentle reveal glow if it stays subtle. |
| `audio_bell_cat_encounter` | proposed | audio group | Signature cat-confirmed cue. |

`cat_effect_bath_bubbles` must not double as `steamOverlay`. The first batch should keep bath bubbles and steam overlay visually separate.

### 6.5 Cat Layer Set

| Asset id | Status | Atlas domain | Why required |
| --- | --- | --- | --- |
| `cat_body_round_cream` | in manifest | `atlas_cat_common` | First MVP body shape and color. |
| `cat_pattern_calico_soft` | in manifest | `atlas_cat_common` | First visible pattern overlay. |
| `cat_eyes_gentle_green` | in manifest | `atlas_cat_common` | First gentle expression layer. |
| `cat_mouth_tiny_smile` | in manifest | `atlas_cat_common` | First calm mouth layer. |
| `cat_tail_curve_cream` | in manifest | `atlas_cat_common` | First tail layer. |
| `cat_accessory_head_towel` | in manifest | `atlas_cat_common` | Towel/accessory slot validation. |
| `cat_dirt_muddy_overlay` | in manifest | `atlas_cat_fx` | Dirty rescued state. |

The same saved CatInstance must be able to appear in CatResult, CatDetail, and Home. This batch should therefore prioritize layer alignment and consistency over variety.

### 6.6 Minimal Animation Proof

The full MVP inventory may require more animation ids, but the first production batch should start with two clips:

| Proposed id | Atlas domain | Why required |
| --- | --- | --- |
| `cat_anim_round_idle_soft` | `atlas_cat_animation_round` | Proves the Home cat can feel alive without behavior complexity. |
| `cat_anim_round_bathe_relax` | `atlas_cat_animation_round` | Proves the cat belongs in the bathhouse and supports Home reflection. |

`walk`, `sit`, `sleep`, and `look` should remain in planning, but they do not need to be produced before the first emotional-loop asset review unless implementation timing requires them.

## 7. Required Cat Variant Counts

Do not generate all planned cat variants for the first batch.

Recommended first production counts:

| Category | Count | Notes |
| --- | ---: | --- |
| body | 1 | `round` only. |
| pattern | 1 | Calico soft overlay is enough to test compositing. |
| eyes | 1 | Gentle expression only. |
| mouth | 1 | Tiny smile only. |
| tail | 1 | Curved cream tail only. |
| accessory / towel | 1 | Head towel as the first attachment proof. |
| dirt overlay | 1 | Muddy overlay for rescued state. |
| bath bubble overlay | 1 | Washing/bath feeling. |
| steam overlay | 1 | Dedicated soft steam overlay. |
| silhouette | 1 | Round cat silhouette for CatEncounter. |
| animation clips | 2 | Idle and bathe first. |

This is enough to test:

- `spriteLayerIds`
- `animationSetIds`
- layer alignment
- reveal consistency
- Home return continuity
- saved CatInstance identity

## 8. Excluded Assets

Exclude these from the first production batch:

- additional body shapes: `standard`, `tiny`, `fluffy`
- additional body colors
- extra eyes/mouth/tail variants
- rare, phantom, divine, or event cats
- additional accessories beyond the towel
- full furniture catalog
- multiple Home themes
- seasonal/event props
- Album/CatDex full icon set
- Shop/Mission/Mail/Notice/Settings screen assets
- Title-only background
- complete audio ambience set
- high-frame animation on every cat layer
- separate Result background if existing panels, steam, and reveal stage are enough

These may remain in `docs/mvp_asset_inventory.md` as MVP or future candidates, but they should not block the first production batch review.

## 9. Validation Goals

The batch is successful if it validates:

| Goal | Required proof |
| --- | --- |
| Discovery | Puzzle dirt, rocks, bubbles, and ZABAA feel like onsen cleaning. |
| Anticipation | Steam, silhouette, and bell cue make the player feel something is there. |
| Reveal | The cat appears gently, without gacha/SSR language or aggressive FX. |
| Attachment | The same cat reads consistently across CatResult, CatDetail framing, and Home. |
| Home growth | Returning Home shows one quiet environmental improvement. |
| Replay motivation | Home feels a little warmer and invites another exploration. |
| Technical readiness | Cat layers align, remain transparent, and scale safely to runtime targets. |

## 10. Production Gate

Before generating this batch:

1. Confirm this document is reviewed and accepted.
2. Confirm every generation prompt inherits `docs/asset_generation_prompt_rules.md`.
3. Confirm cat layer prompts use the `768x768` canvas and anchor rules from `docs/sprite_spec.md`.
4. Confirm runtime derivative targets follow `docs/asset_pipeline_plan.md`.
5. Confirm `cat_effect_bath_bubbles` and `cat_effect_steam_overlay_soft` remain separate.
6. Confirm no generated asset includes green screen, checkerboard, baked UI text, or unrelated background.
7. Confirm no production request asks for multiple unrelated assets in one image.
8. Confirm no high-frame animation is requested for all cat layers.
9. Confirm the batch is reviewed against `assets/reference/awaneko_design_sheet.png`.
10. Only after review, decide whether to add missing proposed ids to `assets/asset_manifest.json`.

Runtime implementation should still wait until the planning and production-batch gates are accepted.

## 11. Missing Items To Resolve

- `cat_effect_steam_overlay_soft` is needed for the batch but is still a proposed manifest candidate.
- Puzzle piece ids are still proposed and should be reviewed before manifest registration.
- Result reward icons are still proposed and should be reviewed before manifest registration.
- `cat_silhouette_round_soft` is still proposed and should be reviewed before manifest registration.
- Decide whether `audio_bell_cat_encounter` belongs in the first asset production batch or a parallel audio batch.
- Decide whether `furniture_onsen_lantern` is the first Home reflection prop or whether another existing Home prop better proves warmth.
- Decide whether the first animation proof uses full-strip production or static keyframes reviewed before strip assembly.

## 12. Over-Scope Warnings

Avoid expanding this batch into:

- a complete MVP atlas
- a cat variation library
- a full Home decoration set
- a full puzzle content set
- a Result polish pass
- a title/menu asset pass
- broad UI navigation production

The first batch should be small enough that visual direction, anchors, prompt rules, and emotional continuity can be corrected quickly.

## 13. Recommendations

- Create this document as the production gate before asset generation.
- Produce static layers and core effects before animation strips.
- Review the first cat composition at both `512x512` and `384x384` runtime targets.
- Keep the first Home reflection visual simple: lantern warmth, steam, and the same cat returning home.
- Treat all proposed ids in this document as candidates until manifest review.
- Do not begin runtime implementation just because this batch is defined.
