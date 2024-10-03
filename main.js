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

import { dispatch } from "./store/stateManager.js";

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
      state = dispatch(state, { type: "CANCELL_ROUND" });
      break;
    }

    resultMessage = checkGuess(playerGuess, state.currentRound.correctNumber);

    //check if the player guessed it right
    if (resultMessage.includes(FEEDBACK_MESSAGES.CORRECT_GUESS)) {
      state = dispatch(state, { type: "GAME_WON" });
    }

    // Increment attempts
    state = dispatch(state, {
      type: "SET_ATTEMPTS",
      payload: state.currentRound.attempts + 1,
    });

    // alert the player of the result of the guess
    state.currentRound.hasWon
      ? alert(
          `${resultMessage} You got the correct number in ${state.currentRound.attempts} attempts! the correct number was: ${state.currentRound.correctNumber}`
        )
      : alert(resultMessage);
  }

  // Check if the player ran out of attempts
  if (
    state.currentRound.attempts === GAME_SETTINGS.MAX_ATTEMPTS &&
    !state.currentRound.hasWon
  ) {
    alert(
      FEEDBACK_MESSAGES.MAX_ATTEMPTS_REACHED +
        state.currentRound.correctNumber
    );
  }

  return state;
};

const getCurrentScoreDetail = (state) => {
  const { isCancelled, hasWon, attempts } = state.currentRound;

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
      (detail) => attempts <= detail.MAX_ATTEMPTS
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
  const updatedState = dispatch(state, {
    type: "ADD_ROUND",
    payload: { ...state.currentRound, score: score },
  });

  return updatedState;
};

const game = (state) => {
  state = dispatch(state, {
    type: "SET_CORRECT_NUMBER",
    payload: generateRandomNumber(
      GAME_SETTINGS.MIN_NUMBER,
      GAME_SETTINGS.MAX_NUMBER
    ),
  });

  // Play the round
  state = playGameRound(state);

  //Calculate the current score after the round
  const scoreDetail = getCurrentScoreDetail(state);

  // update the state
  state = updateGameStateAfterRound(state, scoreDetail.score);

  // Calculate the total score and other game statistics after the round
  const { totalScore, roundsWon, roundsLost, roundsCancelled } =
    calculateGameStats(state);

  // Alert the player of the score feedback, total score, and rounds won, lost, and cancelled
  alert(
    `${scoreDetail.message}. ${SCORE_MESSAGES.TOTAL_SCORE + totalScore}. ` +
      `Rounds won: ${roundsWon}, Rounds lost: ${roundsLost}, Rounds cancelled: ${roundsCancelled}.`
  );

  // save the updated state to local storage
  saveStateToLocalStorage(state);

  //Asking the player if they want to play again
  const shouldPlayAgain = confirm(PROMPTS_MESSAGES.TRY_AGAIN);

  shouldPlayAgain ? game(state) : alert(GAME_FLOW_MESSAGES.THANKS_FOR_PLAYING);
};

const startGameWithDelay = async (state) => {
  const { roundNumber } = state.currentRound;

  try {
    await delay(GAME_SETTINGS.INITIAL_DELAY);

    //Welcome message(only for the first time)
    roundNumber === 1 && alert(GAME_FLOW_MESSAGES.WELCOME);

    // Notify the player which round they are currently playing
    alert(`Round ${roundNumber}`);

    //play
    game(state);
  } catch (error) {
    console.error(error);
    alert(error.message ? error.message : ERROR_MESSAGES.GAME_INITIALIZATION);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  //Get the initilized State
  const initialState = loadStateFromLocalStorage();

  startGameWithDelay(initialState);
});
