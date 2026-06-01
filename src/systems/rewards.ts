import { rewardConfig } from "../config/rewardConfig";
import type { RewardType, RunReward } from "../types/game";

const pick = <T,>(items: T[], seed: number) => items[Math.abs(seed) % items.length];

export const createRunReward = (runId: string): RunReward => {
  const seed = Array.from(runId).reduce((total, char) => total + char.charCodeAt(0), 0);
  const roll = (seed % 100) / 100;

  let rewardTier: RunReward["rewardTier"] = "tier1";
  let rewardType: RewardType = "onsen_material";

  if (roll > rewardConfig.tierRates.tier1 + rewardConfig.tierRates.tier2) {
    rewardTier = "tier3";
    rewardType = pick(rewardConfig.tier3Rewards, seed);
  } else if (roll > rewardConfig.tierRates.tier1) {
    rewardTier = "tier2";
    rewardType = pick(rewardConfig.tier2Rewards, seed);
  } else {
    rewardType = pick(rewardConfig.tier1Rewards, seed);
  }

  return {
    runId,
    rewardTier,
    rewardType,
    rewardId: `${rewardType}_${seed}`,
    amount: rewardTier === "tier1" ? 3 + (seed % 3) : 1,
    catFound: rewardTier === "tier3",
  };
};
