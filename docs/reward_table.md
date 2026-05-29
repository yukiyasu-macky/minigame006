# MVP Reward, Stamina, Adoption, And Result Presentation Planning

This document defines the initial config-ready planning values for MVP rewards, stamina, adoption circulation, and ResultScreen presentation.

These values are operating values for planning and tuning. Future implementation must keep them config-driven, not hardcoded as magic numbers.

## Status

Confirmed:

- `ResultScreen` rewards are tier-based.
- One Puzzle play maps to one pre-decided `RunReward`, one primary reward, one idempotent `SavePatch`, and one Tier-based Result presentation. See `docs/result_reward_mapping.md`.
- `ResultScreen` should not always produce a cat.
- There should be no total "nothing" result.
- If no cat is found, the player still receives useful growth or unlock progress.
- Photos and letters are not normal ResultScreen exploration rewards.
- Generic koban/currency is excluded from the MVP reward table for now.
- Bubble is not stamina.
- Stamina controls puzzle play count.
- Result updates should be operation-confirmed and saved before or during Result presentation.

Tentative:

- exact tuning values after playtesting
- exact recipe duplicate material conversion amount
- exact cat discovery selection logic
- exact stay duration values for adoption
- exact presentation durations and animation timing

## Reward Tiers

Tier 1: Basic growth rewards

Purpose:

- daily Home growth
- normal progression
- regular useful result when no cat is found
- progress toward Home atmosphere and cat interaction points

Rewards:

- `furniture_material`
- `onsen_material`
- `bubble_related_reward`

Tier 2: Unlock rewards

Purpose:

- future expectation
- content unlock
- event or crafting motivation
- permission to create new Home interactions or atmosphere changes

Rewards:

- `recipe`
- `event_material`

Tier 3: Emotional rewards

Purpose:

- cat encounter
- RevealScreen transition
- emotional replay motivation

Rewards:

- `normal_cat`
- `rare_cat`

## Initial Reward Rates

Future config name: `rewardConfig`

```json
{
  "tierRates": {
    "tier1": 0.65,
    "tier2": 0.15,
    "tier3": 0.20
  },
  "tier1Rewards": {
    "furniture_material": 0.45,
    "onsen_material": 0.45,
    "bubble_related_reward": 0.10
  },
  "tier2Rewards": {
    "recipe": 0.80,
    "event_material": 0.20
  },
  "tier3Rewards": {
    "normal_cat": 0.90,
    "rare_cat": 0.10
  }
}
```

Meaning:

- Tier 1 is the normal growth loop.
- Tier 2 is the unlock loop.
- Tier 3 is the emotional cat encounter loop.

## Reward Rules

### Recipe Duplicate Rule

- If a recipe is newly found, unlock it.
- If the same recipe is already owned, convert it into materials.
- MVP can use a simple material conversion.
- Future versions may use recipe mastery or research values.

### Cat Duplicate Rule

- Cats should basically not duplicate.
- Treat cats as encounters, not duplicate gacha pulls.
- Prefer undiscovered cats when possible.
- `CatDexScreen` tracks discovered species and records.
- Cat instances may have seed-based individuality, but the player should not feel duplicate-pull frustration.

### Photos And Letters

- Do not treat photos or letters as normal ResultScreen exploration rewards.
- Photos and letters belong to Album and memory systems.
- Photos are generated or stored after adoption/send-off.
- Letters are received after adoption/send-off, possibly after a time delay.
- They are emotional memory rewards, not exploration loot.

### Koban / Currency

- Do not include generic koban/currency in the MVP reward table for now.
- Reason: its purpose is unclear and it risks weakening material meaning.
- It can be reconsidered later if there is a clear use case.

### No Total Nothing Result

- MVP results should not produce a total "nothing" outcome.
- Lightweight outcomes are allowed only if they still advance growth, unlock progress, event progress, or replay motivation.

## Bubble And Stamina

### Bubble

- Bubble is part of puzzle operation and cleaning feel.
- Bubble is not stamina.
- Bubble is not the main play-count limiter.
- Bubble-related rewards may exist only as puzzle-related boost/support materials.
- Bubble-related reward behavior remains tentative and config-driven.

### Stamina

Stamina controls play count. Puzzle play consumes stamina.

Future config name: `staminaConfig`

```json
{
  "maxStamina": 3,
  "costPerPuzzle": 1,
  "adRecovery": 1,
  "adRecoveryLimitPerDay": 1,
  "paidFullRecoveryPrice": "100 yen",
  "paidFullRecoveryEffect": "full_stamina_recovery"
}
```

These are initial tuning values and should remain config-driven.

## Adoption And Cat Stay

Cats should support a soft circulation loop.

Confirmed:

- Cats stay in Home after being found.
- After a hidden stay duration, a cat may receive an adoption request.
- Player can manually send off cats.
- If an adoption request remains unattended for a configured grace period, the cat may be automatically sent off.
- This is intentional to avoid daily login pressure and avoid making players feel forced to manage cats every day.
- Auto send-off must be framed positively: "A new family was found."
- Do not frame auto send-off as deletion or loss.
- Do not force immediate adoption.
- Do not make the cat simply disappear.
- Manual send-off should remain available.
- Rare cats may use longer stay duration or special rules later.

After send-off:

- create adoption record
- add photo/memory to Album
- optionally add letter later
- free a Home cat slot

Future config name: `adoptionConfig`

```json
{
  "baseStayDays": null,
  "adoptionRequestGraceHours": null,
  "autoAdoptionEnabled": true,
  "rareCatStayMultiplier": null
}
```

Exact values are tentative.

## Result Presentation

Future config name: `resultPresentationConfig`

Pipeline:

```text
PuzzleStart
  -> create runId
  -> determine RunReward
  -> PuzzlePlay
  -> PuzzleClear
  -> ZABAA / bath water flow
  -> SavePatch
  -> optional ad interruption
  -> Result presentation
  -> if Tier3 cat: CatEncounterCutIn -> RevealScreen -> CatDetailScreen -> HomeScreen
  -> if Tier1/Tier2: HomeScreen
```

Tier 3 cat encounter presentation:

- Bell sound means cat confirmed.
- Bell sound should be a signature cue.
- After bell, add a short pause/cut-in/attention moment.
- Then transition to `RevealScreen`.
- This should feel gentle, not flashy.
- Avoid SSR/gacha language.

Tone:

- quiet steam
- soft bell
- cat shadow
- tail/ear hint
- warm reveal

Tier 1 and Tier 2 presentation:

- simpler result display
- no cat bell
- recipe can have a slightly special unlock presentation
- normal materials should remain lightweight

## Save And Update Timing

Use operation-confirmed updates.

Important:

- Result reward should be determined and saved before or during Result presentation, not only after the player leaves `ResultScreen`.
- The one primary reward should be determined at `PuzzleStart` as `RunReward`, then applied as an idempotent `SavePatch` after successful clear.
- `ResultScreen` is presentation, not the only owner of rewards.
- Avoid losing rewards if the app closes, LIFF reloads, or an ad interrupts.

Future implementation should use small patches:

- inventory update
- cat update
- recipe unlock
- home growth progress
- adoption update

Avoid saving:

- raw images
- animation frame state
- particles
- render cache
- every-frame coordinates

Save generated entities by stable ids and seeds where possible.

## Future Config Names

Suggested future config names:

- `rewardConfig`
- `staminaConfig`
- `adoptionConfig`
- `resultPresentationConfig`
- `catGenerationConfig`
- `homeGrowthConfig`

These configs should live outside rendering components and should be consumed by systems/game logic.

Home growth meaning and reward-to-Home mapping are defined in `docs/home_growth.md`.
