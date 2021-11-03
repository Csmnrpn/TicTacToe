const Gameboard = (() => {
    const gameboard = new Array(9);
    const gameboardContainer = document.querySelector('.gameboardContainer');
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

const Player = (name,mark, color) => {
    const placeMark = (index) => {
            Gameboard.gameboard[index] = mark;        
    }
    return {placeMark, mark, name, color};
}

const playerOne = Player('JohnDoe', 'X', '#e63946');
const playerTwo = Player('JaneDoe', 'O', '#1d3557');

const win = (() => {
    let winCounter = 0;
    const winCondition = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    
    

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
    const winMessage = document.querySelector('.win_message');
    const gridSquares = document.querySelectorAll('.gameboardContainer > div');
    let currentPlayer = playerOne;
    let _nextPlayer = playerTwo;
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
        _nextPlayer = playerTwo;
        currentPlayer = playerOne;
        winMessage.textContent = '';
    }

    resetButton.addEventListener('click', resetGame);
    
    
    const gameStart = () => {
        gridSquares.forEach((square, index) => {
            square.addEventListener('click', () => {
                    square.textContent = currentPlayer.mark;
                    square.style.color = currentPlayer.color;
                    currentPlayer.placeMark(index);

                    _turnCounter++;
                    if (win.checkWin(currentPlayer)) {
                        console.log('GAME WAS WON. GAME IS OVER');
                        winMessage.textContent = `${currentPlayer.name} has won the game.`;
                        gridSquares.forEach((square) => {
                            square.style.pointerEvents = 'none';
                        })
                        
                    }
                    else if (_turnCounter === 9) {
                        console.log('GAME IS OVER');
                        winMessage.textContent = `The game is a draw.`;                        
                    }               
                    
                    _playerSwap = currentPlayer;
                    currentPlayer = _nextPlayer;
                    _nextPlayer = _playerSwap;
                    square.style.pointerEvents = 'none';                                
            })
        }) 
    }
    return {currentPlayer, gameStart, resetGame, resetButton};
})();

gamelogic.gameStart();

const mainContent = (() => {
    const playerNameOne = document.querySelector('.playerNameOne');
    const playerNameTwo = document.querySelector('.playerNameTwo');
    const startScreen = document.querySelector('.startScreen');
    const startButton = document.querySelector('.startButton');
    const nameOne = document.querySelector('#nameOne');
    const nameTwo = document.querySelector('#nameTwo');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        if (nameOne.value !== '') {
        playerOne.name = nameOne.value;
        playerNameOne.textContent = playerOne.name;
        }
        if(nameTwo.value !== '') {
        playerTwo.name = nameTwo.value;
        playerNameTwo.textContent = playerTwo.name;
        };
    })
})();