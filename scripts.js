import {
  MIN_NUMBER,
  MAX_NUMBER,
  INVALID_NUMBER_MESSAGE,
  LOW_GUESS_MESSAGE,
  LOW_GUESS_CLOSE_MESSAGE,
  HIGH_GUESS_MESSAGE,
  HIGH_GUESS_CLOSE_MESSAGE,
  CORRECT_GUESS_MESSAGE,
  GUESS_PROMPT_MESSAGE,
  CLOSE_RANGE,
  MAX_ATTEMPTS,
  MAX_ATTEMPTS_REACHED_MESSAGE,
  TRY_AGAIN_MESSAGE,
  THANKS_FOR_PLAYING_MESSAGE,
  WELCOME_MESSAGE,
} from "./constants.js";
import { generateRandomNumber, validatePlayerGuess } from "./utils.js";

const getPlayerGuess = () => {
  let playerGuessNumber = 0;
  let isPlayerGuessValid = false;

  do {
    playerGuessNumber = prompt(GUESS_PROMPT_MESSAGE);

    //validating player guess
    isPlayerGuessValid = validatePlayerGuess(playerGuessNumber);

    //alert the player if the guess is not valid
    if (!isPlayerGuessValid) {
      alert(INVALID_NUMBER_MESSAGE);
    }
  } while (!isPlayerGuessValid);

  return Number(playerGuessNumber);
};

const checkGuess = (playerGuess, correctNumber) => {
  const guessDifference = Math.abs(playerGuess - correctNumber);

  if (playerGuess === correctNumber) {
    return CORRECT_GUESS_MESSAGE;
  } else if (playerGuess < correctNumber) {
    return guessDifference <= CLOSE_RANGE
      ? LOW_GUESS_CLOSE_MESSAGE
      : LOW_GUESS_MESSAGE;
  } else {
    return guessDifference <= CLOSE_RANGE
      ? HIGH_GUESS_CLOSE_MESSAGE
      : HIGH_GUESS_MESSAGE;
  }
};

const playGameRound = (correctNumber) => {
  let numberOfAttempts = 0;
  let resultMessage = "";

  // Loop until max attempts or correct guess
  while (
    numberOfAttempts < MAX_ATTEMPTS &&
    resultMessage !== CORRECT_GUESS_MESSAGE
  ) {
    const playerGuess = getPlayerGuess();
    resultMessage = checkGuess(playerGuess, correctNumber);
    alert(resultMessage);

    // Increment attempts
    numberOfAttempts++;
  }

  // Check if the player ran out of attempts
  if (
    numberOfAttempts === MAX_ATTEMPTS &&
    resultMessage !== CORRECT_GUESS_MESSAGE
  ) {
    alert(MAX_ATTEMPTS_REACHED_MESSAGE);
  }
};

const game = () => {
  const correctNumber = generateRandomNumber(MIN_NUMBER, MAX_NUMBER);
  let shouldRestart = false;
  console.log("guess", correctNumber);

  //Welcome Message(only for the first round)
  !shouldRestart && alert(WELCOME_MESSAGE);

  // Play the round
  playGameRound(correctNumber);

  //restarting the game
  shouldRestart = confirm(TRY_AGAIN_MESSAGE);
  shouldRestart ? game() : alert(THANKS_FOR_PLAYING_MESSAGE);
};

// play
game();
