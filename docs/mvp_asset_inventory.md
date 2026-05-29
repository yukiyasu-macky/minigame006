# MVP Asset Inventory

This document organizes the minimum asset list needed for MVP implementation of あわねこ湯屋.

This is planning only. Do not implement runtime code, add React/Vite, create `src/`, generate image assets, pack atlases, or update runtime loaders from this document yet.

## 1. Purpose

The MVP asset set should prove the emotional vertical slice:

```text
TitleScene
  -> HomeScreen
  -> PuzzleScreen
  -> ResultScreen
  -> if cat found: RevealScreen -> CatDetailScreen -> HomeScreen
  -> if no cat found: HomeScreen
```

The goal is not a complete content library. The goal is enough asset coverage to test:

- Home observation and Explore CTA
- onsen-cleaning Puzzle feel
- Tier 1 material Result
- Tier 2 recipe Result
- Tier 3 cat encounter / reveal
- CatDetail calm inspection
- Home reflection after reward
- layered cat rendering with small frame animations
- ad-safe mobile layout

## 2. Source Documents

This inventory references:

- `docs/asset_pipeline_plan.md`
- `docs/home_layout.md`
- `docs/puzzle_design.md`
- `docs/result_reward_mapping.md`
- `docs/cat_generator.md`
- `assets/asset_manifest.json`

Asset production must stay consistent with:

- warm watercolor storybook
- Japanese soft onsen atmosphere
- soft wood / cream UI
- gentle steam/fog
- rounded cute cat silhouettes
- layered sprites + small frame animations
- stable manifest ids
- mobile-safe texture policy

## 3. Priority Definitions

| Priority | Meaning |
| --- | --- |
| `P0` | Required for MVP vertical slice to function end-to-end. |
| `P1` | Strongly recommended for emotional clarity, polish, or first review quality. |
| `P2` | Useful for variation, but can wait until after the MVP loop proves itself. |

`P0` should remain small. If too many assets become `P0`, the MVP will drift toward content production instead of loop validation.

## 4. Atlas Domain Definitions

Use the atlas domains from `docs/asset_pipeline_plan.md`:

| Atlas domain | Purpose |
| --- | --- |
| `atlas_cat_common` | static cat layers used in Home, Result, Reveal, and CatDetail |
| `atlas_cat_animation_round` | first round-body cat animation strips/frames |
| `atlas_cat_fx` | cat-specific bubbles, dirt, reveal glow, steam overlay |
| `atlas_home_environment` | Home background, furniture, atmosphere props |
| `atlas_puzzle_cleaning` | puzzle dirt, rocks, water surface, aiming, ZABAA |
| `atlas_result_reveal` | Result and Reveal screen effects/icons/backgrounds |
| `atlas_ui_common` | common buttons, panels, icons, badges, headers |

Do not create one mega-atlas for MVP.

## 5. Existing Manifest Coverage

These existing planned manifest assets are directly useful for MVP.

| Asset id | Category | Atlas domain | MVP use | Priority |
| --- | --- | --- | --- | --- |
| `bg_home_bathhouse_main` | `background/home` | `atlas_home_environment` | HomeScreen main observation scene | `P0` |
| `bg_puzzle_bubble_room` | `background/puzzle` | `atlas_puzzle_cleaning` | PuzzleScreen atmosphere/background base | `P0` |
| `bg_reveal_steam_stage` | `background/reveal` | `atlas_result_reveal` | RevealScreen / CatEncounter stage | `P0` |
| `cat_body_round_cream` | `cat/body` | `atlas_cat_common` | first MVP cat body | `P0` |
| `cat_pattern_calico_soft` | `cat/pattern` | `atlas_cat_common` | first visible pattern overlay | `P0` |
| `cat_eyes_gentle_green` | `cat/eyes` | `atlas_cat_common` | first gentle expression | `P0` |
| `cat_mouth_tiny_smile` | `cat/mouth` | `atlas_cat_common` | first calm mouth | `P0` |
| `cat_tail_curve_cream` | `cat/tail` | `atlas_cat_common` | first tail layer | `P0` |
| `cat_accessory_head_towel` | `cat/accessory` | `atlas_cat_common` | towel/accessory slot test | `P0` |
| `cat_dirt_muddy_overlay` | `cat/dirt` | `atlas_cat_fx` | dirty rescued state / wash reveal | `P0` |
| `cat_effect_bath_bubbles` | `cat/effect` | `atlas_cat_fx` | bath / washing / bubble overlay | `P0` |
| `effect_steam_wisps_soft` | `effects/steam` | `atlas_result_reveal` / `atlas_home_environment` | Home atmosphere and reveal masking | `P0` |
| `effect_steam_fog_layer` | `effects/steam` | `atlas_result_reveal` | CatEncounter / Result transition mist | `P1` |
| `effect_sparkles_warm_set` | `effects/sparkles` | `atlas_result_reveal` | gentle reveal / recipe sparkle | `P1` |
| `effect_bubbles_small_set` | `effects/bubbles` | `atlas_puzzle_cleaning` / `atlas_cat_fx` | puzzle bubbles and washing feel | `P0` |
| `ui_button_main_tan` | `ui/buttons` | `atlas_ui_common` | Explore CTA, Result CTA | `P0` |
| `ui_button_sub_cream` | `ui/buttons` | `atlas_ui_common` | secondary actions | `P1` |
| `ui_panel_paper_large` | `ui/panels` | `atlas_ui_common` | Result, CatDetail, modal panels | `P0` |
| `ui_panel_wood_header` | `ui/panels` | `atlas_ui_common` | screen headers / section labels | `P0` |
| `ui_icon_home` | `ui/icons` | `atlas_ui_common` | Home navigation / return | `P0` |
| `ui_icon_bath` | `ui/icons` | `atlas_ui_common` | Explore/Puzzle navigation | `P0` |
| `ui_icon_cat_face` | `ui/icons` | `atlas_ui_common` | CatDetail / CatDex / cat reward | `P0` |
| `furniture_onsen_tub_large` | `furniture/onsen` | `atlas_home_environment` | Home bath focal prop if background is decomposed | `P1` |
| `furniture_onsen_stool_bucket` | `furniture/onsen` | `atlas_home_environment` | first cat inspect/furniture interaction | `P1` |
| `furniture_onsen_lantern` | `furniture/onsen` | `atlas_home_environment` | Home warmth / atmosphere upgrade | `P1` |
| `furniture_interior_cat_bed` | `furniture/interior` | `atlas_home_environment` | sleep behavior interaction point | `P1` |

## 6. Required New Manifest Candidates

These assets appear necessary for MVP implementation but are not yet represented clearly in `assets/asset_manifest.json`.

Do not add them blindly. Review names and scope before manifest update.

| Proposed id | Type | System | Screen(s) | Atlas domain | Priority | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `bg_title_onsen_entry` | image | title/loading | TitleScene | `atlas_home_environment` | `P1` | Can reuse Home background for earliest MVP if needed. |
| `puzzle_surface_onsen_water` | image | puzzle board | PuzzleScreen | `atlas_puzzle_cleaning` | `P0` | Hot spring surface; must not look like square grid. |
| `puzzle_dirt_leaf` | image | puzzle pieces | PuzzleScreen | `atlas_puzzle_cleaning` | `P0` | Basic satisfying dirt piece. |
| `puzzle_dirt_mud` | image | puzzle pieces | PuzzleScreen | `atlas_puzzle_cleaning` | `P0` | Heavy cleaning-feel piece. |
| `puzzle_dirt_moss` | image | puzzle pieces | PuzzleScreen | `atlas_puzzle_cleaning` | `P0` | Sticky onsen-feel piece. |
| `puzzle_dirt_flower` | image | puzzle pieces | PuzzleScreen | `atlas_puzzle_cleaning` | `P1` | Seasonal soft piece; can be P1 if MVP uses three dirt types. |
| `puzzle_obstacle_rock_round` | image | puzzle obstacle | PuzzleScreen | `atlas_puzzle_cleaning` | `P0` | Fixed scenery obstacle, never metallic. |
| `puzzle_bubble_projectile_soft` | image | puzzle input | PuzzleScreen | `atlas_puzzle_cleaning` | `P0` | Bubble launched from bottom. |
| `puzzle_aim_arrow_soft` | image | puzzle input | PuzzleScreen | `atlas_puzzle_cleaning` | `P0` | Gentle aiming affordance, no combat arrow style. |
| `puzzle_zabaa_water_flow` | image/animation | puzzle refresh | PuzzleScreen / Result transition | `atlas_puzzle_cleaning` | `P0` | Manual refresh and clear transition. |
| `puzzle_mission_tag_wood` | image | puzzle UI | PuzzleScreen | `atlas_ui_common` | `P1` | Could be DOM/CSS first; asset if visual polish needed. |
| `result_icon_furniture_material` | image | reward presentation | ResultScreen | `atlas_result_reveal` | `P0` | Tier 1 material result. |
| `result_icon_onsen_material` | image | reward presentation | ResultScreen | `atlas_result_reveal` | `P0` | Tier 1 material result. |
| `result_icon_bubble_reward` | image | reward presentation | ResultScreen | `atlas_result_reveal` | `P1` | Tier 1 bubble-related reward. |
| `result_icon_recipe_scroll` | image | reward presentation | ResultScreen | `atlas_result_reveal` | `P0` | Tier 2 recipe result. |
| `result_badge_cat_encounter` | image | cat reward | ResultScreen / RevealScreen | `atlas_result_reveal` | `P1` | Keep subtle; no gacha language. |
| `cat_silhouette_round_soft` | image | cat reveal | RevealScreen | `atlas_result_reveal` | `P0` | Steam silhouette before reveal. |
| `cat_shadow_reflection_soft` | image | cat encounter | ResultScreen / RevealScreen | `atlas_result_reveal` | `P1` | Water reflection hint. |
| `cat_effect_steam_overlay_soft` | image | cat atmosphere / reveal masking | HomeScreen / ResultScreen / RevealScreen / CatDetailScreen | `atlas_cat_fx` | `P0` | Dedicated warm steam overlay for air, depth, and masking; separate from bath bubbles. |
| `ui_icon_album` | image | support nav | HomeScreen / Album placeholder | `atlas_ui_common` | `P1` | Secondary nav. |
| `ui_icon_craft` | image | support nav | HomeScreen / Craft placeholder | `atlas_ui_common` | `P1` | Secondary nav. |
| `ui_icon_bag` | image | support nav | HomeScreen / Bag placeholder | `atlas_ui_common` | `P1` | Secondary nav. |
| `ui_badge_attention_small` | image | attention flags | HomeScreen / support nav | `atlas_ui_common` | `P1` | Small calm badges only. |
| `ui_safe_header_strip` | image/CSS | layout shell | all screens | `atlas_ui_common` | `P1` | Could be CSS; asset only if needed for wood texture. |
| `ui_bottom_nav_wood_base` | image/CSS | layout shell | HomeScreen | `atlas_ui_common` | `P1` | Must sit above ad reserve. |
| `audio_bell_cat_encounter` | audio | cat encounter | ResultScreen / RevealScreen | audio group | `P0` | Signature soft bell cue. |
| `audio_water_ambience_soft` | audio | ambience | HomeScreen / PuzzleScreen | audio group | `P1` | Gentle loop; can be deferred if audio scope is not MVP. |
| `audio_bubble_pop_soft` | audio | puzzle feedback | PuzzleScreen | audio group | `P1` | Soft, non-arcade. |
| `audio_zabaa_water_flow` | audio | puzzle refresh | PuzzleScreen / Result transition | audio group | `P1` | Comforting water replacement cue. |

## 7. Screen-Based Inventory

### TitleScene

| Asset id | System | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `bg_title_onsen_entry` | title/loading background | `atlas_home_environment` | `P1` | proposed |
| `ui_button_main_tan` | Tap to Start CTA | `atlas_ui_common` | `P0` | in manifest |
| `ui_panel_wood_header` | title/event/notice tag | `atlas_ui_common` | `P1` | in manifest |
| `effect_steam_wisps_soft` | warm loading atmosphere | `atlas_home_environment` | `P1` | in manifest |

MVP fallback:

- TitleScene can reuse `bg_home_bathhouse_main` if a dedicated title background is not available.

### HomeScreen

| Asset id | System | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `bg_home_bathhouse_main` | Home observation background | `atlas_home_environment` | `P0` | in manifest |
| `cat_body_round_cream` | active cat body layer | `atlas_cat_common` | `P0` | in manifest |
| `cat_pattern_calico_soft` | active cat pattern layer | `atlas_cat_common` | `P0` | in manifest |
| `cat_eyes_gentle_green` | active cat eyes layer | `atlas_cat_common` | `P0` | in manifest |
| `cat_mouth_tiny_smile` | active cat mouth layer | `atlas_cat_common` | `P0` | in manifest |
| `cat_tail_curve_cream` | active cat tail layer | `atlas_cat_common` | `P0` | in manifest |
| `cat_accessory_head_towel` | towel/accessory test | `atlas_cat_common` | `P0` | in manifest |
| `effect_steam_wisps_soft` | Home atmosphere overlay | `atlas_home_environment` | `P0` | in manifest |
| `furniture_onsen_lantern` | atmosphere change / warm light | `atlas_home_environment` | `P1` | in manifest |
| `furniture_onsen_stool_bucket` | inspect interaction point | `atlas_home_environment` | `P1` | in manifest |
| `furniture_interior_cat_bed` | sleep interaction point | `atlas_home_environment` | `P1` | in manifest |
| `ui_button_main_tan` | Explore CTA | `atlas_ui_common` | `P0` | in manifest |
| `ui_icon_home` | home nav/icon | `atlas_ui_common` | `P0` | in manifest |
| `ui_icon_bath` | Explore/bath icon | `atlas_ui_common` | `P0` | in manifest |
| `ui_icon_cat_face` | CatDex/CatDetail nav | `atlas_ui_common` | `P0` | in manifest |
| `ui_icon_album` | Album nav | `atlas_ui_common` | `P1` | proposed |
| `ui_icon_craft` | Craft nav | `atlas_ui_common` | `P1` | proposed |
| `ui_icon_bag` | Inventory/Bag nav | `atlas_ui_common` | `P1` | proposed |
| `ui_badge_attention_small` | reward reflection badge | `atlas_ui_common` | `P1` | proposed |

Home asset rules:

- Keep the Home background mostly static.
- Animate small overlays only: steam, lantern glow, water shimmer.
- Limit MVP Home to 3 visible active cats max.
- Use calm badges for reward reflection, not large popups.

### PuzzleScreen

| Asset id | System | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `bg_puzzle_bubble_room` | Puzzle atmosphere background | `atlas_puzzle_cleaning` | `P0` | in manifest |
| `puzzle_surface_onsen_water` | board surface | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_dirt_leaf` | dirt piece | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_dirt_mud` | dirt piece | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_dirt_moss` | dirt piece | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_dirt_flower` | dirt piece | `atlas_puzzle_cleaning` | `P1` | proposed |
| `puzzle_obstacle_rock_round` | fixed obstacle | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_bubble_projectile_soft` | launched bubble | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_aim_arrow_soft` | aiming affordance | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_zabaa_water_flow` | ZABAA refresh/transition | `atlas_puzzle_cleaning` | `P0` | proposed |
| `effect_bubbles_small_set` | bubble pop/wash feedback | `atlas_puzzle_cleaning` | `P0` | in manifest |
| `effect_steam_wisps_soft` | constant steam | `atlas_puzzle_cleaning` | `P0` | in manifest |
| `effect_steam_fog_layer` | Result transition fog | `atlas_puzzle_cleaning` | `P1` | in manifest |
| `ui_panel_wood_header` | mission header | `atlas_ui_common` | `P0` | in manifest |
| `ui_button_sub_cream` | pause/retire secondary UI | `atlas_ui_common` | `P1` | in manifest |
| `puzzle_mission_tag_wood` | mission chip | `atlas_ui_common` | `P1` | proposed |

Puzzle asset rules:

- Board must feel like hot spring surface, not a visible grid.
- Rocks must feel like scenery, not metal blocks.
- Dirt pieces should look natural: leaf, mud, moss, flower.
- Bubble and ZABAA effects should feel like washing, not attack.
- Steam should always exist but remain readable.

### ResultScreen

| Asset id | System | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `ui_panel_paper_large` | Result panel | `atlas_ui_common` | `P0` | in manifest |
| `ui_button_main_tan` | Home/continue CTA | `atlas_ui_common` | `P0` | in manifest |
| `ui_button_sub_cream` | optional secondary CTA | `atlas_ui_common` | `P1` | in manifest |
| `result_icon_furniture_material` | Tier 1 material result | `atlas_result_reveal` | `P0` | proposed |
| `result_icon_onsen_material` | Tier 1 material result | `atlas_result_reveal` | `P0` | proposed |
| `result_icon_bubble_reward` | Tier 1 support result | `atlas_result_reveal` | `P1` | proposed |
| `result_icon_recipe_scroll` | Tier 2 recipe result | `atlas_result_reveal` | `P0` | proposed |
| `effect_steam_wisps_soft` | Result transition softness | `atlas_result_reveal` | `P0` | in manifest |
| `effect_sparkles_warm_set` | recipe/reveal accent | `atlas_result_reveal` | `P1` | in manifest |
| `result_badge_cat_encounter` | cat encounter hint | `atlas_result_reveal` | `P1` | proposed |

Result asset rules:

- ResultPresentation is display-only.
- Tier 1 and Tier 2 should be short and calm.
- Cat reward should not use loud gacha/SSR language.
- Reward icons must point back to Home growth, Craft, Bag, CatDex, or Event.

### RevealScreen

| Asset id | System | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `bg_reveal_steam_stage` | reveal background | `atlas_result_reveal` | `P0` | in manifest |
| `cat_silhouette_round_soft` | pre-reveal silhouette | `atlas_result_reveal` | `P0` | proposed |
| `cat_shadow_reflection_soft` | water reflection hint | `atlas_result_reveal` | `P1` | proposed |
| `effect_steam_fog_layer` | reveal masking | `atlas_result_reveal` | `P0` | in manifest |
| `effect_bubbles_large_pop` | gentle bubble reveal | `atlas_result_reveal` | `P1` | in manifest |
| `effect_sparkles_warm_set` | gentle reveal sparkle | `atlas_result_reveal` | `P1` | in manifest |
| `cat_effect_reveal_glow` | cat-specific reveal glow | `atlas_cat_fx` | `P1` | in manifest |
| `cat_effect_steam_overlay_soft` | cat steam/depth overlay | `atlas_cat_fx` | `P0` | proposed |
| `cat_body_round_cream` | revealed cat body | `atlas_cat_common` | `P0` | in manifest |
| `cat_pattern_calico_soft` | revealed cat pattern | `atlas_cat_common` | `P0` | in manifest |
| `cat_eyes_gentle_green` | revealed cat eyes | `atlas_cat_common` | `P0` | in manifest |
| `cat_mouth_tiny_smile` | revealed cat mouth | `atlas_cat_common` | `P0` | in manifest |
| `cat_tail_curve_cream` | revealed cat tail | `atlas_cat_common` | `P0` | in manifest |
| `audio_bell_cat_encounter` | cat encounter cue | audio group | `P0` | proposed |

Reveal asset rules:

- CatEncounter uses atmosphere: bell, steam shift, silence, shadow.
- Do not place ads between CatEncounter and CatResult.
- Reveal FX should be short, low contrast, and face-readable.

### CatDetailScreen

| Asset id | System | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `ui_panel_paper_large` | detail panel | `atlas_ui_common` | `P0` | in manifest |
| `ui_panel_wood_header` | section label/header | `atlas_ui_common` | `P0` | in manifest |
| `ui_button_main_tan` | return/care/send-off CTA | `atlas_ui_common` | `P0` | in manifest |
| `ui_button_sub_cream` | secondary actions | `atlas_ui_common` | `P1` | in manifest |
| `ui_icon_cat_face` | cat detail identity icon | `atlas_ui_common` | `P0` | in manifest |
| first MVP cat layer set | cat visual | `atlas_cat_common` | `P0` | in manifest |
| `cat_effect_bath_bubbles` | bath/washing bubble overlay | `atlas_cat_fx` | `P1` | in manifest |
| `cat_effect_steam_overlay_soft` | warm steam / depth overlay | `atlas_cat_fx` | `P0` | proposed |

CatDetail asset rules:

- CatDetail reads the saved CatInstance.
- It must show the same cat as Result/Reveal/Home.
- Do not save image paths, rendered cache, current animation frame, or Home position.

### Tier 2 Support Screens

MVP may include lightweight connected placeholders for Album/CatDex, OnsenEdit, and Inventory.

| Asset id | System | Screen(s) | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- | --- |
| `ui_panel_paper_large` | support panel | Album/CatDex/Inventory/Craft | `atlas_ui_common` | `P1` | in manifest |
| `ui_icon_cat_face` | CatDex | CatDexScreen | `atlas_ui_common` | `P1` | in manifest |
| `ui_icon_album` | Album | AlbumScreen | `atlas_ui_common` | `P1` | proposed |
| `ui_icon_craft` | Craft/Edit | OnsenEdit/Craft | `atlas_ui_common` | `P1` | proposed |
| `ui_icon_bag` | Inventory | InventoryScreen | `atlas_ui_common` | `P1` | proposed |
| `ui_badge_attention_small` | attention flags | support nav | `atlas_ui_common` | `P1` | proposed |

Tier 2 support rule:

- These screens should prove connection to rewards, not full catalog depth.

## 8. System-Based Inventory

### CatGenerator / CatInstance

| Asset id | Slot | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `cat_body_round_cream` | `spriteLayerIds.body` | `atlas_cat_common` | `P0` | in manifest |
| `cat_pattern_calico_soft` | `spriteLayerIds.pattern` | `atlas_cat_common` | `P0` | in manifest |
| `cat_eyes_gentle_green` | `spriteLayerIds.eyes` | `atlas_cat_common` | `P0` | in manifest |
| `cat_mouth_tiny_smile` | mouth layer, if used by renderer | `atlas_cat_common` | `P0` | in manifest |
| `cat_tail_curve_cream` | `spriteLayerIds.tail` | `atlas_cat_common` | `P0` | in manifest |
| `cat_accessory_head_towel` | `spriteLayerIds.towel` or accessory slot | `atlas_cat_common` | `P0` | in manifest |
| `cat_effect_steam_overlay_soft` | `spriteLayerIds.steamOverlay` | `atlas_cat_fx` | `P0` | proposed |
| `cat_effect_bath_bubbles` | bath / washing bubble overlay | `atlas_cat_fx` | `P0` | in manifest |
| `cat_anim_round_idle_soft` | `animationSetIds.idle` | `atlas_cat_animation_round` | `P0` | proposed |
| `cat_anim_round_walk_slow` | `animationSetIds.walk` | `atlas_cat_animation_round` | `P0` | proposed |
| `cat_anim_round_sit_settle` | `animationSetIds.sit` | `atlas_cat_animation_round` | `P1` | proposed |
| `cat_anim_round_sleep_breathe` | `animationSetIds.sleep` | `atlas_cat_animation_round` | `P0` | proposed |
| `cat_anim_round_bathe_relax` | `animationSetIds.bathe` | `atlas_cat_animation_round` | `P0` | proposed |
| `cat_anim_round_look_gentle` | `animationSetIds.look` | `atlas_cat_animation_round` | `P1` | proposed |

Notes:

- `body`, `pattern`, `tail`, and `eyes` are synchronized layers.
- `towel` and `steamOverlay` are lightweight overlays.
- `cat_effect_bath_bubbles` is for bath, washing, and bubble feeling.
- `cat_effect_steam_overlay_soft` is for warm air, depth, CatEncounter, Reveal masking, and soft ambience.
- Do not animate every layer at high frame count.

### HomeRuntime

| Asset id | Purpose | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `bg_home_bathhouse_main` | static Home scene | `atlas_home_environment` | `P0` | in manifest |
| `effect_steam_wisps_soft` | low-frequency atmosphere | `atlas_home_environment` | `P0` | in manifest |
| `furniture_onsen_lantern` | warm light interaction/atmosphere | `atlas_home_environment` | `P1` | in manifest |
| `furniture_onsen_stool_bucket` | inspect interaction point | `atlas_home_environment` | `P1` | in manifest |
| `furniture_interior_cat_bed` | sleep interaction point | `atlas_home_environment` | `P1` | in manifest |

### Puzzle System

| Asset id | Purpose | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `bg_puzzle_bubble_room` | background | `atlas_puzzle_cleaning` | `P0` | in manifest |
| `puzzle_surface_onsen_water` | board surface | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_dirt_leaf` | dirt type | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_dirt_mud` | dirt type | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_dirt_moss` | dirt type | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_obstacle_rock_round` | fixed obstacle | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_bubble_projectile_soft` | player bubble | `atlas_puzzle_cleaning` | `P0` | proposed |
| `puzzle_zabaa_water_flow` | refresh / result transition | `atlas_puzzle_cleaning` | `P0` | proposed |

### ResultPresentation

| Asset id | Purpose | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `result_icon_furniture_material` | Tier 1 result | `atlas_result_reveal` | `P0` | proposed |
| `result_icon_onsen_material` | Tier 1 result | `atlas_result_reveal` | `P0` | proposed |
| `result_icon_recipe_scroll` | Tier 2 result | `atlas_result_reveal` | `P0` | proposed |
| `effect_steam_wisps_soft` | transition softness | `atlas_result_reveal` | `P0` | in manifest |
| `effect_sparkles_warm_set` | recipe/reveal accent | `atlas_result_reveal` | `P1` | in manifest |

### UI Shell / Ad-Safe Layout

| Asset id | Purpose | Atlas domain | Priority | Status |
| --- | --- | --- | --- | --- |
| `ui_button_main_tan` | primary CTA | `atlas_ui_common` | `P0` | in manifest |
| `ui_button_sub_cream` | secondary CTA | `atlas_ui_common` | `P1` | in manifest |
| `ui_panel_paper_large` | panels/modals | `atlas_ui_common` | `P0` | in manifest |
| `ui_panel_wood_header` | headers/tags | `atlas_ui_common` | `P0` | in manifest |
| `ui_icon_home` | nav | `atlas_ui_common` | `P0` | in manifest |
| `ui_icon_bath` | nav/explore | `atlas_ui_common` | `P0` | in manifest |
| `ui_icon_cat_face` | cat nav/detail | `atlas_ui_common` | `P0` | in manifest |
| `ui_badge_attention_small` | quiet reward hint | `atlas_ui_common` | `P1` | proposed |

## 9. Atlas-Domain Checklist

### `atlas_cat_common`

P0:

- `cat_body_round_cream`
- `cat_pattern_calico_soft`
- `cat_eyes_gentle_green`
- `cat_mouth_tiny_smile`
- `cat_tail_curve_cream`
- `cat_accessory_head_towel`

P1:

- `cat_body_round_gray`
- `cat_pattern_tabby_brown`
- `cat_eyes_sleepy_amber`
- `cat_accessory_red_ribbon`

### `atlas_cat_animation_round`

P0:

- `cat_anim_round_idle_soft`
- `cat_anim_round_walk_slow`
- `cat_anim_round_sleep_breathe`
- `cat_anim_round_bathe_relax`

P1:

- `cat_anim_round_sit_settle`
- `cat_anim_round_look_gentle`

### `atlas_cat_fx`

P0:

- `cat_dirt_muddy_overlay`
- `cat_effect_bath_bubbles`
- `cat_effect_steam_overlay_soft`

P1:

- `cat_effect_reveal_glow`
- `cat_dirt_soot_cloud_overlay`

### `atlas_home_environment`

P0:

- `bg_home_bathhouse_main`
- `effect_steam_wisps_soft`

P1:

- `furniture_onsen_lantern`
- `furniture_onsen_stool_bucket`
- `furniture_interior_cat_bed`
- `bg_title_onsen_entry`

### `atlas_puzzle_cleaning`

P0:

- `bg_puzzle_bubble_room`
- `puzzle_surface_onsen_water`
- `puzzle_dirt_leaf`
- `puzzle_dirt_mud`
- `puzzle_dirt_moss`
- `puzzle_obstacle_rock_round`
- `puzzle_bubble_projectile_soft`
- `puzzle_aim_arrow_soft`
- `puzzle_zabaa_water_flow`
- `effect_bubbles_small_set`
- `effect_steam_wisps_soft`

P1:

- `puzzle_dirt_flower`
- `effect_steam_fog_layer`
- `puzzle_mission_tag_wood`

### `atlas_result_reveal`

P0:

- `bg_reveal_steam_stage`
- `result_icon_furniture_material`
- `result_icon_onsen_material`
- `result_icon_recipe_scroll`
- `cat_silhouette_round_soft`
- `effect_steam_fog_layer`
- `effect_steam_wisps_soft`

P1:

- `result_icon_bubble_reward`
- `result_badge_cat_encounter`
- `cat_shadow_reflection_soft`
- `effect_bubbles_large_pop`
- `effect_sparkles_warm_set`

### `atlas_ui_common`

P0:

- `ui_button_main_tan`
- `ui_panel_paper_large`
- `ui_panel_wood_header`
- `ui_icon_home`
- `ui_icon_bath`
- `ui_icon_cat_face`

P1:

- `ui_button_sub_cream`
- `ui_icon_album`
- `ui_icon_craft`
- `ui_icon_bag`
- `ui_badge_attention_small`
- `ui_safe_header_strip`
- `ui_bottom_nav_wood_base`

## 10. Priority-Based MVP Cut

### P0 Must Exist Before MVP Runtime Assembly

- one Home background
- one Puzzle background
- one Reveal background
- one complete round cat static layer set
- one dirty overlay
- one bath bubble overlay
- one dedicated cat steam overlay
- four essential cat animation ids: idle, walk, sleep, bathe
- puzzle board surface
- three dirt pieces: leaf, mud, moss
- one rock obstacle
- one bubble projectile
- one aim affordance
- one ZABAA water flow effect
- Tier 1 material icons: furniture, onsen
- Tier 2 recipe icon
- core UI button, panel, header, and three icons
- soft cat encounter bell cue

### P1 Nice For First Emotional Review

- recipe sparkle accent
- bubble support reward icon
- cat silhouette reflection
- Album/Craft/Bag icons
- attention badge
- first furniture interaction props
- sit/look animations
- water ambience and bubble/ZABAA sounds

### P2 Defer Until After MVP Loop

- additional body colors
- additional rare/fantasy cat variants
- seasonal backgrounds
- extra furniture catalog
- multiple Home area variations
- advanced Result FX
- full support screen icon libraries

## 11. Manifest Update Guidance

When this inventory is approved, update `assets/asset_manifest.json` in a separate task.

Recommended manifest update rules:

- add proposed `P0` assets first
- do not add all `P1`/`P2` assets at once
- include `atlasDomain` only after the manifest metadata shape is approved
- keep ids stable and lowercase snake_case
- keep future paths under `assets/images/` for images
- keep audio ids stable even if final audio file paths are decided later

Do not store asset file paths in SaveData. Save stores stable ids only.

## 12. Open Questions

- Should MVP Puzzle use three dirt types or four?
- Should `cat_effect_steam_overlay_soft` be a full `768x768` cat-canvas overlay, or a smaller reusable overlay with attachment/offset metadata?
- Should `ui_icon_album`, `ui_icon_craft`, and `ui_icon_bag` be image assets or lucide/DOM icons in MVP?
- Should TitleScene reuse `bg_home_bathhouse_main` for MVP?
- Should CatDex thumbnails be live layered cats or precomposed static thumbnails?
- Should audio assets be included in the first MVP asset manifest update, or tracked in a separate audio manifest later?
