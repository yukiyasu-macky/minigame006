import { rewardLabels } from "../config/rewardConfig";
import { getAssetPath } from "../game/assets/manifest";
import type { OnsenResult } from "../game/simulation/onsenPuzzle";

interface ResultScreenProps {
  result: OnsenResult;
  onBackHome: () => void;
}

export const ResultScreen = ({ result, onBackHome }: ResultScreenProps) => {
  const reward = rewardLabels[result.reward.rewardType];

  return (
    <div
      className="result-scene scene-fill"
      data-asset="temp_result_bg"
      style={{ backgroundImage: `url(${getAssetPath("resultBackground")})` }}
    >
      <div className="result-card">
        <p className="eyebrow">おそうじ結果</p>
        <h2>{result.success ? "きれいに流せました" : "今日はここまで"}</h2>
        <p className="scene-copy">
          {result.missionText}
        </p>
        <ul className="result-list">
          <li>泡で流した汚れ: {result.normalCleanedCount}</li>
          <li>依頼進捗: {result.normalTargetCleaned}/{result.targetCount}</li>
          <li>ZABAAでお湯を入れ替えた: {result.zabaaWashedCount}</li>
          <li>ZABAA使用回数: {result.zabaaUsed} 回</li>
          <li>きれいになった度合い: {result.washRate}%</li>
        </ul>

        <div className="reward-box">
          <div className={`reward-icon ${result.reward.catFound ? "cat-reward" : ""}`}>
            {result.reward.catFound ? "猫" : "湯"}
          </div>
          <div>
            <h3>{reward.title}</h3>
            <p>{reward.description}</p>
          </div>
        </div>

        {result.reward.catFound && (
          <img className="result-cat-image" src={getAssetPath("catRound")} alt="湯気の中で見つかった猫" />
        )}

        <button className="primary-button" type="button" onClick={onBackHome}>
          Homeへ戻る
        </button>
      </div>
    </div>
  );
};
