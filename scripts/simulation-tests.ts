import assert from "node:assert/strict";
import {
  applyBubbleHit,
  applyZabaa,
  createOnsenPuzzle,
  type BoardPiece,
  type OnsenPuzzleState,
  type PieceType,
} from "../src/game/simulation/onsenPuzzle";
import type { RunReward } from "../src/types/game";

const reward: RunReward = {
  runId: "test_run",
  rewardTier: "tier1",
  rewardType: "onsen_material",
  rewardId: "test_reward",
  amount: 1,
  catFound: false,
};

const piece = (row: number, column: number, type: PieceType): BoardPiece => ({
  id: `p_${row}_${column}_${type}`,
  row,
  column,
  type,
  source: "initial",
});

const state = (pieces: BoardPiece[]): OnsenPuzzleState => ({
  runId: "test_run",
  targetType: "leaf",
  targetCount: 3,
  normalTargetCleaned: 0,
  normalCleanedCount: 0,
  zabaaWashedCount: 0,
  bubblesLeft: 10,
  score: 0,
  zabaaLeft: 3,
  zabaaUsed: 0,
  attachCount: 0,
  refillCount: 0,
  pieces,
  reward,
});

const at = (pieces: BoardPiece[], row: number, column: number) =>
  pieces.find((candidate) => candidate.row === row && candidate.column === column);

const rowLengths = [6, 7, 6, 7, 6, 7, 6, 7];
const isValidCell = (row: number, column: number) =>
  row >= 0 && row < rowLengths.length && column >= 0 && column < rowLengths[row];

{
  const initial = createOnsenPuzzle();
  assert.equal(initial.pieces.length, 52, "初期盤面は52セルすべて埋まる");
  rowLengths.forEach((length, row) => {
    assert.equal(initial.pieces.filter((candidate) => candidate.row === row).length, length, `row${row} は ${length} 個`);
  });
  assert.ok(initial.pieces.every((candidate) => isValidCell(candidate.row, candidate.column)), "存在しないセルを使わない");
}

{
  const initial = state([piece(5, 0, "leaf"), piece(4, 0, "leaf"), piece(4, 1, "leaf")]);
  const { state: next, outcome } = applyBubbleHit(initial, { row: 5, column: 0 });
  assert.equal(outcome.cleaned, true, "leaf が3つ接続したら消える");
  assert.equal(outcome.clusterSize, 3);
  assert.equal(next.normalTargetCleaned, 3);
  assert.equal(next.normalCleanedCount, 3);
}

{
  const initial = state([piece(5, 0, "leaf"), piece(4, 0, "leaf")]);
  const { state: next, outcome } = applyBubbleHit(initial, { row: 5, column: 0 });
  assert.equal(outcome.cleaned, false, "leaf が2つなら消えない");
  assert.equal(outcome.clusterSize, 2);
  assert.equal(next.normalTargetCleaned, 0);
  assert.equal(at(next.pieces, 5, 0)?.type, "leaf", "3つ未満なら汚れは消えない");
}

{
  const initial = state([piece(5, 0, "leaf"), piece(4, 0, "leaf"), piece(4, 1, "leaf"), piece(5, 1, "rock")]);
  const { state: next, outcome } = applyBubbleHit(initial, { row: 5, column: 0 });
  assert.equal(outcome.cleaned, true);
  assert.ok(at(next.pieces, 5, 1)?.type === "rock", "rock は消えない");
}

{
  const initial = state([piece(2, 0, "mud"), piece(5, 0, "leaf"), piece(4, 0, "leaf"), piece(4, 1, "leaf")]);
  const { state: next, outcome } = applyBubbleHit(initial, { row: 5, column: 0 });
  assert.equal(outcome.cleaned, true);
  assert.equal(at(next.pieces, 7, 0)?.type, "mud", "消去後に上のピースが下へ流れる");
  assert.ok(outcome.newPieces.some((created) => created.column === 0), "上から新しい汚れを補充する");
}

{
  const initial = state([piece(0, 0, "rock"), piece(0, 1, "leaf"), piece(1, 0, "mud")]);
  const { state: next, removedPieces, newPieces } = applyZabaa(initial);
  assert.equal(removedPieces.length, 2, "ZABAA は汚れだけ流す");
  assert.equal(newPieces.length, 51, "ZABAA は rock 以外を入れ替える");
  assert.equal(at(next.pieces, 0, 0)?.type, "rock", "ZABAA 後も rock は残る");
  assert.equal(next.pieces.length, 52, "ZABAA 後も52セル構造を保つ");
  assert.ok(next.pieces.every((candidate) => isValidCell(candidate.row, candidate.column)), "ZABAA 後も存在しないセルを使わない");
  assert.equal(next.normalCleanedCount, 0, "ZABAA 分は normalCleanedCount に入らない");
  assert.equal(next.normalTargetCleaned, 0, "ZABAA 分は missionProgress に入らない");
  assert.equal(next.zabaaWashedCount, 2);
}

console.log("simulation tests passed");
