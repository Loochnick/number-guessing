import {
  GAME_SETTINGS,
  PROMPTS_MESSAGES,
  ERROR_MESSAGES,
  FEEDBACK_MESSAGES,
  GAME_FLOW_MESSAGES,
  SCORE_DETAILS,
  DEFAULT_SCORE_DETAIL,
} from "./constants.js";

import { generateRandomNumber, validatePlayerGuess } from "./utils.js";

const getPlayerGuess = () => {
  let playerGuessNumber = 0;
  let isPlayerGuessValid = false;

  do {
    playerGuessNumber = prompt(PROMPTS_MESSAGES.GUESS_PROMPT);

    //validating player guess
    isPlayerGuessValid = validatePlayerGuess(playerGuessNumber);

    //alert the player if the guess is not valid
    if (!isPlayerGuessValid) {
      alert(ERROR_MESSAGES.INVALID_NUMBER);
    }
  } while (!isPlayerGuessValid);

  return Number(playerGuessNumber);
};

const checkGuess = (playerGuess, correctNumber) => {
  const guessDifference = Math.abs(playerGuess - correctNumber);

  if (playerGuess === correctNumber) {
    return FEEDBACK_MESSAGES.CORRECT_GUESS;
  } else if (playerGuess < correctNumber) {
    return guessDifference <= GAME_SETTINGS.CLOSE_RANGE
      ? FEEDBACK_MESSAGES.LOW_GUESS_CLOSE
      : FEEDBACK_MESSAGES.LOW_GUESS;
  } else {
    return guessDifference <= GAME_SETTINGS.CLOSE_RANGE
      ? FEEDBACK_MESSAGES.HIGH_GUESS_CLOSE
      : FEEDBACK_MESSAGES.HIGH_GUESS;
  }
};

const playGameRound = (correctNumber) => {
  let numberOfAttempts = 0;
  let resultMessage = "";

  // Loop until max attempts or correct guess
  while (
    numberOfAttempts < GAME_SETTINGS.MAX_ATTEMPTS &&
    resultMessage !== FEEDBACK_MESSAGES.CORRECT_GUESS
  ) {
    const playerGuess = getPlayerGuess();
    resultMessage = checkGuess(playerGuess, correctNumber);
    alert(resultMessage);

    // Increment attempts
    numberOfAttempts++;
  }

  // Check if the player ran out of attempts
  if (
    numberOfAttempts === GAME_SETTINGS.MAX_ATTEMPTS &&
    resultMessage !== FEEDBACK_MESSAGES.CORRECT_GUESS
  ) {
    alert(ERROR_MESSAGES.MAX_ATTEMPTS_REACHED);
  }

  return numberOfAttempts;
};

const calculateScore = (numberOfAttempts) => {
  // Find the score detail
  const scoreDetail =
    SCORE_DETAILS.find((detail) => numberOfAttempts <= detail.maxAttempts) ||
    DEFAULT_SCORE_DETAIL;

  alert(`${scoreDetail.message} ${scoreDetail.score}.`);
  return scoreDetail.score;
};

const game = () => {
  let shouldRestart = false;
  const correctNumber = generateRandomNumber(
    GAME_SETTINGS.MIN_NUMBER,
    GAME_SETTINGS.MAX_NUMBER
  );

  //Welcome Message(only for the first round)
  !shouldRestart && alert(GAME_FLOW_MESSAGES.WELCOME);

  // Play the round
  const numberOfAttempts = playGameRound(correctNumber);

  //Calculate the score after the round
  calculateScore(numberOfAttempts);

  //restarting the game
  shouldRestart = confirm(PROMPTS_MESSAGES.TRY_AGAIN);
  shouldRestart ? game() : alert(GAME_FLOW_MESSAGES.THANKS_FOR_PLAYING);
};

// play
game();
