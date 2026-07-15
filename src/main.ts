type Vocabulary = {
  word: string;
  meaning: string;
};

const words: Vocabulary[] = [
  { word: "apple", meaning: "りんご" },
  { word: "book", meaning: "本" },
  { word: "challenge", meaning: "挑戦" },
  { word: "discover", meaning: "発見する" },
  { word: "improve", meaning: "改善する" }
];

const state = {
  list: [...words],
  index: 0,
  known: 0,
  unknown: 0
};

const wordEl = document.getElementById("word") as HTMLParagraphElement;
const meaningEl = document.getElementById("meaning") as HTMLParagraphElement;
const statusEl = document.getElementById("status") as HTMLParagraphElement;

const revealBtn = document.getElementById("revealBtn") as HTMLButtonElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
const shuffleBtn = document.getElementById("shuffleBtn") as HTMLButtonElement;
const knownBtn = document.getElementById("knownBtn") as HTMLButtonElement;
const unknownBtn = document.getElementById("unknownBtn") as HTMLButtonElement;

function renderCurrentWord(): void {
  const current = state.list[state.index];
  wordEl.textContent = current.word;
  meaningEl.textContent = current.meaning;
  meaningEl.classList.add("hidden");
}

function renderStatus(): void {
  statusEl.textContent = `Known: ${state.known} / Unknown: ${state.unknown}`;
}

function showMeaning(): void {
  meaningEl.classList.remove("hidden");
}

function nextWord(): void {
  state.index = (state.index + 1) % state.list.length;
  renderCurrentWord();
}

function shuffleWords(): void {
  for (let i = state.list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.list[i], state.list[j]] = [state.list[j], state.list[i]];
  }
  state.index = 0;
  renderCurrentWord();
}

function markKnown(): void {
  state.known += 1;
  renderStatus();
  nextWord();
}

function markUnknown(): void {
  state.unknown += 1;
  renderStatus();
  nextWord();
}

revealBtn.addEventListener("click", showMeaning);
nextBtn.addEventListener("click", nextWord);
shuffleBtn.addEventListener("click", shuffleWords);
knownBtn.addEventListener("click", markKnown);
unknownBtn.addEventListener("click", markUnknown);

renderCurrentWord();
renderStatus();
