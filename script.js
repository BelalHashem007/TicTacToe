function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++)
      board[i].push(Cell());
  }

  const getBoard = () => board;

  const printBoard = () => {
    const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithValues)
  }

  const updateCell = function (row, column, playerValue) {
    let successfulUpdate = false;
    const availableCells = board.filter((row) => row[column].getValue() === "");

    if (!availableCells.length) return;

    if (!(board[row][column].getValue() === "O" || board[row][column].getValue() === "X")) {
      board[row][column].updateValue(playerValue);
      successfulUpdate = true;
      return successfulUpdate;
    }
    else {
      console.log("Error u can`t update used cell.")
      return successfulUpdate;
    }
  }

  const clearBoard = function () {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++)
        board[i][j].updateValue("");
    }
  }

  return { getBoard, printBoard, updateCell, clearBoard };
}
// --------------------------------------------------

function Cell() {
  let value = "";

  const updateValue = function (playerValue) {
    value = playerValue;
  }

  const getValue = function () {
    return value;
  }

  return { updateValue, getValue };
}

// --------------------------------------------------

function GameController(player1 = "Player One", player2 = "Player Two") {
  const playerOneName = player1;
  const playerTwoName = player2;
  const board = GameBoard();
  const playerTurnDiv = document.querySelector('.turn');
  let winnerDetected = false;

  const players = [
    {
      name: playerOneName,
      value: "X"
    },
    {
      name: playerTwoName,
      value: "O"
    }
  ]

  let activePlayer = players[0];
  const resetTurns = function () {
    activePlayer = players[0]
  }
  const switchTurns = function () {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const determineWinner = function () {
    
    //-------------------------Row
    if (board.getBoard()[0][0].getValue() === board.getBoard()[0][1].getValue() && board.getBoard()[0][1].getValue() === board.getBoard()[0][2].getValue() && board.getBoard()[0][0].getValue() !== "") {
      winnerDetected = true;
    }
    if (board.getBoard()[1][0].getValue() === board.getBoard()[1][1].getValue() && board.getBoard()[1][1].getValue() === board.getBoard()[1][2].getValue() && board.getBoard()[1][0].getValue() !== "") {
      winnerDetected = true;
    }
    if (board.getBoard()[2][0].getValue() === board.getBoard()[2][1].getValue() && board.getBoard()[2][1].getValue() === board.getBoard()[2][2].getValue() && board.getBoard()[2][0].getValue() !== "") {
      winnerDetected = true;
    }
    //---------------------------Column
    if (board.getBoard()[0][0].getValue() === board.getBoard()[1][0].getValue() && board.getBoard()[1][0].getValue() === board.getBoard()[2][0].getValue() && board.getBoard()[0][0].getValue() !== "") {
      winnerDetected = true;
    }
    if (board.getBoard()[0][1].getValue() === board.getBoard()[1][1].getValue() && board.getBoard()[1][1].getValue() === board.getBoard()[2][1].getValue() && board.getBoard()[0][1].getValue() !== "") {
      winnerDetected = true;
    }
    if (board.getBoard()[0][2].getValue() === board.getBoard()[1][2].getValue() && board.getBoard()[1][2].getValue() === board.getBoard()[2][2].getValue() && board.getBoard()[0][2].getValue() !== "") {
      winnerDetected = true;
    }
    //---------------------------diagonal
    if (board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue() && board.getBoard()[1][1].getValue() === board.getBoard()[2][2].getValue() && board.getBoard()[0][0].getValue() !== "") {
      winnerDetected = true;
    }
    if (board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue() && board.getBoard()[1][1].getValue() === board.getBoard()[2][0].getValue() && board.getBoard()[0][2].getValue() !== "") {
      winnerDetected = true;
    }
    return winnerDetected;
  }
  const updateWinnerDetection = function (boolean){
    winnerDetected = boolean;
  }

  const playRound = function (row, column) {
    if (determineWinner() === true) {
      return;
    } else {
      if (board.updateCell(row, column, getActivePlayer().value) === false)
        return;
      if(determineWinner() === true)
        return;
      switchTurns();
      printNewRound();
    }
  }
  printNewRound();

  return { playRound, getActivePlayer, getBoard: board.getBoard, determineWinner, clearBoard: board.clearBoard , updateWinnerDetection , resetTurns}
}
// --------------------------------------------------
function ScreenController() {

  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.game');
  const resetBoard = () => game.clearBoard();
  const resetDiv = document.querySelector('.reset');

  const updateScreen = function () {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    if (game.determineWinner() === false){
      playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
      playerTurnDiv.setAttribute('style',"background: white; color: black;")
    }
    else {
      playerTurnDiv.textContent = `${activePlayer.name} won!`;
      playerTurnDiv.setAttribute('style',"background: green; color: white;")
    }

    board.forEach((cellRow, rowIndex) => {
      cellRow.forEach((cell, columnIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.textContent = cell.getValue();
        cellDiv.dataset.column = columnIndex;
        cellDiv.dataset.row = rowIndex;
        boardDiv.appendChild(cellDiv);
      })
    })
  }
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    if (!(selectedColumn && selectedRow)) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);
  resetDiv.addEventListener("click", ()=> {
    resetBoard(); 
    game.updateWinnerDetection(false);
    game.resetTurns();
    updateScreen();
  });
  updateScreen();
}
ScreenController();
