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

import { gameState } from "./gameState.js";

const getPlayerGuess = () => {
  let playerGuessNumber = 0;
  let isPlayerGuessValid = false;

  do {
    playerGuessNumber = prompt(PROMPTS_MESSAGES.GUESS_PROMPT);

    // Check if the player canceled the game
    if (playerGuessNumber === null) {
      alert(GAME_FLOW_MESSAGES.GAME_CANCELLED);
      return null;
    }

    //validating player guess
    const errorMessage = validatePlayerGuess(playerGuessNumber);

    //alert the player if the guess is not valid
    errorMessage ? alert(errorMessage) : (isPlayerGuessValid = true);
  } while (!isPlayerGuessValid);

  return Number(playerGuessNumber);
};

const checkGuess = (playerGuess, correctNumber) => {
  const guessDifference = Math.abs(playerGuess - correctNumber);

  if (playerGuess === correctNumber) {
    return FEEDBACK_MESSAGES.CORRECT_GUESS + correctNumber;
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
  while (numberOfAttempts < GAME_SETTINGS.MAX_ATTEMPTS && !gameState.hasWon) {
    const playerGuess = getPlayerGuess();

    // Check if the player canceled the game
    if (playerGuess === null) return null;

    resultMessage = checkGuess(playerGuess, correctNumber);
    alert(resultMessage);

    // Increment attempts
    numberOfAttempts++;

    //check if the player guessed it right
    if (resultMessage.includes(FEEDBACK_MESSAGES.CORRECT_GUESS)) {
      gameState.hasWon = true;
    }
  }

  // Check if the player ran out of attempts
  if (numberOfAttempts === GAME_SETTINGS.MAX_ATTEMPTS && !gameState.hasWon) {
    alert(ERROR_MESSAGES.MAX_ATTEMPTS_REACHED + correctNumber);
  }

  return numberOfAttempts;
};

const calculateScore = (numberOfAttempts) => {
  let scoreDetail;

  if (gameState.hasWon) {
    scoreDetail = SCORE_DETAILS.find(
      (detail) => numberOfAttempts <= detail.maxAttempts
    );
    alert(
      `${scoreDetail.message} ${numberOfAttempts} attempts and your score is ${scoreDetail.score}.`
    );
  } else {
    scoreDetail = DEFAULT_SCORE_DETAIL;
    alert(`${scoreDetail.message} Your score is ${scoreDetail.score}.`);
  }

  return scoreDetail.score;
};

const game = () => {
  const correctNumber = generateRandomNumber(
    GAME_SETTINGS.MIN_NUMBER,
    GAME_SETTINGS.MAX_NUMBER
  );

  //Welcome Message(only for the first round)
  !gameState.shouldRestart && alert(GAME_FLOW_MESSAGES.WELCOME);

  // Play the round
  const numberOfAttempts = playGameRound(correctNumber);

  //Calculate the score after the round
  numberOfAttempts && calculateScore(numberOfAttempts);

  //restarting the game
  gameState.shouldRestart = confirm(PROMPTS_MESSAGES.TRY_AGAIN);

  if (gameState.shouldRestart) {
    gameState.hasWon = false;
    game();
  }  
  else alert(GAME_FLOW_MESSAGES.THANKS_FOR_PLAYING);
};

// play
game();
