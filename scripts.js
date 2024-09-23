function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(randomNumber);
}

generateRandomNumber();

function getPlayerGuess() {
  let playerGuess = Number(prompt("Please, enter a whole number between 1 and 100"));

  if (
      playerGuess < 1 ||
      playerGuess > 100 ||
      isNaN(playerGuess) ||
      !Number.isInteger(playerGuess)
    ) {
    playerGuess = undefined;
    getPlayerGuess();
  } else {
    console.log(playerGuess);
    return playerGuess;
  }
}

getPlayerGuess();