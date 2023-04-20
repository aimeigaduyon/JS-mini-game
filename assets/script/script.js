// DECLARED VARIABLES

// div class: game-intro
let gameIntro = document.querySelector(".game-intro");
let playerInput = document.querySelector("#playerInput");
let startBtn = document.querySelector("#startBtn");

// div class: game-start
let gameStart = document.querySelector(".game-start");
let nameInput = document.querySelector("#nameInput");
let gameResult = document.querySelector(".game-result")
let playerScore = document.querySelector(".player-score p");
let computerScore = document.querySelector(".computer-score p");
let playerHand = document.querySelector(".player-hand");
let computerHand = document.querySelector(".computer-hand");
let rockBtn = document.querySelector(".rock");
let paperBtn = document.querySelector(".paper");
let scissorsBtn = document.querySelector(".scissors");

let playerScoreCount = 0;
let computerScoreCount = 0;
let matchCount = 0;
let maxMatches = 5;

// events
startBtn.addEventListener("click", function() {
    let playerName = playerInput.value;

    if (playerName.length > 0) {
        document.querySelector(".game-intro").classList.add("fadeOut");
        document.querySelector(".game-start").classList.add("fadeIn");
        document.querySelector("#nameInput").textContent = playerName;
    }
});

rockBtn.addEventListener('click', function() {
  playGame('rock');
});

paperBtn.addEventListener('click', function() {
  playGame('paper');
});

scissorsBtn.addEventListener('click', function() {
  playGame('scissors');
});


// for the computer's choice | random index
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// updating the hand images
function updateHands(playerChoice, computerChoice) {
  playerHand.src = "assets/images/left-" + playerChoice + ".png";
  computerHand.src = "assets/images/right-" + computerChoice + ".png";
}

// updating the game scores
function updateScore(winner) {
  if (winner === "player") {
    playerScoreCount++;
  } else if (winner === "computer") {
    computerScoreCount++;
  } 
  playerScore.innerHTML = playerScoreCount;
  computerScore.innerHTML = computerScoreCount;
}

// determining the winner
function checkWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

// display game results
function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = checkWinner(playerChoice, computerChoice);
  updateHands(playerChoice, computerChoice); 
  if (winner === "tie") {
    gameResult.innerHTML = "It's a tie!";
  } else if (winner === "player") {
    gameResult.innerHTML = "You win!";
  } else {
    gameResult.innerHTML = "The computer wins!"
  }
  updateScore(winner);

  // add match result to history
    let playerHistoryList = document.querySelector('.player-history');
    let computerHistoryList = document.querySelector('.computer-history');
    
    let playerListItem = document.createElement('li');
    let computerListItem = document.createElement('li');
    if (winner === "tie") {
    playerListItem.textContent = "It's a tie!";
    computerListItem.textContent = "It's a tie!";
    } else if (winner === "player") {
    playerListItem.textContent = "You win!";
    computerListItem.textContent = "The computer loses!";
    } else {
    playerListItem.textContent = "You lose!";
    computerListItem.textContent = "The computer wins!";
    }

    matchCount++;

    playerHistoryList.appendChild(playerListItem);
    computerHistoryList.appendChild(computerListItem);

    if (matchCount === maxMatches) {
    if (playerScoreCount > computerScoreCount) {
      gameResult.innerHTML = "You win the match!";
    } else if (playerScoreCount < computerScoreCount) {
      gameResult.innerHTML = "The computer wins the match!";
    } else {
      gameResult.innerHTML = "The match is a tie!";
    }

    // disable the buttons after the match is over
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
  }
}

