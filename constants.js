// Game Settings
export const GAME_SETTINGS = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 100,
  CLOSE_RANGE: 10,
  MAX_ATTEMPTS: 10,
};

// Prompt Messages
export const PROMPTS_MESSAGES = {
  GUESS_PROMPT: `Enter your guess (a number between ${GAME_SETTINGS.MIN_NUMBER} and ${GAME_SETTINGS.MAX_NUMBER}).`,
  TRY_AGAIN: "Would you like to try again?",
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_NUMBER: `Invalid input. Please enter a number between ${GAME_SETTINGS.MIN_NUMBER} and ${GAME_SETTINGS.MAX_NUMBER}.`,
  NOT_A_NUMBER: "Only numbers are accepted. Please try again.",
  NOT_AN_INTEGER: "Please enter an integer value.",
  OUT_OF_RANGE_LOW: `Please enter a number greater than or equal to ${GAME_SETTINGS.MIN_NUMBER}.`,
  OUT_OF_RANGE_HIGH: `Please enter a number less than or equal to ${GAME_SETTINGS.MAX_NUMBER}.`,
  MAX_ATTEMPTS_REACHED: `You've reached the maximum number of ${GAME_SETTINGS.MAX_ATTEMPTS} attempts. Better luck next time!`,
};

// Feedback Messages
export const FEEDBACK_MESSAGES = {
  LOW_GUESS: "Your guess is too low.",
  LOW_GUESS_CLOSE: "You're close! Your guess is low.",
  HIGH_GUESS: "Your guess is too high.",
  HIGH_GUESS_CLOSE: "You're close! Your guess is high.",
  CORRECT_GUESS: "Congratulations! You guessed it right!",
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
  INCREDIBLE: "Incredible! You achieved an outstanding result! you got it with",
  GREAT_JOB:
    "Great job! Your result reflects your impressive skills! you got it with",
  GOOD_JOB: "Good work! You've got a solid result! you got it with",
  TOOK_SEVERAL_ATTEMPTS:
    "Well done! Your result shows your perseverance! you got it with",
  BETTER_LUCK_NEXT_TIME: "Better luck next time! you got it with",
};

// Score Ranges
export const SCORE_DETAILS = [
  { maxAttempts: 1, score: 60, message: SCORE_MESSAGES.INCREDIBLE },
  { maxAttempts: 5, score: 40, message: SCORE_MESSAGES.GREAT_JOB },
  { maxAttempts: 8, score: 20, message: SCORE_MESSAGES.GOOD_JOB },
  { maxAttempts: 10, score: 10, message: SCORE_MESSAGES.TOOK_SEVERAL_ATTEMPTS },
];

// Default score and message for attempts greater than 10
export const DEFAULT_SCORE_DETAIL = {
  score: 0,
  message: SCORE_MESSAGES.BETTER_LUCK_NEXT_TIME,
};
