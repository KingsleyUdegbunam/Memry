import { data } from "./data.js";

const flip = document.querySelector(".reveal");
const revealArea = document.querySelector(".card-text");
const nextElem = document.querySelector(".next-nav");
const previousElem = document.querySelector(".previous-nav");
const currentCardElem = document.querySelector(".current-card");
const totalCardsElem = document.querySelector(".total-cards");
const progressIndicatorElem = document.querySelector(".progress-indicator");

let param = progressIndicatorElem.dataset.percent;
console.log(param);
progressIndicatorElem.dataset.percent = "34%";

const arrayLength = data.length;
const maxIndex = data.length - 1;

console.log(arrayLength);

revealArea.textContent = data[0].question;

let cardIndex = 0;
let flipping = 0;

let currentCard = data[cardIndex].id;
console.log(currentCard);

totalCardsElem.textContent = arrayLength;

updateCard();
updateProgressBar();

function updateCard() {
  currentCard = data[cardIndex].id;
  currentCardElem.textContent = currentCard;
}

let currentId = data[cardIndex].id;

function updateProgressBar() {
  const progress = (data[cardIndex].id / arrayLength) * 100;
  progressIndicatorElem.style.width = `${progress}%`;
  progressIndicatorElem.dataset.percent = `${Math.round(progress)}%`;
  console.log(progress, arrayLength, cardIndex);
}

flip.addEventListener("click", () => {
  if (!flipping) {
    renderDisplay("a");
    flipping = 1;
    flip.textContent = "Question";
  } else {
    renderDisplay("q");
    flipping = 0;
    flip.innerHTML = "Show Answer";
  }

  console.log(flipping);
});

nextElem.addEventListener("click", () => {
  if (cardIndex < maxIndex) {
    cardIndex += 1;
    renderDisplay("q");
    updateCard();
    updateProgressBar();
  } else {
    alert("Max card reached!");
  }
  console.log(cardIndex);
});

previousElem.addEventListener("click", () => {
  if (cardIndex > 0) {
    cardIndex -= 1;
    renderDisplay("q");
    updateCard();
    updateProgressBar();
  } else {
    alert("Minimum card reached!");
  }
  console.log(cardIndex);
});

function renderDisplay(value) {
  if (value === "q") {
    revealArea.textContent = data[cardIndex].question;
  } else if (value === "a") {
    revealArea.textContent = data[cardIndex].answer;
  }
}
