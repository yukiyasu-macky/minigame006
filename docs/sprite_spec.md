# Layered Cat Sprite Specification

## 1. Purpose

This spec defines how layered cat sprites for あわねこ湯屋 are produced, exported, aligned, and later rendered.

The goals are:

- seed-generated cats
- reusable sprite parts
- stable layer composition
- future React/CSS or Canvas rendering compatibility
- future localStorage/Firebase save compatibility
- visual consistency with the design sheet

This is a production planning document only. It does not add gameplay, runtime code, React/Vite setup, or actual generated image assets.

## 2. Source of Truth

Sprite production must reference:

- `docs/design_sheet.md`
- `assets/reference/awaneko_design_sheet.png`
- `assets/asset_manifest.json`
- `docs/image_prompts.md`

Visual style must follow:

- warm watercolor storybook
- Japanese soft onsen atmosphere
- rounded cute cat silhouettes
- cocoa-brown pencil-like outlines
- soft cream/pastel palette
- gentle rescue/healing mood

Strongly avoid:

- realistic cat anatomy
- hard anime cel shading
- glossy mobile game UI
- neon
- metal
- PvP/battle aesthetics
- aggressive effects

The reference image at `assets/reference/awaneko_design_sheet.png` is accessible in the repository and has been inspected for this spec.

## 3. Sprite Canvas Standard

Use this default unless future tests prove otherwise:

- Base canvas: 768x768 px
- Transparent PNG
- sRGB color
- 72dpi or screen-standard export
- No background
- Same canvas size for all primary cat layers
- Centered cat body
- Bottom contact area reserved
- Minimum transparent margin: 64px around visible artwork where possible

Primary cat layers using 768x768:

- body
- pattern
- eyes
- mouth
- tail
- dirt
- cat/effect

Accessory exception:

- accessory source files may be 512x512
- production placement must define attachment metadata
- future runtime may render accessories inside a 768x768 composition space

## 4. Coordinate System

Planning coordinate assumptions:

- Origin: top-left
- X axis: left to right
- Y axis: top to bottom
- Composition center: x=384
- Ground/contact baseline: y=640
- Face center guide: x=384, y=330
- Eye guide line: y=300
- Mouth guide line: y=365
- Ear top guide: y=150
- Paw/front body guide: y=520
- Tail safe zone: x=120-680, y=300-610 depending on tail side

These are planning defaults and should be validated with the first asset batch before producing a large sprite library.

## 5. Anchor Points

Standard anchors:

- sprite_origin: top-left 0,0
- body_anchor: center-bottom at x=384, y=640
- face_anchor: x=384, y=330
- eyes_anchor: x=384, y=300
- mouth_anchor: x=384, y=365
- tail_anchor_left: x=260, y=500
- tail_anchor_right: x=508, y=500
- head_accessory_anchor: x=384, y=170
- neck_accessory_anchor: x=384, y=420
- dirt_anchor: full-canvas aligned
- effect_anchor: full-canvas aligned

All generated layers must visually align to these anchors. If an asset intentionally breaks the default, that exception should be documented before production use.

## 6. Layer Order

Future render order:

1. shadow
2. tail_back
3. body
4. pattern
5. dirt
6. blush_or_minor_mark
7. eyes
8. mouth
9. accessory_neck
10. accessory_head
11. bubbles
12. steam
13. sparkle_or_reveal_glow
14. foreground_effect

Tail may sometimes render behind or beside the body. Dirt must be above body/pattern but below facial features when possible. Effects must not hide the face unless used during a reveal state.

## 7. Required Layer Categories

### body

- must include full silhouette
- no eyes/mouth unless intentionally baked for special cases
- rounded proportions
- blank face area
- front-facing seated pose for MVP
- consistent head/body/paw locations

### pattern

- overlay only
- no body silhouette changes
- no facial expression
- must align to body canvas
- transparent background

### eyes

- transparent layer
- must align to eye guide line
- no mouth included
- variations should be gentle

### mouth

- transparent layer
- small simple marks
- must align to mouth guide line

### tail

- can be behind-body or side layer
- should not shift body anchor
- must be available in color-compatible versions

### accessory

- hats, towels, ribbons, bells, flowers
- must define intended attachment point
- should not obscure eyes
- future metadata should include `attachPoint`

### dirt

- overlay layer for rescued state
- must not look scary
- should allow washing/reveal animation
- should not fully hide eyes unless specifically a pre-reveal state

### effect

- bubbles, steam, glow, sparkles
- low opacity
- gentle
- no aggressive impact

## 8. Body Shape Variants

Initial body shapes:

- round
- standard
- tiny
- fluffy

For MVP, `round` is the first required shape. All other layers should first target `round`.

If multiple body shapes are used, each accessory, pattern, and dirt layer may need compatible variants or attachment metadata.

## 9. Export Rules

- PNG with transparency
- no background
- no text in sprite files
- no shadows baked into primary body unless subtle and internal
- keep external ground shadows separate
- keep outlines soft cocoa-brown
- avoid pure black outlines
- avoid hard white highlights
- keep watercolor softness consistent
- do not crop to visible bounds for 768x768 primary layers
- keep full canvas intact for alignment

## 10. File Naming Rules

Use lowercase snake_case.

Pattern:

`assets/images/cat/{category}/cat_{category}_{descriptor}_{variant}.png`

Examples:

- `assets/images/cat/body/cat_body_round_cream.png`
- `assets/images/cat/pattern/cat_pattern_calico_soft.png`
- `assets/images/cat/eyes/cat_eyes_sleepy_amber.png`
- `assets/images/cat/mouth/cat_mouth_tiny_smile.png`
- `assets/images/cat/tail/cat_tail_curve_cream.png`
- `assets/images/cat/accessory/cat_accessory_head_towel.png`
- `assets/images/cat/dirt/cat_dirt_muddy_overlay.png`
- `assets/images/cat/effect/cat_effect_bath_bubbles.png`

## 11. Manifest Metadata Recommendations

Future optional fields for `assets/asset_manifest.json`:

- `canvasSize`
- `anchor`
- `attachPoint`
- `layerOrder`
- `compatibleBodyTypes`
- `compatibleBaseColors`
- `renderMode`
- `opacityDefault`
- `scaleDefault`
- `offsetDefault`
- `tags`

Example:

```json
{
  "canvasSize": "768x768",
  "anchor": { "x": 384, "y": 640 },
  "layerOrder": 3,
  "compatibleBodyTypes": ["round"],
  "tags": ["cat", "body", "mvp"]
}
```

These fields should be added only after the first sprite test batch proves the coordinate and anchor assumptions. Asset ids should remain stable, and save data should never depend on temporary filenames.

## 12. Prompt Guidance for Layered Sprites

Prompt requirements for generated sprite parts:

- Always request transparent PNG.
- Always request full 768x768 canvas for primary cat layers.
- Always specify front-facing seated round cat for MVP.
- Always specify blank face area for body.
- Always specify no background.
- Always specify cocoa-brown soft outline.
- Always specify watercolor softness.
- Always avoid extra accessories unless that is the target part.

Body prompt example:

```text
Transparent PNG, full 768x768 canvas, front-facing seated round cat body for a cozy Japanese onsen rescue game, centered with body anchor near x=384 y=640, large head, small paws, rounded ears, blank face area for separate eyes and mouth, soft cream watercolor fur, cocoa-brown pencil-like outline, no accessories, no background.
```

Pattern prompt example:

```text
Transparent PNG, full 768x768 canvas, cat fur pattern overlay only for the round seated body, soft calico patches in warm brown and muted orange, aligned to the body canvas, no body silhouette changes, no eyes, no mouth, watercolor softness, cocoa-brown feathered marks only where needed, no background.
```

Eyes prompt example:

```text
Transparent PNG, full 768x768 canvas, gentle rounded green cat eyes aligned to y=300, cocoa-brown soft outlines, warm watercolor highlights, no mouth, no accessories, no background, cozy healing storybook style.
```

Dirt prompt example:

```text
Transparent PNG, full 768x768 canvas, soft muddy dirt overlay for a rescued round cat, muted warm gray-brown watercolor smudges, aligned to body canvas, non-scary, does not fully hide eyes, no background.
```

Accessory prompt example:

```text
Transparent PNG accessory source, small folded onsen head towel for head_accessory_anchor x=384 y=170, soft cream cloth with pale blue edge, cocoa-brown outline, watercolor texture, no cat body, no background.
```

Effect prompt example:

```text
Transparent PNG, full 768x768 canvas, gentle bath bubbles around a round seated cat silhouette area, pale blue translucent watercolor bubbles, low opacity, face area remains readable, no aggressive magic, no background.
```

## 13. Validation Checklist

- Does the layer use the correct canvas size?
- Is the background transparent?
- Does it align with body anchor?
- Does it match the design sheet softness?
- Does it avoid hard black outlines?
- Does it avoid realistic fur?
- Does it avoid neon/glossy style?
- Can it be layered without covering face?
- Does filename follow snake_case?
- Is manifest id stable?
- Does it work at mobile size?

## 14. First Asset Batch Recommendation

Recommended first batch:

- `cat_body_round_cream`
- `cat_pattern_calico_soft`
- `cat_eyes_gentle_green`
- `cat_mouth_tiny_smile`
- `cat_tail_curve_cream`
- `cat_accessory_head_towel`
- `cat_dirt_muddy_overlay`
- `cat_effect_bath_bubbles`
- `effect_steam_wisps_soft`
- `ui_panel_paper_large`

This batch is enough to test basic layered cat rendering before gameplay. It also checks body alignment, face placement, dirt readability, accessory attachment, effect opacity, and UI panel contrast against the design sheet mood.

## 15. Future Rendering Notes

- React/CSS layered images can be used for MVP.
- Canvas can be introduced later if export/share images are needed.
- The cat generator should reference stable asset ids, not filenames directly.
- Save data should store ids and seed, not raw paths.
- Runtime renderer should sort layers by `layerOrder`.
- Accessories may require attach-point offsets.

## 16. Open Questions

- Should accessories be generated as 512x512 or normalized to 768x768?
- Do all body colors need separate body PNGs, or can color tinting be used?
- Should pattern overlays be color-specific or neutral masks?
- Should dirt be per-body-type or universal?
- Should rare effects be separate layers or baked into special bodies?
- Should we support side-facing cats later?
- What exact mobile display size should be used for final sprite scale?
