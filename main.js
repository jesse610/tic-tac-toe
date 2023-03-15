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

    // const eachPiece = () => {
    //     boardPieces.forEach(square => {
    //         square.addEventListener('click', function() {
    //             square.textContent = player2.letter
    //         })
    //     })
    // }

    return {
        board,
        boardPieces
    }

})();

const player = (letter, turn) => {
    return {letter}
}

const gameController = (() => {
    const player1 = player('x', true)
    const player2 = player('o', false)

    let playerTurn = true

    Gameboard.boardPieces.forEach(square => {
        square.addEventListener('click', function() {
            Gameboard.board.map((el, index) => {
                if (Number(square.id) === index) {
                    Gameboard.board[index] = player1.letter
                    square.textContent = player1.letter
                    console.log('Sucess!')
                }
            })
            // for (let i = 0; i < Gameboard.board.length; i++) {
            //     if (Number(square.id) === Gameboard.board.indexOf(i)) {
            //         Gameboard.board[i] = player1.letter
            //         console.log('Sucess!')
            //     }
            // }
        })
    })

})()

