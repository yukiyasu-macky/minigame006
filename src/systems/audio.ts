type SoundName = "start" | "clean" | "result" | "zabaa";

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  audioContext ??= new AudioContext();
  return audioContext;
};

export const playTempSound = (name: SoundName) => {
  const context = getAudioContext();
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  const frequency = {
    start: 420,
    clean: 680,
    result: 540,
    zabaa: 190,
  }[name];

  oscillator.type = name === "zabaa" ? "sine" : "triangle";
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.25, now + 0.16);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(name === "zabaa" ? 0.12 : 0.08, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (name === "zabaa" ? 0.5 : 0.22));

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + (name === "zabaa" ? 0.52 : 0.24));
};
