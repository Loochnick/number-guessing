const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const CLOSE_RANGE = 10;
const MAX_ATTEMPTS = 10;

const GUESS_PROMPT_MESSAGE = `Enter your guess (a number between ${MIN_NUMBER} and ${MAX_NUMBER}).`;
const INVALID_NUMBER_MESSAGE = `Invalid input. Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`;
const MAX_ATTEMPTS_REACHED_MESSAGE = `You've reached the maximum number of ${MAX_ATTEMPTS} attempts. Better luck next time!`;
const LOW_GUESS_MESSAGE = "Your guess is too low.";
const LOW_GUESS_CLOSE_MESSAGE = "You're close! Your guess is low.";
const HIGH_GUESS_MESSAGE = "Your guess is too high.";
const HIGH_GUESS_CLOSE_MESSAGE = "You're close! Your guess is high.";
const CORRECT_GUESS_MESSAGE = "Congratulations! You guessed it right!";
const TRY_AGAIN_MESSAGE = "Would you like to try again?";
const THANKS_FOR_PLAYING_MESSAGE = "Thanks for playing!";
const WELCOME_MESSAGE = `
    🎉 Welcome to the Ultimate Number Guessing Game! 🎉
    Here are the rules:
    - You have up to ${MAX_ATTEMPTS} attempts to guess the correct number.
    - The number will be between ${MIN_NUMBER} and ${MAX_NUMBER}.
    🔍 Pay close attention to the hints after each guess!
    Can you find the correct number? Good luck, and have fun!
  `;

export {
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
  MIN_NUMBER,
  MAX_NUMBER,
  TRY_AGAIN_MESSAGE,
  THANKS_FOR_PLAYING_MESSAGE,
  WELCOME_MESSAGE,
};
