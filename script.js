// The gameboard will be stored as an array inside of a Gameboard Object like so:
// index:       0   1   2 
//              3   4   5 
//              6   7   8

// since we only need one of these, we will use a module for the gameboard
const gameBoard = (() => {
    let board = [];
    const move = (symbol, index) => {
        if(!board[index]){
            board[index] = symbol;
        }
    };
    const isFull = () => {
        for(let i = 0; i < 9; i++){
            if(!board[i]){
                return false;
            }
        }
        return true;
    };
    const getBoard = () => board;
    const clearBoard = () => board = [];
    return {
        move, 
        isFull,
        getBoard,
        clearBoard,
    };
})();

// We will also want an object to control the flow of the game, which will also be a module
const displayController = (() => {
    let move = 1;
    let gameOver = true;
    let player1;
    let player2;
    const displayBoard = () => {
        const board = gameBoard.getBoard();
        for(let i = 0; i < 9; i++){
            const square = document.querySelector(`.square${i}`);
            if(board[i]){
                square.textContent = board[i];
            } else{
                square.textContent = '';
            }
        };
    };
    const displaySquare = (index) => {
        // to save time complexity, when adding a mark it calls this function instead so it doesn't have to loop through the whole array
        const board = gameBoard.getBoard();
        const square = document.querySelector(`.square${index}`);
        square.textContent = board[index];
    };
    const startGame = () => {
        reset();
        const player1name = prompt("Player 1 Name: ");
        const player2name = prompt("Player 2 Name: ");
        player1 = Player(player1name ? player1name : "Player 1");
        player2 = Player(player2name ? player2name : "Player 2");
        addPlayerNamesToDisplay(player1, player2);
    };
    const reset = () => {
        move = 1;
        gameOver = false;
        gameBoard.clearBoard();
        displayBoard();
    };
    const addPlayerNamesToDisplay = (player1, player2) => {
        const player1Div = document.querySelector(".player1");
        const player2Div = document.querySelector(".player2");
        player1Div.textContent = player1.getName().concat(": X");
        player2Div.textContent = player2.getName().concat(": O");
        const messageBox = document.querySelector(".message");
        messageBox.textContent = player1.getName().concat("'s turn");
    };
    const updateMessage = (symbol) => {
        const messageBox = document.querySelector(".message");
        messageBox.textContent = symbol === "X" ? player2.getName().concat("'s turn") : player1.getName().concat("'s turn");
    }
    const squareIsEmpty = (index) => !gameBoard.getBoard()[index];
    const checkBoard = () => {
        // if there is a winner, this function will return the winning symbol ("X" or "O")
        // in the event of a tie, this function will return "tie"
        // if the game is not yet over, this function will return null
        const board = gameBoard.getBoard();
        // check for three in a row - IMPORTANT TO MAKE SURE THAT THE ARRAY INDEX IS NOT EMPTY before checking equality
        //      otherwise, three empty consecutive spaces could return null early and miss later checks that are filled
        // check rows
        if(board[0] && board[0] === board[1] && board[1] === board[2]){
            return board[0];
        } else if(board[3] && board[3] === board[4] && board[4] === board[5]){
            return board[3];
        } else if(board[6] && board[6] === board[7] && board[7] === board[8]){
            return board[6];
        }
        // check columns
        if(board[0] && board[0] === board[3] && board[3] === board[6]){
            return board[0];
        } else if(board[1] && board[1] === board[4] && board[4] === board[7]){
            return board[1];
        } else if(board[2] && board[2] === board[5] && board[5] === board[8]){
            return board[2];
        }
        // check diagonals
        if(board[0] && board[0] === board[4] && board[4] === board[8]){
            return board[0];
        } else if(board[2] && board[2] === board[4] && board[4] === board[6]){
            return board[2];
        }
        // check for a tie
        if(gameBoard.isFull()){
            return 'tie';
        } else{
            return null;
        }
    };
    const endGame = (outcome) => {
        const messageBox = document.querySelector(".message");
        if(outcome === 'tie'){
            messageBox.textContent = "Tie game!";
        } else if(outcome === "X"){
            messageBox.textContent = player1.getName().concat(" Wins!");
        } else if(outcome === "O"){
           messageBox.textContent = player2.getName().concat(" Wins!");
        }
        gameOver = true;
    };
    const addMark = (e) => {
        if(gameOver){
            alert("Please start a new game");
        } else{
            // extract the index from the class name
            const index = e.target.classList.value.slice(-1);
            // squareIsEmpty returns TRUE if the square is empty
            if(squareIsEmpty(index)){
                const symbol = move % 2 === 0 ? "O" : "X";
                gameBoard.move(symbol, index);
                displaySquare(index);
                move++;
                // if checkBoard returns anything besides null, then that means the game is over
                if(checkBoard()){
                    endGame(checkBoard());
                } else{
                    updateMessage(symbol);
                }
            } else {
                alert("Square taken. Please try another move.");
            }
        }
    };
    return{
        startGame, 
        addMark,
    }
})();

// finally, we will want to create player objects. Since there is more than one player, this will be a factory 
const Player = (name) => {
    const getName = () => name; 
    return {getName}
}

const squares = document.querySelectorAll(".board div");
squares.forEach((square) => {
    square.addEventListener("click", displayController.addMark);
})

const newGameButton = document.querySelector("button");
newGameButton.addEventListener("click", displayController.startGame);

