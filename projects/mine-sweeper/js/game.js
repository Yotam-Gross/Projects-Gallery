'use strict'


const MINE = '💥'
const FLAG = '🏴‍☠️'

var gBoard 
var gSecondsTimer
var gminutesCounter
var gTimerInterval
// var gbestScoresByLevels = [
//     {min: 0,
//      sec: 0},
//     {min: 0,
//      sec: 0},
//     {min: 0,
//      sec: 0}, 
// ]

var gLevel = {
    size: null,
    minez: null,
}

var gGame = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    minezClicked: 0,
    secsPassed: 0,
    lives: 3,
}

function initGame(boardSize){

    gGame.isOn = true
    clearGame()

    gLevel.size = boardSize

    gBoard = createBoard(gLevel.size)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}

function implementMines(boardSize, board){
    
    if(boardSize === 4) gLevel.minez = 2
    if(boardSize === 8) gLevel.minez = 14
    if(boardSize === 12) gLevel.minez = 32

    var boardCells = []

    for(var i = 0; i < boardSize; i++){
        for (var j = 0; j < boardSize; j++){
            boardCells.push(board[i][j])
        }
    }
    
    
    for(var k = 0; k < gLevel.minez; k++){
        
       
        var tempCell = boardCells.splice(getRandomInt(0, boardCells.length), 1)
        var i = tempCell[0].i
        var j = tempCell[0].j
        
        board[i][j].isMine = true
    }

return board

}

function renderBoard(board){

    var strHTML = ''

    for(var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for(var j = 0; j < board.length; j++){
            const cell = board[i][j]

            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}" oncontextmenu =
                        "onRightClick(this,event,${i},${j})"
                         onclick = "onLeftClick(this,event,${i},${j})">
                         ${''}</td>`
           
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
                   
}

function setMinesNegsCount(board){

    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){

            board[i][j].minesNegsCount = checkMinesNegsCount(board, i, j)
        }
    }

    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){

            if (board[i][j].isMine) {
                board[i][j].minesNegsCount = MINE
            }
            if(board[i][j].minesNegsCount === 0) board[i][j].minesNegsCount = ''
        }
    } 
    
}

function checkMinesNegsCount(board, rowIdx, colIdx){

    var minesAroundCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === rowIdx && j === colIdx) continue

            var currCell = board[i][j]
            if (currCell.isMine) minesAroundCount++
        }
    }
    
    return minesAroundCount

}

function onRightClick(elCell, event, i, j){

    if(!gGame.isOn) return

    // gGame.markedCount++

    if(gGame.showCount === 1 && gGame.markedCount === 0 ||
        gGame.showCount === 0 && gGame.markedCount === 1) timeCount()

    event.preventDefault()
    
    if(gBoard[i][j].isShown) return
    console.table(gBoard);

    cellMarked(elCell, i, j)
}

function onLeftClick(elCell, event, i, j){

    if(!gGame.isOn) return
    const cell = gBoard[i][j]

    if(cell.isShown) return

    if(cell.isMarked) return
    
    gGame.showCount++
    if(gGame.showCount === 1 && gGame.markedCount === 0 ||
      gGame.showCount === 0 && gGame.markedCount === 1) timeCount()
    
    
    cell.isShown = true
    
    if(cell.isMine) {
    gGame.lives--
    gGame.showCount--
    gGame.minezClicked++
    console.log(gGame.lives)
    var elWin = document.querySelector('h4')
    elWin.innerText =  gGame.lives + ' lives left'
    }
    
    
    if(!gGame.lives) gameOver()

    isWin()

    elCell.classList.add('is-shown')
    elCell.innerText = cell.minesNegsCount 
    
    if(!cell.minesNegsCount) expandShown(gBoard, i, j)
    
}

function expandShown(board, rowIdx, colIdx){

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === rowIdx && j === colIdx) continue
            
             var currCell = board[i][j]
             if(currCell.minesNegsCount !== MINE && !currCell.isMarked) {
                //  if(currCell.minesNegsCount === '') expandShown(board, i, j)
                 
                var strHTML = '.cell-' + i + '-' + j

                currCell.isShown = true
                
                var elCell = document.querySelector(strHTML)
                elCell.innerText = currCell.minesNegsCount

                elCell.classList.add("is-shown")
                gGame.showCount++
                isWin()


             }
             
        }
    }

}

function gameOver(){

    gGame.isOn = false
    console.log('game over');
    clearInterval(gTimerInterval)

    var elSmily = document.querySelector('.restart')
    elSmily.innerText = '🤯'

    if(!gGame.lives){
    var elWin = document.querySelector('h3')
    elWin.innerText = 'Game Over'

    var elWin = document.querySelector('h4')
    elWin.innerText = '' 
    
    for(var i = 0; i < gLevel.size; i++){
        for(var j = 0; j < gLevel.size; j++){
            if(gBoard[i][j].minesNegsCount === MINE){

                var strHTML = '.cell-' + i + '-' + j
                var elCell = document.querySelector(strHTML)
                elCell.innerText = gBoard[i][j].minesNegsCount
            }

        }
    }
    }
}

function isWin(){
    
    if(gGame.showCount >= gLevel.size*gLevel.size - gLevel.minez
        && gLevel.minez <= gGame.markedCount + gGame.minezClicked){
        gGame.isOn = false

        var elMassege = document.querySelector("h3")
        elMassege.innerText = 'You Won!!!'

        var elSmily = document.querySelector('.restart')
        elSmily.innerText = '😎'

        clearInterval(gTimerInterval)

        // bestScores(gminutesCounter, gSecondsTimer)
    }
}

function cellMarked(elCell, i, j){

    if(gBoard[i][j].isMarked){
        elCell.innerText = ''
        gBoard[i][j].isMarked = false
        gGame.markedCount--
        console.log('mark count ', gGame.markedCount);
        return
    } 
    elCell.innerText = FLAG
    gBoard[i][j].isMarked = true
    gGame.markedCount++

    console.log('mark count ', gGame.markedCount);
    isWin()

}

function timeCount(){
       
    gTimerInterval = setInterval(incrementSeconds, 1000)
    
}

function incrementSeconds() {
    
    var elCounter = document.querySelector('.seconds-counter')
    gSecondsTimer += 1;

    if(gSecondsTimer === 60){
        gminutesCounter++
        gSecondsTimer = 0
    }

    
    elCounter.innerText = gminutesCounter + ':' + gSecondsTimer
}

function restart(){

    initGame(gLevel.size)
}

// function bestScores(min, sec){

//     if(gLevel.size === 4 && min <= gbestScoresByLevels[0].min
//         && sec < gbestScoresByLevels[0].sec){
//             gbestScoresByLevels[0].min = min 
//             gbestScoresByLevels[0].sec = sec 

//             console.log(gbestScoresByLevels[0].min, gbestScoresByLevels[0].sec);
//         }

//        var elBestScores = document.querySelector("h5")
//        elBestScores.innerText = 'Best Scores: Beginers ' +
//                                  gbestScoresByLevels[0].min + ':' +
//                                  gbestScoresByLevels[0].sec          
                                
  
// }