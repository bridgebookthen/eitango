import { baseWords, type Vocabulary } from "./words";

const USER_WORDS_STORAGE_KEY = "eitango-user-words";

function parseVocabularyList(raw: string | null): Vocabulary[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is Vocabulary => {
      if (typeof item !== "object" || item === null) {
        return false;
      }
      const maybeWord = (item as { word?: unknown }).word;
      const maybeMeaning = (item as { meaning?: unknown }).meaning;
      return typeof maybeWord === "string" && typeof maybeMeaning === "string";
    });
  } catch {
    return [];
  }
}

function loadUserWords(): Vocabulary[] {
  return parseVocabularyList(localStorage.getItem(USER_WORDS_STORAGE_KEY));
}

function saveUserWords(words: Vocabulary[]): void {
  localStorage.setItem(USER_WORDS_STORAGE_KEY, JSON.stringify(words));
}

const userWords = loadUserWords();
const words: Vocabulary[] = [...baseWords, ...userWords];

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
const addWordForm = document.getElementById("addWordForm") as HTMLFormElement;
const newWordInput = document.getElementById("newWordInput") as HTMLInputElement;
const newMeaningInput = document.getElementById("newMeaningInput") as HTMLInputElement;

function renderCurrentWord(): void {
  if (state.list.length === 0) {
    wordEl.textContent = "-";
    meaningEl.textContent = "単語がありません";
    meaningEl.classList.remove("hidden");
    return;
  }

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
  if (state.list.length === 0) {
    return;
  }

  state.index = (state.index + 1) % state.list.length;
  renderCurrentWord();
}

function shuffleWords(): void {
  if (state.list.length === 0) {
    return;
  }

  for (let i = state.list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.list[i], state.list[j]] = [state.list[j], state.list[i]];
  }
  state.index = 0;
  renderCurrentWord();
}

function markKnown(): void {
  if (state.list.length === 0) {
    return;
  }

  state.known += 1;
  renderStatus();
  nextWord();
}

function markUnknown(): void {
  if (state.list.length === 0) {
    return;
  }

  state.unknown += 1;
  renderStatus();
  nextWord();
}

function addWord(event: SubmitEvent): void {
  event.preventDefault();

  const word = newWordInput.value.trim();
  const meaning = newMeaningInput.value.trim();
  if (!word || !meaning) {
    return;
  }

  const newVocabulary: Vocabulary = { word, meaning };
  const wasEmpty = state.list.length === 0;

  state.list.push(newVocabulary);
  userWords.push(newVocabulary);
  saveUserWords(userWords);

  if (wasEmpty) {
    state.index = 0;
    renderCurrentWord();
  }

  addWordForm.reset();
}

revealBtn.addEventListener("click", showMeaning);
nextBtn.addEventListener("click", nextWord);
shuffleBtn.addEventListener("click", shuffleWords);
knownBtn.addEventListener("click", markKnown);
unknownBtn.addEventListener("click", markUnknown);
addWordForm.addEventListener("submit", addWord);

renderCurrentWord();
renderStatus();
