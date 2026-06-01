import type { RewardType } from "../types/game";

export const rewardConfig = {
  tierRates: {
    tier1: 0.65,
    tier2: 0.15,
    tier3: 0.2,
  },
  tier1Rewards: ["furniture_material", "onsen_material", "bubble_related_reward"] satisfies RewardType[],
  tier2Rewards: ["recipe"] satisfies RewardType[],
  tier3Rewards: ["normal_cat"] satisfies RewardType[],
};

export const rewardLabels: Record<RewardType, { title: string; description: string }> = {
  furniture_material: {
    title: "まるい木片を拾った",
    description: "湯屋の家具づくりに使えそうです。",
  },
  onsen_material: {
    title: "湯気石を見つけた",
    description: "温泉が少しあたたかくなりそうです。",
  },
  bubble_related_reward: {
    title: "やさしい泡を集めた",
    description: "次のお掃除を少し助けてくれます。",
  },
  recipe: {
    title: "小さな座布団の作り方",
    description: "猫が気に入りそうな家具の予感がします。",
  },
  normal_cat: {
    title: "湯気の中に猫の気配",
    description: "きれいになった湯船のそばで、猫が待っていました。",
  },
};
