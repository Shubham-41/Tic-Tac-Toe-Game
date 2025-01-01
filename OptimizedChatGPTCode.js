// Required Elements
const Game_status = document.getElementById("game-status");
const RestartBtn = document.getElementById("reset-button");
const board = document.getElementById("board");
const GameUpdate = document.getElementById("Game-Update");

// Variables
let turn = 0; // Even Turn indicates X's Turn, otherwise O's Turn
let result = false; // To track game outcome

// Function to check win condition (row, column, diagonal)
function checkWin(cellArray, targetCell) {
  const index = Array.from(cellArray).indexOf(targetCell);
  const value = targetCell.textContent;

  // Check row, column, and diagonal conditions
  const winPatterns = [
    // Row check (0, 1, 2), (3, 4, 5), (6, 7, 8)
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
    // Column check (0, 3, 6), (1, 4, 7), (2, 5, 8)
    [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ],
    // Diagonal check (0, 4, 8), (2, 4, 6)
    [
      [0, 4, 8],
      [2, 4, 6],
    ],
  ];

  // Check each pattern
  for (let pattern of winPatterns) {
    if (
      pattern.some((indices) =>
        indices.every((i) => cellArray[i].textContent === value)
      )
    ) {
      result = true;
      Game_status.innerHTML = `<h3>${value} Wins</h3>`;
      return;
    }
  }

  // Check if game is a draw
  if (Array.from(cellArray).every((cell) => cell.textContent !== "")) {
    Game_status.innerHTML = `<h3>Game Drawn</h3>`;
    result = true;
  }
}

// Function to start the game
function startGame(e) {
  if (
    e.target.classList.contains("cell") &&
    !e.target.classList.contains("taken") &&
    !result
  ) {
    const player = turn % 2 === 0 ? "X" : "O";
    e.target.textContent = player;
    e.target.classList.add("taken", `${player.toLowerCase()}-turn`);
    Game_status.textContent = `${
      player === "X" ? "Player O" : "Player X"
    }'s Turn`;

    turn++;
    checkWin(document.querySelectorAll(".cell[data-cell]"), e.target);
  }
}

// Function to reset the game
function resetGame() {
  turn = 0;
  result = false;
  Game_status.textContent = `Player X's Turn`;
  const cells = document.querySelectorAll(".cell[data-cell]");

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken", "x-turn", "o-turn");
  });

  GameUpdate.textContent = "Start Game";
  board.addEventListener("click", startGame); // Re-attach the event listener
}

// Event listeners
board.addEventListener("click", startGame);
RestartBtn.addEventListener("click", resetGame);
