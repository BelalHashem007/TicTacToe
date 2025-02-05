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

  const printBoardInConsole = () => {
    const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithValues)
  }

  const updateCell = function (row, column, playerValue) {
    const availableCells = board.filter((row) => row[column].getValue() === "");

    if (!availableCells.length) return;

    if (!(board[row][column].getValue() === "O" || board[row][column].getValue() === "X"))
      board[row][column].updateValue(playerValue);
    else
      console.log("Error u can`t update used cell.")
  }

  const clearBoard = function () {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++)
        board[i][j].updateValue("");
    }
  }

  return { getBoard, printBoardInConsole, updateCell, clearBoard };
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

  const switchTurns = function () {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoardInConsole();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const determineWinner = function () {
    let winnerDetected = false;
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
  const endGame = function () {
    console.log(`Game ends!!  Winner is :${getActivePlayer().name}`)
    board.printBoardInConsole();
    board.clearBoard();
    console.log("New Game!!");
    activePlayer = players[0];
  }

  const playRound = function (row, column) {
    console.log(` ${getActivePlayer().name} made ${getActivePlayer().value} in row: ${row} column: ${column}`);
    board.updateCell(row, column, getActivePlayer().value);
    if (determineWinner() === true) {
      endGame();
      printNewRound();
    } else {

      switchTurns();
      printNewRound();
    }
  }
  printNewRound();

  return { playRound, getActivePlayer, board, determineWinner }
}
// --------------------------------------------------
const game = GameController();
