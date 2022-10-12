'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '@'
const CHERRY = '🍒'


var gFoodCounter = -1

var gBoard
var gGame = {
    score: 0,
    isOn: true
}


function init() {

    var elH3 = document.querySelector("h3")
    elH3.innerText = `Game Over`
    gFoodCounter = -1
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score

    console.log('hello')
    gGame.isOn = true
    toggleDisplay()

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')

}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
            else if (i === 1 && j === 1 || i === 1 && j === 8
                || i === 8 && j === 1 || i === 8 && j === 8) {
                board[i][j] = SUPER_FOOD

            }
            else {
                board[i][j] = FOOD
                gFoodCounter++
            }
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    toggleDisplay()

    clearInterval(gCherryInterval)

}

function toggleDisplay() {

    var elModal = document.querySelector(".modal")

    if (!gGame.isOn) elModal.style.display = "block"
    else elModal.style.display = "none"

}

function isPackmanWin() {

    if (gFoodCounter !== 0) return

    gameOver()
    var elH3 = document.querySelector("h3")
    elH3.innerText = `You won! your score is ${gGame.score}`
}

function addCherry() {

    var emptyCell = availbleCell()

    if (emptyCell) {
        gBoard[emptyCell.i][emptyCell.j] = CHERRY
        renderCell(emptyCell, CHERRY)
    }
}