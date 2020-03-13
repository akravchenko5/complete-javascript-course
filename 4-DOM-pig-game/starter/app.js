/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameRunning, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameRunning) {
    // get random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    // display result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
    // update round number if dice NOT 1
    /*
    if (dice === 6 && dice2 === 6){
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = 0;
      nextPlayer();
    } else if (dice !== 1 && dice2 !== 1) {
      roundScore += dice += dice2;
      document.getElementById('current-' +  activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
    */
  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gameRunning){
    //add roundScore to global score
    scores[activePlayer] += roundScore;
    //update ui
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    let input = document.querySelector('.final-score').value;
    let finalScore;
    if (input) {
      finalScore = input;
    } else {
      finalScore = 100;
    }
    // player won logic
    if(scores[activePlayer] >= finalScore) {
      document.getElementById('name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gameRunning = false;
    } else {
      nextPlayer();
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
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
};

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gameRunning = true;


  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

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