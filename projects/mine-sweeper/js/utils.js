'use strict'


function createBoard(boardSize){

    var board = []
    for (var i = 0; i < boardSize; i++) {
        board[i] = []
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = createCell(i, j)
        }
    }

    board = implementMines(boardSize, board)

    return board
}

function createCell(i, j){
    
    return {
        isShown: false,
        isMarked: false,
        isMine: false,
        minesNegsCount: 0,
        i: i,
        j: j,
    }

}

function clearGame(){

    gGame.markedCount = 0
    gGame.showCount = 0
    gSecondsTimer = 0
    gminutesCounter = 0
    gLevel.minez = 0
    gGame.lives = 3
    gGame.minezClicked = 0

    clearInterval(gTimerInterval)

    var elCounter = document.querySelector('.seconds-counter')
    elCounter.innerText = gminutesCounter + ':' + gSecondsTimer

    var elSmily = document.querySelector('.restart')
    elSmily.classList.remove('hidden')
    elSmily.innerText = '😃'

    var elWin = document.querySelector('h3')
    elWin.innerText = ''

    var elWin = document.querySelector('h4')
    elWin.innerText = gGame.lives + ' lives left'
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

