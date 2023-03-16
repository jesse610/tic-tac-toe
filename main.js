"use strict";

const Gameboard = (() => {
    const board = ['', '', '',
                   '', '', '',
                   '', '', ''];
    
    const boardContainer = document.querySelector('.gameboard-container')

    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div')
        div.classList.add('boardpiece')
        boardContainer.appendChild(div)
        div.textContent = board[i]
        div.setAttribute('id', i)
    }

    const boardPieces = document.querySelectorAll('.boardpiece')

    return {
        board,
        boardPieces
    }

})();

const player = (letter, turn) => {
    return {letter}
}

const gameController = (() => {
    const player1 = player('x', false)
    const player2 = player('o', false)
    let turnCount = 1;

    Gameboard.boardPieces.forEach(square => {
        square.addEventListener('click', function() {

            if (square.textContent === '' && gameController.turnCount % 2 === 1 && player1.isWinner === undefined) {
                gameController.turnCount++
                Gameboard.board.forEach((el, index) => {
                    if (Number(square.id) === index) {
                        Gameboard.board[index] = player1.letter
                        square.textContent = player1.letter
                        console.log('Sucess!')
                        checkWinner.updatePossibilties(Gameboard.board)
                    }
                })
            } else if (square.textContent === '' && gameController.turnCount % 2 === 0 && player2.isWinner === undefined) {
                gameController.turnCount++
                Gameboard.board.forEach((el, index) => {
                    if (Number(square.id) === index) {
                        Gameboard.board[index] = player2.letter
                        square.textContent = player2.letter
                        console.log('Sucess!')
                        checkWinner.updatePossibilties(Gameboard.board)
                    }
                })
            }
        })
    })
    return {
        player1,
        player2,
        turnCount
    }
})()

const checkWinner = (() => {
    let win = ''
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

    const updatePossibilties = (arr) => {
        arr.forEach((spaceEl, index) => {
            if(spaceEl != "") {
                for (let i = 0; i < possibilities.length; i++) {
                    for (let j = 0; j < 3; j++)
                        if (index === possibilities[i][j]) {
                            possibilities[i][j] = spaceEl
                        }
                }
            }
        })
        winner(possibilities)
    }

    const winner = (arr) => {
        for (let i = 0; i < possibilities.length; i++) { 
            if (arr[i].join('') === 'xxx') {
                gameController.player2.isWinner = false
                gameController.player1.isWinner = true
                displayWinner.updateWinnerDisplay(gameController.player1)
            } else if (arr[i].join('') === 'ooo') {
                gameController.player2.isWinner = true
                gameController.player1.isWinner = false
                displayWinner.updateWinnerDisplay(gameController.player2)
            }
        }

        // if (gameController.turnCount === 10 && gameController.player1.isWinner === undefined && gameController.player2.isWinner === undefined) {
        //     console.log('Tie!')
        // }
    }
    return {
        winner,
        updatePossibilties
    }
})()

const displayWinner = (() => {
    const mainContainer = document.querySelector('main')
    const gameboard = document.querySelector('.gameboard-container')
    const div = document.createElement('div')
    div.classList.add('winner')
    mainContainer.insertBefore(div, gameboard)

    const updateWinnerDisplay = (player) => {
        if (player.isWinner === true && player.letter === 'x') {
            div.textContent = "Player 1 wins!"
        } else if (player.isWinner === true && player.letter === 'o') {
            div.textContent = "Player 2 wins!"
        }
    }

    return {
        updateWinnerDisplay
    }

})()

