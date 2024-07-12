'use strict';

import '../styles/modern.css';
import '../styles/style.css';
import '../styles/components/header.css';
import '../styles/components/scoreboard.css';
import '../styles/components/play.css';
import '../styles/components/restart.css';
import '../styles/components/modal.css';
import '../styles/util.css';

const button = document.querySelector('.play__button');
const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti();
const useConfettiDraw = function () {
  jsConfetti.addConfetti({
    emojis: ['😲', '😲', '😲', '😲', '😲', '😲'],
  });
  // .then(() => jsConfetti.addConfetti());
};
const useConfettiWin = function () {
  jsConfetti.addConfetti({
    // emojis: ['😲', '😲', '😲', '😲', '😲', '😲'],
  });
};
const useConfettiLose = function () {
  jsConfetti.addConfetti({
    emojis: ['💩', '💩', '💩', '💩', '💩', '💩'],
  });
  // .then(() => jsConfetti.addConfetti());
};
// determine the winner between the two
const determineWinner = (humanChoice, computerChoice) => {
  if (humanChoice === computerChoice) {
    useConfettiDraw();
    document.querySelector('.computerChoice').style.backgroundColor =
      'lightblue';
    document.querySelector('.humanChoice').style.backgroundColor = 'lightblue';
    return 'No one wins its a tie';
  } else if (
    (humanChoice === 'rock🪨' && computerChoice === 'scissors✂️') ||
    (humanChoice === 'scissors✂️' && computerChoice === 'paper📃') ||
    (humanChoice === 'paper📃' && computerChoice === 'rock🪨')
  ) {
    addScoreHuman();
    document.querySelector('.humanChoice').style.backgroundColor = 'lightgreen';
    document.querySelector('.computerChoice').style.backgroundColor = 'red';
    useConfettiWin();
    return 'You win!';
  } else {
    addScoreComputer();
    document.querySelector('.computerChoice').style.backgroundColor =
      'lightgreen';
    document.querySelector('.humanChoice').style.backgroundColor = 'red';
    useConfettiLose();
    return 'You lose!';
  }
};

// clicking on play button to confirm selection
document.querySelector('.play__button').addEventListener('click', function () {
  const humanChoice = document.getElementById('choose').value;
  document.querySelector('.humanChoice').textContent = humanChoice; // changes the ? to the secret number

  // If nothing is selected
  if (!humanChoice) {
    alert('Please select a proper input!');
    return;
  }
  // random computer choice
  const choices = ['rock🪨', 'paper📃', 'scissors✂️'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  document.querySelector('.computerChoice').textContent = computerChoice;

  // Determine the result
  const result = determineWinner(humanChoice, computerChoice);

  // Display the result
  console.log(result, humanChoice, computerChoice);
});

// Adding score to scoreboard after each round
const addScoreComputer = () => {
  const computerScore = document.querySelector('.computerScore');
  let currentScore = parseInt(computerScore.textContent);
  currentScore += 1;
  computerScore.textContent = currentScore;

  if (currentScore >= 10) {
    openModal();
    restartGame();
  }
};

const addScoreHuman = () => {
  const humanScore = document.querySelector('.humanScore');
  let currentScore = parseInt(humanScore.textContent);
  currentScore += 1;
  humanScore.textContent = currentScore;

  if (currentScore >= 10) {
    openModal();
    restartGame();
  }
};

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

// Creating universal function to re use
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  restartGame();
};
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// looping through the above
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', closeModal);
}

// close button
btnCloseModal.addEventListener('click', closeModal);

// clicking outide of modal
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const restartGame = () => {
  document.querySelector('.humanScore').textContent = '0';
  document.querySelector('.computerScore').textContent = '0';
  document.querySelector('.computerChoice').style.backgroundColor = 'white';
  document.querySelector('.humanChoice').style.backgroundColor = 'white';
  document.querySelector('.computerChoice').textContent = '?';
  document.querySelector('.humanChoice').textContent = '?';
  document.getElementById('choose').selectedIndex = 0;
};

// restart game
document.querySelector('.reset__btn').addEventListener('click', function () {
  restartGame();
});
