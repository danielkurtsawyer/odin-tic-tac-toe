// The gameboard will be stored as an array inside of a Gameboard Object like so:
// index:       0   1   2 
//              3   4   5 
//              6   7   8

// since we only need one of these, we will use a module for the gameboard
const gameBoard = (() => {
    const board = [];
    const move = (symbol, index) => {
        if(!board[index]){
            board[index] = symbol;
        }
    };
    const getBoard = () => board;
    return {
        move, 
        getBoard,
    };
})();

// We will also want an object to control the flow of the game, which will also be a module
const displayController = (() => {
    let move = 1; 
    const displayBoard = () => {
        let num = 0;
        let board = gameBoard.getBoard();
        for(let i = 0; i < board.length; i++){
            const square = document.querySelector(`.square${num}`);
            if(board[i]){
                square.textContent = board[i];
            } else{
                square.textContent = '';
            }
            num++;
        };
    };
    const resetBoard = () => {

    }
    return{
        displayBoard, 
        resetBoard,
    }
})();

// finally, we will want to create player objects. Since there is more than one player, this will be a factory 
const Player = (name) => {
    const getName = () => name; 
}