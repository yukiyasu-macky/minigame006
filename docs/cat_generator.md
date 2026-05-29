# Cat Generator Design

This document defines the planning direction for `CatGenerator`.

This is pre-implementation planning only. Do not implement CatGenerator, Cat AI, rendering, save systems, ResultScreen, HomeRuntime, or UI components from this document yet.

## 1. Purpose

`CatGenerator` is not an image generator.

`CatGenerator` is a systems-side generator that decides the stable cat individual that will live in Home after a Tier 3 cat reward.

It creates the data needed for:

- Result/CatEncounter display
- CatResult / CatDetail
- CatDex species discovery
- Home instance behavior
- future save migration
- renderer lookup through manifest ids

It does not:

- render images
- create actual image files
- store image paths
- store rendered image cache
- choose current animation frame
- choose current Home position
- run Home behavior AI
- apply SavePatch
- own ResultScreen UI

## 2. Source Documents

CatGenerator planning should stay aligned with:

- `docs/result_reward_mapping.md`
- `docs/data_schema.md`
- `docs/sprite_spec.md`
- `docs/home_growth.md`
- `docs/home_layout.md`
- `assets/asset_manifest.json`

## 3. Core Flow

```text
PuzzleStart
  -> RunReward is decided
  -> if rewardTier == Tier3:
       RunReward contains catSeed / catSpeciesId / catRarity
  -> PuzzlePlay
  -> PuzzleClear
  -> CatEncounter cue
  -> CatGenerator resolves display-ready CatInstance data
  -> SavePatch includes finalized catInstance
  -> CatResult / CatDetail
  -> Home reflects the same CatInstance
  -> CatDex records species discovery
```

The cat should feel like it was already present in the mist during exploration, not randomly created after ResultScreen.

## 4. Responsibility Boundaries

### CatGenerator

- accepts Tier 3 cat reward inputs
- resolves species/rarity/seed into a stable `CatInstance`
- selects or references personality, quirks, favorite theme, sprite layer ids, and animation set ids
- prepares persistence-ready cat data
- does not render
- does not apply save
- does not choose current Home position or current animation frame

### RewardRoll / RunReward

- decides that the current run is a Tier 3 cat reward
- provides `runId`
- provides `catSeed`
- may provide `catSpeciesId`
- may provide `catRarity`
- does not create rendered cat assets

### SavePatch

- persists finalized `CatInstance`
- updates CatDex species discovery
- remains idempotent by `runId`
- does not contain presentation-only state

### Renderer

- resolves `spriteLayerIds` and `animationSetIds` through `assets/asset_manifest.json` or future asset config
- draws the cat
- does not decide species/personality/save identity
- does not store rendered cache in SaveData

### HomeRuntime

- uses `CatInstance` to decide current behavior state
- chooses current Home position
- chooses current animation state/frame
- can use personality/quirks/favoriteTheme as behavior hints
- does not mutate stable identity during rendering

### CatDex

- records species-level discovery
- does not own individual Home behavior
- does not replace `CatInstance`

## 5. Species Master Vs CatInstance

Use two separate concepts.

`CatSpeciesMaster`:

- species-level definition
- used by CatDex
- controls available sprite pools, rarity, hints, and possible traits
- can be shared by many possible instances over time

`CatInstance`:

- individual cat the player encountered
- used by Home, CatDetail, adoption, and memory systems
- has stable seed and selected ids
- persists as a saved entity

Rule:

- CatDex is species-based.
- Home is instance-based.

## 6. CatSpeciesMaster Minimum Shape

Planning shape:

```text
CatSpeciesMaster {
  speciesId
  displayName
  rarity
  baseBodyType
  personalityPool
  quirkPool
  favoriteThemePool
  spriteLayerPool
  animationSetPool
  dexHint?
}
```

Notes:

- `speciesId` is the stable CatDex key.
- `spriteLayerPool` provides valid asset id candidates.
- `animationSetPool` provides valid animation set id candidates.
- MVP can keep pools small.

## 7. CatInstance Minimum Shape

Required minimum fields:

```text
CatInstance {
  catInstanceId
  speciesId
  seed
  rarity
  personality
  quirks
  favoriteTheme
  spriteLayerIds
  animationSetIds
  discoveredAt
  sourceRunId
  lifecycleState
}
```

`spriteLayerIds` minimum:

```text
spriteLayerIds {
  body
  pattern
  eyes
  tail
  accessory
  towel
  steamOverlay
}
```

`animationSetIds` minimum:

```text
animationSetIds {
  idle
  walk
  sit
  sleep
  bathe
  look
}
```

Save stable ids only.

Do not save:

- current animation frame
- current Home position
- rendered image cache
- file path
- animation cache
- temporary reveal effects

## 8. Seed And Determinism

`seed` should allow the same cat identity to be recreated from stable data.

Use seed for:

- selecting personality
- selecting quirks
- selecting favorite theme
- selecting sprite layer ids from valid pools
- selecting animation set ids from valid pools

Do not rely on seed alone for save identity. Persist the selected stable ids once finalized so future asset/config changes do not unexpectedly rewrite an existing cat.

## 9. Personality

`personality` is a stable individual trait.

MVP usage:

- CatDetail display
- CatDex record flavor
- light future behavior hint

Examples:

- `calm`
- `shy`
- `curious`
- `sleepy`

Do not make personality a complex gameplay modifier in MVP.

## 10. Quirks

`quirks` are small individual traits.

MVP usage:

- CatDetail flavor
- CatDex record flavor
- future Home behavior weighting

Examples:

- `likes_warm_spots`
- `watches_steam`
- `naps_near_lantern`
- `inspects_bucket`

MVP can use zero to two quirks per cat.

## 11. Favorite Theme

`favoriteTheme` connects cats to Home growth and atmosphere.

MVP usage:

- CatDetail flavor
- future preference display
- future behavior weighting around matching themes

Examples:

- `default_onsen`
- `cherry_blossom`
- `lantern_evening`
- `garden`

Do not require favoriteTheme to affect gameplay in MVP.

## 12. Sprite Layer IDs

`spriteLayerIds` are stable asset ids, not file paths.

Renderer resolves them through `assets/asset_manifest.json` or future asset config.

Minimum slots:

- `body`
- `pattern`
- `eyes`
- `tail`
- `accessory`
- `towel`
- `steamOverlay`

Rules:

- Store asset ids only.
- Do not store image paths.
- Do not store generated image files.
- Do not store rendered cache.
- Layer order remains defined by `docs/sprite_spec.md` or future render config.

## 13. Animation Set IDs

`animationSetIds` are stable ids for animation groups.

Renderer and HomeRuntime use them to resolve available motions.

Minimum slots:

- `idle`
- `walk`
- `sit`
- `sleep`
- `bathe`
- `look`

Rules:

- Store animation set ids only.
- Do not store current animation frame.
- Do not store animation cache.
- Do not store temporary transition state.

MVP behavior AI can stay shallow, but animation set ids should exist from the start so Home can eventually show the same cat walking, sitting, sleeping, and entering the hot spring.

## 14. Lifecycle State

Use `lifecycleState` for persistent cat lifecycle.

Possible planning values:

- `new`
- `staying`
- `adoption_requested`
- `adopted`
- `auto_adopted`

Do not use `lifecycleState` for transient animation or Home position.

## 15. Duplicate Avoidance

Cats should basically not duplicate.

Rules:

- Prefer undiscovered species when possible.
- Avoid duplicate-pull frustration.
- Treat cats as encounters, not gacha duplicates.
- CatDex tracks species discovery.
- Home tracks individual instances.

Future versions may allow multiple instances of the same species, but MVP should bias strongly toward new species discovery.

## 16. CatDex Integration

CatDex records species-level discovery.

When a CatInstance is saved:

- mark `speciesId` discovered in CatDex
- update rare record if applicable
- optionally record personality/quirk discovery

CatDex should not store rendered image caches or Home runtime positions.

## 17. Home Integration

Home uses `CatInstance`.

The same saved cat should be able to:

- walk
- sit
- sleep
- use hot spring
- look around

HomeRuntime decides:

- current position
- current behavior state
- current animation frame
- current animation transition

These are runtime/transient concerns and should not be saved as stable CatInstance fields.

## 18. SavePatch Integration

Before `CatResult` display, `SavePatch` should include the finalized `CatInstance`.

SavePatch should include:

```text
SavePatch {
  runId
  rewardTier: Tier3
  rewardType: cat
  catInstance
}
```

The patch must be idempotent by `runId`.

If the app reloads after SavePatch but before Result presentation, the saved cat must not be duplicated.

## 19. MVP Scope

MVP should include:

- `CatSpeciesMaster`
- `CatInstance`
- `catInstanceId`
- `speciesId`
- `seed`
- `rarity`
- `personality`
- `quirks`
- `favoriteTheme`
- `spriteLayerIds`
- `animationSetIds`
- `discoveredAt`
- `sourceRunId`
- `lifecycleState`
- CatDex species discovery update
- SavePatch integration
- duplicate avoidance preference

MVP can keep behavior AI shallow.

MVP does not need:

- advanced Home AI
- current position persistence
- current animation frame persistence
- complex naming algorithms
- complex theme affinity effects
- furniture compatibility math
- multiple pose variants beyond planned animation sets
- generated image creation
- Firebase-specific normalization

## 20. Future Expansion

Future systems may add:

- deeper Home behavior weighting
- name generation rules
- rare cat special rules
- theme affinity effects
- furniture interaction preferences
- adoption memory hooks
- multiple Home areas
- richer animation set pools

These should extend the stable instance/species split rather than replacing it.

## 21. Open Questions

- How are `catInstanceId` values generated from `runId` and seed?
- Should `catSpeciesId` always be known at PuzzleStart, or can it resolve during CatEncounter?
- What personality pool is required for MVP?
- What quirks are required for MVP?
- Which animation set ids map to the first MVP cat sprites?
- Should towel and steamOverlay be optional ids or explicit `null` when absent?
- How much CatDex personality/quirk history should MVP record?

