import type { RewardType, RunReward } from "../../types/game";
import { createRunReward } from "../../systems/rewards";

export type PieceType = "leaf" | "mud" | "moss" | "flower" | "rock";
export type DirtType = Exclude<PieceType, "rock">;

export interface BoardPiece {
  id: string;
  type: PieceType;
  row: number;
  column: number;
  source: "initial" | "attached" | "refill" | "zabaa";
}

export interface BoardCell {
  row: number;
  column: number;
}

export interface LaunchDebug {
  launchType: "cleaningBubble";
  launchEnd: BoardCell | null;
  attachedCell: BoardCell | null;
  attachedType: DirtType | null;
  clusterSize: number;
  clusterCells: BoardCell[];
  removedCells: BoardCell[];
  flowResult: BoardCell[];
  refillCells: BoardCell[];
}

export interface OnsenPuzzleState {
  runId: string;
  targetType: DirtType;
  targetCount: number;
  normalTargetCleaned: number;
  normalCleanedCount: number;
  zabaaWashedCount: number;
  bubblesLeft: number;
  score: number;
  zabaaLeft: number;
  zabaaUsed: number;
  attachCount: number;
  refillCount: number;
  pieces: BoardPiece[];
  reward: RunReward;
}

export interface BoardDelta {
  attachedPiece: BoardPiece | null;
  removedPieces: BoardPiece[];
  movedPieces: BoardPiece[];
  newPieces: BoardPiece[];
}

export interface LaunchOutcome extends BoardDelta {
  hit: boolean;
  cleaned: boolean;
  targetCleaned: number;
  scoreDelta: number;
  clusterSize: number;
  message: string;
  debug: LaunchDebug;
}

export interface ZabaaOutcome extends BoardDelta {
  state: OnsenPuzzleState;
}

export interface OnsenResult {
  success: boolean;
  missionText: string;
  runId: string;
  targetType: DirtType;
  normalTargetCleaned: number;
  targetCount: number;
  normalCleanedCount: number;
  zabaaWashedCount: number;
  bubblesLeft: number;
  zabaaUsed: number;
  missionProgress: number;
  score: number;
  washRate: number;
  reward: RunReward;
}

const ROW_LENGTHS = [6, 7, 6, 7, 6, 7, 6, 7] as const;
const ROWS = ROW_LENGTHS.length;
const MAX_COLUMNS = Math.max(...ROW_LENGTHS);
const targetTypes: DirtType[] = ["leaf", "mud", "moss", "flower"];

const makeRunId = () => `run_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const hash = (value: string) =>
  Array.from(value).reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0);

const makePieceId = (runId: string, row: number, column: number, index = 0) => `${runId}_${row}_${column}_${index}`;

const isValidCell = (row: number, column: number) =>
  row >= 0 && row < ROWS && column >= 0 && column < ROW_LENGTHS[row];

const isRockCell = (row: number, column: number) =>
  (row === 0 && column === 0) ||
  (row === 0 && column === 3) ||
  (row === 2 && column === 2) ||
  (row === 3 && column === 5) ||
  (row === 6 && column === 4);

const pickDirtType = (seed: number, row: number, column: number): DirtType =>
  targetTypes[Math.abs(seed + row * 7 + column * 11) % targetTypes.length];

const createPiece = (
  runId: string,
  row: number,
  column: number,
  type: PieceType,
  index: number,
  source: BoardPiece["source"],
): BoardPiece => ({
  id: makePieceId(runId, row, column, index),
  type,
  row,
  column,
  source,
});

const buildBoard = (runId: string, seed: number): BoardPiece[] => {
  const pieces: BoardPiece[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < ROW_LENGTHS[row]; column += 1) {
      if (isRockCell(row, column)) {
        pieces.push(createPiece(runId, row, column, "rock", 0, "initial"));
        continue;
      }

      pieces.push(createPiece(runId, row, column, pickDirtType(seed, row, column), 0, "initial"));
    }
  }

  return ensurePlayableClusters(pieces);
};

const ensurePlayableClusters = (pieces: BoardPiece[]) => {
  const mutable = pieces.map((piece) => ({ ...piece }));
  const clusterSpecs: Array<{ row: number; column: number; type: DirtType }> = [
    { row: 6, column: 0, type: "leaf" },
    { row: 6, column: 2, type: "mud" },
    { row: 6, column: 4, type: "moss" },
    { row: 4, column: 4, type: "flower" },
  ];

  clusterSpecs.forEach(({ row, column, type }) => {
    for (let offset = 0; offset < 2; offset += 1) {
      const existing = mutable.find((piece) => piece.row === row && piece.column === column + offset);
      if (existing && existing.type !== "rock") {
        existing.type = type;
      } else if (!existing && isValidCell(row, column + offset) && !isRockCell(row, column + offset)) {
        mutable.push({
          id: makePieceId("seed", row, column + offset, offset),
          type,
          row,
          column: column + offset,
          source: "initial",
        });
      }
    }
  });

  return mutable;
};

export const createOnsenPuzzle = (): OnsenPuzzleState => {
  const runId = makeRunId();
  const seed = hash(runId);
  const targetType = targetTypes[seed % targetTypes.length];
  const pieces = buildBoard(runId, seed).map((piece, index) => ({
    ...piece,
    id: piece.id.startsWith("seed") ? makePieceId(runId, piece.row, piece.column, index) : piece.id,
  }));
  const targetAvailable = pieces.filter((piece) => piece.type === targetType).length;

  return {
    runId,
    targetType,
    targetCount: Math.min(7, Math.max(4, targetAvailable)),
    normalTargetCleaned: 0,
    normalCleanedCount: 0,
    zabaaWashedCount: 0,
    bubblesLeft: 14,
    score: 0,
    zabaaLeft: 3,
    zabaaUsed: 0,
    attachCount: 0,
    refillCount: 0,
    pieces,
    reward: createRunReward(runId),
  };
};

const toCell = (piece: BoardPiece): BoardCell => ({ row: piece.row, column: piece.column });

const inBounds = (cell: BoardCell) => isValidCell(cell.row, cell.column);

const activeAt = (pieces: BoardPiece[], row: number, column: number) =>
  pieces.find((piece) => piece.row === row && piece.column === column);

const neighborPositions = (row: number, column: number) => {
  const offsets =
    row % 2 === 0
      ? [
          [0, -1],
          [0, 1],
          [-1, 0],
          [-1, 1],
          [1, 0],
          [1, 1],
        ]
      : [
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 0],
          [1, -1],
          [1, 0],
        ];
  return offsets
    .map(([rowOffset, columnOffset]) => ({ row: row + rowOffset, column: column + columnOffset }))
    .filter(({ row, column }) => isValidCell(row, column));
};

const neighborsOf = (piece: BoardPiece, pieces: BoardPiece[]) =>
  neighborPositions(piece.row, piece.column)
    .map(({ row, column }) => activeAt(pieces, row, column))
    .filter((candidate): candidate is BoardPiece => Boolean(candidate));

const collectCluster = (start: BoardPiece, pieces: BoardPiece[], type: DirtType) => {
  const visited = new Set<string>();
  const cluster: BoardPiece[] = [];
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current.id) || current.type !== type) continue;
    visited.add(current.id);
    cluster.push(current);
    neighborsOf(current, pieces).forEach((neighbor) => {
      if (!visited.has(neighbor.id) && neighbor.type === type) queue.push(neighbor);
    });
  }

  return cluster;
};

const resolveAttachCell = (pieces: BoardPiece[], launchEnd: BoardCell | null) => {
  if (!launchEnd || !inBounds(launchEnd)) {
    return { hitPiece: null, attachCell: null };
  }

  const hitPiece = activeAt(pieces, launchEnd.row, launchEnd.column) ?? null;
  if (hitPiece) {
    return {
      hitPiece,
      attachCell: toCell(hitPiece),
    };
  }

  return {
    hitPiece: null,
    attachCell: null,
  };
};

const emptyLaunchDebug = (state: OnsenPuzzleState, launchEnd: BoardCell | null): LaunchDebug => ({
  launchType: "cleaningBubble",
  launchEnd,
  attachedCell: null,
  attachedType: null,
  clusterSize: 0,
  clusterCells: [],
  removedCells: [],
  flowResult: [],
  refillCells: [],
});

const logLaunchDebug = (debug: LaunchDebug) => {
  console.info("[onsenPuzzle.launch]", debug);
};

const makeRefillPiece = (state: OnsenPuzzleState, row: number, column: number, index: number): BoardPiece =>
  createPiece(
    state.runId,
    row,
    column,
    pickDirtType(hash(state.runId) + state.score + state.refillCount + index * 13, row, column),
    state.refillCount + state.attachCount + index + 1,
    "refill",
  );

const flowAndRefill = (
  state: OnsenPuzzleState,
  piecesAfterRemoval: BoardPiece[],
): { pieces: BoardPiece[]; movedPieces: BoardPiece[]; newPieces: BoardPiece[] } => {
  const finalPieces: BoardPiece[] = piecesAfterRemoval.filter((piece) => piece.type === "rock");
  const movedPieces: BoardPiece[] = [];
  const newPieces: BoardPiece[] = [];
  let refillIndex = 0;

  for (let column = 0; column < MAX_COLUMNS; column += 1) {
    const validRows = Array.from({ length: ROWS }, (_, row) => row).filter((row) => isValidCell(row, column));
    if (validRows.length === 0) continue;

    const rocks = piecesAfterRemoval
      .filter((piece) => piece.type === "rock" && piece.column === column)
      .map((piece) => piece.row);
    let segmentBottom = validRows.at(-1)!;

    for (let row = ROWS - 1; row >= -1; row -= 1) {
      if (row !== -1 && (!isValidCell(row, column) || !rocks.includes(row))) continue;

      const segmentRows = validRows.filter((validRow) => validRow > row && validRow <= segmentBottom);
      const dirt = piecesAfterRemoval
        .filter(
          (piece) =>
            piece.type !== "rock" &&
            piece.column === column &&
            piece.row > row &&
            piece.row <= segmentBottom,
        )
        .sort((a, b) => b.row - a.row);

      let dirtIndex = 0;
      for (const targetRow of [...segmentRows].sort((a, b) => b - a)) {
        const source = dirt[dirtIndex];
        if (source) {
          dirtIndex += 1;
          const moved = { ...source, row: targetRow, column };
          finalPieces.push(moved);
          if (source.row !== targetRow) movedPieces.push(moved);
        } else {
          const created = makeRefillPiece(state, targetRow, column, refillIndex);
          refillIndex += 1;
          finalPieces.push(created);
          newPieces.push(created);
        }
      }

      const nextBottom = validRows.filter((validRow) => validRow < row).at(-1);
      if (nextBottom === undefined) break;
      segmentBottom = nextBottom;
    }
  }

  return { pieces: finalPieces, movedPieces, newPieces };
};

export const applyBubbleHit = (
  state: OnsenPuzzleState,
  launchEnd: BoardCell | null,
): { state: OnsenPuzzleState; outcome: LaunchOutcome } => {
  if (state.bubblesLeft <= 0) {
    const debug = emptyLaunchDebug(state, launchEnd);
    logLaunchDebug(debug);
    return {
      state,
      outcome: {
        hit: false,
        cleaned: false,
        targetCleaned: 0,
        scoreDelta: 0,
        clusterSize: 0,
        message: "泡が足りません",
        attachedPiece: null,
        removedPieces: [],
        movedPieces: [],
        newPieces: [],
        debug,
      },
    };
  }

  const baseState = { ...state, bubblesLeft: state.bubblesLeft - 1, attachCount: state.attachCount + 1 };
  const { hitPiece, attachCell } = resolveAttachCell(state.pieces, launchEnd);

  if (!attachCell) {
    const debug = emptyLaunchDebug(state, launchEnd);
    logLaunchDebug(debug);
    return {
      state: baseState,
      outcome: {
        hit: false,
        cleaned: false,
        targetCleaned: 0,
        scoreDelta: 0,
        clusterSize: 0,
        message: launchEnd ? "付着できる水面がありません" : "狙いが湯気にほどけました",
        attachedPiece: null,
        removedPieces: [],
        movedPieces: [],
        newPieces: [],
        debug,
      },
    };
  }

  const targetPiece = hitPiece && hitPiece.type !== "rock" ? hitPiece : activeAt(state.pieces, attachCell.row, attachCell.column);
  if (!targetPiece || targetPiece.type === "rock") {
    const debug = emptyLaunchDebug(state, launchEnd);
    logLaunchDebug(debug);
    return {
      state: baseState,
      outcome: {
        hit: Boolean(hitPiece),
        cleaned: false,
        targetCleaned: 0,
        scoreDelta: 0,
        clusterSize: 0,
        message: "岩に泡がほどけました",
        attachedPiece: null,
        removedPieces: [],
        movedPieces: [],
        newPieces: [],
        debug,
      },
    };
  }

  const connected = collectCluster(targetPiece, state.pieces, targetPiece.type);
  const removedPieces = connected.length >= 3 ? connected : [];
  const cleaned = removedPieces.length > 0;
  const targetCleaned = removedPieces.filter((piece) => piece.type === state.targetType).length;
  const scoreDelta = cleaned ? removedPieces.length * 95 + targetCleaned * 90 : 20;

  if (!cleaned) {
    const debug: LaunchDebug = {
      launchType: "cleaningBubble",
      launchEnd,
      attachedCell: toCell(targetPiece),
      attachedType: targetPiece.type,
      clusterSize: connected.length,
      clusterCells: connected.map(toCell),
      removedCells: [],
      flowResult: [],
      refillCells: [],
    };
    logLaunchDebug(debug);
    const nextState: OnsenPuzzleState = {
      ...baseState,
      score: state.score + scoreDelta,
      pieces: state.pieces,
    };
    return {
      state: nextState,
      outcome: {
        hit: Boolean(hitPiece),
        cleaned: false,
        targetCleaned: 0,
        scoreDelta,
        clusterSize: connected.length,
        message: "泡が汚れを包みました",
        attachedPiece: null,
        removedPieces: [],
        movedPieces: [],
        newPieces: [],
        debug,
      },
    };
  }

  const removedIds = new Set(removedPieces.map((piece) => piece.id));
  const piecesAfterRemoval = state.pieces.filter((piece) => !removedIds.has(piece.id));
  const flow = flowAndRefill(baseState, piecesAfterRemoval);
  const debug: LaunchDebug = {
    launchType: "cleaningBubble",
    launchEnd,
    attachedCell: toCell(targetPiece),
    attachedType: targetPiece.type,
    clusterSize: removedPieces.length,
    clusterCells: connected.map(toCell),
    removedCells: removedPieces.map(toCell),
    flowResult: flow.movedPieces.map(toCell),
    refillCells: flow.newPieces.map(toCell),
  };
  logLaunchDebug(debug);
  const nextState: OnsenPuzzleState = {
    ...baseState,
    normalTargetCleaned: state.normalTargetCleaned + targetCleaned,
    normalCleanedCount: state.normalCleanedCount + removedPieces.length,
    refillCount: state.refillCount + flow.newPieces.length,
    score: state.score + scoreDelta,
    pieces: flow.pieces,
  };

  return {
    state: nextState,
    outcome: {
      hit: Boolean(hitPiece),
      cleaned: true,
      targetCleaned,
      scoreDelta,
      clusterSize: removedPieces.length,
      message: "同じ汚れが3つつながって流れました",
      attachedPiece: null,
      removedPieces,
      movedPieces: flow.movedPieces,
      newPieces: flow.newPieces,
      debug,
    },
  };
};

export const applyZabaa = (state: OnsenPuzzleState): ZabaaOutcome => {
  if (state.zabaaLeft <= 0) {
    return { state, attachedPiece: null, removedPieces: [], movedPieces: [], newPieces: [] };
  }

  const removedPieces = state.pieces.filter((piece) => piece.type !== "rock");
  const rocks = state.pieces.filter((piece) => piece.type === "rock");
  const newPieces: BoardPiece[] = [];
  let refillIndex = 0;

  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < ROW_LENGTHS[row]; column += 1) {
      if (rocks.some((piece) => piece.row === row && piece.column === column)) continue;
      newPieces.push({
        ...makeRefillPiece(state, row, column, refillIndex),
        source: "zabaa",
      });
      refillIndex += 1;
    }
  }

  const nextState: OnsenPuzzleState = {
    ...state,
    zabaaLeft: state.zabaaLeft - 1,
    zabaaUsed: state.zabaaUsed + 1,
    zabaaWashedCount: state.zabaaWashedCount + removedPieces.length,
    refillCount: state.refillCount + newPieces.length,
    pieces: [...rocks, ...newPieces],
  };

  return {
    attachedPiece: null,
    removedPieces,
    movedPieces: [],
    newPieces,
    state: nextState,
  };
};

export const isPuzzleOver = (state: OnsenPuzzleState) =>
  state.normalTargetCleaned >= state.targetCount || state.bubblesLeft <= 0;

export const targetLabel = (type: DirtType) =>
  ({
    leaf: "落ち葉",
    mud: "泥",
    moss: "苔",
    flower: "花びら",
  })[type];

export const toResult = (state: OnsenPuzzleState): OnsenResult => {
  const success = state.normalTargetCleaned >= state.targetCount;
  const missionProgress = Math.min(1, state.normalTargetCleaned / state.targetCount);
  const washRate = Math.min(
    100,
    Math.round(missionProgress * 72 + Math.min(1, state.normalCleanedCount / 30) * 23 + Math.min(5, state.zabaaUsed) * 1),
  );
  const rewardType: RewardType = success ? state.reward.rewardType : "onsen_material";

  return {
    success,
    missionText: `${targetLabel(state.targetType)}を ${state.targetCount} つ流そう`,
    runId: state.runId,
    targetType: state.targetType,
    normalTargetCleaned: state.normalTargetCleaned,
    targetCount: state.targetCount,
    normalCleanedCount: state.normalCleanedCount,
    zabaaWashedCount: state.zabaaWashedCount,
    bubblesLeft: state.bubblesLeft,
    zabaaUsed: state.zabaaUsed,
    missionProgress,
    score: state.score + (success ? 360 : 0),
    washRate,
    reward: success
      ? state.reward
      : { ...state.reward, rewardTier: "tier1", rewardType, rewardId: "soft_progress", amount: 2, catFound: false },
  };
};
