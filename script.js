//==================================================================================
// 1. Store gameboard as an array inside of a Gameboard object
// 2. Players will be objects
// - Try to have as little global code as possible
// - Try putting everything inside module or factory

//==================================================================================
// Game Logic
const gameboardContainer = document.querySelector('.gameboardContainer');

const Gameboard = (() => {
    const gameboard = ['','','','','','','','','']
    const createBoard = (gameboard) => {
        for (let i=0; i< gameboard.length; i++){
            let div = document.createElement('div');
            div.classList.add('gridSquare',`${i}`);
            gameboardContainer.appendChild(div);
        }
    }
    return {gameboard, createBoard};
})();

const Gameflow = (() => {

})();

const Player = () => {
    const sign = 'X';
    return {sign};
}


Gameboard.createBoard(Gameboard.gameboard);
const playerOne = Player();

let gridSquares = gameboardContainer.querySelectorAll('.gameboardContainer > div');

let arrayPosition = 0;
gridSquares.forEach(square => {
    square.addEventListener('click', function(){
        square.textContent = playerOne.sign;
        Gameboard.gameboard[arrayPosition] = playerOne.sign;
        arrayPosition++;
    })
})

const winningMoves = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
]