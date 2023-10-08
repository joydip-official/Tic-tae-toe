const board = document.getElementById("board");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart-button");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupRestartButton = document.getElementById("popup-restart-button");
const cells = [];

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function checkDraw() {
    return gameBoard.every(cell => cell !== "");
}

function endGame(message) {
    status.style.display = "none";
    popup.style.display = "flex";
    popupMessage.textContent = message;
}

function handleClick(index) {
    if (gameBoard[index] === "" && !checkWin()) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].style.animation = "symbol-placement 0.3s ease-in-out";
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        const winner = checkWin();
        if (winner) {
            endGame(`Player ${winner} wins!`);
        } else if (checkDraw()) {
            endGame("It's a draw!");
        } else {
            status.textContent = `Player ${currentPlayer}'s turn`;
            status.style.color = "#fff";
        }

        cells[index].classList.add("active");
        cells[index].removeEventListener("click", () => handleClick(index));
    }
}

function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.animation = "";
        cell.addEventListener("click", () => {
            const index = cells.indexOf(cell);
            if (!cells[index].classList.contains("active")) {
                handleClick(index);
            }
        });
        cell.classList.remove("active");
    });
    status.textContent = "";
    status.style.color = "#fff";
    popup.style.display = "none";
}

for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
}

restartButton.addEventListener("click", restartGame);
popupRestartButton.addEventListener("click", restartGame);
