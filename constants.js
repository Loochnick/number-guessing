//Local Storage
export const LOCAL_STORAGE_KEY = 'state';

// Game Settings
export const GAME_SETTINGS = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 100,
  CLOSE_RANGE: 10,
  MAX_ATTEMPTS: 10,
  INITIAL_DELAY: 1000,
};

// Prompt Messages
export const PROMPTS_MESSAGES = {
  GUESS_PROMPT: `Enter your guess (a number between ${GAME_SETTINGS.MIN_NUMBER} and ${GAME_SETTINGS.MAX_NUMBER}).`,
  TRY_AGAIN: "Would you like to try again?",
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_NUMBER: `Invalid input. Please enter a number between ${GAME_SETTINGS.MIN_NUMBER} and ${GAME_SETTINGS.MAX_NUMBER}.`,
  NOT_A_NUMBER: "Only numbers are accepted. Please try again.\n",
  NOT_AN_INTEGER: "Please enter an integer value.\n",
  OUT_OF_RANGE_LOW: `Please enter a number greater than or equal to ${GAME_SETTINGS.MIN_NUMBER}.\n`,
  OUT_OF_RANGE_HIGH: `Please enter a number less than or equal to ${GAME_SETTINGS.MAX_NUMBER}.\n`,
  NOT_EMPTY_SPACE: "empty space is not accepted.\n",
  GAME_INITIALIZATION:
    "Something went wrong!. Please refresh the page and try again.\n",
};

// Feedback Messages
export const FEEDBACK_MESSAGES = {
  LOW_GUESS: "Your guess is too low.\n",
  LOW_GUESS_CLOSE: "You're close! Your guess is low.\n",
  HIGH_GUESS: "Your guess is too high.\n",
  HIGH_GUESS_CLOSE: "You're close! Your guess is high.\n",
  CORRECT_GUESS: "Congratulations! You guessed it right!\n",
  MAX_ATTEMPTS_REACHED: `You've reached the maximum number of ${GAME_SETTINGS.MAX_ATTEMPTS} attempts. Better luck next time! The correct number was:`,
};

// Game Flow Messages
export const GAME_FLOW_MESSAGES = {
  WELCOME: `
    🎉 Welcome to the Ultimate Number Guessing Game! 🎉
    Here are the rules:
    - You have up to ${GAME_SETTINGS.MAX_ATTEMPTS} attempts to guess the correct number.
    - The number will be between ${GAME_SETTINGS.MIN_NUMBER} and ${GAME_SETTINGS.MAX_NUMBER}.
    🔍 Pay close attention to the hints after each guess!
    Can you find the correct number? Good luck, and have fun!
  `,
  THANKS_FOR_PLAYING: "Thanks for playing!",
  GAME_CANCELLED: "The game has been cancelled",
};

// Score Messages
export const SCORE_MESSAGES = {
  INCREDIBLE: "Incredible! You achieved an outstanding result! your score for this round is ",
  GREAT_JOB:
    "Great job! Your result reflects your impressive skills! your score for this round is ",
  GOOD_JOB: "Good work! You've got a solid result! your score for this round is ",
  TOOK_SEVERAL_ATTEMPTS:
    "Well done! Your result shows your perseverance! your score for this round is ",
  BETTER_LUCK_NEXT_TIME: "Don't worry, you'll get it next time! your score for this round is ",
  GAME_CANCELLED: "Your score for this round is ",
  TOTAL_SCORE: "Your total score is ",
};

// Score Ranges
export const SCORE_DETAILS = [
  { MAX_ATTEMPTS: 3, SCORE: 60, MESSAGE: SCORE_MESSAGES.INCREDIBLE },
  { MAX_ATTEMPTS: 5, SCORE: 40, MESSAGE: SCORE_MESSAGES.GREAT_JOB },
  { MAX_ATTEMPTS: 8, SCORE: 20, MESSAGE: SCORE_MESSAGES.GOOD_JOB },
  {
    MAX_ATTEMPTS: 10,
    SCORE: 10,
    MESSAGE: SCORE_MESSAGES.TOOK_SEVERAL_ATTEMPTS,
  },
];

// Default score and message for attempts greater than 10
export const GAME_OVER_SCORE_DETAIL = {
  SCORE: 0,
  MESSAGE: SCORE_MESSAGES.BETTER_LUCK_NEXT_TIME,
};

// Score for canceled game
export const CANCELED_GAME_SCORE_DETAIL = {
  SCORE: 0,
  MESSAGE: SCORE_MESSAGES.GAME_CANCELLED,
};
