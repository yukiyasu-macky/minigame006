import { getAssetPath } from "../game/assets/manifest";

interface TitleSceneProps {
  onStart: () => void;
}

export const TitleScene = ({ onStart }: TitleSceneProps) => (
  <div
    className="title-scene scene-fill"
    data-asset="temp_title_bg"
    style={{ backgroundImage: `url(${getAssetPath("titleBackground")})` }}
  >
    <div className="steam steam-one" />
    <div className="steam steam-two" />
    <img className="title-cat" src={getAssetPath("catRound")} alt="" />
    <div className="title-stack">
      <p className="eyebrow">あわねこ湯屋</p>
      <h1>湯けむり<br />おそうじ</h1>
      <p className="scene-copy">泡を狙って飛ばし、温泉の汚れをやさしく流します。</p>
    </div>
    <button className="primary-button" type="button" onClick={onStart}>
      はじめる
    </button>
  </div>
);
