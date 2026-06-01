export type SceneId = "title" | "home" | "game" | "result";

export type DirtType = "leaf" | "mud" | "moss" | "flower" | "rock";

export type RewardTier = "tier1" | "tier2" | "tier3";

export type RewardType =
  | "furniture_material"
  | "onsen_material"
  | "bubble_related_reward"
  | "recipe"
  | "normal_cat";

export interface RunReward {
  runId: string;
  rewardTier: RewardTier;
  rewardType: RewardType;
  rewardId: string;
  amount?: number;
  catFound: boolean;
}

export interface DirtPiece {
  id: string;
  type: DirtType;
  label: string;
  cleaned: boolean;
  x: number;
  y: number;
  delay: number;
}

export interface PuzzleState {
  runId: string;
  targetType: Exclude<DirtType, "rock">;
  targetCount: number;
  cleanedCount: number;
  washesLeft: number;
  zabaaLeft: number;
  pieces: DirtPiece[];
  reward: RunReward;
}

export interface ResultSummary {
  runId: string;
  cleanedCount: number;
  targetCount: number;
  washRate: number;
  reward: RunReward;
}
