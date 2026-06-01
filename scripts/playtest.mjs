import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
});

const states = [];

await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
states.push(await page.locator("body").innerText());

await page.getByRole("button", { name: "はじめる" }).click();
await page.waitForTimeout(400);
states.push(await page.locator("body").innerText());

await page.getByRole("button", { name: "探索へ" }).click();
await page.waitForTimeout(1000);
states.push(await page.locator("body").innerText());

const canvas = page.locator("canvas");
await canvas.waitFor({ state: "visible" });
const box = await canvas.boundingBox();
if (!box) {
  throw new Error("canvas bounding box is missing");
}

const shots = [
  [0.26, 0.28],
  [0.42, 0.31],
  [0.58, 0.29],
  [0.74, 0.34],
  [0.31, 0.42],
  [0.49, 0.46],
  [0.66, 0.44],
  [0.83, 0.48],
  [0.22, 0.56],
  [0.40, 0.59],
  [0.60, 0.58],
  [0.78, 0.62],
  [0.18, 0.72],
  [0.36, 0.72],
  [0.56, 0.72],
  [0.76, 0.72],
  [0.50, 0.36],
  [0.68, 0.36],
];

await page.getByRole("button", { name: /ざばぁ/ }).click();
await page.waitForTimeout(700);

for (const [x, y] of shots) {
  if (await page.getByText("おそうじ結果").isVisible().catch(() => false)) {
    break;
  }
  await page.mouse.click(box.x + box.width * x, box.y + box.height * y);
  await page.waitForTimeout(520);
}

await page.getByRole("button", { name: "Homeへ戻る" }).waitFor({ state: "visible", timeout: 10000 });
states.push(await page.locator("body").innerText());

await page.getByRole("button", { name: "Homeへ戻る" }).click();
await page.waitForTimeout(250);
states.push(await page.locator("body").innerText());

await page.getByRole("button", { name: "探索へ" }).click();
await page.waitForTimeout(800);
states.push(await page.locator("body").innerText());

await page.screenshot({ path: "playtest-mobile.png", fullPage: true });
await browser.close();

const result = {
  titleSeen: states[0].includes("はじめる"),
  homeSeen: states[1].includes("探索へ") && states[1].includes("湯屋のようす"),
  gameSeen: states[2].includes("今日のお掃除依頼"),
  resultSeen: states[3].includes("おそうじ結果"),
  homeReflected: states[4].includes("前回:") && states[4].includes("洗浄率"),
  replayFromHomeSeen: states[5].includes("今日のお掃除依頼"),
  screenshot: "playtest-mobile.png",
};

console.log(JSON.stringify(result, null, 2));

if (!Object.values(result).slice(0, 6).every(Boolean)) {
  process.exit(1);
}
