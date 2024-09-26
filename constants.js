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
};

// Score Messages
export const SCORE_MESSAGES = {
  INCREDIBLE: "Incredible! You got it on the first try! Your score is",
  GREAT_JOB: "Great job! You got it within a few attempts. Your score is",
  GOOD_JOB: "Good! It took a bit longer, but you still made it. Your score is",
  TOOK_SEVERAL_ATTEMPTS: "You got it, but it took several attempts. Your score is",
  BETTER_LUCK_NEXT_TIME: "Better luck next time! Your score is",
};
