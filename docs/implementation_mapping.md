# Implementation Mapping

| docs | 内容 | 実装ファイル |
| ---- | -- | ------ |
| `docs/screen_flow.md` | `TitleScene -> HomeScreen -> PuzzleScreen -> ResultScreen -> HomeScreen` のMVP画面サイクル | `src/App.tsx`, `src/screens/TitleScene.tsx`, `src/screens/HomeScreen.tsx`, `src/screens/MainGameScreen.tsx`, `src/screens/ResultScreen.tsx` |
| `docs/game_loop.md` | Home中心の探索開始、Puzzle解決、Result後にHomeへ戻る進行 | `src/App.tsx`, `src/game/simulation/homeGrowth.ts` |
| `docs/home_layout.md` | Homeを拠点・観察空間として表示し、Exploreを主要CTAにする | `src/screens/HomeScreen.tsx`, `src/styles.css` |
| `docs/home_growth.md` | Result報酬をHomeの清潔度、累計掃除量、猫満足度、素材、次回目標へ反映 | `src/game/simulation/homeGrowth.ts`, `src/screens/HomeScreen.tsx` |
| `docs/puzzle_design.md` | 温泉掃除、泡発射、同種3つ以上接続消去、岩固定、水流補充、ZABAAリフレッシュ。ZABAAは盤面入れ替えとして別カウントし、通常掃除成果や依頼進捗に加算しない | `src/game/simulation/onsenPuzzle.ts`, `src/game/phaser/scenes/OnsenCleaningScene.ts`, `src/screens/MainGameScreen.tsx`, `src/screens/ResultScreen.tsx` |
| `docs/result_reward_mapping.md` | PuzzleStartで`RunReward`を決定し、Result表示後にHomeへ反映 | `src/systems/rewards.ts`, `src/game/simulation/onsenPuzzle.ts`, `src/game/simulation/homeGrowth.ts`, `src/screens/ResultScreen.tsx` |
| `docs/reward_table.md` | Tier別報酬、非猫報酬でもHome成長につなげる方針 | `src/config/rewardConfig.ts`, `src/systems/rewards.ts`, `src/game/simulation/homeGrowth.ts` |
| `docs/ui_safe_area_spec.md` | persistent header、bottom ad reserve、GameplayArea内に重要操作を配置 | `src/components/GameShell.tsx`, `src/styles.css`, `src/screens/MainGameScreen.tsx`, `src/screens/HomeScreen.tsx`, `src/screens/ResultScreen.tsx` |
| `docs/asset_pipeline_plan.md` | stable asset id、manifest参照、仮PNGを差し替え可能にする | `src/game/assets/manifest.ts`, `assets/temp/*`, `scripts/generate_temp_assets.py` |
| `docs/game-studio.md` | ファイルは空。Game Studio方針はプラグインの`phaser-2d-game`、`game-ui-frontend`、`sprite-pipeline`を参照 | `src/game/phaser/*`, `src/game/simulation/*`, `src/game/assets/manifest.ts` |
