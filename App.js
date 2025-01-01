// 01 01 2025

// Required Elements

const Game_status = document.getElementById("game-status");

const RestartBtn = document.getElementById("reset-button");

const board = document.getElementById("board");

const GameUpdate = document.getElementById("Game-Update");

let Result = false;

// Variables Declaration

let Turn = 0; // Even Turn Indicates its X's Turn Otherwise its O's Turn

// Functions

// Function to Highlight Winning Row | Column | Diagonal
function HighlightWinner(Cells) {
  Cells.forEach((cell) => {
    cell.classList.add("winner");
  });
}

function CheckWinInRow(CellIndex, cellArray, targetCell) {
  if (CellIndex === 0 || CellIndex === 3 || CellIndex === 6) {
    if (
      targetCell.textContent === cellArray[CellIndex + 1].textContent &&
      targetCell.textContent === cellArray[CellIndex + 2].textContent
    ) {
      Result = true;
      Game_status.innerHTML = `<h3>${targetCell.textContent} Wins</h3>`;
      HighlightWinner([
        cellArray[CellIndex],
        cellArray[CellIndex + 1],
        cellArray[CellIndex + 2],
      ]);
    }
  }

  if (CellIndex === 1 || CellIndex === 4 || CellIndex === 7) {
    if (
      targetCell.textContent === cellArray[CellIndex - 1].textContent &&
      targetCell.textContent === cellArray[CellIndex + 1].textContent
    ) {
      Result = true;
      Game_status.innerHTML = `<h3>${targetCell.textContent} Wins</h3>`;
      HighlightWinner([
        cellArray[CellIndex],
        cellArray[CellIndex + 1],
        cellArray[CellIndex - 1],
      ]);
    }
  }

  if (CellIndex === 2 || CellIndex === 5 || CellIndex === 8) {
    if (
      targetCell.textContent === cellArray[CellIndex - 1].textContent &&
      targetCell.textContent === cellArray[CellIndex - 2].textContent
    ) {
      Result = true;
      Game_status.innerHTML = `<h3>${targetCell.textContent} Wins</h3>`;
      HighlightWinner([
        cellArray[CellIndex],
        cellArray[CellIndex - 1],
        cellArray[CellIndex - 2],
      ]);
    }
  }

  return;
}

function CheckWinInColumn(CellIndex, cellArray, targetCell) {
  if (CellIndex === 0 || CellIndex === 1 || CellIndex === 2) {
    if (
      targetCell.textContent === cellArray[CellIndex + 3].textContent &&
      targetCell.textContent === cellArray[CellIndex + 6].textContent
    ) {
      Result = true;
      Game_status.innerHTML = `<h3>${targetCell.textContent} Wins</h3>`;
      HighlightWinner([
        cellArray[CellIndex],
        cellArray[CellIndex + 3],
        cellArray[CellIndex + 6],
      ]);
    }
  }

  if (CellIndex === 3 || CellIndex === 4 || CellIndex === 5) {
    if (
      targetCell.textContent === cellArray[CellIndex - 3].textContent &&
      targetCell.textContent === cellArray[CellIndex + 3].textContent
    ) {
      Result = true;
      Game_status.innerHTML = `<h3>${targetCell.textContent} Wins</h3>`;
      HighlightWinner([
        cellArray[CellIndex],
        cellArray[CellIndex - 3],
        cellArray[CellIndex + 3],
      ]);
    }
  }

  if (CellIndex === 6 || CellIndex === 7 || CellIndex === 8) {
    if (
      targetCell.textContent === cellArray[CellIndex - 3].textContent &&
      targetCell.textContent === cellArray[CellIndex - 6].textContent
    ) {
      Result = true;
      Game_status.innerHTML = `<h3>${targetCell.textContent} Wins</h3>`;
      HighlightWinner([
        cellArray[CellIndex],
        cellArray[CellIndex - 3],
        cellArray[CellIndex - 6],
      ]);
    }
  }

  return;
}

function CheckWinInDiagonal(CellIndex, cellArray, targetCell) {
  if (
    targetCell.textContent === cellArray[0].textContent &&
    targetCell.textContent === cellArray[4].textContent &&
    targetCell.textContent === cellArray[8].textContent
  ) {
    Result = true;
    Game_status.innerHTML = `<h3>${targetCell.textContent} Wins</h3>`;
    HighlightWinner([cellArray[0], cellArray[4], cellArray[8]]);
  }

  if (
    targetCell.textContent === cellArray[2].textContent &&
    targetCell.textContent === cellArray[4].textContent &&
    targetCell.textContent === cellArray[6].textContent
  ) {
    Result = true;
    Game_status.innerHTML = `<h3>${targetCell.textContent} Wins</h3>`;
    HighlightWinner([cellArray[2], cellArray[4], cellArray[6]]);
  }

  return;
}

function CheckWin(targetCell) {
  const CellIndex = getCellIndex(targetCell);
  const Cells = document.querySelectorAll(".cell[data-cell");
  const cellArray = Array.from(Cells);

  // Reset the Result each time CheckWin is called
  if (Result === true) return;

  // Check in Row
  if (Result === false) {
    CheckWinInRow(CellIndex, cellArray, targetCell);
  }

  // Check in Column
  if (Result === false) {
    CheckWinInColumn(CellIndex, cellArray, targetCell);
  }

  // Check in Diagonal
  if (Result === false) {
    CheckWinInDiagonal(CellIndex, cellArray, targetCell);
  }

  // Check if the Game is Draw
  if (Result === false) {
    CheckDraw();
  }

  // Stop The Game
  if (Result === true) {
    StopGame();
  }
}

// Function to Start Game
function StartGame(e) {
  if (e.target.className === "cell") {
    // console.log("Correct");
    // console.log(e.target);

    GameUpdate.textContent = "";

    if (Turn % 2 === 0) {
      e.target.textContent = "X";
      e.target.classList.add("x-turn");
      //   console.log("X Turn", Turn);
      console.log(e.target);
      Game_status.textContent = `Player O's Turn`;
    } else {
      e.target.textContent = "O";
      e.target.classList.add("o-turn");
      console.log(e.target);
      //   console.log("O Turn", Turn);
      Game_status.textContent = `Player X's Turn`;
    }
    e.target.classList.add("taken");
    Turn++;
    CheckWin(e.target);
  }
}

// Function To Stop Game
function StopGame() {
  board.removeEventListener("click", StartGame);
}

// Function to Restart Game
function RestartGame() {
  Result = false;
  Turn = 0;
  Game_status.textContent = `Player X's Turn`;
  const Cells = document.querySelectorAll(".cell[data-cell]");
  Cells.forEach((cell) => {
    // cell.textContent = "";
    cell.innerHTML = "";
    // console.log("Cell Cleared");
    // console.log(cell.onclick); // If null, the listener is removed
    cell.classList.remove("taken"); // Resetting taken class
    cell.classList.remove("x-turn"); // Resetting x-turn class
    cell.classList.remove("o-turn"); // Resetting o-turn class
    cell.classList.remove("winner"); // Remove highlight (winner) class
  });
  GameUpdate.textContent = "Start Game";

  // Add Event Listner to Board
  board.addEventListener("click", StartGame);
}

// Function to Check Whether the Game is Draw or not
function CheckDraw() {
  const Cells = document.querySelectorAll(".cell[data-cell]");
  const CellArray = Array.from(Cells);
  let GameDraw = true;

  //   GameDraw = CellArray.forEach((cell) => {
  //     if (cell.textContent === "") {
  //       console.log(cell.textContent);
  //       return true;
  //     }
  //   });

  for (let i = 0; i < CellArray.length; i++) {
    if (CellArray[i].textContent === "") {
      GameDraw = false;
      break;
    }
  }

  if (GameDraw === true) {
    Result = true;
    Game_status.innerHTML = `<h3>Game Drawn</h3>`;
  }
  return;
}

// Function getCellIndex
function getCellIndex(cell) {
  const Cells = document.querySelectorAll(".cell[data-cell");
  const cellArray = Array.from(Cells);
  return cellArray.indexOf(cell);

  // Logic :- Select all cells, convert into in an array find cell index and return that cell index
}

// Flow Of Execution

// board.addEventListener("click", function (e) {
//   if (e.target.className === "cell") {
//     // console.log("Correct");
//     // console.log(e.target);

//     GameUpdate.textContent = "";

//     if (Turn % 2 === 0) {
//       e.target.textContent = "X";
//       e.target.classList.add("x-turn");
//       //   console.log("X Turn", Turn);
//       console.log(e.target);
//       Game_status.textContent = `Player O's Turn`;
//     } else {
//       e.target.textContent = "O";
//       e.target.classList.add("o-turn");
//       console.log(e.target);
//       //   console.log("O Turn", Turn);
//       Game_status.textContent = `Player X's Turn`;
//     }
//     e.target.classList.add("taken");
//     Turn++;
//     CheckWin(e.target);
//   }
// });

board.addEventListener("click", StartGame);

// RestartBtn.addEventListener("click", function () {
//   RestartGame();
// });

RestartBtn.addEventListener("click", RestartGame);
