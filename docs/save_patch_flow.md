# Save Patch Flow

This document defines the planning flow for applying Puzzle reward save patches safely in あわねこ湯屋.

This is pre-implementation planning only. Do not implement persistence, runtime save adapters, React/Vite, ResultScreen, HomeScreen, ad SDK logic, asset loaders, audio loaders, rendering, or UI components from this document yet.

## 1. Purpose

The save patch flow protects the core rule:

```text
1 Puzzle play = 1 RunReward = 1 primary reward
```

The reward is decided at `PuzzleStart`, but it becomes player-owned only after the Puzzle run clears successfully.

`SavePatch` must:

- prevent duplicate reward grants
- prevent lost Result presentation
- survive ad interruption, reload, LIFF suspend, or app close
- keep persistent state separate from runtime presentation state
- preserve the calm Result -> Home emotional flow

## 2. Source Documents

This document should stay aligned with:

- `docs/result_reward_mapping.md`
- `docs/cat_generator.md`
- `docs/data_schema.md`
- `docs/home_growth.md`
- `docs/home_layout.md`
- `docs/ui_safe_area_spec.md`
- `assets/asset_manifest.json`

## 3. Core Flow

Planning flow:

```text
PuzzleStart
  -> create runId
  -> determine RunReward
  -> PuzzlePlay
  -> PuzzleClear
  -> create SavePatch
  -> apply SavePatch
  -> optional ad interruption
  -> generate ResultPresentation
  -> show Tier-based Result
  -> HomeReflection
```

`SavePatch` must be applied before:

- optional ad interruption
- `ResultPresentation`
- `HomeReflection`

If the run is abandoned or fails before the reward condition, no reward is granted and no `SavePatch` is applied.

## 4. RunSession State

`RunSession` is the minimum recovery state for one Puzzle run.

Planning shape:

```text
RunSession {
  runId
  rewardTier
  rewardType
  runState
  savePatchApplied
  resultPresentationSeen
  homeReflectionSeen
}
```

Planning `runState` values:

- `started`
- `cleared`
- `saveApplied`
- `resultShown`
- `homeReflected`
- `abandoned`

Purpose:

- prevent duplicate reward grants
- prevent missing Result presentation
- prevent repeated Home reflection moments
- recover safely from ad, reload, webview suspend, or app close

`RunSession` should store only recovery flags and stable ids. It should not store UI transition state, animation frames, or render/audio caches.

## 5. SavePatch Shape

Minimum planning shape:

```text
SavePatch {
  runId
  rewardTier
  rewardType
  inventoryDelta?
  recipeUnlock?
  catInstance?
  catDexUpdate?
  eventProgressDelta?
  attentionFlags?
}
```

Rules:

- `SavePatch` contains persistent state changes only.
- `SavePatch` must be idempotent by `runId`.
- `SavePatch` should be small and operation-confirmed.
- `SavePatch` should not contain Result text, animation data, UI transition state, temporary CatEncounter effects, or runtime caches.

## 6. Idempotency By `runId`

`SavePatch` application must check whether the `runId` has already been applied.

Recommended planning state:

```text
appliedRunIds: [runId]
```

If the same `runId` is applied twice, the second application must not duplicate:

- furniture materials
- onsen materials
- bubble-related support items
- recipe unlocks
- event progress
- CatInstance records
- CatDex species discovery
- attention flags

If a duplicated `runId` is detected, future runtime should return the already-applied saved result and continue recovery from `RunSession`.

## 7. Failure / Abandon Rules

The pre-decided `RunReward` is not player-owned until the run clears successfully.

Failure / abandon planning:

```text
PuzzleStart
  -> RunReward decided
  -> PuzzlePlay
  -> abandoned or failed before reward condition
  -> runState = abandoned
  -> do not create SavePatch
  -> do not apply SavePatch
  -> do not show Result reward
```

Abandoning a run must not grant hidden rewards, cat discoveries, recipe unlocks, or materials.

## 8. Resume / Reload Recovery

Most dangerous case:

```text
PuzzleClear
  -> SavePatch applied
  -> optional ad
  -> reload / crash / LIFF suspend
  -> Result not yet shown
```

Recovery rule:

```text
if savePatchApplied == true
and resultPresentationSeen == false:
  restore/show ResultPresentation again
```

If:

```text
resultPresentationSeen == true
and homeReflectionSeen == false:
  resume to HomeReflection
```

If:

```text
homeReflectionSeen == true:
  resume to Home without repeating reward moments
```

Recovery table:

| RunSession state | Recovery behavior |
| --- | --- |
| `started` | resume Puzzle if possible, or mark abandoned without reward if session cannot continue |
| `cleared` | create/apply pending `SavePatch` if it has not been applied |
| `saveApplied` | regenerate `ResultPresentation` from saved state and show Result |
| `resultShown` | route to Home/HomeReflection without applying SavePatch again |
| `homeReflected` | route to normal Home |
| `abandoned` | route to Home without reward |

`ResultPresentation` should be reconstructable from `RunReward`, applied persistent state, stable asset ids, and current player state.

## 9. Optional Ad Interruption

Ads may occur after `SavePatch` is applied and before Result presentation starts.

Preferred safe flow:

```text
PuzzleClear
  -> create SavePatch
  -> apply SavePatch
  -> optional ad interruption
  -> ResultPresentation
```

During popup/interstitial ads:

- pause gameplay
- pause timers
- pause animations
- pause reward flow
- disable gameplay input
- preserve `RunSession`

Avoid placing ads between:

```text
CatEncounter
  -> CatResult
```

Interrupting that sequence damages the quiet cat discovery moment.

For Tier 3, visible CatEncounter is considered part of the Result sequence. If an optional ad is scheduled, future runtime should either:

- apply the Cat `SavePatch`, show the ad, then start visible CatEncounter; or
- defer the ad until after CatResult / CatDetail / Home return

Do not start CatEncounter, interrupt it with an ad, and then resume CatResult.

## 10. Cat Special Flow

Cat rewards are Tier 3 and use special presentation.

Planning flow:

```text
PuzzleClear
  -> CatEncounter cue
  -> resolve display-ready CatInstance
  -> SavePatch includes finalized catInstance
  -> CatResult
  -> CatReveal / CatDetail if needed
  -> Home
```

Rules:

- CatEncounter may hide lightweight CatGenerator resolve time.
- `CatResult` must show the same saved `CatInstance`.
- Home must show the same saved `CatInstance`.
- CatDex records species discovery by `speciesId`.
- Do not save rendered image cache.
- Do not save current Home position.
- Do not save current animation frame.
- Do not save temporary reveal effects.

Cat reward `SavePatch` must be applied before `CatResult` display. If reload occurs after the patch but before Result is seen, recovery must show the saved cat result again without creating a duplicate cat.

If an ad is required before Result presentation, the visible CatEncounter cue should not begin until the ad has closed.

## 11. ResultPresentation Boundary

`ResultPresentation` is display-only.

It can contain:

- title
- flavor text
- reward icon id
- cat display reference
- CTA label
- `soundCueId`
- Home attention hint

It must not:

- calculate rewards
- apply save
- unlock recipes
- mutate inventory
- create persistent cat state
- store runtime render/audio cache

`ResultPresentation` should be regenerated from stable saved data if the app reloads.

## 12. HomeReflection Boundary

Home reads already-saved state.

Home must not apply `SavePatch` again.

Home reflection should remain calm:

- non-cat rewards usually show small badges only
- recipe/craft thresholds may show a small moment
- cat rewards may receive special flow treatment

Use `homeReflectionSeen` or equivalent state to prevent repeated Home moments after reload.

## 13. Persistent Vs Runtime State

Persistent examples:

- inventory material delta
- recipe unlock
- finalized `CatInstance`
- CatDex species discovery
- event progress
- attention flags
- `appliedRunIds`
- `RunSession` recovery flags
- `resultPresentationSeen`
- `homeReflectionSeen`

Do not persist:

- rendered image cache
- sprite texture
- audio buffer
- BGM playback position
- SE playback position
- current animation frame
- current Home position
- UI transition state
- ad SDK state
- loading state
- runtime asset cache
- temporary CatEncounter effects

## 14. Asset / Audio Cache Boundary

Save may store stable ids only:

- `spriteLayerIds`
- `animationSetIds`
- `soundCueId`
- `bgmId`
- other asset ids

Save must not store:

- file paths
- texture objects
- atlas cache
- decoded audio buffer
- animation cache
- current frame
- current playback time

Runtime may preload/cache assets during:

- TitleScene / Loading
- scene transition
- CatEncounter
- Home entry

Runtime cache must be disposable and reconstructable from stable ids and `assets/asset_manifest.json` or future asset/audio config. If cache is lost because of reload, suspend, or memory purge, save state must remain valid.

## 15. Attention Flags

`SavePatch` may store calm persistent attention flags for Home/Craft/Bag/Event/CatDex.

Examples:

- `craftBadge`
- `bagBadge`
- `eventBadge`
- `catDexBadge`

Rules:

- attention flags are UI hints, not animation state
- flags should be small and calm
- flags should never become popup spam
- flags should be clearable by user visit or future explicit acknowledgement rules

## 16. MVP Scope

MVP should include planning support for:

- one active `RunSession`
- `runId` idempotency
- `appliedRunIds` or equivalent
- `savePatchApplied`
- `resultPresentationSeen`
- `homeReflectionSeen`
- Tier 1 material patch
- Tier 2 recipe patch
- Tier 3 cat patch
- calm attention flags
- reload recovery after save but before Result
- ad interruption before Result sequence

MVP does not need:

- multi-reward loot lists
- multi-active-run recovery
- cloud conflict resolution
- complex offline queueing
- full analytics event replay
- production migration code

## 17. Non-Goals

Do not implement:

- actual persistence
- runtime save adapter
- React/Vite
- ResultScreen
- HomeScreen
- ad SDK
- asset loader
- audio loader
- cat rendering
- HomeRuntime

This document is documentation and schema planning only.

## 18. Open Questions

- Should MVP support exactly one recoverable `RunSession`, or keep a small history?
- How long should completed `RunSession` records remain after `homeReflectionSeen`?
- Should `appliedRunIds` live in a root save metadata section or a dedicated run history section?
- What acknowledgement clears each attention flag?
- Should `soundCueId` and `bgmId` be part of ResultPresentation only, or also stored in future result history?
- How should recovery behave if asset ids referenced by an old save are missing from the manifest?
