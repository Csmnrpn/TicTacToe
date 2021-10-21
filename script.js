//==================================================================================
// 1. Store gameboard as an array inside of a Gameboard object
// 2. Players will be objects
// - Try to have as little global code as possible
// - Try putting everything inside module or factory

//==================================================================================
// Game Logic
const gameboardContainer = document.querySelector('.gameboardContainer');

const Gameboard = (() => {
    const gameboard = ['X','O','X','O','O','X','X','O','X'];
    const createBoard = (gameboard) => {
        for (let i=0; i< gameboard.length; i++){
            let div = document.createElement('div');
            div.textContent = `${gameboard[i]}`;
            div.classList.add('gridSquare');
            gameboardContainer.appendChild(div);
        }
    }
    return {gameboard, createBoard};
})();

const Gameflow = (() => {

})();

const Player = () => {

}

Gameboard.createBoard(Gameboard.gameboard);