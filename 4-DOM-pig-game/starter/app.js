/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameRunning, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameRunning) {
    // get random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // display result
    const diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // update round number if dice NOT 1
    if (dice !== 1 && !(prevDice[activePlayer] === 6 && dice === 6)){
      roundScore += dice;
      document.getElementById('current-' +  activePlayer).textContent = roundScore;
      prevDice[activePlayer] = dice;
    } else {
      prevDice = [0,0];
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gameRunning){
    //add roundScore to global score
    scores[activePlayer] += roundScore;
    //update ui
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // player won logic
    if(scores[activePlayer] >= 20) {
      document.getElementById('name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gameRunning = false;
    } else {
      nextPlayer();
      prevDice = [0,0];
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
};

function init() {
  scores = [0,0];
  prevDice = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gameRunning = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
};