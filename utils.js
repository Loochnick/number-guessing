import { GAME_SETTINGS } from "./constants.js";

export const validatePlayerGuess = (playerGuess) => {

  // Convert the input to a number
  const playerGuessNumber = Number(playerGuess);

  return (
    !isNaN(playerGuessNumber) &&
    Number.isInteger(playerGuessNumber) &&
    playerGuessNumber >= GAME_SETTINGS.MIN_NUMBER &&
    playerGuessNumber <= GAME_SETTINGS.MAX_NUMBER
  );
};

export const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
