import { defaultData } from "./data.js";
import { userData } from "./usercreate/userData.js";

const CurrentData =
  userData.flashcards.length > 0 ? userData.flashcards : defaultData;

const flipElem = document.querySelector(".reveal");
const revealArea = document.querySelector(".card-text");
const nextElem = document.querySelector(".next-nav");
const previousElem = document.querySelector(".previous-nav");
const currentCardElem = document.querySelector(".current-card");
const totalCardsElem = document.querySelector(".total-cards");
const progressIndicatorElem = document.querySelector(".progress-indicator");
const alertElem = document.querySelector(".minmax-alert");
const cardBgElem = document.querySelector(".card");
const progressCountElem = document.querySelector(".count");

const minSound = new Audio();
const maxSound = new Audio();
const clickSound = new Audio();
const flipSound = new Audio();

minSound.src = "assets/sounds/min-alert.mp3";
maxSound.src = "assets/sounds/max-alert.mp3";
clickSound.src = "assets/sounds/click.mp3";
flipSound.src = "assets/sounds/flipcard.mp3";

let param = progressIndicatorElem.dataset.percent;

const arrayLength = CurrentData.length;
const maxIndex = CurrentData.length - 1;

revealArea.textContent = CurrentData[0].question;

let cardIndex = 0;
let flipping = 0;

let currentCard = CurrentData[cardIndex].id;

totalCardsElem.textContent = arrayLength;

updateCard();
updateProgressBar();

function updateCard() {
  currentCard = CurrentData[cardIndex].id;
  currentCardElem.textContent = currentCard;
}

function updateProgressBar() {
  const progress = (CurrentData[cardIndex].id / arrayLength) * 100;
  progressIndicatorElem.style.width = `${progress}%`;
  progressIndicatorElem.dataset.percent = `${Math.round(progress)}%`;
}

flipElem.addEventListener("click", () => {
  if (!flipping) {
    renderDisplay("a");
    flipping = 1;
    flipElem.textContent = "Question";

    flipSound.play();
  } else {
    renderDisplay("q");
    flipping = 0;
    flipElem.innerHTML = "Show Answer";
  }
});

nextElem.addEventListener("click", () => {
  if (cardIndex < maxIndex) {
    progressCountElem.classList.remove("completed");

    cardIndex += 1;
    renderDisplay("q");
    updateCard();
    updateProgressBar();

    flipping = 0;
    flipElem.innerHTML = "Show Answer";

    clickSound.play();

    alertElem.classList.remove("display-alert");
  }
  if (cardIndex === maxIndex) {
    progressCountElem.classList.add("completed");

    alertElem.innerHTML = `
    <article class="max-card-alert flashcard-alert">
        <p>
          <span class='off-mobile'>You've reached the end.</span> Well done<span class='on-mobile'> buddy</span>!
        </p>

        <svg class="minmax-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <g data-name="02-confetti">
            <circle cx="45" cy="3" r="2" style="fill:#80dbff" />
            <path transform="rotate(-44.999 16 7)" style="fill:#80dbff" d="M13.879 4.879h4.243v4.243h-4.243z" />
            <path style="fill:#ffe733"
              d="m47 16.319-2.09.42-.7 2.36-1.39-2.78-2.78-1.39 2.36-.699.42-2.09 1.39 1.39 2.09-.69-.69 2.089 1.39 1.39z" />
            <path style="fill:#ff808c"
              d="m35.86 5.18-2.09.42-.7 2.36-1.39-2.78-2.78-1.39 2.36-.7.42-2.09 1.39 1.39 2.09-.69-.69 2.09 1.39 1.39z" />
            <path style="fill:#b5efff" d="m19.48 37.549-3.43 2.13-7.71-7.71 2.13-3.43 9.01 9.01z" />
            <path d="M16.05 39.679 4.82 46.638a2.522 2.522 0 0 1-3.46-3.46L4 38.919V39l4.34-7.03z"
              style="fill:#d2a0f5" />
            <path style="fill:#ffa1c8" d="m23.78 34.879-4.3 2.67-9.01-9.01 2.66-4.31 10.65 10.65z" />
            <path style="fill:#bdf052" d="m27.23 32.749-3.45 2.13-10.65-10.65 2.13-3.44 11.97 11.96z" />
            <path style="fill:#ffcfe2" d="m32.38 29.549-5.15 3.2-11.97-11.96 3.19-5.16 13.93 13.92z" />
            <circle cx="45" cy="3" r="2" style="fill:#bdf052" />
            <path transform="rotate(-44.999 16 7)" style="fill:#80dbff" d="M13.879 4.879h4.243v4.243h-4.243z" />
            <path style="fill:#4ab8f7" d="m16 8-2-2-1 1 3 3 3-3-1-1-2 2z" />
            <path style="fill:#ffe733"
              d="m47 16.319-2.09.42-.7 2.36-1.39-2.78-2.78-1.39 2.36-.699.42-2.09 1.39 1.39 2.09-.69-.69 2.089 1.39 1.39zM35.86 5.18l-2.09.42-.7 2.36-1.39-2.78-2.78-1.39 2.36-.7.42-2.09 1.39 1.39 2.09-.69-.69 2.09 1.39 1.39z" />
            <path style="fill:#64e1dc" d="m13 34.999-4.036-4.036-.624 1.006 3.845 3.845.815-.815z" />
            <path style="fill:#1cadb5" d="m12.185 35.814 3.865 3.865 1.006-.625L13 34.999l-.815.815z" />
            <path style="fill:#64e1dc" d="m13 34.999 4.056 4.055 2.424-1.505-4.515-4.515L13 34.999z" />
            <path style="fill:#b5efff" d="m14.965 33.034-4.495-4.495-1.506 2.424L13 34.999l1.965-1.965z" />
            <path d="M8.34 31.969 4 39v-.08l-2.64 4.258a2.517 2.517 0 0 0 .38 3.08l10.445-10.444z"
              style="fill:#d2a0f5" />
            <path d="M1.74 46.258a2.513 2.513 0 0 0 3.08.38l11.23-6.959-3.865-3.865z" style="fill:#b674f2" />
            <path style="fill:#ff8fb8" d="m16 31.999-4.74-4.74-.79 1.28 4.495 4.495L16 31.999z" />
            <path style="fill:#ff468c" d="m14.965 33.034 4.515 4.515 1.277-.793L16 31.999l-1.035 1.035z" />
            <path style="fill:#ff73a5" d="m16 31.999 4.757 4.757 3.023-1.877-5.33-5.33-2.45 2.45z" />
            <path style="fill:#ffa1c8" d="m18.45 29.549-5.32-5.32-1.87 3.03 4.74 4.74 2.45-2.45z" />
            <path style="fill:#a7e340" d="m19.5 28.499-5.567-5.567-.803 1.297 5.32 5.32 1.05-1.05z" />
            <path style="fill:#86c42b" d="m18.45 29.549 5.33 5.33 1.298-.802-5.578-5.578-1.05 1.05z" />
            <path style="fill:#bdf052" d="m21.237 26.762-5.977-5.973-1.327 2.143 5.567 5.567 1.737-1.737z" />
            <path style="fill:#a7e340" d="m19.5 28.499 5.578 5.578 2.152-1.328-5.993-5.987-1.737 1.737z" />
            <path style="fill:#ffa1c8" d="M25.412 22.587 22.5 25.499l6.284 6.284 3.596-2.234-6.968-6.962z" />
            <path style="fill:#ffcfe2" d="m25.412 22.587-6.962-6.958-2.223 3.597 6.273 6.273 2.912-2.912z" />
            <path style="fill:#ff808c" d="m22.5 25.499-6.273-6.273-.967 1.563 5.977 5.973 1.263-1.263z" />
            <path style="fill:#f25a6b" d="m21.237 26.762 5.993 5.987 1.554-.966-6.284-6.284-1.263 1.263z" />
            <circle cx="45" cy="3" r="1" style="fill:#ffe733" />
            <path transform="rotate(-45.001 28.25 19.75)" style="fill:#4ab8f7" d="M27.189 18.749h2.121v2h-2.121z" />
            <path transform="rotate(-45.001 33.5 14.5)" style="fill:#ffa1c8" d="M28.55 13.5h9.899v2H28.55z" />
            <path transform="rotate(-45.001 41 7)" style="fill:#80dbff" d="M39.586 6h2.828v2h-2.828z" />
            <path transform="rotate(-45.001 38.67 9.33)" style="fill:#c78ff5" d="M37.723 8.33h1.895v2h-1.895z" />
            <path
              d="m32.643 21.145-1.286-1.532a23.552 23.552 0 0 1 6.953-4.224l.68 1.881a21.58 21.58 0 0 0-6.347 3.875z"
              style="fill:#ff6e7c" />
            <path d="m31.875 11.427-1.809-.855c.279-.59.5-1.1.664-1.564l1.88.683c-.19.521-.43 1.089-.735 1.736z"
              style="fill:#a7e340" />
            <path d="M26.117 19.117 24.7 17.7a29.6 29.6 0 0 0 4.867-6.2l1.74.985a31.525 31.525 0 0 1-5.19 6.632z"
              style="fill:#80dbff" />
            <path d="M24 16h-2c0-2.769-1.641-5-3-5V9c2.664 0 5 3.271 5 7z" style="fill:#c78ff5" />
            <path style="fill:#ff73a5" d="M41 21.999h2v2h-2z" />
            <path style="fill:#80dbff" d="M24 7h2v2h-2z" />
            <path style="fill:#ffa1c8" d="M24 5h2v2h-2zM24 9h2v2h-2zM26 7h2v2h-2zM22 7h2v2h-2z" />
            <path d="M33.971 26.008a43.4 43.4 0 0 0-1.485-.01H32V24h.479c.507 0 1.034 0 1.55.011z"
              style="fill:#b674f2" />
            <path
              d="M44.277 28.947c-1.5-1.167-2.911-2.263-4.659-2.43a5.341 5.341 0 0 0-1.418-1.506 5.642 5.642 0 0 0-3.119-.959l-.154 1.994a4.021 4.021 0 0 1 2.041.541c.08.062.145.117.212.172a4.505 4.505 0 0 0-2.309 1.524 2.3 2.3 0 0 0-.5 1.858 2.388 2.388 0 0 0 1.666 1.759 2.415 2.415 0 0 0 .684.1 2.872 2.872 0 0 0 1.771-.665 3.4 3.4 0 0 0 1.5-2.713 10.346 10.346 0 0 1 3.056 1.906l.341.266 1.226-1.58zm-6.287-.315a1.637 1.637 0 0 1-.73 1.124.776.776 0 0 1-.658.223.444.444 0 0 1-.271-.226c0-.019.014-.106.137-.271a2.657 2.657 0 0 1 1.523-.877z"
              style="fill:#c78ff5" />
            <path style="fill:#80dbff" d="M41 19.999h2v2h-2zM43 21.999h2v2h-2zM41 23.999h2v2h-2zM39 21.999h2v2h-2z" />
            <ellipse cx="20.003" cy="20.987" rx="1.642" ry="2.286" transform="rotate(-45.02 20.003 20.986)"
              style="fill:#f6fafd" />
            <ellipse cx="23" cy="23" rx=".825" ry="1.148" transform="rotate(-45.02 23 23)" style="fill:#f6fafd" />
            <ellipse cx="45.746" cy="2.5" rx=".413" ry=".574" transform="rotate(-45.02 45.745 2.5)"
              style="fill:#f6fafd" />
            <ellipse cx="16.746" cy="6.5" rx=".413" ry=".574" transform="rotate(-45.02 16.746 6.5)"
              style="fill:#f6fafd" />
            <ellipse cx="16.746" cy="23.5" rx=".413" ry=".574" transform="rotate(-45.02 16.746 23.5)"
              style="fill:#f6fafd" />
            <path
              d="m22.536 18.293-1.414 1.415 9.656 9.656-3.412 2.116-2.19-2.19-1.414 1.41 1.859 1.859-1.693 1.05-9.541-9.541 1.05-1.693 7.326 7.326 1.414-1.414-7.657-7.653 2.116-3.412 1.486 1.486 1.414-1.414-2.378-2.378a1 1 0 0 0-1.557.18L4.343 36.473l1.7 1.053 2.465-3.973 5.94 5.94-10.142 6.29a1.523 1.523 0 0 1-2.1-2.076L4.85 39.45l-1.7-1.05L.5 42.666a3.522 3.522 0 0 0 4.847 4.824L32.9 30.4a1 1 0 0 0 .18-1.557zm-.353 16.4-2.553 1.585-7.908-7.908 1.583-2.553zM9.589 31.807l1.05-1.692 7.246 7.246-1.692 1.05zM26.796 19.79l1.497-1.497 1.414 1.414-1.497 1.497zM29.293 17.293l7-7 1.414 1.415-7 7zM39.293 7.293l2-2 1.414 1.415-2 2zM37.293 9.294l1.34-1.341 1.415 1.414-1.341 1.34zM46.751 14.656l.5-1.5a1 1 0 0 0-1.265-1.265l-1.5.5-.956-.956a1 1 0 0 0-1.687.511l-.3 1.5-1.788.526a1 1 0 0 0-.165 1.854l2.488 1.243 1.243 2.488a1 1 0 0 0 .894.552h.09a1 1 0 0 0 .87-.714L45.7 17.6l1.5-.3a1 1 0 0 0 .511-1.688zm-2.036 1.1a1 1 0 0 0-.741.631l-.257-.515a1 1 0 0 0-.447-.447l-.516-.258a1 1 0 0 0 .631-.741l.051-.257.072.072a1 1 0 0 0 1.023.241l.192-.064-.064.192a1 1 0 0 0 .241 1.023l.072.072zM38.993 17.27l-.678-1.882a23.523 23.523 0 0 0-6.958 4.221l1.285 1.534a21.538 21.538 0 0 1 6.351-3.873zM31.67 21.989 30.329 20.5c-.5.452-.981.912-1.444 1.375l1.415 1.418c.438-.439.9-.876 1.37-1.304zM28.448 4.68l2.488 1.243 1.243 2.488a1 1 0 0 0 .894.552h.09a1 1 0 0 0 .87-.713l.526-1.788 1.5-.3a1 1 0 0 0 .511-1.687l-.956-.956.5-1.5A1 1 0 0 0 34.846.748l-1.5.5-.958-.955A1 1 0 0 0 30.7.8l-.3 1.5-1.788.526a1 1 0 0 0-.165 1.854zm3.8-1.395.051-.257.072.072a1 1 0 0 0 1.023.241l.192-.064-.064.192a1 1 0 0 0 .241 1.023l.072.072-.257.051a1 1 0 0 0-.741.631l-.258-.516a1 1 0 0 0-.447-.447l-.515-.257a1 1 0 0 0 .627-.741zM30.068 10.56l1.795.881a17.249 17.249 0 0 0 .749-1.756l-1.882-.678a15.214 15.214 0 0 1-.662 1.553zM24.707 17.7l1.414 1.414a31.864 31.864 0 0 0 5.187-6.623l-1.742-.983a29.828 29.828 0 0 1-4.859 6.192zM45 6a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1zM15.293 10.707a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 0 0 0 1.414zM16 5.414 17.586 7 16 8.586 14.414 7zM19 11c1.359 0 3 2.23 3 5h2c0-3.729-2.336-7-5-7zM24 5h2v2h-2zM24 9h2v2h-2zM26 7h2v2h-2zM22 7h2v2h-2zM41 20h2v2h-2zM41 24h2v2h-2zM43 22h2v2h-2zM39 22h2v2h-2zM32 24v2h.588c.457 0 .926 0 1.391.005l.042-2C33.539 24 33.052 24 32.578 24zM39.641 26.512a5.441 5.441 0 0 0-1.448-1.506 5.663 5.663 0 0 0-3.116-.949l-.154 1.994a4.074 4.074 0 0 1 2.041.533c.078.06.149.117.215.17a4.519 4.519 0 0 0-2.306 1.524 2.3 2.3 0 0 0-.5 1.872 2.411 2.411 0 0 0 2.34 1.85 2.876 2.876 0 0 0 1.773-.666 3.394 3.394 0 0 0 1.506-2.723 10.415 10.415 0 0 1 3.071 1.928l.323.252 1.228-1.579-.319-.249c-1.495-1.174-2.919-2.284-4.654-2.451zm-1.649 2.119a1.65 1.65 0 0 1-.743 1.13.764.764 0 0 1-.647.222.464.464 0 0 1-.268-.224c-.005-.029.017-.119.134-.274a2.651 2.651 0 0 1 1.524-.883z" />
          </g>
        </svg>

      </article>
    `;

    maxSound.play();
    alertElem.classList.add("display-alert");
  }
});

previousElem.addEventListener("click", () => {
  progressCountElem.classList.remove("completed");

  if (cardIndex - 1 < 0) {
    alertElem.innerHTML = `
      <article class="min-card-alert flashcard-alert">
        <p>
          <span class='off-mobile'>Can't go any lower</span><span class='on-mobile'>Endpoint</span> buddy!
        </p>

        <svg class="minmax-icon warning-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <defs>
            <style>
              .cls-2 {
                fill: #039be5
              }
            </style>
          </defs>
          <g id="warning">
            <path d="m30.89 29.55-14-28a1 1 0 0 0-1.78 0l-14 28A1 1 0 0 0 2 31h28a1 1 0 0 0 .89-1.45z"
              style="fill:#ffe082" />
            <path class="cls-2" d="M16 23a1 1 0 0 1-1-1v-9a1 1 0 0 1 2 0v9a1 1 0 0 1-1 1z" />
            <circle class="cls-2" cx="16" cy="26" r="1" />
          </g>
        </svg>
      </article>
    `;
    minSound.play();
    alertElem.classList.add("display-alert");
  } else {
    cardIndex -= 1;
    renderDisplay("q");
    updateCard();
    updateProgressBar();

    alertElem.classList.remove("display-alert");
    clickSound.play();
    flipping = 0;
    flipElem.innerHTML = "Show Answer";
  }
});

function renderDisplay(value) {
  if (value === "q") {
    revealArea.textContent = CurrentData[cardIndex].question;
    cardBgElem.style.backgroundColor = "#fff7bc";
  } else if (value === "a") {
    revealArea.textContent = CurrentData[cardIndex].answer;
    cardBgElem.style.backgroundColor = "#bcffbc";
  }
}
