/*
Next:

-end game on turn 9 or win
-reset game

*/

const gameboardContainer = document.querySelector('.gameboardContainer');

const Gameboard = (() => {
    const gameboard = new Array(9);
    const createBoard = () => {
        for (let i = 0; i < gameboard.length; i++) {
            let gridSquare = document.createElement('div');
            gridSquare.classList.add('gridSquare');
            gameboardContainer.appendChild(gridSquare);
        }
    }
    return {gameboard, createBoard};
})();

Gameboard.createBoard();

const Player = (name,mark) => {
    const placeMark = (index) => {
            Gameboard.gameboard[index] = mark;        
    }
    return {placeMark, mark, name};
}

const jony = Player('Jonathan', 'X');
const jeny = Player('Jenitina', 'O');


const win = (() => {
    let winCounter = 0;
    const winCondition = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    const winMessage = document.querySelector('.win_message');
    

    const checkWin = (currentPlayer) => { 
        let _workaround = false;   
        winCondition.forEach(condition => {
            condition.forEach(index => {
                if(Gameboard.gameboard[index] === currentPlayer.mark) {
                    winCounter ++;
                }
            })
            if(winCounter === 3) {
                winCounter = 0;
                winMessage.textContent = `${currentPlayer.name} has won the game`;
                _workaround = true;
            }
            else {
                winCounter = 0;
            }
        })
        console.log(`function ran for ${currentPlayer.name}`);
        return _workaround;
    }
    return {checkWin};

})();

const gamelogic = (() => {
    const gridSquares = document.querySelectorAll('.gameboardContainer > div');
    let currentPlayer = jony;
    let _nextPlayer = jeny;
    let _playerSwap = '';
    let _turnCounter = 0;

    const resetButton = document.querySelector('.resetButton');
    const resetGame = () => {
        Gameboard.gameboard = new Array(9);
        gridSquares.forEach((square) => {
            square.textContent = '';
            square.style.pointerEvents = 'auto';
        })
        _turnCounter = 0;
        _playerSwap = '';
        _nextPlayer = jeny;
        currentPlayer = jony;

    }

    resetButton.addEventListener('click', resetGame);
    
    
    const gameStart = () => {
        gridSquares.forEach((square, index) => {
            square.addEventListener('click', () => {
                    square.textContent = currentPlayer.mark;
                    currentPlayer.placeMark(index);

                    _turnCounter++;
                    if (win.checkWin(currentPlayer)) {
                        console.log('GAME WAS WON. GAME IS OVER');
                        gridSquares.forEach((square) => {
                            square.style.pointerEvents = 'none';
                        })
                        
                    }
                    if (_turnCounter === 9) {
                        console.log('GAME IS OVER');
                        
                    }               
                    
                    _playerSwap = currentPlayer;
                    currentPlayer = _nextPlayer;
                    _nextPlayer = _playerSwap;
                    square.style.pointerEvents = 'none';                                
            })
        }) 
    }
    gameStart();
    return {currentPlayer, gameStart, resetGame, resetButton};
})();
