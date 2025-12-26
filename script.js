// =======================
// IMPORTS
// =======================
import getradio from './Javascript/GetRadios.js';
import typingData from "./Data/data.js";
import { showNotification } from "./Javascript/notification.js";

// =======================
// DOM REFERENCES
// =======================
const overlay = document.getElementById('overlay');
const overlayStart = document.getElementById('overlay-Start');
const overlayEnd = document.getElementById('overlay-End');

const startBtn = document.getElementById('Start-btn');
const endBtn = document.getElementById('End-btn');

const radioBtns = document.querySelectorAll('.difficulty-rdo');

const referenceContainer = document.getElementById('Reference');
const referenceInput = document.getElementById('Reference-Input');

const correctEl = document.getElementById('correct-value');
const incorrectEl = document.getElementById('incorrect-value');

// =======================
// STATE
// =======================
let referenceText = "";
let spans = [];
let totalChars = 0;
let correctCount = 0;
let incorrectCount = 0;

// =======================
// INITIAL SETUP
// =======================
overlayEnd.classList.add('hidden');

// =======================
// UTILITIES
// =======================
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const resetStats = () => {
    correctCount = 0;
    incorrectCount = 0;
    correctEl.textContent = 0;
    incorrectEl.textContent = 0;
};

const resetTypingArea = () => {
    referenceContainer.innerHTML = "";
    referenceInput.value = "";
};

// =======================
// TEXT SETUP
// =======================
const loadReferenceText = (difficulty) => {
    const texts = typingData[difficulty];
    const randomIndex = getRandomIndex(texts.length);
    referenceText = texts[randomIndex].text;

    referenceText.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        referenceContainer.appendChild(span);
    });

    spans = [...referenceContainer.querySelectorAll('span')];
    totalChars = spans.length;
};

// =======================
// EVENT HANDLERS
// =======================
startBtn.addEventListener('click', () => {
    const difficulty = getradio(radioBtns);

    if (!difficulty) {
        showNotification("Please select a difficulty", "error");
        return;
    }

    resetStats();
    resetTypingArea();
    loadReferenceText(difficulty);

    overlayStart.classList.add('hidden');
    overlay.classList.remove('overlay');
});

referenceInput.addEventListener('input', () => {
    if (!spans.length) return; // guard clause

    const typedChars = referenceInput.value.split('');

    correctCount = 0;
    incorrectCount = 0;

    spans.forEach(span => span.className = "");

    typedChars.forEach((char, index) => {
        if (index >= spans.length) {
            incorrectCount++;
            return;
        }

        if (char === referenceText[index]) {
            spans[index].classList.add('correct');
            correctCount++;
        } else {
            spans[index].classList.add('incorrect');
            incorrectCount++;
        }
    });

    correctEl.textContent = correctCount;
    incorrectEl.textContent = incorrectCount;

    if (typedChars.length === totalChars) {

        endBtn.focus();
        overlay.classList.add('overlay');
        overlayEnd.classList.remove('hidden');
        document.getElementById('end-correct-value').textContent = correctCount;
        document.getElementById('end-incorrect-value').textContent =incorrectCount;
        // console.log(correctCount)
    }
});

endBtn.addEventListener('click', () => {

    overlay.classList.add('overlay');
    overlayEnd.classList.add('hidden');
    overlayStart.classList.remove('hidden');
});
