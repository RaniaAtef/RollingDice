/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
"use strict ";

const score0El = document.querySelector("#score-0");
const score1El = document.getElementById("score-1");
const current0El = document.getElementById("current-0");
const current1El = document.getElementById("current-1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const player0El = document.querySelector(".player-0-panel");
const player1El = document.querySelector(".player-1-panel");
// const activePlayer = document.querySelector(".player-0-panel active");

let scores, currentScore, activePlayer, playing;
// starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");

  player0El.classList.remove("winner");
  player1El.classList.remove("winner");
  player0El.classList.add("active");
  player1El.classList.remove("active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("active");
  player1El.classList.toggle("active");
};

// rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);
    //3.check for rolled 1: if true ,
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1]+currentScore
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");

      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
    } else {
      //3.switch to next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
