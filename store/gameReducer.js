import { DEFAULT_STATE } from "./stateManager.js";

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_CORRECT_NUMBER":
      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          correctNumber: action.payload,
        },
      };
    case "ADD_ROUND":
      return {
        ...state,
        rounds: [...state.rounds, action.payload],
        currentRound: {
          ...DEFAULT_STATE.currentRound,
          roundNumber: state.rounds.length + 1,
        },
      };
      case "CANCELL_ROUND":
        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            isCancelled: true
          }
        }
      case "GAME_WON":
        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            hasWon: true,
          }
        }
      case "SET_ATTEMPTS": 
        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            attempts: action.payload
          }
        }
    default:
      return state;
  }
};
