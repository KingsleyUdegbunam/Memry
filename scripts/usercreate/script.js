import { userFlashcards } from "./userData.js";
import * as storage from "./utility.js";

const cardElem = document.querySelector(".flashcard-field");
const textareaQuestionBg = "#fff7bc";
const textareaAnswerBg = "#bcffbc";

let cardId = storage.get("cardId") || 1;
let cardIndex = storage.get("cardIndex") || 0;

function renderHTML() {
  cardElem.innerHTML = `
<article data-card-number="${cardId}" class="card">
        <label class='label' for="question-${cardId}"></label>
        <textarea class="question" name="question" id="question-${cardId}" rows="1" placeholder="Type question here"></textarea>
        

        <article class="btns">
          <div class="add-another create-btn default">Add another</div>
          <a class='' href='index.html'>
          <div class="btn-text button create-btn">Continue</div>
          </a>
        </article>
      </article>
`;
}

renderHTML();

const textareaElem = document.querySelector(".question");
const addAnotherBtnElem = document.querySelector(".add-another");

/* FUNCTION TO SET TEXTAREA BG COLOR */
function setTextareaBg() {
  if (textareaElem.placeholder === "Type question here") {
    textareaElem.style.backgroundColor = textareaQuestionBg;
  } else if (textareaElem.placeholder === "Type answer here") {
    textareaElem.style.backgroundColor = textareaAnswerBg;
  }
}

setTextareaBg();

cardElem.addEventListener("input", (e) => {
  const textareaElem = e.target;
  if (textareaElem.classList.contains("question")) {
    textareaElem.style.height = "auto";
    textareaElem.style.height = textareaElem.scrollHeight + "px";
    textareaElem.style.overflow = "hidden";
  }
});

cardElem.addEventListener("click", (e) => {
  const textareaElem = document.querySelector(".question");
  const primaryBtn = document.querySelector(".btn-text");

  const element = e.target;

  if (element.textContent === "Continue") {
    const question = textareaElem.value.trim();
    e.preventDefault();

    if (!question) return;

    const cardDetails = {
      id: cardId,
      question,
    };
    userFlashcards.push(cardDetails);

    textareaElem.value = "";
    textareaElem.placeholder = "Type answer here";

    element.textContent = "Done";

    setTextareaBg();

    console.log(userFlashcards);
  } else if (element.textContent === "Done") {
    userFlashcards[cardIndex].answer = textareaElem.value.trim();

    cardIndex += 1;
    cardId += 1;
    storage.save("userData", userFlashcards);
    storage.save("cardIndex", cardIndex);
    storage.save("cardId", cardId);
    console.log(userFlashcards);
  }

  if (element.classList.contains("add-another")) {
    userFlashcards[cardIndex].answer = textareaElem.value.trim();

    console.log(userFlashcards);

    cardIndex += 1;
    cardId += 1;

    storage.save("userData", userFlashcards);
    storage.save("cardIndex", cardIndex);
    storage.save("cardId", cardId);

    textareaElem.value = "";
    textareaElem.placeholder = "Type question here";
    addAnotherBtnElem.style.display = "none";

    setTextareaBg();
    primaryBtn.textContent = "Continue";

    console.log(userFlashcards);
  }
});

textareaElem.addEventListener("input", () => {
  if (textareaElem.placeholder === "Type answer here") {
    if (textareaElem.value.trim()) {
      addAnotherBtnElem.style.display = "initial";
    }
  }
});
