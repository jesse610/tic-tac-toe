"use strict";

const gameBoard = (() => {
    const board = ['', '', '',
                   '', '', '',
                   '', '', ''];

    return {
        board,
    }

})();

const player = (letter, turn) => {
    return {letter, turn}
}

const counter = (() => {
    let turnCount = 0;

    const countTurn = () => {
        counter.turnCount++
        return counter.turnCount
    }

    return {
        countTurn,
        turnCount
    }
})()

const displayController = (() => {
    const mainContainer = document.querySelector('main')
    const boardContainer = document.querySelector('.gameboard-container')
    const btn = document.createElement('button')

    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div')
        div.classList.add('boardpiece')
        boardContainer.appendChild(div)
        div.textContent = gameBoard.board[i]
        div.setAttribute('id', i)
    }

    const boardPieces = document.querySelectorAll('.boardpiece')

    const updateBoard = () => {
        boardPieces.forEach((square, index) => square.textContent = gameBoard.board[index])
    }

    const displayWinner = () => {
        const div = document.createElement('div')
        div.classList.add('winner')
        mainContainer.insertBefore(div, boardContainer)
        const divWinner = document.querySelector('.winner')

        if (gameController.player1.isWinner === true) {
            divWinner.textContent = "Player 1 wins!"
            playAgain()
        } else if (gameController.player2.isWinner === true) {
            divWinner.textContent = "Player 2 wins!"
            playAgain()
        } else if (gameController.player1.isWinner === false && gameController.player2.isWinner === false) {
            divWinner.textContent = "Tie!"
            playAgain()
        }
    }

    const playAgain = () => {
        const btnDiv = document.createElement('div')
        const divWinner = document.querySelector('.winner')
        btnDiv.appendChild(btn)
        btn.setAttribute('id', 'play-again-btn');
        mainContainer.appendChild(btnDiv)

        btn.textContent = 'PLAY AGAIN'

        btn.addEventListener('click', function() {
            gameController.restartGame()
            updateBoard()
            divWinner.remove()
            btnDiv.remove()
        })
    }

    return {
        boardContainer,
        boardPieces,
        updateBoard,
        displayWinner
    }
})()

const gameController = (() => {
    const player1 = player('x', true)
    const player2 = player('o', false)

    const switchTurns = () => {
        if (player1.turn === true) {
            player2.turn = true
            player1.turn = false
        } else if (player1.turn === false) {
            player2.turn = false
            player1.turn = true
        }
    }

    displayController.boardPieces.forEach((square, index) => {
        square.addEventListener('click', function() {
            if(square.textContent === '' && Number(square.id) === index && gameController.player1.isWinner === undefined && gameController.player2.isWinner === undefined) {
                if (player1.turn === true) {
                    gameBoard.board[index] = player1.letter
                } else if (player2.turn === true) {
                    gameBoard.board[index] = player2.letter
                }
                displayController.updateBoard()
                switchTurns()
                counter.countTurn()
                winner.checkWin()
            }
        })
    })

    const restartGame = () => {
        gameBoard.board = ['', '', '',
                           '', '', '',
                           '', '', ''];
            player1.isWinner = undefined;
            player1.turn = true;
            player2.isWinner = undefined;
            player2.turn = false;
            counter.turnCount = 0
    }
       
    return {
        player1,
        player2,
        restartGame
    }
})()

const winner = (() => {
    const possibilities = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ]

    const checkWin = () => {
        for (let i = 0; i < possibilities.length; i++) {
            for (let j = 0; j < 1; j++) {
                if (gameBoard.board[possibilities[i][j]] === 'x' && gameBoard.board[possibilities[i][j+1]] === 'x' && gameBoard.board[possibilities[i][j+2]] === 'x') {
                    return gameController.player1.isWinner = true, displayController.displayWinner()
                } else if (gameBoard.board[possibilities[i][j]] === 'o' && gameBoard.board[possibilities[i][j+1]] === 'o' && gameBoard.board[possibilities[i][j+2]] === 'o') {
                    return gameController.player2.isWinner = true, displayController.displayWinner()
                } 
            }
        }

        if (counter.turnCount === 9 && gameController.player1.isWinner === undefined && gameController.player2.isWinner === undefined) {
            return gameController.player1.isWinner = false, gameController.player2.isWinner = false, displayController.displayWinner()
        }
}

    return {
        checkWin
    }
})()

