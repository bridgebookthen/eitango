import { baseWords } from "./words";
const USER_WORDS_STORAGE_KEY = "eitango-user-words";
function parseVocabularyList(raw) {
    if (!raw) {
        return [];
    }
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter((item) => {
            if (typeof item !== "object" || item === null) {
                return false;
            }
            const maybeWord = item.word;
            const maybeMeaning = item.meaning;
            return typeof maybeWord === "string" && typeof maybeMeaning === "string";
        });
    }
    catch {
        return [];
    }
}
function loadUserWords() {
    return parseVocabularyList(localStorage.getItem(USER_WORDS_STORAGE_KEY));
}
function saveUserWords(words) {
    localStorage.setItem(USER_WORDS_STORAGE_KEY, JSON.stringify(words));
}
const userWords = loadUserWords();
const words = [...baseWords, ...userWords];
const state = {
    list: [...words],
    index: 0,
    known: 0,
    unknown: 0
};
const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const statusEl = document.getElementById("status");
const revealBtn = document.getElementById("revealBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const knownBtn = document.getElementById("knownBtn");
const unknownBtn = document.getElementById("unknownBtn");
const addWordForm = document.getElementById("addWordForm");
const newWordInput = document.getElementById("newWordInput");
const newMeaningInput = document.getElementById("newMeaningInput");
function renderCurrentWord() {
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
function renderStatus() {
    statusEl.textContent = `Known: ${state.known} / Unknown: ${state.unknown}`;
}
function showMeaning() {
    meaningEl.classList.remove("hidden");
}
function nextWord() {
    if (state.list.length === 0) {
        return;
    }
    state.index = (state.index + 1) % state.list.length;
    renderCurrentWord();
}
function shuffleWords() {
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
function markKnown() {
    if (state.list.length === 0) {
        return;
    }
    state.known += 1;
    renderStatus();
    nextWord();
}
function markUnknown() {
    if (state.list.length === 0) {
        return;
    }
    state.unknown += 1;
    renderStatus();
    nextWord();
}
function addWord(event) {
    event.preventDefault();
    const word = newWordInput.value.trim();
    const meaning = newMeaningInput.value.trim();
    if (!word || !meaning) {
        return;
    }
    const newVocabulary = { word, meaning };
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
