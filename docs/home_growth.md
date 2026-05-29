# Home Growth Design

This document defines how Puzzle rewards connect into Home growth for あわねこ湯屋.

This is pre-implementation planning only. Do not implement HomeScreen, crafting, rendering, save systems, cat AI, UI, or runtime logic from this document yet.

## Core Philosophy

Home is:

- a relaxing hot spring space where cats stay
- an observation space
- the emotional center of the loop

Home is not:

- a facility-management game
- a resource factory
- base building
- efficiency growth
- hardcore crafting
- optimization gameplay

The player should feel:

```text
today the hot spring became a little more alive
```

And:

```text
cats are gradually becoming comfortable here
```

Home growth is not primarily numerical progression, facility level progression, or resource factory expansion. Home growth is cat behavior growth, atmosphere growth, small scenery changes, and emotional attachment accumulation.

## Core Home Loop

```text
Puzzle
  -> Result reward
  -> Recipe and/or materials obtained
  -> Craft/unlock new Home content
  -> Cats gain new places to stay
  -> Home atmosphere changes
  -> Player wants to observe Home again
  -> Return to Puzzle
```

The important emotional result is not "I optimized my facility." It is "the bath feels warmer, and the cats have more little moments here."

## Reward Mapping

### `furniture_material`

Purpose:

- used for furniture crafting

Furniture exists mainly to create cat interaction points.

Examples:

- cushion
- wooden bucket
- bench
- lantern

Furniture is not primarily decoration. Furniture should create behaviors like:

- sit
- sleep
- inspect
- gather
- relax

Planning rule:

Furniture should be evaluated by the cat behavior or Home moment it enables, not only by visual collection value.

### `onsen_material`

Purpose:

- used for hot spring atmosphere upgrades

Examples:

- steam stones
- hot spring inlet
- rocks
- lantern lighting
- small bridge
- garden objects

This should improve:

- atmosphere
- warmth
- scenery
- Home identity

It should not become power progression. Onsen upgrades should make the place feel more comfortable and alive.

### `recipe`

Recipe is very important.

Recipe does not mean:

- item ownership
- direct reward item

Recipe means:

- permission to create new Home interactions

Recipe unlocks:

| Recipe Type | Unlocks |
| --- | --- |
| `FurnitureRecipe` | furniture crafting |
| `OnsenRecipe` | hot spring atmosphere crafting |
| `ThemeRecipe` | seasonal/theme atmosphere |
| `EventRecipe` | limited-time atmosphere content |

Recipe itself is not the final value.

The final value is:

```text
new cat behavior
new atmosphere
new Home feeling
```

### `event_material`

Purpose:

- seasonal atmosphere progression
- limited Home changes

Examples:

- cherry blossom petals
- snow crystals
- moon-viewing materials

Event materials should support:

- seasonal themes
- event recipes
- temporary atmosphere variation

Avoid turning events into obligation gameplay. Seasonal content should feel like a gentle change in air, not a pressure calendar.

### `bubble_related_reward`

Purpose:

- puzzle-related boost/support material
- reinforce the cleaning feel without becoming stamina

Rules:

- Bubble is not stamina.
- Bubble-related rewards should not become the main Home growth driver.
- Bubble-related rewards may support future Puzzle comfort, but their exact use remains tentative.

## Recipe Flow

```text
Result reward
  -> Recipe unlocked
  -> Materials gathered
  -> Craft completed
  -> Home updated
  -> Cat behavior changes
```

Example:

```text
Cushion Recipe
  -> Craft cushion
  -> Place in Home
  -> Cat sleeps on it
```

Important:

- Recipe unlock should create future expectation.
- Materials should feel like progress toward a visible Home moment.
- Craft completion should create a new interaction point or atmosphere shift.

## Cat Behavior As Home Growth

Cats are the emotional center of Home.

Home should feel alive because cats:

- walk slowly
- sit
- sleep
- enter hot spring
- inspect furniture
- gather near cozy objects
- relax near steam or warm light

Without cat behavior, Home becomes only a collection screen.

Planning rule:

Every important Home growth item should answer at least one question:

- What can a cat do here?
- What new moment can the player observe?
- How does this make the bath feel warmer or more alive?

## Home Observation

The player should want to revisit Home because:

- cats move
- atmosphere changes
- furniture interactions happen
- small emotional moments appear
- the space feels gently different after rewards

Home is an observation space, not a management dashboard.

The player should not need to optimize Home to enjoy it. They should want to look at it.

After Result, Home should remain calm. Non-cat rewards should usually appear as quiet state updates or small attention badges. Cat rewards are the only reward type that may receive special flow treatment through CatEncounter, Reveal, and CatDetail. See `docs/result_reward_mapping.md`.

## Home Change Types

Home changes should be small, readable, and emotionally legible.

### Cat Interaction Points

Examples:

- cushion creates a sleeping place
- wooden bucket creates an inspect/play moment
- bench creates a sitting/gathering place
- lantern creates a warm resting spot

### Atmosphere Changes

Examples:

- steam increase
- warmer lantern light
- hot spring inlet detail
- added rocks
- garden object
- small bridge

### Seasonal/Theme Changes

Examples:

- cherry blossom petals
- snow atmosphere
- moon-viewing decorations
- event-limited warmth or color

Seasonal changes should feel like temporary atmosphere, not obligation gameplay.

## MVP Direction

MVP should remain intentionally small.

Furniture examples:

- cushion
- wooden bucket
- lantern

Onsen atmosphere examples:

- steam increase
- inlet
- lantern light

Theme example:

- cherry blossom theme

Cat action examples:

- walk
- sit
- sleep
- use hot spring

This is sufficient for MVP. The goal is to prove that rewards make Home feel more alive, not to build a large crafting system.

## MVP Home Growth Acceptance

For the MVP vertical slice, a reward-to-Home connection is successful if it creates at least one of:

- a visible Home change
- a new cat interaction point
- a new atmosphere detail
- progress toward a recipe/craft
- a new reason to observe Home

The MVP does not need:

- deep placement systems
- advanced crafting chains
- resource optimization
- large furniture catalogs
- multi-area Home management

## Future Expansion Compatibility

The structure should allow future expansion such as:

- additional furniture recipes
- additional themes
- seasonal events
- more cat behaviors
- multiple Home areas
- advanced placement systems

However, do not implement future systems yet. Only keep definitions clean enough that future systems can be added without rewriting the emotional direction.

## Game Studio Architecture Notes

Future implementation should keep Game Studio-style separation:

- systems/game logic: reward-to-growth mapping, recipe unlocks, craft eligibility, Home progression state
- rendering/components: Home scene, furniture display, cat interaction presentation, atmosphere effects
- assets/pipeline: furniture images, atmosphere props, theme assets, cat behavior sprites/poses
- save/state: unlocked recipes, materials, crafted furniture, placed furniture, active theme, active cats, observed moments

Home growth systems should not own rendering details. Rendering should display resolved Home state and cat moments. Save data should store stable ids and state, not raw images or animation cache.

## Open Questions

- Which exact furniture items are required for the first MVP slice?
- Which cat behaviors are required for each MVP furniture item?
- How much placement freedom is needed for MVP?
- Should atmosphere upgrades be crafted, unlocked, or auto-applied?
- How should recipe progress be previewed without becoming a management dashboard?
- Which seasonal theme should be first after cherry blossom?
