# Puzzle System And Design Direction

This document defines the final direction for the Puzzle gameplay feel and UI design in あわねこ湯屋.

This is not a generic bubble shooter. Preserve the emotional direction and atmosphere carefully.

## 1. Core Concept

The puzzle is not:

- battle
- enemy combat
- score attack
- arcade action

The puzzle is:

- cleaning a hot spring

Player emotion should be:

- relaxing
- satisfying
- soft
- atmospheric
- warm
- quiet

The game should feel like:

```text
today I cleaned the bath a little more
```

Not:

- victory
- domination
- intense competition

## 2. Puzzle Structure

Base gameplay inspiration:

- Bubble Shooter
- Puzzle Bobble

Visual presentation must feel like:

- onsen cleaning

Not:

- candy
- jewels
- sci-fi
- neon arcade

## 3. Puzzle Screen Layout

Planning layout:

```text
┌────────────────────┐
│ SafeArea/Header    │
├────────────────────┤
│ 今日のお掃除依頼    │
│ 「落ち葉を10枚流そう」│
│                    │
│ 流した落ち葉 3/10   │
│ お掃除回数 8        │
│                    │
│      ☁ 湯気        │
│                    │
│  ♨ 露天温泉        │
│                    │
│  葉 泥 岩 花 葉    │
│  泥 苔 岩 葉 泥    │
│  苔 岩 花 泥 葉    │
│                    │
│      ↗             │
│    泡を飛ばす       │
│                    │
│ [ ざばぁ… 3/3 ]    │
│                    │
├────────────────────┤
│ Bottom SafeArea    │
└────────────────────┘
```

Important:

- The board should feel like a hot spring surface.
- It should not feel like a visible puzzle grid.
- Leave breathing space.
- Steam should always exist.
- UI should feel soft and quiet.
- Layout must follow `docs/ui_safe_area_spec.md`.

## 4. Core Gameplay Loop

```text
Start Puzzle
  -> Show cleaning mission
  -> Aim bubble
  -> Launch bubble
  -> 3+ same dirt pieces connect
  -> Dirt flows away
  -> New dirt flows from top with water flow
  -> Repeat
  -> ZABAA / bath water flow
  -> Steam
  -> Result
```

This loop should feel like washing and water movement, not attacking.

## 5. Puzzle Goal

Every puzzle has a random cleaning mission.

Examples:

- clean 10 leaves
- remove 8 mud pieces
- clean 5 flower petals
- reach combo count
- clean around rocks

Important:

- No hard fail state.
- Avoid `GAME OVER`, `FAILURE`, or loser feeling.
- Preferred feeling: `今日はここまで綺麗になった`.

## 6. Board Design

The board is:

- a hot spring surface

Not:

- square blocks
- visible grid
- mechanical puzzle board

Visual feeling:

- floating dirt
- warm water
- steam
- rocks
- soft atmosphere

## 7. Dirt Types

| Type | Role | Feeling |
| --- | --- | --- |
| `leaf` | basic | satisfying |
| `mud` | heavy | cleaning feel |
| `moss` | sticky | onsen feel |
| `flower` | seasonal | soft feeling |
| `rock` | fixed obstacle | scenery |

Dirt should feel natural inside a hot spring.

## 8. Rock Rules

Rocks are very important.

Rocks:

- never disappear
- fixed obstacle
- split water flow
- create routes
- create dirt pockets

Rocks should feel like scenery, not metal blocks, mechanical puzzle obstacles, or arcade gimmicks.

## 9. Bubble Rules

Player action:

- drag to aim
- launch bubble from bottom area

Rules:

- same dirt types connect
- 3+ connected dirt pieces disappear
- dirt flows away
- new dirt flows down naturally

Important:

- It should feel like washing, not attacking.
- Bubble is puzzle operation/cleaning feel, not stamina. Stamina rules are defined in `docs/reward_table.md`.

## 10. Falling And Flow Direction

When dirt disappears:

- dirt above slowly flows downward
- new dirt appears from top
- movement should feel like water flow

Desired feeling:

```text
すぅ…
しゅわ…
```

Avoid:

```text
DROP!!
CHAIN!!
```

Avoid fast arcade falling.

## 11. ZABAA System

ZABAA is a core system.

Meaning:

- replacing hot spring water

Visual:

```text
ざばぁ…
```

Uses:

- manual refresh
- emergency reset
- emotional transition
- result transition

This should feel comforting, not punitive.

## 12. ZABAA Rules

Rules:

- always visible button
- usable anytime
- maximum 3 uses per puzzle
- removes all dirt except rocks
- generates new board
- includes steam animation

This should feel like refreshing the bath water, not being punished.

## 13. Puzzle Completion Direction

Puzzle clear flow:

```text
ざばぁ…
  -> Dirt washes away
  -> Steam rises
  -> Silence
  -> Result
```

This is an emotional transition into `ResultScreen`.

## 14. Tier 3 Cat Direction

Tier 3 cats should not be shown directly during puzzle.

Use atmosphere instead:

- small bell sound
- steam change
- silence
- shadow silhouette
- water reflection

Avoid explicit UI notification. The cat encounter should be sensed before it is shown.

## 15. UI Philosophy

UI should be minimal.

Avoid:

- giant combo text
- score spam
- flashy numbers
- arcade UI
- neon effects

Preferred:

- wood texture
- soft colors
- warm lighting
- steam
- whitespace
- Japanese inn feeling

## 16. Animation Direction

Good animation:

- soft bubble pop
- steam drift
- gentle flow
- shuwa...
- zabaa...

Avoid:

- explosions
- shake spam
- flashy FX
- gambling feel
- pachinko feel

## 17. Audio Direction

Important sounds:

- soft bubbles
- water flow
- wooden sounds
- steam ambience
- bell sound

Audio should create quiet satisfaction, not loud excitement.

## 18. Color Direction

Palette:

- warm brown
- soft cream
- hot spring blue-green
- steam white
- muted colors
- natural Japanese inn tones

Avoid:

- saturated neon
- RGB effects
- strong contrast arcade colors

## 19. Emotional Design Principle

This puzzle is not:

- a victory game
- a hardcore puzzle game

It is:

- cleaning a peaceful hot spring little by little

The player should feel:

- relaxed
- attached to the place
- wanting to return
- wanting to see cats come

## 20. Current Prototype Direction

Current prototype direction includes:

- bubble aiming
- dirt matching
- fixed rocks
- flowing refill
- mission system
- ZABAA refresh system
- steam transition
- soft UI

Preserve this direction carefully. Do not transform it into a generic mobile puzzle game.

## Game Studio Architecture Notes

Future implementation should keep Game Studio-style separation:

- systems/game logic: mission generation, dirt matching, rock rules, ZABAA use count, board refill, result preparation
- rendering/components: hot spring surface, steam, soft UI, aiming affordance, ZABAA button, Result transition
- assets/pipeline: dirt pieces, rocks, steam, water surface, soft bubble effects, bell/ambient cues
- save/state: stamina spend, puzzle session seed, mission result, reward patch, ad pause state

Puzzle logic should not own reward persistence, rendering effects, or ad state. It should produce structured result data for the reward and Result presentation systems.

