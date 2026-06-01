import Phaser from "phaser";
import { OnsenCleaningScene, gameSize } from "./scenes/OnsenCleaningScene";
import type { PhaserGameEvents } from "./events";

export const createPhaserGame = (parent: HTMLElement, events: PhaserGameEvents) =>
  new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: gameSize.width,
    height: gameSize.height,
    backgroundColor: "#f4dfbf",
    transparent: false,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
      pixelArt: false,
      antialias: true,
    },
    scene: [],
    callbacks: {
      postBoot: (game) => {
        game.scene.add("OnsenCleaningScene", OnsenCleaningScene, true, events);
      },
    },
  });
