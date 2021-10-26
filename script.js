/*
Game contains:

- 1 Gameboard (module)
- 2 or more Players (objects)
- 1 Object that has the logic of the game

Thing in the game:
- Ability of players to mark board
- Function that checks for win condition

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


const win = ((currentPlayer) => {
    let winCounter = 0;
    const winCondition = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    const winMessage = document.querySelector('.win_message');

    const checkWin = (currentPlayer) => {    
        winCondition.forEach(condition => {
            condition.forEach(index => {
                if(Gameboard.gameboard[index] === currentPlayer.mark) {
                    winCounter ++;
                }
            })
            if(winCounter === 3) {
                winCounter = 0;
                winMessage.textContent = `${currentPlayer.name} has won the game`;
            }
            else {
                winCounter = 0;
            }
        })
        console.log(`function ran for ${currentPlayer.name}`);
    }
    return {checkWin};

})();

const gamelogic = (() => {
    let currentPlayer = jony;
    let nextPlayer = jeny;
    let playerSwap = '';
    let turnCounter = 0;

    const isLegalMove = (index) => {
        if (Gameboard.gameboard[index] !== undefined) {
            return false;
        }
        else return true;
    }

    const gridSquares = document.querySelectorAll('.gameboardContainer > div');
    gridSquares.forEach((square, index) => {
        square.addEventListener('click', () => {
            if (isLegalMove(index)) {
                square.textContent = currentPlayer.mark;
                currentPlayer.placeMark(index);

                turnCounter++;
                if (turnCounter >= 5) {
                    win.checkWin(currentPlayer);
                }
                
                playerSwap = currentPlayer;
                currentPlayer = nextPlayer;
                nextPlayer = playerSwap;
            }
            else {
                console.log('Move is not legal');
            }
        })
    }) 
    return {currentPlayer};
})();
