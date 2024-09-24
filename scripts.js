let correctGuesses = 0;

function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return randomNumber;
}

function getPlayerGuess() {
  let playerGuess = Number(prompt("Please, enter a whole number between 1 and 100"));

  if (
      playerGuess < 1 ||
      playerGuess > 100 ||
      isNaN(playerGuess) ||
      !Number.isInteger(playerGuess)
    ) {
    console.log("Invalid number, try again");
  } else {
    console.log("Player Guess:", playerGuess);

    const randomNumber = generateRandomNumber();
    console.log("Random Number:", randomNumber);

    if (playerGuess === randomNumber) {
      correctGuesses++;
      console.log("Correct Guess! Total Correct Guesses:", correctGuesses);
    } else {
      console.log("Incorrect guess. Try again.");
    }
  }

  setTimeout(getPlayerGuess, 1000);
}

getPlayerGuess();
