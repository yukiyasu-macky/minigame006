import { getAssetPath } from "../game/assets/manifest";
import type { HomeState } from "../game/simulation/homeGrowth";

interface HomeScreenProps {
  home: HomeState;
  onStartPuzzle: () => void;
}

export const HomeScreen = ({ home, onStartPuzzle }: HomeScreenProps) => (
  <div
    className="home-scene scene-fill"
    data-asset="temp_home_bg"
    style={{ backgroundImage: `url(${getAssetPath("homeBackground")})` }}
  >
    <div className="home-top-row">
      <span>湯気 {home.steamLevel}</span>
      <span>猫 {home.cats}</span>
    </div>

    <section className="home-observation">
      <img className="home-cat" src={getAssetPath("catRound")} alt="湯屋でくつろぐ猫" />
      <div className="home-steam home-steam-a" />
      <div className="home-steam home-steam-b" />
      <p>{home.lastHomeMessage}</p>
    </section>

    <section className="home-status">
      <p className="eyebrow">湯屋のようす</p>
      <div className="home-stat-grid">
        <span>清潔度 {home.cleanliness}%</span>
        <span>猫満足 {home.catSatisfaction}%</span>
        <span>累計掃除 {home.totalCleaned}</span>
        <span>雰囲気 {home.atmosphereLevel}</span>
        <span>木片 {home.furnitureMaterials}</span>
        <span>湯気石 {home.onsenMaterials}</span>
        <span>泡 {home.bubbleItems}</span>
        <span>作り方 {home.recipes}</span>
      </div>
      {home.lastResult ? (
        <p className="home-last-result">
          前回: {home.lastResult.missionText} / 泡掃除 {home.lastResult.normalTargetCleaned}/{home.lastResult.targetCount} / ZABAA入替{" "}
          {home.lastResult.zabaaWashedCount} / 洗浄率 {home.lastResult.washRate}%
        </p>
      ) : (
        <p className="home-last-result">まだ今日のお掃除はありません。</p>
      )}
      <p className="home-next-goal">次回目標: {home.nextGoal}</p>
    </section>

    <button className="primary-button home-explore-button" type="button" onClick={onStartPuzzle}>
      探索へ
    </button>

    <nav className="home-support-nav" aria-label="サポート機能">
      <span>Album</span>
      <span>CatDex</span>
      <span>Craft</span>
      <span>Bag</span>
    </nav>
  </div>
);
