const cells = document.querySelectorAll(".cell");
const statusTxt = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let current = "X";
let board = Array(9).fill("");
let gameOver = false;

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    const idx = this.dataset.index;

    if (board[idx] !== "" || gameOver) return;

    board[idx] = current;
    this.textContent = current;
    this.style.color = current === "X" ? "#00eaff" : "#facc15";

    if (checkWinner()) {
        statusTxt.textContent = `${current} Wins!`;
        highlightWinner(checkWinner());
        gameOver = true;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusTxt.textContent = "Draw!";
        gameOver = true;
        return;
    }

    current = current === "X" ? "O" : "X";
    statusTxt.textContent = `Turn: ${current}`;
}

function checkWinner() {
    for (let combo of winConditions) {
        if (
            board[combo[0]] === current &&
            board[combo[1]] === current &&
            board[combo[2]] === current
        ) {
            return combo;
        }
    }
    return null;
}

function highlightWinner(combo) {
    combo.forEach(i => cells[i].classList.add("win"));
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    board.fill("");
    current = "X";
    gameOver = false;
    statusTxt.textContent = "Turn: X";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
}
