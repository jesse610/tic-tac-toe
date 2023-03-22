"use strict";

const gameBoard = (() => {
    const board = ['', '', '',
                   '', '', '',
                   '', '', ''];

    return {
        board,
    }

})();

const player = (name = 'player 1', letter, turn) => {
    return {name, letter, turn}
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
    const gametypeContainer = document.querySelector('.gametype')
    const formContainer = document.querySelector('.form-container')
    const playervsplayerBtn = document.querySelector('#playervsplayer-btn')
    const playervsbotBtn = document.querySelector('#playervsbot-btn')
    const mainContainer = document.querySelector('main')
    const boardContainer = document.querySelector('.gameboard-container')
    const btn = document.createElement('button')

    const gameType = (() => {
        playervsplayerBtn.addEventListener('click', function() {
            formContainer.classList.remove('hidden')
            gametypeContainer.classList.add('hidden')
        })
    })()

    const makeBoard = () => {
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div')
            div.classList.add('boardpiece')
            boardContainer.appendChild(div)
            div.textContent = gameBoard.board[i]
            div.setAttribute('id', i)
        }
    }

    const updateBoard = () => {
        boardPieces.forEach((square, index) => square.textContent = gameBoard.board[index])
    }

    const displayWinner = () => {
        const div = document.createElement('div')
        div.classList.add('winner')
        mainContainer.insertBefore(div, boardContainer)
        const divWinner = document.querySelector('.winner')

        if (gameController.player1.isWinner === true) {
            divWinner.textContent = `${gameController.player1.name} wins!`
            playAgain()
        } else if (gameController.player2.isWinner === true) {
            divWinner.textContent = `${gameController.player2.name} wins!`
            playAgain()
        } else if (gameController.player1.isWinner === false && gameController.player2.isWinner === false) {
            divWinner.textContent = "Tie!"
            playAgain()
        }
    }

    const playAgain = () => {
        const btnDiv = document.createElement('div')
        btnDiv.classList.add('btn-container')
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

    makeBoard()
    const boardPieces = document.querySelectorAll('.boardpiece')

    return {
        boardContainer,
        boardPieces,
        gameType,
        updateBoard,
        displayWinner,
        makeBoard,
    }
})()

const gameController = (() => {
    const playervsplayerBtn = document.querySelector('#playervsplayer-btn')
    const playervsbotBtn = document.querySelector('#playervsbot-btn')
    const gametypeContainer = document.querySelector('.gametype')
    const formContainer = document.querySelector('.form-container')
    const form = document.querySelector('form')

    const player1 = player('', 'x', true)
    const player2 = player('', 'o', false)

    const hide = () => {
        formContainer.classList.remove('hidden')
        gametypeContainer.classList.add('hidden')
    }

    const gameType = (() => {
        playervsplayerBtn.addEventListener('click', function() {
            hide()
            playervsPlayer()
        })

        playervsbotBtn.addEventListener('click', function() {
            player1.name = 'Player 1'
            player2.name = 'bot'
            gametypeContainer.classList.add('hidden')
            document.querySelector('.gameboard-container').classList.remove('hidden')
            playerVsBot()
            })
        })()

    const formAction = (() => {
        form.addEventListener('submit', function(e) {
            e.preventDefault()
            player1.name = document.querySelector('#player1').value
            player2.name = document.querySelector('#player2').value
            console.log(player1, player2)
            formContainer.classList.add('hidden')
            document.querySelector('.gameboard-container').classList.remove('hidden')
        })
    })()

    const switchTurns = () => {
        if (player1.turn === true) {
            player2.turn = true
            player1.turn = false
        } else if (player1.turn === false) {
            player2.turn = false
            player1.turn = true
        }
    }

    const playervsPlayer = () => {
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
    }

    const filterBoard = (arr) => {
       const board = arr.filter(el => el === '')
    }   


    const playerVsBot = () => {
        player2.isBot = true

        const botsTurn = () => {

            const chooseSpot = (() => {
                let randomNum = Math.floor(Math.random() * 9)

                const getNewNum = () => {
                    chooseSpot.randomNum = Math.floor(Math.random() * 9)
                    return chooseSpot.randomNum
                }

                return {randomNum,
                        getNewNum}
            })()

            if (gameController.player1.isWinner === undefined && gameController.player2.isWinner === undefined) {
                while (player2.turn === true) {
        
                    if (gameBoard.board[chooseSpot.randomNum] === '') {
                        gameBoard.board[chooseSpot.randomNum] = player2.letter
                        displayController.updateBoard()
                        winner.checkWin()
                        switchTurns()
                    } else {
                        chooseSpot.getNewNum()
                    }
                }
            }
        }

        if (player1.turn === true) {
            displayController.boardPieces.forEach((square, index) => {
                square.addEventListener('click', function() {
                    if(square.textContent === '' && Number(square.id) === index && gameController.player1.isWinner === undefined && gameController.player2.isWinner === undefined) {
                        gameBoard.board[index] = player1.letter
                        displayController.updateBoard()
                        switchTurns()
                        counter.countTurn()
                        winner.checkWin()
                        botsTurn()
                    }
                })
            })
        } 
    }

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
        restartGame,
        switchTurns,
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

