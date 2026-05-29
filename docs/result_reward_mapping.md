# Result Reward Mapping

This document defines how one Puzzle play maps to one reward result, one save patch, Result presentation, and quiet Home reflection.

This is pre-implementation planning only. Do not implement Puzzle runtime, ResultScreen, CatReveal, HomeScreen, save systems, ad SDK logic, rendering, or UI components from this document yet.

## Core Rule

```text
1 Puzzle play = 1 gacha-like exploration result = 1 primary reward
```

`ResultScreen` is equivalent to a gacha result screen structurally, but the presentation must not feel like a loud mobile gacha.

It should feel like:

```text
a small discovery from cleaning the hot spring
```

Each MVP run has exactly one primary reward. No multi-reward loot list for MVP.

## Core Flow

The reward should be decided at `PuzzleStart`, not after `PuzzleEnd`.

```text
PuzzleStart
  -> create runId
  -> determine RunReward
  -> PuzzlePlay
  -> if cleared/successful:
       apply SavePatch
       optional ad interruption
       show Tier-based Result
       return to Home
  -> if abandoned/failed before reward condition:
       do not grant reward
```

Player experience should feel like:

```text
something was already there during this exploration,
and the player discovered it by cleaning
```

Not:

```text
reward was generated only after the result screen
```

## Why Reward Is Decided At PuzzleStart

This improves:

1. implementation responsibility separation
2. ad interruption safety
3. save stability
4. future Result presentation enhancement
5. special cat treatment
6. emotional connection between Result and Home

It also makes cat discovery feel like:

```text
the cat was there
```

Not:

```text
the cat was randomly created after play
```

## RunReward

`RunReward` is the pre-decided result for the current Puzzle run.

It should be lightweight and deterministic.

Minimum fields:

```text
RunReward {
  runId
  rewardTier
  rewardType
  rewardId
  amount?
  recipeId?
  eventId?
  catSeed?
  catSpeciesId?
  catRarity?
}
```

Rules:

- `runId` is required for idempotency.
- `rewardTier` decides Result presentation.
- `rewardType` decides SavePatch type.
- Cat reward data may be prepared early but should not store heavy render assets.
- Do not store generated images or animation caches in `RunReward`.

## Tier Structure

Result presentation is Tier-based.

```text
Tier1 = MaterialResult
Tier2 = RecipeResult
Tier3 = CatEncounter -> CatResult
```

Each run has exactly one primary reward.

## Tier 1: MaterialResult

Tier 1 includes:

- `furniture_material`
- `onsen_material`
- `event_material`
- `bubble_related_reward`

Presentation feeling:

```text
small useful discovery
```

Example:

```text
湯気石を拾った
温泉が少し暖かくなりそう
```

Tier 1 should be calm and short.

Home return:

- mostly quiet
- small Bag/Craft/Event attention badge if relevant
- no large popup

## Tier 2: RecipeResult

Tier 2 includes:

- `recipe`

Recipe means:

```text
permission to create a new Home interaction
```

Recipe is not:

- completed item ownership
- direct furniture reward

Presentation feeling:

```text
new future unlocked
```

Example:

```text
桜座布団の作り方を見つけた
猫が気に入りそう
```

Home return:

- Craft receives a small attention badge.
- If craftable immediately, a small subtle Home/Craft moment may be shown.
- Avoid large popups.

## Tier 3: Cat Result

Tier 3 includes:

- cat encounter

Cat is not just a reward item.

Cat is:

```text
a new encounter
```

Tier 3 should branch before normal Result presentation.

Flow:

```text
PuzzleClear
  -> CatEncounter pre-result cue
  -> CatResult
  -> CatReveal / CatDetail if needed
  -> Home
```

CatEncounter cue examples:

- soft bell sound
- steam shifts
- short silence
- small shadow
- presence in the mist

The cue should feel like:

```text
something is there...
```

Not:

```text
SSR GET!!
```

Suggested duration:

```text
0.8s - 1.5s
```

This cue can also hide lightweight generation/resolve time for cat display data.

## Cat Data Timing

For cat rewards:

At `PuzzleStart`:

- decide cat reward identity seed
- decide species/rarity if possible
- prepare lightweight deterministic data

During CatEncounter cue:

- resolve display-ready cat data if needed
- generate/assign `catInstanceId`
- prepare name/visual reference for `CatResult`

Before `CatResult` display:

- `SavePatch` should include the finalized cat instance data required for persistence
- Cat generation structure is defined in `docs/cat_generator.md`.

Save only stable data:

```text
catInstance {
  catInstanceId
  speciesId
  rarity
  seed
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

Do not save:

- rendered image cache
- animation cache
- temporary reveal effects
- Home placement calculation result
- transient UI state

## SavePatch

`SavePatch` applies the cleared run reward safely.

`SavePatch` should be applied before Result presentation and before any optional ad interruption.

Detailed recovery, idempotency, and ad-interruption rules are defined in `docs/save_patch_flow.md`.

Reason:

- prevents reward loss on reload
- prevents duplicate reward grants
- makes ad interruption safer
- lets Result presentation become visual-only

Minimum shape:

```text
SavePatch {
  runId
  rewardTier
  rewardType
  inventoryDelta?
  recipeUnlock?
  catInstance?
  eventProgressDelta?
  attentionFlags?
}
```

Rules:

- `SavePatch` contains only persistent state changes.
- `SavePatch` must be idempotent by `runId`.
- Result text, animation data, UI state, and temporary presentation data should not be stored in `SavePatch`.

## SavePatch Mapping

| Reward Type | SavePatch effect |
| --- | --- |
| `furniture_material` | increment furniture material inventory |
| `onsen_material` | increment onsen material inventory |
| `event_material` | increment event material progress/inventory |
| `bubble_related_reward` | increment puzzle support inventory |
| `recipe` | unlock `recipeId` |
| `cat` | add finalized `catInstance` |

## Optional Ad Interruption

Ads may occur after reward has been saved but before Result presentation.

Preferred safe flow:

```text
PuzzleClear
  -> SavePatch applied
  -> optional ad interruption
  -> Tier-based Result presentation
```

Avoid:

```text
CatEncounter
  -> ad
  -> CatResult
```

Reason:

- Interrupting between cat cue and cat result damages the emotional moment.
- Ads should happen before Result starts, not inside the emotional Result sequence.

## ResultPresentation

`ResultPresentation` is generated from:

- `RunReward`
- applied `SavePatch`
- current player state

It is visual/presentation data only.

It may include:

- title
- short flavor text
- reward icon id
- cat display reference
- CTA label
- Home attention hint

It must not:

- calculate rewards
- apply save
- unlock recipes
- create persistent cat state
- mutate inventory

## ResultScreen Types

### MaterialResult

Displays:

- material name
- material visual/icon
- short warm description
- Home relevance

Example:

```text
湯気石を拾った
温泉が少し暖かくなりそう
```

CTA:

```text
Homeへ戻る
```

### RecipeResult

Displays:

- recipe name
- what it unlocks
- what kind of Home interaction it enables
- soft future expectation

Example:

```text
桜座布団の作り方を見つけた
猫が気に入りそう
```

CTA options:

```text
Craftを見る
```

Or:

```text
Homeへ戻る
```

Implementation can decide final CTA later.

### CatEncounter / CatResult

CatEncounter displays pre-result cue only.

CatResult displays:

- cat visual
- cat name
- short encounter line
- soft CTA

Example:

```text
見慣れない猫が
こちらを見ている

「しろまる」
```

CTA:

```text
そっと近づく
```

Avoid:

- `GET!!`
- `SSR!!`
- loud gacha language

## Home Return Reflection

Home should remain calm.

Home is the observation space and emotional afterglow.

After Result, Home should not show large popups for every reward.

### Cat Reward

- Cat is reflected in Home/CatDex.
- Cat may appear in Home after Reveal/Detail.
- This is the only reward type allowed to receive special flow treatment.

### Non-Cat Rewards

Default:

- quiet state update
- small attention badge only

Examples:

- material -> Bag/Craft badge
- recipe -> Craft badge
- event material -> Event/Craft badge
- bubble support -> Bag badge

Only show a small Home moment when a threshold is crossed:

- new craft becomes available
- recipe is newly unlocked
- onsen atmosphere upgrade becomes available
- event progress reaches a meaningful milestone

Even then:

- keep it short
- use wood tag / soft glow / small attention
- avoid popup spam

## Responsibility Separation

### Puzzle

- owns play session
- consumes stamina/play attempt
- uses pre-decided `RunReward`
- reports clear/failure state

### RewardRoll / RunReward

- decides the one primary reward for the run
- does not present UI
- does not apply save

### SavePatch

- applies persistent reward changes
- must be idempotent
- must not contain presentation data

### ResultPresentation

- turns saved result into display data
- does not mutate save

### ResultScreen

- shows Tier-based result
- does not calculate reward
- does not apply save

### HomeScreen

- reflects saved state quietly
- shows badges/moments
- remains an observation space

## Non-Goals

Do not implement:

- runtime reward system
- actual save logic
- ResultScreen UI
- cat rendering
- ad SDK
- HomeScreen reflection
- inventory system

This task is documentation only.

## Important Emotional Rule

Result is the emotional result of one exploration.

Home is the quiet afterglow.

Keep this separation:

```text
Result = discovery
Home = calm observation
```
