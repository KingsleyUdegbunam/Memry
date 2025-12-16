import { data } from "./data.js";

const flip = document.querySelector(".reveal");
const revealArea = document.querySelector(".card-text");
const nextElem = document.querySelector(".next-nav");
const previousElem = document.querySelector(".previous-nav");
const currentCardElem = document.querySelector(".current-card");
const totalCardsElem = document.querySelector(".total-cards");

const arrayLength = data.length;
const length = data.length - 1;

revealArea.textContent = data[0].question;

let cardIndex = 0;
let flipping = 0;

let currentCard = data[cardIndex].id;
console.log(currentCard);

totalCardsElem.textContent = arrayLength;

updateCard();

function updateCard() {
  currentCard = data[cardIndex].id;
  currentCardElem.textContent = currentCard;
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
  if (cardIndex < length) {
    cardIndex += 1;
    renderDisplay("q");
    updateCard();
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
