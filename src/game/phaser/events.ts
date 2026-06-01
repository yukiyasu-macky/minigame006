import type { OnsenPuzzleState, OnsenResult } from "../simulation/onsenPuzzle";

export interface PhaserGameEvents {
  onStateChange: (state: OnsenPuzzleState) => void;
  onComplete: (result: OnsenResult) => void;
}
