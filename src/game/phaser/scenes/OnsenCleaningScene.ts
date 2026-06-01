import Phaser from "phaser";
import { phaserImageAssets } from "../../assets/manifest";
import {
  applyBubbleHit,
  applyZabaa,
  createOnsenPuzzle,
  isPuzzleOver,
  toResult,
  type BoardPiece,
  type BoardCell,
  type OnsenPuzzleState,
  type PieceType,
} from "../../simulation/onsenPuzzle";
import type { PhaserGameEvents } from "../events";

const WIDTH = 540;
const HEIGHT = 960;
const SHOOTER = { x: WIDTH / 2, y: 808 };
const ROW_LENGTHS = [6, 7, 6, 7, 6, 7, 6, 7] as const;
const BOARD_ROWS = ROW_LENGTHS.length;
const BOARD_ORIGIN = { x: 88, y: 188 };
const CELL_X = 54;
const CELL_Y = 46;
const ROW_OFFSET = CELL_X / 2;
const BOARD_PIECE_SIZE = 50;
const PROJECTILE_SIZE = 50;
const ROCK_SIZE = 56;

const pieceAsset: Record<PieceType, string> = {
  leaf: "temp_leaf",
  mud: "temp_mud",
  moss: "temp_moss",
  flower: "temp_flower",
  rock: "temp_rock",
};

const pieceTint: Record<PieceType, number> = {
  leaf: 0xb4d37d,
  mud: 0xad7b57,
  moss: 0x7cae7d,
  flower: 0xe7a6b0,
  rock: 0x999082,
};

const CLEANING_BUBBLE_TINT = 0xd8f8ff;

export class OnsenCleaningScene extends Phaser.Scene {
  private state!: OnsenPuzzleState;
  private eventsBridge!: PhaserGameEvents;
  private pieces = new Map<string, Phaser.GameObjects.Image>();
  private aimLine?: Phaser.GameObjects.Line;
  private aimPoint = new Phaser.Math.Vector2(SHOOTER.x, SHOOTER.y - 180);
  private activeBubble?: Phaser.GameObjects.Image;
  private canLaunch = true;
  private completed = false;

  constructor() {
    super("OnsenCleaningScene");
  }

  init(data: PhaserGameEvents) {
    this.eventsBridge = data;
    this.state = createOnsenPuzzle();
  }

  preload() {
    phaserImageAssets.forEach((asset) => {
      this.load.image(asset.phaserKey, asset.path);
    });
  }

  create() {
    this.createBackground();
    this.createBoard();
    this.createShooter();
    this.input.on("pointerdown", this.handleAimMove, this);
    this.input.on("pointermove", this.handleAimMove, this);
    this.input.on("pointerup", this.handleLaunch, this);
    this.events.on("zabaa", this.handleZabaa, this);
    this.eventsBridge.onStateChange(this.state);
  }

  private createBackground() {
    this.add.image(WIDTH / 2, HEIGHT / 2, "temp_game_bg").setDisplaySize(WIDTH, HEIGHT);
    this.add.image(128, 190, "temp_steam").setAlpha(0.5).setScale(0.8);
    this.add.image(420, 250, "temp_steam").setAlpha(0.42).setScale(0.72);
    this.add.image(WIDTH - 82, HEIGHT - 112, "temp_cat_round").setScale(0.28).setAlpha(0.92);
  }

  private createBoard() {
    const board = this.add.rectangle(WIDTH / 2, 352, 476, 456, 0x7bc1b8, 0.22);
    board.setStrokeStyle(4, 0x5f3e2c, 0.24);
    this.tweens.add({
      targets: board,
      alpha: { from: 0.18, to: 0.32 },
      duration: 1800,
      yoyo: true,
      repeat: -1,
    });

    this.state.pieces.forEach((piece) => this.createPieceSprite(piece));
  }

  private cellToWorld(row: number, column: number) {
    const rowOffset = row % 2 === 0 ? ROW_OFFSET : 0;
    return {
      x: BOARD_ORIGIN.x + rowOffset + column * CELL_X,
      y: BOARD_ORIGIN.y + row * CELL_Y,
    };
  }

  private worldToCell(x: number, y: number): BoardCell | null {
    let nearest: BoardCell | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let row = 0; row < BOARD_ROWS; row += 1) {
      for (let column = 0; column < ROW_LENGTHS[row]; column += 1) {
        const position = this.cellToWorld(row, column);
        const distance = Phaser.Math.Distance.Between(x, y, position.x, position.y);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = { row, column };
        }
      }
    }

    return nearestDistance <= 32 ? nearest : null;
  }

  private pieceAtCell(cell: BoardCell | null) {
    if (!cell) return null;
    return this.state.pieces.find((piece) => piece.row === cell.row && piece.column === cell.column) ?? null;
  }

  private traceLaunchCell() {
    const distance = Phaser.Math.Distance.Between(SHOOTER.x, SHOOTER.y, this.aimPoint.x, this.aimPoint.y);
    const steps = Math.max(12, Math.ceil(distance / 12));
    let lastCell: BoardCell | null = null;

    for (let step = 1; step <= steps; step += 1) {
      const t = step / steps;
      const x = Phaser.Math.Linear(SHOOTER.x, this.aimPoint.x, t);
      const y = Phaser.Math.Linear(SHOOTER.y, this.aimPoint.y, t);
      const cell = this.worldToCell(x, y);
      if (!cell) continue;
      if (lastCell && lastCell.row === cell.row && lastCell.column === cell.column) continue;
      lastCell = cell;
      if (this.pieceAtCell(cell) || cell.row === 0) return cell;
    }

    return lastCell;
  }

  private createPieceSprite(piece: BoardPiece, startOffsetY = 0) {
    const position = this.cellToWorld(piece.row, piece.column);
    const size = piece.type === "rock" ? ROCK_SIZE : BOARD_PIECE_SIZE;
    const sprite = this.add
      .image(position.x, position.y + startOffsetY, pieceAsset[piece.type])
      .setDisplaySize(size, size);
    sprite.setData("pieceId", piece.id);
    sprite.setData("pieceType", piece.type);
    this.pieces.set(piece.id, sprite);
    return sprite;
  }

  private createShooter() {
    this.add.circle(SHOOTER.x, SHOOTER.y, 52, 0xf7e7c7, 0.86).setStrokeStyle(4, 0x6d4932, 0.45);
    this.activeBubble = this.add
      .image(SHOOTER.x, SHOOTER.y, "temp_bubble")
      .setDisplaySize(PROJECTILE_SIZE, PROJECTILE_SIZE)
      .setTint(CLEANING_BUBBLE_TINT);
    this.aimLine = this.add.line(0, 0, SHOOTER.x, SHOOTER.y, this.aimPoint.x, this.aimPoint.y, 0xffffff, 0.74);
    this.aimLine.setLineWidth(4, 2);
  }

  private handleAimMove(pointer: Phaser.Input.Pointer) {
    if (!this.canLaunch || this.completed) return;
    const clampedY = Phaser.Math.Clamp(pointer.y, 248, SHOOTER.y - 70);
    const clampedX = Phaser.Math.Clamp(pointer.x, 52, WIDTH - 52);
    this.aimPoint.set(clampedX, clampedY);
    this.aimLine?.setTo(SHOOTER.x, SHOOTER.y, this.aimPoint.x, this.aimPoint.y);
  }

  private handleLaunch(input?: Phaser.Input.Pointer) {
    if (!this.canLaunch || this.completed || this.state.bubblesLeft <= 0 || !this.activeBubble) return;

    if (input) {
      this.handleAimMove(input);
    }
    const targetCell = this.traceLaunchCell();
    const { state, outcome } = applyBubbleHit(this.state, targetCell);
    const launchEnd = targetCell
        ? this.cellToWorld(targetCell.row, targetCell.column)
        : { x: this.aimPoint.x, y: this.aimPoint.y };
    this.canLaunch = false;
    const bubble = this.activeBubble;
    this.activeBubble = undefined;

    this.tweens.add({
      targets: bubble,
      x: launchEnd.x,
      y: launchEnd.y,
      duration: 260,
      ease: "Sine.out",
      onComplete: () => {
        bubble.destroy();
        this.state = state;
        this.applyBoardDelta(outcome);
        if (outcome.cleaned) {
          const first = outcome.removedPieces[0];
          if (first) {
            const position = this.cellToWorld(first.row, first.column);
            this.floatScore(position.x, position.y, outcome.scoreDelta, outcome.targetCleaned > 0);
          }
        } else {
          this.missFx(this.aimPoint.x, this.aimPoint.y, outcome.message);
        }
        this.eventsBridge.onStateChange(this.state);
        this.checkCompletionOrReloadBubble();
      },
    });
  }

  private cleanSprite(piece: BoardPiece, targetCleaned: boolean, onComplete?: () => void) {
    const sprite = this.pieces.get(piece.id);
    if (!sprite) return;

    const sparkle = this.add.image(sprite.x, sprite.y, "temp_sparkle").setScale(targetCleaned ? 0.72 : 0.5);
    this.tweens.add({
      targets: sparkle,
      alpha: 0,
      scale: targetCleaned ? 1.08 : 0.8,
      duration: 420,
      onComplete: () => sparkle.destroy(),
    });
    this.tweens.add({
      targets: sprite,
      alpha: 0,
      scale: 0.18,
      y: sprite.y - 28,
      duration: 360,
      ease: "Back.in",
      onComplete: () => {
        sprite.disableInteractive().setVisible(false);
        onComplete?.();
      },
    });
  }

  private applyBoardDelta(delta: {
    attachedPiece: BoardPiece | null;
    removedPieces: BoardPiece[];
    movedPieces: BoardPiece[];
    newPieces: BoardPiece[];
  }) {
    if (delta.attachedPiece) {
      const attached = this.createPieceSprite(delta.attachedPiece);
      attached.setAlpha(0);
      this.tweens.add({
        targets: attached,
        alpha: 1,
        duration: 220,
        ease: "Back.out",
      });
    }

    delta.removedPieces.forEach((piece) => {
      this.cleanSprite(piece, piece.type === this.state.targetType, () => {
        const sprite = this.pieces.get(piece.id);
        if (sprite) {
          this.pieces.delete(piece.id);
          sprite.destroy();
        }
      });
    });

    delta.movedPieces.forEach((piece) => {
      const sprite = this.pieces.get(piece.id);
      if (!sprite || piece.type === "rock") return;
      const position = this.cellToWorld(piece.row, piece.column);
      this.tweens.add({
        targets: sprite,
        x: position.x,
        y: position.y,
        duration: 420,
        ease: "Sine.inOut",
      });
    });

    delta.newPieces.forEach((piece, index) => {
      const sprite = this.createPieceSprite(piece, -86);
      sprite.setAlpha(0);
      const position = this.cellToWorld(piece.row, piece.column);
      this.tweens.add({
        targets: sprite,
        y: position.y,
        alpha: 1,
        duration: 460 + index * 12,
        ease: "Sine.out",
      });
    });
  }

  private missFx(x: number, y: number, message = "") {
    const ring = this.add.circle(x, y, 20, 0xffffff, 0.24).setStrokeStyle(4, 0xffffff, 0.65);
    this.tweens.add({
      targets: ring,
      radius: 48,
      alpha: 0,
      duration: 360,
      onComplete: () => ring.destroy(),
    });
    if (message) {
      const text = this.add
        .text(x, y - 36, message, {
          fontFamily: "sans-serif",
          fontSize: "16px",
          color: "#fff4db",
          stroke: "#5f3e2c",
          strokeThickness: 4,
        })
        .setOrigin(0.5);
      this.tweens.add({
        targets: text,
        y: y - 70,
        alpha: 0,
        duration: 820,
        onComplete: () => text.destroy(),
      });
    }
  }

  private floatScore(x: number, y: number, amount: number, targetCleaned: boolean) {
    const text = this.add
      .text(x, y, targetCleaned ? `+${amount} しゅわ` : `+${amount}`, {
        fontFamily: "sans-serif",
        fontSize: targetCleaned ? "22px" : "18px",
        color: targetCleaned ? "#fff4db" : "#5f3e2c",
        stroke: "#5f3e2c",
        strokeThickness: 4,
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: text,
      y: y - 48,
      alpha: 0,
      duration: 760,
      onComplete: () => text.destroy(),
    });
  }

  private checkCompletionOrReloadBubble() {
    if (isPuzzleOver(this.state)) {
      this.completed = true;
      this.time.delayedCall(580, () => {
        this.eventsBridge.onComplete(toResult(this.state));
      });
      return;
    }

    this.time.delayedCall(120, () => {
      this.activeBubble = this.add
        .image(SHOOTER.x, SHOOTER.y, "temp_bubble")
        .setDisplaySize(PROJECTILE_SIZE, PROJECTILE_SIZE)
        .setTint(CLEANING_BUBBLE_TINT);
      this.canLaunch = true;
    });
  }

  private handleZabaa() {
    if (this.completed || !this.canLaunch) return;
    const { state, attachedPiece, removedPieces, movedPieces, newPieces } = applyZabaa(this.state);
    if (state === this.state) return;

    this.state = state;
    const wash = this.add.image(WIDTH / 2, 420, "temp_zabaa_effect").setScale(1.4).setAlpha(0.86);
    this.tweens.add({
      targets: wash,
      alpha: 0,
      y: 300,
      duration: 900,
      onComplete: () => wash.destroy(),
    });
    this.applyBoardDelta({ attachedPiece, removedPieces, movedPieces, newPieces });
    this.eventsBridge.onStateChange(this.state);
    if (isPuzzleOver(this.state)) {
      this.completed = true;
      this.time.delayedCall(760, () => this.eventsBridge.onComplete(toResult(this.state)));
    }
  }
}

export const gameSize = { width: WIDTH, height: HEIGHT };
