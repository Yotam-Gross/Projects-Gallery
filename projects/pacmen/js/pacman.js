'use strict'

const PACMAN = '😷';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function pacmanEatSuper() {

    gPacman.isSuper = true
    console.log(gPacman.isSuper);
    setTimeout(() => gPacman.isSuper = false, 15000)

}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
       gFoodCounter--
        isPackmanWin()

        if(gFoodCounter === 55){
            gCherryInterval = setInterval(addCherry, 15000)
        }
    }

    if(nextCell === CHERRY) updateScore(10)

    if(gPacman.isSuper){
        if (nextCell === SUPER_FOOD) return 
    }

    if (nextCell === SUPER_FOOD) pacmanEatSuper()

    if(gPacman.isSuper) {
    pacmanSuperMove(nextCell, nextLocation)
    }

    else if (nextCell === GHOST) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function pacmanSuperMove(nextCell, nextLocation) {
    
    
    if (nextCell === GHOST) {
        console.log('by');
        getGhost(nextLocation)
        // gEatenGhosts.push()
    }

}

function getGhost(nextLocation){

    console.log('get Ghost');
    for(var i = 0; i < gGhosts.length; i++){
        
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
            var ghost = gGhosts[i]
            gEatenGhosts.push(ghost)
            console.log(gEatenGhosts);
        }

    }

}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}