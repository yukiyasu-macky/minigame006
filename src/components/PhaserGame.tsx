import { useEffect, useRef } from "react";
import type Phaser from "phaser";
import { createPhaserGame } from "../game/phaser/createGame";
import type { PhaserGameEvents } from "../game/phaser/events";

interface PhaserGameProps extends PhaserGameEvents {
  onZabaaRequest: (request: () => void) => void;
}

export const PhaserGame = ({ onStateChange, onComplete, onZabaaRequest }: PhaserGameProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const game = createPhaserGame(containerRef.current, { onStateChange, onComplete });
    gameRef.current = game;
    onZabaaRequest(() => {
      game.scene.getScene("OnsenCleaningScene")?.events.emit("zabaa");
    });

    return () => {
      onZabaaRequest(() => undefined);
      game.destroy(true);
      gameRef.current = null;
    };
  }, [onComplete, onStateChange, onZabaaRequest]);

  return <div className="phaser-host" ref={containerRef} />;
};
