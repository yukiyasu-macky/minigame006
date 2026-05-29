# HomeScreen UX And Layout Rules

This document defines the UX structure and layout philosophy of `HomeScreen` for あわねこ湯屋.

This is pre-implementation planning only. Do not implement HomeScreen, navigation runtime, rendering, cat AI, crafting systems, save systems, UI components, or animations from this document yet.

## Core Philosophy

`HomeScreen` is not only a menu.

`HomeScreen` is:

- a relaxing hot spring observation space
- the main gameplay hub
- a warm return point after Puzzle
- the emotional center of the game loop
- a soft transition between exploration runs

`HomeScreen` is not:

- a management dashboard
- a dense mobile game menu
- a quest lobby
- a notification-heavy live-service screen

The Home scene itself must remain visually dominant. UI should support the scene, not overpower it.

The emotional priority is:

```text
I want to look at the cats for a moment
```

Before:

```text
I want to go explore again
```

## Core UX Loop

```text
Return to Home
  -> Observe cats / atmosphere
  -> Notice small changes
  -> Touch lightweight side features if desired
  -> Start next exploration
```

The player should naturally drift toward Explore after spending a short moment observing Home.

## UX Priority Rules

### Highest-Frequency Action

`Explore`

Explore is the main gameplay loop CTA.

Explore should:

- remain visually strongest
- remain easy to reach with thumb interaction
- feel like departing for cleaning/exploration
- not feel like a generic tab button

### Medium-Frequency Actions

- Album
- CatDex
- Craft
- Inventory/Bag

These are support systems.

They should:

- stay accessible
- remain visually quiet
- not overpower the Home scene
- feel secondary to observation/exploration

### Low-Frequency Actions

- Menu
- Settings
- Notices
- Gifts
- Mail

These should remain near the top/header area.

## Layout Rule

```text
Top:
Low-frequency controls

Center:
Hot spring observation scene

Lower Center:
Explore CTA

Bottom:
Secondary/support navigation

Bottom Safe Area:
Persistent ad reserve area
```

The Home scene should occupy most of the visible screen. Avoid dense UI overlays.

## ASCII Wireframe

This wireframe is not final visual design. It defines UX hierarchy, interaction priority, navigation placement philosophy, and emotional screen balance.

```text
┌────────────────────┐
│ SafeArea/Header    │
│ ⚙ Menu     🎁      │
├────────────────────┤
│                    │
│                    │
│     ♨ Home         │
│                    │
│  猫が歩く          │
│  猫が寝る          │
│  湯気              │
│  灯り              │
│                    │
│                    │
│                    │
│                    │
├────────────────────┤
│      探索へ        │
│     Explore        │
├────────────────────┤
│ 📖  🐈  🔨  🎒     │
│Album Cat Craft Bag │
├────────────────────┤
│ Bottom Ad Reserve  │
└────────────────────┘
```

## Explore CTA Rules

Explore is not:

- a bottom tab
- a quest list button
- a generic play button

Explore is:

- the departure point of the core gameplay loop
- the emotional transition from Home to Puzzle

Explore should:

- feel warm
- feel inviting
- feel easy to tap
- remain visually stronger than side navigation

Avoid:

- aggressive colors
- gacha-style emphasis
- battle-game CTA styling

## Secondary Navigation Rules

Album, CatDex, Craft, and Bag should:

- feel lightweight
- feel utility-like
- avoid becoming dominant UI
- avoid MMO/live-service density

Preferred direction:

- wood tags
- small icons
- soft labels
- quiet presentation

These support routes should not compete with the Home scene or Explore CTA.

## Home Observation Rules

The player should revisit Home because:

- cats move
- cats sleep
- cats use furniture
- atmosphere changes slightly
- rewards create visible emotional change

Home should feel alive even when the player is not actively interacting.

Home observation should connect to `docs/home_growth.md`: furniture and atmosphere upgrades matter because they create new cat behaviors, small scenery changes, and emotional moments.

## Ad-Safe And Mobile Rules

All layout assumptions must respect:

- mobile portrait orientation
- LIFF/browser chrome
- safe areas
- notch devices
- gesture areas
- persistent bottom banner ads

Important gameplay controls must never overlap:

- ad area
- gesture area
- unsafe bottom edges

The Home scene should remain readable even with ads visible.

Planning constraints:

- Explore CTA must sit above the persistent bottom banner ad.
- Secondary navigation must sit above the ad reserve area.
- Low-frequency controls must not crowd the top safe/header area.
- The central observation scene must retain enough height to feel visually dominant.

## MVP Scope

MVP HomeScreen should remain intentionally small.

MVP only needs:

- one Home scene
- minimal cat movement
- simple atmosphere changes
- one Explore CTA
- lightweight support navigation

Cat action examples:

- walk
- sit
- sleep
- use hot spring

Atmosphere examples:

- steam
- lantern light
- inlet
- warm lighting

Support navigation:

- Album
- CatDex
- Craft
- Bag

This is sufficient for MVP validation.

## Non-Goals

The MVP HomeScreen does not need:

- advanced placement systems
- large furniture catalogs
- free-form decoration editing
- management dashboards
- heavy quest systems
- large bottom navigation bars
- dense live-service UI
- aggressive notification systems

Avoid turning `HomeScreen` into:

- a task screen
- a farming dashboard
- a social-game control panel

## Important Emotional Rule

The player should feel:

```text
This place became a little warmer
```

Not:

```text
I optimized my base
```

## Game Studio Architecture Notes

Future implementation should preserve separation:

- systems/game logic: Home progression, reward-to-growth mapping, route intent
- rendering/components: Home scene, Explore CTA, support navigation, header controls
- assets/pipeline: Home background, furniture, atmosphere props, icons, cat poses
- save/state: active cats, placed/unlocked content, support navigation state, observed Home changes

The layout shell should integrate with `SafeArea`, `ReservedAdArea`, and `GameplayArea` from `docs/ui_safe_area_spec.md`. HomeScreen should not own ad state, save logic, or cat AI.

