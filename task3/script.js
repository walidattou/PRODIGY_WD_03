const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

board.addEventListener('click', (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] === '' && !checkWin()) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
        } else if (gameState.every(cell => cell !== '')) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
});

resetButton.addEventListener('click', resetGame);

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    message.textContent = '';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}