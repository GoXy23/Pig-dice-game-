// Define variables
var scores, roundScore, activePlayer, gamePlaying, numberOfDice, gameScore, twoSixes, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        //  Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        if(numberOfDice === '2'){
            var dice2 = Math.floor(Math.random() * 6) + 1;

            var dice2DOM = document.querySelector('.dice2');
            dice2DOM.style.display = 'block';
            dice2DOM.src = 'dice-' + dice2 + '.png';
        }
        

        // Display resault
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // two sixes in a row game mode
        if(twoSixes === 'yes'){
            if(numberOfDice === '1') {
                if(dice === 6 && lastDice === 6) {
                    // delete all score
                    console.log('2 6 - jedan');
                    document.getElementById('score-' + activePlayer).textContent = 0;
                    nextPlayer();
                }
            } else if(numberOfDice === '2'){
                if((dice === 6 && lastDice === 6) || (dice === 6 && lastDice2 === 6) || (dice2 === 6 && lastDice === 6)  || (dice2 === 6 && lastDice2 === 6) || (dice === 6 && dice2 === 6)) {
                    console.log('2 6 - dva');
                    document.getElementById('score-' + activePlayer).textContent = 0;
                    nextPlayer();
                }
            }
        }
        
        // Update the round score IF the rolled number was NOT a 1
        if(numberOfDice === '1') {
            if(dice !== 1) {
                roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
        } else {
            if(dice !== 1 && dice2 !== 1) {
                roundScore += dice + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
        }

        lastDice = dice;
        lastDice2 = dice2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= gameScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
        nextPlayer();
        }
    }
});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    // one or two dice
    var element1 = document.getElementById('dice-number');
    numberOfDice = element1.options[element1.selectedIndex].value;

    // get game score value
    gameScore = document.getElementById('score-value').value;

    // two sixes in row game mode
    var element2 = document.getElementById('two-six-rule');
    twoSixes = element2.options[element2.selectedIndex].value;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

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
}