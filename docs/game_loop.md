# Game Loop

This document preserves the current planning baseline for あわねこ湯屋 progression. It should stay aligned with `docs/screen_flow.md`, `docs/ui_safe_area_spec.md`, `docs/sprite_spec.md`, and Game Studio-style separation between systems, rendering/components, assets/pipeline, and save/state.

## Status

Confirmed:

- MVP scope is defined in `docs/mvp_scope.md`.
- Puzzle feel and rules are defined in `docs/puzzle_design.md`.
- Home growth direction is defined in `docs/home_growth.md`.
- MVP reward/stamina/adoption/result presentation rules are defined in `docs/reward_table.md`.
- Result reward/save/Home mapping is defined in `docs/result_reward_mapping.md`.
- SaveData planning is defined in `docs/data_schema.md`.
- The game is Home-centered.
- Exploration enters from Home and resolves through Puzzle and Result.
- Cat reveal is conditional, not guaranteed.
- Non-cat rewards are useful and feed Home growth, furniture, onsen upgrades, collections, or events.
- Ads can interrupt gameplay and must pause systems safely.

Tentative:

- exact puzzle tuning
- cleaning/result calculation formula
- reward quantities after tuning
- cat discovery rates
- bubble-related boost/support behavior
- exact adoption durations and grace periods

## Core Loop

```text
HomeScreen
  -> start exploration
  -> PuzzleScreen
  -> ResultScreen
      -> if cat found: RevealScreen -> CatDetailScreen -> HomeScreen
      -> if no cat found: HomeScreen
  -> spend/use rewards on Home growth, furniture, collections, and events
```

The MVP must prove this loop as a playable vertical slice, not as placeholder navigation and not as a complete implementation of every screen.

## Home-Centered Progression

`HomeScreen` is the emotional and mechanical center of the game.

Home supports:

- onsen viewing
- cat observation
- idle reward collection
- exploration start
- growth preview
- furniture and theme motivation
- new cat and event notifications

Planning goal:

The player should feel that each exploration makes the onsen warmer, livelier, or more personal, even when no cat is discovered.

## Exploration Entry

Exploration begins from `HomeScreen` and moves into `PuzzleScreen`.

Inputs expected to evolve:

- bubble use
- washing/dirt removal action
- combo behavior
- pause and retire

Confirmed constraints:

- Puzzle gameplay is cleaning a hot spring, not battle, score attack, or arcade action.
- gameplay must stay low-stress
- no PvP/battle framing
- no generic neon/candy/jewel bubble shooter presentation
- no progress loss due to popup/interstitial ads
- ad interruption must pause puzzle systems

`PuzzleScreen` uses bubble-shooter inspiration only as a mechanical base. The emotional presentation is onsen cleaning: dirt flows away, steam drifts, rocks feel like scenery, and ZABAA refreshes bath water.

## Puzzle Resolution

`PuzzleScreen` resolves into `ResultScreen`.

Each Puzzle play uses one pre-decided `RunReward`, created at `PuzzleStart`. If the run is cleared successfully, an idempotent `SavePatch` is applied before Tier-based Result presentation. If the run is abandoned before the reward condition, the reward is not granted.

Result data may include:

- cleaning progress
- wash rate
- bubble-related reward
- onsen materials
- furniture materials
- recipes
- event materials
- cat discovery flag
- rare presentation flag
- Home growth preview changes

Planning note:

Puzzle output should be structured data that systems can consume, not direct UI side effects. Future implementation should keep gameplay systems, result calculation, rendering, and save/state separate.

Puzzle completion should transition through ZABAA, dirt washing away, rising steam, silence, and then `ResultScreen`.

## Result Outcomes

`ResultScreen` is the reward and routing decision point.

Confirmed:

- If `catFound` is true, route to `RevealScreen`.
- If `catFound` is false, route back to `HomeScreen` after reward acceptance.
- Non-cat results must still feel meaningful.

Non-cat reward examples:

- materials for onsen expansion
- furniture upgrade resources
- recipes for future unlocks
- event materials for EventScreen progression
- bubble-related support materials for puzzle operation

Excluded from normal MVP ResultScreen exploration loot:

- photos
- letters
- generic koban/currency
- total nothing outcomes

Photos and letters belong to adoption/send-off memory systems. Koban/currency can be reconsidered later only if a clear use case appears.

## Cat Reveal Condition

Cat reveal happens only when the exploration result includes a cat.

Reveal flow:

```text
ResultScreen
  -> RevealScreen
      -> silhouette
      -> bubble/steam reveal
      -> cat name/personality/rarity
      -> CatDetailScreen
```

The reveal should feel gentle and caring:

- soft bubbles
- pale steam
- silhouette emergence
- warm sparkles
- soft bell cue when Tier 3 cat is confirmed
- no aggressive effects
- no battle victory language

## Cat Detail And Return Home

`CatDetailScreen` introduces or updates the cat record.

It may show:

- cat status
- personality
- habits
- stay days
- affection
- cleanliness
- favorite onsen
- furniture compatibility
- adoption requirements

After review or care actions, the flow returns to `HomeScreen`.

## Adoption Circulation

Cats stay in Home after being found. After a hidden stay duration, a cat may receive an adoption request. The player can manually send off cats.

If an adoption request remains unattended for a configured grace period, the cat may be automatically sent off. This must be framed positively as a new family being found, not as deletion or loss.

After send-off:

- create adoption record
- add photo/memory to Album
- optionally add letter later
- free a Home cat slot

Rare cats may use longer stay duration or special rules later.

## Home Growth Connections

Rewards should connect to one or more Home systems:

- cat interaction points
- atmosphere changes
- onsen scenery changes
- furniture unlocks
- furniture upgrades
- seasonal decoration
- cat appearance modifiers
- idle reward improvement
- collection progress
- event progress

Expected to evolve:

- exact growth formulas
- how furniture affects cat appearances
- how Home previews communicate future upgrades

MVP requirement:

Returning to Home should show visible change or state progression. If no cat is found, the player should still see a resource, collection, event, or growth connection that makes another exploration feel worthwhile.

Home growth should feel like cats becoming more comfortable in the hot spring space, not like facility management or optimization.

## Album And CatDex Relationship

Confirmed:

- `CatDexScreen` is part of `AlbumScreen`.
- `CatDexScreen` focuses on cat discovery status, rare records, personalities, habits, and appearance hints.
- `AlbumScreen` also includes adopted-cat memory records, photos, letters, revisit records, growth records, collection rewards, progress, and achievements.

Planning note:

Save data should keep stable ids for cats, memories, photos, letters, and rewards so localStorage data can migrate to Firebase later.

Photos and letters are created through adoption/send-off memory flow, not as normal exploration loot.

## Ad-Safe Runtime Assumptions

Ads are a permanent gameplay constraint, not an optional overlay.

During popup/interstitial ads:

- pause gameplay
- pause timers
- pause animations
- pause reward progression
- disable gameplay input
- preserve current route and gameplay state

After ads close:

- resume from the previous state
- do not double-award rewards
- do not skip reveal frames or result acceptance
- recover controls inside safe layout bounds

Future state should support:

```json
{
  "isAdShowing": false,
  "reservedAdHeight": 0,
  "safeAreaInsets": {
    "top": 0,
    "right": 0,
    "bottom": 0,
    "left": 0
  }
}
```

## Game Studio Architecture Notes

Keep future implementation separated:

- systems/game logic: puzzle rules, result calculation, rewards, progression, ad pause state
- rendering/components: screens, overlays, sprite composition, safe-area layout
- assets/pipeline: manifest-driven image references and sprite layers
- save/state: seeds, ids, inventory, cat records, rewards, UI/ad state

The cat generator should reference stable asset ids and seed values, not raw file paths.

Reward, stamina, adoption, result presentation, cat generation, and Home growth should be config-driven.
