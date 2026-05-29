# UI Safe Area And Ad Layout Specification

This document preserves the permanent ad-safe layout constraint for あわねこ湯屋. It applies to all screen planning, mockups, rendering, gameplay systems, and future implementation.

## Status

Confirmed:

- A persistent top header area exists.
- A persistent bottom banner ad area exists.
- Popup/interstitial ads may interrupt gameplay.
- Important UI must never overlap ads, safe areas, browser chrome, LIFF header regions, or notch areas.
- Gameplay must pause during popup/interstitial ads.

Tentative:

- exact top header height
- exact bottom ad height
- exact LIFF browser chrome behavior per device
- exact CSS variable names
- final component names

## Permanent Layout Constraint

Never assume a clean full-screen, ad-free layout.

All screens must reserve space for:

- top header
- bottom banner ad
- device safe areas
- LIFF/browser chrome
- popup/interstitial ad interruption

Forbidden:

- placing important buttons at the bottom edge
- placing controls behind banner ads
- relying on ad-free layouts
- continuing gameplay during popup ads
- placing dense UI directly below top headers

## Conceptual Areas

Future runtime should keep these concerns separate:

- `SafeArea`
- `ReservedAdArea`
- `GameplayArea`

Planning layout:

```text
Device / LIFF viewport
  ├ SafeArea top + persistent top header
  ├ GameplayArea / content area
  ├ ReservedAdArea / persistent bottom banner
  └ SafeArea bottom
```

Important content, primary controls, result buttons, puzzle controls, and modal actions must remain inside `GameplayArea` unless explicitly designed as part of the top header.

## Future State Requirements

Future `uiState` should support:

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

Expected to evolve:

- whether `reservedAdHeight` includes safe-area bottom
- whether header height is stored separately
- whether modal layout reads from a shared layout service or component context

## Gameplay Pause Requirements

During popup/interstitial ads:

- pause gameplay
- pause timers
- pause animations
- pause reward progression
- disable gameplay input
- preserve current route state
- preserve current puzzle/reveal/result state

After ads close:

- resume safely from previous state
- avoid duplicate rewards
- avoid lost inputs
- avoid skipped animations that carry progression
- restore focus/touch handling inside safe areas

Systems affected:

- puzzle timer
- combo logic
- stamina or bubble consumption
- cleaning/result calculation
- reward progression
- reveal animation
- idle reward claims
- event mission progress

## Screen Composition Rules

TitleScene:

- loading and Tap to Start content must not sit under the top header or bottom ad.
- event/notice entries must stay inside the content area.

HomeScreen:

- bottom navigation and important one-hand controls must sit above the banner ad.
- observation content should not be hidden by header or ad reservations.
- idle reward claim buttons must remain reachable after ad spacing.

PuzzleScreen:

- puzzle board must fit inside `GameplayArea`.
- pause and retire controls must avoid top header crowding.
- bottom controls must sit above the banner ad.
- popup ads pause all puzzle systems.

ResultScreen:

- reward confirmation must not be at the bottom edge.
- reward rows and Home growth preview must remain readable with top/bottom reservations.
- route buttons to Reveal/Home must be ad-safe.

RevealScreen:

- cat face and reveal effects should remain centered in the usable content area.
- popup ads pause reveal animation and resume without skipping the reveal.

CatDetailScreen:

- care, photo, and adoption controls must not overlap the bottom banner.
- status panels should avoid dense placement directly under the top header.

Overlay/Modal:

- modal actions must sit above the reserved ad area.
- `AdOverlay` must block gameplay input.
- maintenance/offline/daily bonus modals must account for safe areas and header reservation.

## Mobile Validation Targets

All screen mockups, wireframes, and compositions must be validated under:

- top header present
- bottom banner ad present
- popup/interstitial interruption possible
- iPhone viewport
- Android viewport
- tall screen viewport
- notch device safe areas
- one-hand operation after ad-safe spacing

## Rendering Notes

Future React/Vite implementation can model the layout using shared shell components or context, but the concerns should remain separate:

- read safe area values
- reserve ad height
- compute gameplay/content bounds
- let screens render inside the computed area
- let systems pause from `isAdShowing`

Canvas rendering, if introduced later, should also respect the computed `GameplayArea` rather than drawing to the full viewport.
