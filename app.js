"use strict";

/*//// import elements ////*/

let player0 = document.querySelector('.player-0');
let player1 = document.querySelector('.player-1');

let score0 = document.querySelector('.score-0');
let score1 = document.querySelector('.score-1');

let diceImg = document.querySelector('.dice');
let rollBtn = document.querySelector('.roll');
let holdBtn = document.querySelector('.hold');
let resetBtn = document.querySelector('.reset')

/*//// start condition ////*/

let isPlaying, score, activePlayer, fixedScores;

function newGame() { //// generic function type declaration
    score0.textContent = 0;
    score1.textContent = 0;
    diceImg.classList.add('hidden');
    isPlaying = true;
    score = 0;
    activePlayer = 0;
    fixedScores = [0, 0];
    player0.classList.add('active');
    player1.classList.remove('active');

    player0.classList.remove('winner');
    player1.classList.remove('winner');
    document.querySelector('.current-score-0').textContent = 0;
    document.querySelector('.current-score-1').textContent = 0;
}

newGame();

/*//// reset game or newGame functionnality ////*/
resetBtn.addEventListener('click', newGame);

/*//// hold functionnality ////*/

rollBtn.addEventListener('click', function () {
    if (isPlaying) {
        const diceNumber = Math.trunc((Math.random() * 6) + 1);
        // console.log(diceNumber);
        diceImg.src = `dice-${diceNumber}.png`;
        diceImg.classList.remove('hidden');

        if (diceNumber !== 1) {
            score += diceNumber;
            document.querySelector(`.current-score-${activePlayer}`).textContent = score;
        } else {
            switchPlayer();
        }
    }
});

/*//// switch player functionnality ////*/
function switchPlayer() {
    score = 0;
    document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('active');
    player1.classList.toggle('active');
}

/*//// hold score functionnality ////*/

holdBtn.addEventListener('click', function () {
    if (isPlaying) {
        fixedScores[activePlayer] += score;
        document.querySelector(`.score-${activePlayer}`).textContent =
            fixedScores[activePlayer]; /// update ui

        if (fixedScores[activePlayer] >= 20) {
            isPlaying = false;
            document.querySelector(`.player-${activePlayer}`).classList.add("winner");
        } else {
            switchPlayer();
        }
    }
})