import {
  GAME_SETTINGS,
  PROMPTS_MESSAGES,
  ERROR_MESSAGES,
  FEEDBACK_MESSAGES,
  GAME_FLOW_MESSAGES,
  SCORE_DETAILS,
  GAME_OVER_SCORE_DETAIL,
  CANCELED_GAME_SCORE_DETAIL,
  SCORE_MESSAGES,
} from "./constants.js";

import {
  generateRandomNumber,
  validatePlayerGuess,
  delay,
  saveStateToLocalStorage,
  loadStateFromLocalStorage,
  calculateGameStats,
} from "./utils.js";

import { DEFAULT_STATE } from "./gameState.js";

const getPlayerGuess = () => {
  let playerGuessNumber = 0;
  let isPlayerGuessValid = false;

  do {
    playerGuessNumber = prompt(PROMPTS_MESSAGES.GUESS_PROMPT);

    // Check if the player canceled the game
    if (playerGuessNumber === null) {
      console.log(GAME_FLOW_MESSAGES.GAME_CANCELLED);
      return null;
    }

    //validating player guess
    const errorMessage = validatePlayerGuess(playerGuessNumber);

    //alert the player if the guess is not valid
    errorMessage ? console.log(errorMessage) : (isPlayerGuessValid = true);
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

const playGameRound = (state) => {
  let resultMessage = "";

  // Loop until max attempts or correct guess
  while (
    state.currentRound.attempts < GAME_SETTINGS.MAX_ATTEMPTS &&
    !state.currentRound.hasWon
  ) {
    const playerGuess = getPlayerGuess();

    // Check if the player canceled the game
    if (playerGuess === null) {
      state.currentRound.isCancelled = true;
      break;
    }

    resultMessage = checkGuess(playerGuess, state.currentRound.correctNumber);

    //check if the player guessed it right
    if (resultMessage.includes(FEEDBACK_MESSAGES.CORRECT_GUESS)) {
      state.currentRound.hasWon = true;
    }

    // Increment attempts
    state.currentRound.attempts++;

    // alert the player of the result of the guess
    state.currentRound.hasWon
      ? console.log(
          `${resultMessage} You got the correct number in ${state.currentRound.attempts} attempts! the correct number was: ${state.currentRound.correctNumber} \n`
        )
      : console.log(resultMessage);
  }

  // Check if the player ran out of attempts
  if (
    state.currentRound.attempts === GAME_SETTINGS.MAX_ATTEMPTS &&
    !state.currentRound.hasWon
  ) {
    console.log(
      FEEDBACK_MESSAGES.MAX_ATTEMPTS_REACHED + state.currentRound.correctNumber
    );
  }
};

const getCurrentScoreDetail = (state) => {
  const { isCancelled, hasWon } = state.currentRound;

  // Handle cancelled game
  if (isCancelled) {
    return {
      message:
        CANCELED_GAME_SCORE_DETAIL.MESSAGE + CANCELED_GAME_SCORE_DETAIL.SCORE,
      score: CANCELED_GAME_SCORE_DETAIL.SCORE,
    };
  }

  // Handle game won scenario
  if (hasWon) {
    const scoreDetail = SCORE_DETAILS.find(
      (detail) => state.currentRound.attempts <= detail.MAX_ATTEMPTS
    );

    return {
      message: scoreDetail.MESSAGE + scoreDetail.SCORE,
      score: scoreDetail.SCORE,
    };
  }

  // Handle game over scenario (neither won nor cancelled)
  return {
    message: GAME_OVER_SCORE_DETAIL.MESSAGE + GAME_OVER_SCORE_DETAIL.SCORE,
    score: GAME_OVER_SCORE_DETAIL.SCORE,
  };
};

const updateGameStateAfterRound = (state, score) => {
  // Update the score
  state.currentRound.score = score;

  // Push the current round to the rounds array
  state.rounds.push({ ...state.currentRound });

  // Reset the current round to defaults for the next round
  state.currentRound = {
    ...DEFAULT_STATE.currentRound,
    roundNumber: state.rounds.length + 1,
  };
};

const game = (state) => {
  let shouldClearHistory = false;

  //Ask the player if they want to clear history(but not at first)
  if (state.currentRound.roundNumber !== 1)
    shouldClearHistory = confirm(GAME_FLOW_MESSAGES.CLEAR_HISTORY);

  // clear the history if the player click ok
  if (shouldClearHistory) {
    localStorage.clear();
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  // Notify the player which round they are currently playing
  console.log(`Round ${state.currentRound.roundNumber}`);

  // Generate an random guess
  state.currentRound.correctNumber = generateRandomNumber(
    GAME_SETTINGS.MIN_NUMBER,
    GAME_SETTINGS.MAX_NUMBER
  );

  // Play the round
  playGameRound(state);

  //Calculate the current score after the round
  const scoreDetail = getCurrentScoreDetail(state);

  // update the state
  updateGameStateAfterRound(state, scoreDetail.score);

  // Calculate the total score and other game statistics after the round
  const { totalScore, roundsWon, roundsLost, roundsCancelled } =
    calculateGameStats(state);

  // Alert the player of the score feedback, total score, and rounds won, lost, and cancelled
  console.log(
    `${scoreDetail.message}. ${SCORE_MESSAGES.TOTAL_SCORE + totalScore}. ` +
      `Rounds won: ${roundsWon}, Rounds lost: ${roundsLost}, Rounds cancelled: ${roundsCancelled}.`
  );

  // save the updated state to local storage
  saveStateToLocalStorage(state);

  //Asking the player if they want to play again
  const shouldPlayAgain = confirm(PROMPTS_MESSAGES.TRY_AGAIN);

  shouldPlayAgain
    ? game(state)
    : console.log(GAME_FLOW_MESSAGES.THANKS_FOR_PLAYING);
};

document.addEventListener("DOMContentLoaded", () => {
  //Get the initilized State
  const state = loadStateFromLocalStorage();

  try {
    //Welcome message(only for the first time)
    state.currentRound.roundNumber === 1 &&
      console.log(GAME_FLOW_MESSAGES.WELCOME);

    //play
    game(state);
  } catch (error) {
    console.log(
      error.message ? error.message : ERROR_MESSAGES.GAME_INITIALIZATION
    );
  }
});
