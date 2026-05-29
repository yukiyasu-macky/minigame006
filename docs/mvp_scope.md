# MVP Scope

This document defines the current MVP boundary for あわねこ湯屋. The project remains in pre-production, planning refinement, architecture stabilization, gameplay loop specification, and asset pipeline specification.

No gameplay runtime, React/Vite setup, LIFF runtime integration, production save system, or full puzzle mechanics should be implemented until this MVP scope and the remaining planning gates are reviewed.

## MVP Philosophy

The MVP is not:

- all screens implemented
- UI mockups only
- placeholder navigation only

The MVP is:

- a playable vertical slice that proves the emotional gameplay loop
- a focused test of whether exploration, rewards, cat discovery, Home growth, and replay motivation work together
- a small enough implementation target to avoid architecture drift

The MVP should make the player feel:

- "I want to explore"
- "What reward will I get?"
- "I found something meaningful"
- "The onsen grew a little"
- "I want to play again"

## MVP Core Flow

The MVP must prove this flow:

```text
TitleScene
  -> HomeScreen
      -> PuzzleScreen
          -> ResultScreen
              -> if catFound == true:
                    RevealScreen
                      -> CatDetailScreen
                          -> HomeScreen
              -> if catFound == false:
                    HomeScreen
```

Confirmed:

- `HomeScreen` is the main hub.
- `HomeScreen` can start exploration.
- `PuzzleScreen` produces a result.
- `ResultScreen` can produce cat rewards and non-cat rewards.
- `RevealScreen` happens only if `catFound == true`.
- Non-cat rewards still matter.
- Rewards feed Home growth, furniture, inventory, collection, and event progress.
- Returning to Home should show visible change or state progression.
- The loop must motivate replay.

## Screen Priority

Tier 1, must function end-to-end:

- `TitleScene`
- `HomeScreen`
- `PuzzleScreen`
- `ResultScreen`
- `RevealScreen`
- `CatDetailScreen`

Tier 2, minimal but connected:

- `AlbumScreen`
- `CatDexScreen`
- `OnsenEditScreen`
- `InventoryScreen`

Tier 3, allowed as lightweight placeholders for now:

- `EventScreen`
- `MissionScreen`
- `ShopScreen`
- `MailScreen`
- `NoticeScreen`
- `SettingsScreen`

Tier 3 placeholder screens are not the MVP goal. The MVP goal is validating the core gameplay and emotional loop.

## ResultScreen Requirements

`ResultScreen` should not always produce a cat.

Possible result rewards:

- cat discovery
- furniture materials
- onsen materials
- bubble-related support rewards
- recipes
- event materials

Non-cat rewards must connect back into:

- Home growth
- furniture progression
- collection progression
- future unlocks
- event progression

Confirmed exclusions:

- Photos and letters are Album/memory rewards after adoption/send-off, not normal ResultScreen exploration loot.
- Generic koban/currency is excluded from the MVP reward table until it has a clear use case.
- There should be no total "nothing" result. Lightweight outcomes are allowed only if they still provide useful growth or unlock progress.

Initial reward rates, duplicate recipe behavior, cat duplicate behavior, stamina values, adoption circulation, and Result presentation rules are defined in `docs/reward_table.md`.

## Home Growth Requirement

After returning to `HomeScreen`, the player should see at least one of:

- visible change
- state progression
- progress toward a meaningful unlock
- new inventory/resource count
- collection progress
- event progress

The exact growth formulas are tentative. The MVP must still prove that non-cat rewards are emotionally and mechanically useful.

## Ad-Safe Requirement

The MVP must follow `docs/ui_safe_area_spec.md`.

All MVP screens must assume:

- persistent top header area
- persistent bottom banner ad area
- popup/interstitial ads
- LIFF/browser chrome
- mobile safe areas
- notch devices

During ads:

- pause timers
- pause gameplay
- pause progression
- pause animations
- pause reward flow
- disable input

After ads:

- resume safely from the previous state
- avoid duplicate rewards
- avoid skipped reveal/result progression

## Architecture Boundary

Future implementation must keep Game Studio-style separation:

- systems/game logic
- rendering/components
- assets/pipeline
- save/state

Avoid tight coupling between:

- puzzle logic
- reward logic
- rendering
- save data
- ad state

The MVP should prove the vertical slice without forcing production-scale systems too early.

## Stabilization Gates Before Implementation

Before implementation begins, stabilize:

1. MVP scope docs
2. Result reward table in `docs/reward_table.md`
3. SaveData minimum structure in `docs/data_schema.md`
4. CatGenerator minimum structure
5. Home growth linkage rules
6. exploration -> reward -> Home progression mapping

These are planning gates, not runtime tasks.

## Expected To Evolve

- exact puzzle mechanics
- exact result reward probabilities
- exact `catFound` calculation
- exact Home growth formulas
- exact minimum SaveData schema
- exact CatGenerator seed fields
- exact UI dimensions for ad-safe layout
