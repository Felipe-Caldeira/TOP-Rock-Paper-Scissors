// Global variables
let computerScore = 0;
let playerScore = 0;

// Gameplay functions
function computerPlay() {
    let choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "rock":
            return (computerSelection == "paper") ? -1 :
                (computerSelection == "rock") ? 0 : 1;
            break;
        case "paper":
            return (computerSelection == "scissors") ? -1 :
                (computerSelection == "paper") ? 0 : 1;
            break;
        case "scissors":
            return (computerSelection == "rock") ? -1 :
                (computerSelection == "scissors") ? 0 : 1;
            break;
    }
}

function scorePoint(winner) {
    if (winner == "player") {
        playerScore++;
        const playerScoreContainer = document.querySelector(".player");
        const playerScoreIcons = Array.from(playerScoreContainer.children);
        for (i = 0; i < playerScore; i++) {
            playerScoreIcons[i].classList.add("playerScoreIcon");
        }
    } else {
        computerScore++;
        const computerScoreContainer = document.querySelector(".computer");
        const computerScoreIcons = Array.from(computerScoreContainer.children);
        for (i = 0; i < computerScore; i++) {
            computerScoreIcons[i].classList.add("computerScoreIcon");
        }
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.querySelectorAll(".computerScoreIcon").forEach(icon => icon.classList.remove("computerScoreIcon"));
    document.querySelectorAll(".playerScoreIcon").forEach(icon => icon.classList.remove("playerScoreIcon"));

    const computerChoiceDiv = document.querySelector(".computerChoice");
    const placeholderDiv = document.createElement("div");
    computerChoiceDiv.replaceChild(placeholderDiv, computerChoiceDiv.firstChild);

    document.querySelector(".roundResult").textContent = "Make your move:";
}

function chooseChoice(e) {
    if (computerScore >= 5 || playerScore >= 5) return;
    const playerSelection = this.getAttribute("data-choice");
    const computerSelection = computerPlay();
    const gameOutcome = playRound(playerSelection, computerSelection);

    const roundResultDiv = document.querySelector(".roundResult");
    const computerChoiceDiv = document.querySelector(".computerChoice");

    const computerChoicePNG = document.createElement("img");
    computerChoicePNG.src = `images/${computerSelection}.png`;
    computerChoicePNG.classList.add("choiceIcon");
    computerChoiceDiv.replaceChild(computerChoicePNG, computerChoiceDiv.firstChild);

    switch (gameOutcome) {
        case -1:
            roundResultDiv.textContent = `You Lose! ${capitalize(computerSelection)} beats ${playerSelection}`;
            scorePoint("computer");
            if (computerScore == 5) {
                setTimeout(function() {
                    alert("You lost the match! Press OK to start a new one.");
                    resetGame();
                }, 1000)
            }
            break;
        case 0:
            roundResultDiv.textContent = "It's a draw!";
            break;
        case 1:
            roundResultDiv.textContent = `You Win! ${capitalize(playerSelection)} beats ${computerSelection}`;
            scorePoint("player");
            if (playerScore == 5) {
                setTimeout(function () {
                    alert("You won the match! Press OK to start a new one.");
                    resetGame();
                }, 1000)
            }

    }
}

// Helper functions
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Main code
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', chooseChoice);
})


// function game(rounds) {
//     for (i = 0; i < rounds; i++) {
//         let playerSelection;
//         while (true) {
//             playerSelection = prompt("Choose rock, paper, or scissors:", "");
//             playerSelection = playerSelection.toLowerCase();
//             if (!["rock", "paper", "scissors"].includes(playerSelection)) {
//                 console.log("Invalid selection. Choose rock, paper, or scissors.");
//                 continue;
//             }
//             break;
//         }
//         let computerSelection = computerPlay();
//         let gameOutcome = playRound(playerSelection, computerSelection);

//         switch (gameOutcome) {
//             case -1:
//                 console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
//                 break;
//             case 0:
//                 console.log("It's a draw!");
//                 break;
//             case 1:
//                 console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
//         }
//     }
// }