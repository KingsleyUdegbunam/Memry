import { userData } from "./userData.js";
import * as storage from "./utility.js";

const cardElem = document.querySelector(".flashcard-field");
const textareaQuestionBg = "#fff7bc";
const textareaAnswerBg = "#bcffbc";

function renderHTML() {
  cardElem.innerHTML = `
<article data-card-number="${userData.cardId}" class="card">
        <label class='label' for="question-${userData.cardId}"></label>
        <textarea class="question" name="question" id="question-${userData.cardId}" rows="1" placeholder="Type question here"></textarea>
        

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
      id: userData.cardId,
      question,
    };
    userData.flashcards.push(cardDetails);

    textareaElem.value = "";
    textareaElem.placeholder = "Type answer here";

    element.textContent = "Done";

    setTextareaBg();

    console.log(userData.flashcards);
  } else if (element.textContent === "Done") {
    userData.flashcards[userData.cardIndex].answer = textareaElem.value.trim();

    userData.cardIndex += 1;
    userData.cardId += 1;
    storage.save("userData", userData);
  }

  if (element.classList.contains("add-another")) {
    userData.flashcards[userData.cardIndex].answer = textareaElem.value.trim();

    console.log(userData.flashcards);

    userData.cardIndex += 1;
    userData.cardId += 1;

    storage.save("userData", userData);

    textareaElem.value = "";
    textareaElem.placeholder = "Type question here";
    addAnotherBtnElem.style.display = "none";

    setTextareaBg();
    primaryBtn.textContent = "Continue";

    console.log(userData.flashcards);
  }
});

textareaElem.addEventListener("input", () => {
  if (textareaElem.placeholder === "Type answer here") {
    if (textareaElem.value.trim()) {
      addAnotherBtnElem.style.display = "initial";
    }
  }
});
