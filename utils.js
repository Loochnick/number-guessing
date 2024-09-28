import { GAME_SETTINGS, ERROR_MESSAGES } from "./constants.js";

export const validatePlayerGuess = (playerGuess) => {

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

export const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
