import { get } from "./utility.js";

export const userData = get("userData") || {
  flashcards: [],
  cardId: 1,
  cardIndex: 0,
};
