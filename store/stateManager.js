import { emitter } from "./eventEmitter.js";
import { saveStateToLocalStorage } from "../utils.js";
import { gameReducer } from "./gameReducer.js";

export const DEFAULT_STATE = {
  rounds: [],
  currentRound: {
    roundNumber: 1,
    attempts: 0,
    hasWon: false,
    score: 0,
    correctNumber: null,
    isCancelled: false,
  },
};

// Listen for state updates to save to local storage
emitter.on("stateUpdate", (newState) => {
  saveStateToLocalStorage(newState);
});

export const dispatch = (state, action) => {
  const newState = gameReducer(state, action);
  emitter.emit("stateUpdate", newState);
  return newState;
};
