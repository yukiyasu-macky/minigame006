import { useCallback, useState } from "react";
import { GameShell } from "./components/GameShell";
import { TitleScene } from "./screens/TitleScene";
import { HomeScreen } from "./screens/HomeScreen";
import { MainGameScreen } from "./screens/MainGameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { playTempSound } from "./systems/audio";
import { applyResultToHome, createInitialHomeState } from "./game/simulation/homeGrowth";
import type { OnsenPuzzleState, OnsenResult } from "./game/simulation/onsenPuzzle";
import type { SceneId } from "./types/game";

export const App = () => {
  const [scene, setScene] = useState<SceneId>("title");
  const [home, setHome] = useState(createInitialHomeState);
  const [puzzle, setPuzzle] = useState<OnsenPuzzleState | null>(null);
  const [result, setResult] = useState<OnsenResult | null>(null);
  const [zabaaRequest, setZabaaRequest] = useState<() => void>(() => undefined);

  const enterHome = useCallback(() => {
    playTempSound("start");
    setScene("home");
  }, []);

  const startPuzzle = useCallback(() => {
    playTempSound("start");
    setPuzzle(null);
    setResult(null);
    setScene("game");
  }, []);

  const finishGame = useCallback((nextResult: OnsenResult) => {
    playTempSound("result");
    setResult(nextResult);
    setScene("result");
  }, []);

  const handleZabaa = useCallback(() => {
    playTempSound("zabaa");
    zabaaRequest();
  }, [zabaaRequest]);

  const returnHomeWithResult = useCallback(() => {
    if (result) {
      setHome((current) => applyResultToHome(current, result));
    }
    setScene("home");
    setPuzzle(null);
    setResult(null);
  }, [result]);

  const registerZabaaRequest = useCallback((request: () => void) => {
    setZabaaRequest(() => request);
  }, []);

  return (
    <GameShell title="あわねこ湯屋">
      {scene === "title" && <TitleScene onStart={enterHome} />}
      {scene === "home" && <HomeScreen home={home} onStartPuzzle={startPuzzle} />}
      {scene === "game" && (
        <MainGameScreen
          puzzle={puzzle}
          onStateChange={setPuzzle}
          onComplete={finishGame}
          onZabaaRequest={registerZabaaRequest}
          onZabaa={handleZabaa}
        />
      )}
      {scene === "result" && result && (
        <ResultScreen result={result} onBackHome={returnHomeWithResult} />
      )}
    </GameShell>
  );
};
