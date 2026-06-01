export type AssetKind = "image" | "audio";

export interface GameAsset {
  id: string;
  kind: AssetKind;
  path: string;
  width?: number;
  height?: number;
  transparent?: boolean;
  phaserKey?: string;
}

export const gameAssets = {
  titleBackground: {
    id: "temp_title_bg",
    kind: "image",
    path: "/assets/temp/backgrounds/temp_title_bg.png",
    width: 1080,
    height: 1920,
  },
  gameBackground: {
    id: "temp_puzzle_hot_spring_surface",
    kind: "image",
    path: "/assets/temp/backgrounds/temp_game_bg.png",
    width: 1080,
    height: 1920,
    phaserKey: "temp_game_bg",
  },
  homeBackground: {
    id: "temp_home_bg",
    kind: "image",
    path: "/assets/temp/backgrounds/temp_home_bg.png",
    width: 1080,
    height: 1920,
  },
  resultBackground: {
    id: "temp_result_bg",
    kind: "image",
    path: "/assets/temp/backgrounds/temp_result_bg.png",
    width: 1080,
    height: 1920,
  },
  catRound: {
    id: "temp_cat_round",
    kind: "image",
    path: "/assets/temp/characters/temp_cat_round.png",
    width: 512,
    height: 512,
    transparent: true,
    phaserKey: "temp_cat_round",
  },
  bubble: {
    id: "temp_bubble",
    kind: "image",
    path: "/assets/temp/puzzle/temp_bubble.png",
    width: 128,
    height: 128,
    transparent: true,
    phaserKey: "temp_bubble",
  },
  leaf: {
    id: "temp_leaf",
    kind: "image",
    path: "/assets/temp/puzzle/temp_leaf.png",
    width: 128,
    height: 128,
    transparent: true,
    phaserKey: "temp_leaf",
  },
  mud: {
    id: "temp_mud",
    kind: "image",
    path: "/assets/temp/puzzle/temp_mud.png",
    width: 128,
    height: 128,
    transparent: true,
    phaserKey: "temp_mud",
  },
  moss: {
    id: "temp_moss",
    kind: "image",
    path: "/assets/temp/puzzle/temp_moss.png",
    width: 128,
    height: 128,
    transparent: true,
    phaserKey: "temp_moss",
  },
  flower: {
    id: "temp_flower",
    kind: "image",
    path: "/assets/temp/puzzle/temp_flower.png",
    width: 128,
    height: 128,
    transparent: true,
    phaserKey: "temp_flower",
  },
  rock: {
    id: "temp_rock",
    kind: "image",
    path: "/assets/temp/puzzle/temp_rock.png",
    width: 128,
    height: 128,
    transparent: true,
    phaserKey: "temp_rock",
  },
  steam: {
    id: "temp_steam",
    kind: "image",
    path: "/assets/temp/fx/temp_steam.png",
    width: 256,
    height: 256,
    transparent: true,
    phaserKey: "temp_steam",
  },
  zabaaEffect: {
    id: "temp_zabaa_effect",
    kind: "image",
    path: "/assets/temp/fx/temp_zabaa_effect.png",
    width: 512,
    height: 512,
    transparent: true,
    phaserKey: "temp_zabaa_effect",
  },
  sparkle: {
    id: "temp_sparkle",
    kind: "image",
    path: "/assets/temp/fx/temp_sparkle.png",
    width: 128,
    height: 128,
    transparent: true,
    phaserKey: "temp_sparkle",
  },
  uiPanel: {
    id: "temp_panel",
    kind: "image",
    path: "/assets/temp/ui/temp_panel.png",
    width: 900,
    height: 420,
    transparent: true,
  },
  uiButton: {
    id: "temp_button",
    kind: "image",
    path: "/assets/temp/ui/temp_button.png",
    width: 640,
    height: 180,
    transparent: true,
  },
} satisfies Record<string, GameAsset>;

export type GameAssetId = keyof typeof gameAssets;

export const getAssetPath = (id: GameAssetId) => gameAssets[id].path;

export const phaserImageAssets = (Object.values(gameAssets) as GameAsset[]).filter(
  (asset): asset is GameAsset & { phaserKey: string } => asset.kind === "image" && Boolean(asset.phaserKey),
);
