import { get } from "./usercreate/utility.js";

function activateReset() {
  const state = get("userData");

  if (state === null) {
    return true;
  } else {
    return false;
  }
}

const resetElem = document.querySelector(".reset");

function decideResetBtnState() {
  if (activateReset()) {
    resetElem.classList.add("inactive");
  } else {
    resetElem.classList.remove("inactive");
  }
}

decideResetBtnState();

resetElem.addEventListener("click", () => {
  localStorage.clear();

  decideResetBtnState();
});
