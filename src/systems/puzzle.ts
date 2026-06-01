import { createRunReward } from "./rewards";
import type { DirtPiece, DirtType, PuzzleState, ResultSummary } from "../types/game";

const dirtLabels: Record<DirtType, string> = {
  leaf: "葉",
  mud: "泥",
  moss: "苔",
  flower: "花",
  rock: "岩",
};

const dirtTypes: DirtType[] = ["leaf", "mud", "moss", "flower", "rock"];
const targetTypes: Exclude<DirtType, "rock">[] = ["leaf", "mud", "moss", "flower"];

const makeRunId = () => `run_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const createPieces = (runId: string): DirtPiece[] =>
  Array.from({ length: 18 }, (_, index) => {
    const seed = runId.charCodeAt(index % runId.length) + index * 7;
    const type = dirtTypes[seed % dirtTypes.length];

    return {
      id: `${runId}_${index}`,
      type,
      label: dirtLabels[type],
      cleaned: false,
      x: 10 + ((index * 23) % 78),
      y: 10 + Math.floor(index / 3) * 13 + ((index * 5) % 9),
      delay: (index % 6) * 0.12,
    };
  });

export const createPuzzle = (): PuzzleState => {
  const runId = makeRunId();
  const targetType = targetTypes[runId.length % targetTypes.length];

  return {
    runId,
    targetType,
    targetCount: 5,
    cleanedCount: 0,
    washesLeft: 10,
    zabaaLeft: 3,
    pieces: createPieces(runId),
    reward: createRunReward(runId),
  };
};

export const cleanPiece = (state: PuzzleState, pieceId: string): PuzzleState => {
  const piece = state.pieces.find((item) => item.id === pieceId);

  if (!piece || piece.cleaned || piece.type === "rock" || state.washesLeft <= 0) {
    return state;
  }

  const cleanedCount = state.cleanedCount + (piece.type === state.targetType ? 1 : 0);

  return {
    ...state,
    cleanedCount,
    washesLeft: state.washesLeft - 1,
    pieces: state.pieces.map((item) => (item.id === pieceId ? { ...item, cleaned: true } : item)),
  };
};

export const useZabaa = (state: PuzzleState): PuzzleState => {
  if (state.zabaaLeft <= 0) {
    return state;
  }

  const cleanedTargets = state.pieces.filter(
    (piece) => !piece.cleaned && piece.type === state.targetType,
  ).length;

  return {
    ...state,
    cleanedCount: Math.min(state.targetCount, state.cleanedCount + cleanedTargets),
    zabaaLeft: state.zabaaLeft - 1,
    pieces: state.pieces.map((piece) =>
      piece.type === "rock" ? piece : { ...piece, cleaned: true },
    ),
  };
};

export const isPuzzleComplete = (state: PuzzleState) =>
  state.cleanedCount >= state.targetCount || state.washesLeft <= 0;

export const createResultSummary = (state: PuzzleState): ResultSummary => ({
  runId: state.runId,
  cleanedCount: state.cleanedCount,
  targetCount: state.targetCount,
  washRate: Math.min(100, Math.round((state.cleanedCount / state.targetCount) * 100)),
  reward: state.reward,
});
