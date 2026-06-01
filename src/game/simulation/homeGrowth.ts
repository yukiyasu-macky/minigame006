import type { OnsenResult } from "./onsenPuzzle";

export interface HomeState {
  visitCount: number;
  atmosphereLevel: number;
  steamLevel: number;
  cleanliness: number;
  totalCleaned: number;
  catSatisfaction: number;
  cats: number;
  furnitureMaterials: number;
  onsenMaterials: number;
  bubbleItems: number;
  recipes: number;
  lastResult: OnsenResult | null;
  lastHomeMessage: string;
  nextGoal: string;
}

export const createInitialHomeState = (): HomeState => ({
  visitCount: 0,
  atmosphereLevel: 1,
  steamLevel: 1,
  cleanliness: 42,
  totalCleaned: 0,
  catSatisfaction: 35,
  cats: 1,
  furnitureMaterials: 0,
  onsenMaterials: 0,
  bubbleItems: 0,
  recipes: 0,
  lastResult: null,
  lastHomeMessage: "湯気がゆっくり立っています。",
  nextGoal: "まずは今日のお掃除へ出かけましょう。",
});

export const applyResultToHome = (home: HomeState, result: OnsenResult): HomeState => {
  const amount = result.reward.amount ?? 1;
  const next: HomeState = {
    ...home,
    visitCount: home.visitCount + 1,
    lastResult: result,
    totalCleaned: home.totalCleaned + result.normalCleanedCount,
    cleanliness: Math.min(
      100,
      Math.round(home.cleanliness * 0.68 + result.washRate * 0.3 + result.normalCleanedCount * 0.25),
    ),
    catSatisfaction: Math.min(
      100,
      home.catSatisfaction + Math.max(3, Math.round(result.washRate / 12)) + (result.reward.catFound ? 8 : 0),
    ),
    atmosphereLevel: home.atmosphereLevel + (result.success ? 1 : 0),
    steamLevel: Math.min(6, home.steamLevel + (result.reward.rewardType === "onsen_material" ? 1 : 0)),
  };

  switch (result.reward.rewardType) {
    case "furniture_material":
      next.furnitureMaterials += amount;
      next.lastHomeMessage = "木の香りの材料が増えて、猫の休み場が作れそうです。";
      break;
    case "onsen_material":
      next.onsenMaterials += amount;
      next.lastHomeMessage = "湯気石のおかげで、湯屋が少しあたたかくなりました。";
      break;
    case "bubble_related_reward":
      next.bubbleItems += amount;
      next.lastHomeMessage = "やさしい泡が集まり、次のお掃除が少し楽になりそうです。";
      break;
    case "recipe":
      next.recipes += 1;
      next.lastHomeMessage = "新しい作り方を見つけました。猫の居場所が増える予感がします。";
      break;
    case "normal_cat":
      next.cats += 1;
      next.lastHomeMessage = "湯気の中から、新しい猫が湯屋にやってきました。";
      break;
    default:
      next.lastHomeMessage = "湯屋が少しだけ整いました。";
  }

  if (next.cleanliness < 60) {
    next.nextGoal = "次は温泉の水面をもう少し整えましょう。";
  } else if (next.catSatisfaction < 70) {
    next.nextGoal = "猫がもっとくつろげるように、湯気石や木片を集めましょう。";
  } else {
    next.nextGoal = "湯屋がよい空気です。次のお掃除で新しい出会いを探しましょう。";
  }

  return next;
};
