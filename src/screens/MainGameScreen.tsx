import { PhaserGame } from "../components/PhaserGame";
import type { PhaserGameEvents } from "../game/phaser/events";
import type { OnsenPuzzleState } from "../game/simulation/onsenPuzzle";

const targetLabel = {
  leaf: "落ち葉",
  mud: "泥",
  moss: "苔",
  flower: "花びら",
};

interface MainGameScreenProps extends PhaserGameEvents {
  puzzle: OnsenPuzzleState | null;
  onZabaa: () => void;
  onZabaaRequest: (request: () => void) => void;
}

export const MainGameScreen = ({
  puzzle,
  onStateChange,
  onComplete,
  onZabaa,
  onZabaaRequest,
}: MainGameScreenProps) => {
  const progress = puzzle ? Math.min(100, (puzzle.normalTargetCleaned / puzzle.targetCount) * 100) : 0;

  return (
    <div className="game-scene scene-fill">
      <div className="game-hud">
        <section className="mission-panel">
          <p className="eyebrow">今日のお掃除依頼</p>
          <h2>{puzzle ? `${targetLabel[puzzle.targetType]}を ${puzzle.targetCount} つ流そう` : "準備中"}</h2>
          <div className="meter" aria-label="お掃除進行">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="mission-meta">
            {puzzle
              ? `${puzzle.normalTargetCleaned}/${puzzle.targetCount} ・ 残りお掃除 ${puzzle.bubblesLeft} ・ ZABAA入替 ${puzzle.zabaaWashedCount}`
              : "湯気を整えています"}
          </p>
        </section>
        <button
          className="secondary-button zabaa-button"
          type="button"
          onClick={onZabaa}
          disabled={!puzzle || puzzle.zabaaLeft <= 0}
        >
          ざばぁ {puzzle?.zabaaLeft ?? 0}/3
        </button>
      </div>
      <PhaserGame
        onStateChange={onStateChange}
        onComplete={onComplete}
        onZabaaRequest={onZabaaRequest}
      />
      <div className="input-hint">泡を当てた汚れと同じ汚れが3つ以上つながると、やさしく流れます</div>
    </div>
  );
};
