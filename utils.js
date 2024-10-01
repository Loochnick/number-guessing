import {
  GAME_SETTINGS,
  ERROR_MESSAGES,
  LOCAL_STORAGE_KEY,
} from "./constants.js";

import { DEFAULT_STATE } from "./gameState.js";

//Local Storage helper functions
export const saveStateToLocalStorage = (state) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedState) return JSON.parse(savedState);
  else return JSON.parse(JSON.stringify(DEFAULT_STATE)); //Deep Copy
};

export const validatePlayerGuess = (playerGuess) => {
  if (playerGuess === "") {
    return ERROR_MESSAGES.NOT_EMPTY_SPACE;
  }

  const playerGuessNumber = Number(playerGuess);

  if (isNaN(playerGuessNumber)) {
    return ERROR_MESSAGES.NOT_A_NUMBER;
  }
  if (!Number.isInteger(playerGuessNumber)) {
    return ERROR_MESSAGES.NOT_AN_INTEGER;
  }
  if (playerGuessNumber < GAME_SETTINGS.MIN_NUMBER) {
    return ERROR_MESSAGES.OUT_OF_RANGE_LOW;
  }
  if (playerGuessNumber > GAME_SETTINGS.MAX_NUMBER) {
    return ERROR_MESSAGES.OUT_OF_RANGE_HIGH;
  }

  // Return null if valid
  return null;
};

// Function to calculate the total score and round statistics
export const calculateGameStats = (state) => {
  let totalScore = 0;
  let roundsWon = 0;
  let roundsLost = 0;
  let roundsCancelled = 0;

  state.rounds.forEach((round) => {
    totalScore += round.score;

    if (round.hasWon) roundsWon++;
    else if (round.isCancelled) roundsCancelled++;
    else roundsLost++;
  });

  return {
    totalScore,
    roundsWon,
    roundsLost,
    roundsCancelled,
  };
};

export const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
