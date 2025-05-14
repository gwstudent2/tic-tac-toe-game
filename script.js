document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const gameStatus = document.getElementById('game-status');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];

    function initializeGame() {
        gameBoard.innerHTML = '';
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleMove);
            gameBoard.appendChild(cell);
        }
    }

    function handleMove(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (board[index] === '') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                gameStatus.textContent = `Player ${currentPlayer} wins!`;
            } else if (board.every(cell => cell !== '')) {
                gameStatus.textContent = 'It\'s a draw!';
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                gameStatus.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        initializeGame();
    }

    resetButton.addEventListener('click', resetGame);

    initializeGame();
});
