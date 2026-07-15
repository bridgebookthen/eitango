"use strict";
const words = [
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
const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const statusEl = document.getElementById("status");
const revealBtn = document.getElementById("revealBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const knownBtn = document.getElementById("knownBtn");
const unknownBtn = document.getElementById("unknownBtn");
function renderCurrentWord() {
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
    state.index = (state.index + 1) % state.list.length;
    renderCurrentWord();
}
function shuffleWords() {
    for (let i = state.list.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.list[i], state.list[j]] = [state.list[j], state.list[i]];
    }
    state.index = 0;
    renderCurrentWord();
}
function markKnown() {
    state.known += 1;
    renderStatus();
    nextWord();
}
function markUnknown() {
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
