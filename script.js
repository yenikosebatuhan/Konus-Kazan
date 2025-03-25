class KonusKazan {
    constructor() {
        this.currentPlayer = 1;
        this.scores = {
            player1: 0,
            player2: 0
        };
        this.gameActive = false;
        this.boxes = [];
        this.initializeGame();
    }

    initializeGame() {
        this.createGrid();
        this.addEventListeners();
        this.updateScores();
    }

    createGrid() {
        const gameGrid = document.querySelector('.game-grid');
        gameGrid.innerHTML = '';
        
        for(let i = 0; i < 36; i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.dataset.index = i;
            gameGrid.appendChild(box);
            this.boxes.push(box);
        }
    }

    addEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('reset-game').addEventListener('click', () => this.resetGame());
        
        this.boxes.forEach(box => {
            box.addEventListener('click', () => this.handleBoxClick(box));
        });
    }

    startGame() {
        this.gameActive = true;
        document.getElementById('start-game').disabled = true;
    }

    resetGame() {
        this.gameActive = false;
        this.currentPlayer = 1;
        this.scores.player1 = 0;
        this.scores.player2 = 0;
        this.updateScores();
        this.boxes.forEach(box => {
            box.classList.remove('selected');
        });
        document.getElementById('start-game').disabled = false;
    }

    handleBoxClick(box) {
        if (!this.gameActive || box.classList.contains('selected')) return;

        box.classList.add('selected');
        this.updateScore();
        this.switchPlayer();
    }

    updateScore() {
        const currentPlayerKey = `player${this.currentPlayer}`;
        this.scores[currentPlayerKey]++;
        this.updateScores();
    }

    updateScores() {
        document.getElementById('player1-score').textContent = this.scores.player1;
        document.getElementById('player2-score').textContent = this.scores.player2;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
}

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    const game = new KonusKazan();
}); 