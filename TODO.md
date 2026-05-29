# TODO: あわねこ湯屋 Planning Follow-Up

## Missing Design Decisions

- Keep `docs/design_sheet.md` and `assets/reference/awaneko_design_sheet.png` in sync whenever the design direction changes.
- Review `docs/mvp_scope.md`.
- Review `docs/puzzle_design.md`.
- Review `docs/home_growth.md`.
- Review `docs/result_reward_mapping.md`.
- Review `docs/cat_generator.md`.
- Review `docs/save_patch_flow.md`.
- Review `docs/screen_flow.md`, `docs/game_loop.md`, and `docs/ui_safe_area_spec.md`.
- Confirm final logo treatment, including whether the steam/paw motif is part of the production logo.
- Confirm final UI font choices for Japanese and Latin text.
- Define exact palette tokens from the design sheet swatches.
- Decide screen aspect targets for LIFF mobile use.
- Decide tentative top header height and bottom banner reserved height for first mobile mockups.

## Missing Asset Decisions

- Review `docs/sprite_spec.md`.
- Review `docs/asset_pipeline_plan.md`.
- Review `docs/mvp_asset_inventory.md`.
- Review `docs/asset_generation_prompt_rules.md`.
- Review `docs/p0_production_batch.md`.
- Define exact sprite canvas sizes and anchor points for all cat layers.
- Decide whether accessories should be 512x512 or 768x768.
- Decide first runtime target size for live Home cats: `384x384` or `512x512`.
- Decide atlas domain naming and packing tool after runtime setup is approved.
- Decide whether color variants are separate PNGs or tintable layers.
- Decide how many initial cat body, pattern, eye, mouth, tail, dirt, and accessory variants are needed for the first playable prototype.
- Confirm whether rare/fantasy cats need glow layers as separate effects or baked into body art.
- Decide whether room furniture uses isometric perspective, front-facing perspective, or mixed storybook perspective.
- Confirm which icons are required for the first UI pass.

## Technical Risks

- Future React/Vite setup must stay compatible with LIFF browser constraints.
- Asset ids should remain stable if localStorage data later migrates to Firebase.
- Future state needs `isAdShowing`, `reservedAdHeight`, and `safeAreaInsets` without coupling gameplay systems to UI components.
- MVP implementation can drift if puzzle, reward, rendering, save data, and ad state are not kept separated.
- Generated PNG dimensions may become too large for mobile if watercolor backgrounds are exported without compression planning.
- Full-frame animation on every cat layer can create too much atlas memory, draw cost, and visual drift.
- Runtime scaling mismatch can damage watercolor softness and cat layer alignment.
- A future manifest loader needs validation so missing assets fail clearly.

## MVP Stabilization Tasks

- Review and approve `docs/mvp_scope.md`.
- Review and approve `docs/puzzle_design.md`.
- Review and approve `docs/home_growth.md`.
- Review and approve `docs/reward_table.md`.
- Review and approve `docs/result_reward_mapping.md`.
- Review and approve `docs/data_schema.md`.
- Review and approve `docs/cat_generator.md`.
- Review and approve `docs/save_patch_flow.md`.
- Tune the MVP result reward table after playtesting.
- Validate the minimum SaveData structure for localStorage first and Firebase migration later.
- Validate the minimum CatGenerator structure for seed-based generated cats in `docs/cat_generator.md`.
- Define the MVP personality pool, quirk pool, favorite theme pool, and animation set ids for CatGenerator.
- Decide the deterministic `catInstanceId` generation rule from `runId`, `seed`, and `speciesId`.
- Define Home growth linkage rules.
- Map exploration -> reward -> Home progression for cat and non-cat outcomes.
- Define RunReward idempotency and runId lifecycle details from `docs/result_reward_mapping.md`.
- Define RunSession retention and recovery rules from `docs/save_patch_flow.md`.
- Decide where optional ad interruption can happen before Result presentation.
- Define the first MVP furniture interaction points from `docs/home_growth.md`.
- Define the first MVP atmosphere upgrades from `docs/home_growth.md`.
- Define which cat behaviors are required for cushion, wooden bucket, and lantern.
- Define the MVP puzzle mission table from `docs/puzzle_design.md`.
- Define ZABAA tuning values beyond the confirmed 3 uses per puzzle if needed.
- Define dirt/refill flow rules without making movement feel arcade-fast.
- Decide duplicate recipe material conversion values.
- Decide adoption stay duration and grace period values.
- Decide the minimum Tier 2 connections for Album/CatDex and OnsenEdit/Inventory.
- Decide which Tier 3 screens can remain lightweight placeholders during MVP.

## Sprite Alignment Risks

- Body, tail, pattern, dirt, eyes, and mouth layers may drift without shared canvases.
- Accessories need per-body attachment points.
- Dirt overlays need versions that fit multiple body silhouettes.
- Reveal fog and bubbles must not hide the cat face after cleaning.

## Safe-Area Risks

- Bottom navigation can collide with iOS home indicators inside LIFF.
- Top resource counters and close buttons can collide with notches or browser chrome.
- Storybook panel borders may feel cramped on narrow screens if not responsive.
- Persistent bottom banner ads can hide primary actions if screens assume full height.
- Popup/interstitial ads can desync timers, rewards, puzzle logic, or reveal animations if pause/resume is not centralized.

## Mobile UI Risks

- Dense reference-sheet spacing cannot be copied directly into gameplay screens.
- Small rounded labels need minimum touch target rules.
- Beige panels on warm backgrounds may lose contrast without careful borders.
- Steam effects over text can reduce readability.

## Future Implementation Tasks

- Review and approve `PLAN.md` and `assets/asset_manifest.json`.
- Review `docs/design_sheet.md` whenever new reference art or UI examples are added.
- Validate screen mockups against `docs/ui_safe_area_spec.md`.
- Create first screen flow/state diagram from `docs/screen_flow.md` and `docs/game_loop.md`.
- Do not start React/Vite or gameplay runtime until MVP stabilization tasks are reviewed.
- Produce first sprite test batch.
- Produce first asset pipeline test batch from `docs/asset_pipeline_plan.md` after review.
- Approve the `P0` asset cut in `docs/mvp_asset_inventory.md` before adding new manifest entries.
- Use `docs/asset_generation_prompt_rules.md` before any ChatGPT-generated asset prompt is sent.
- Approve `docs/p0_production_batch.md` before generating the first production asset batch.
- Add anchor metadata to `assets/asset_manifest.json` if approved.
- Produce a first approved asset batch after the P0 production gate is reviewed.
- Create static sprite composition test after React/Vite is allowed.
- Create a future CatGenerator fixture test after implementation begins to verify stable ids, no path persistence, and CatDex species updates.
- Create a future SavePatch recovery fixture after implementation begins to verify no duplicate rewards and no skipped Result presentation.
- Prototype static screen compositions before runtime logic.
- Add a future shared layout shell for `SafeArea`, `ReservedAdArea`, and `GameplayArea` after React/Vite is allowed.
- Add React/Vite only after the planning gate is approved.
- Create a future manifest-based asset loader after implementation begins.
- Test layered sprite rendering on mobile viewport sizes.
- Add LIFF integration after the core local prototype is stable.

## Open Questions For Gameplay Phase

- How are cats discovered in the puzzle/search screen?
- What does washing input feel like: tap, drag, bubble matching, or timed cleanse?
- Which cleaning missions are required for the first MVP puzzle slice?
- How should rocks split flow without making the board feel mechanical?
- What exact event or roll determines `catFound` at ResultScreen?
- How long should completed RunSession records remain after Home reflection?
- Which first species masters are required for MVP cat discovery?
- Which personality and quirk labels are required for the first MVP cats?
- What exact materials should duplicate recipes convert into?
- What stay duration and grace period should adoption use for MVP?
- Are rare/fantasy cats purely cosmetic, or do they affect progression?
- What does "send off" mean mechanically and emotionally?
- How many cats should appear in the bathhouse at once?
- What progression should exist without adding pressure or battle-like goals?
- How should Home show growth without becoming a management dashboard?
