'use strict'
var MINE = '💣';
var BOOMMINE = '💥'
var EMPTY = '';
var FLAG = ' 🚩';
var gLivesCount = 3
var gSize = 4; //defult
var gNum0fMines = 2; //defult
var gNumOfEmptyCell = gSize ** 2 - gNum0fMines
var gCountShownCell = 0;
var gBoard = buildBoard(gBoard, gSize);
renderBoard(gBoard)
var gCountMines = gNum0fMines
var gCountFlags = gNum0fMines
var gGame = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0

};
randMines(gBoard, gNum0fMines)
checkNegs(gBoard)
var elFlag = document.querySelector('.flag')
elFlag.innerHTML = 'Flag: ' + gCountFlags
var elLives = document.querySelector('.lives')
elLives.innerHTML = 'lives: ' + gLivesCount + '❤️'
var elSmile = document.querySelector('.smile')
elSmile.src = 'img/normal.jpg'

document.addEventListener('contextmenu', event => event.preventDefault());


function init() {
    gBoard = buildBoard(gBoard, gSize);
    renderBoard(gBoard)
    gNumOfEmptyCell = gSize ** 2 - gNum0fMines
    gCountShownCell = 0;
    gCountMines = gNum0fMines
    gCountFlags = gNum0fMines
    randMines(gBoard, gNum0fMines)
    checkNegs(gBoard)
    elFlag.innerHTML = 'Flag: ' + gCountFlags
    gLivesCount = 3
    elSmile.src = 'img/normal.jpg'


}
//updating the level
function choseLevel(size, mines) {
    gSize = size;
    gNum0fMines = mines
    init()
}
//built the board
function buildBoard(board, size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {

            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                icon: EMPTY,
                location: {
                    i: i,
                    j: j
                },

            };
        }
    }
    return board;
}
// render the board
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board[i].length; j++) {

            var className = `cell cell${i}-${j}`
            strHTML += `<td onmousedown="cellClicked(this,${i},${j},event)" 
            class="${className}"></td>`
        }
        strHTML += `</tr>`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}
//check how many mines around and updating the model
function checkNegs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var negsCount = countNegs(i, j, board)
            if (negsCount !== 0) {
                if (board[i][j].icon !== MINE) {
                    board[i][j].icon = negsCount
                    board[i][j].minesAroundCount = negsCount
                }

            }
        }
    }
}
//count negs retern num of negs
function countNegs(cellI, cellJ, board) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].icon === MINE) negsCount++;
        }
    }
    return negsCount;
}
// opening cell
function expendShown(board,elCell, i, j) {

    for (var x = i - 2; x <= i + 2; x++) {
        if (x < 0 || x >= board.length) continue;
        for (var y = j - 2; y <= j + 2; y++) {
            if (x === i && y === j) continue;
            if (y < 0 || y >= board.length) continue;
            var coord = {
                i: x,
                j: y
            };
            //dont opening mine,open cell and mark cell
            if (board[x][y].icon !== MINE && !(board[x][y].isShown) && !(board[x][y].isMarked)) {
                //render the number of negs
                renderCell(coord, board[x][y].icon)
                var elExpend = document.querySelector(`.cell${x}-${y}`)
                elExpend.classList.add('selected')
                gBoard[x][y].isShown = true
                gCountShownCell++


            }
        }
    }
}
// when we clicked on cell
function cellClicked(elcell, i, j, ev) {
    var location = {
        i: i,
        j: j
    }
    //left button
    if (ev.button === 0) {
        if (!gBoard[i][j].isMine) {
            expendShown(gBoard, elcell, i, j)
        }
        //first click
        if (!(gGame.isOn)) {
            gGame.isOn = true;
            timer()
            console.log('start')
        }
        // we cant click on shown or marked
        if (!(gBoard[i][j].isShown) && !(gBoard[i][j].isMarked)) {
            //if we clicked on mine
            if (gBoard[i][j].isMine) {
                gLivesCount--
                elLives.innerHTML = 'lives: ' + gLivesCount + '❤️'
                gCountMines--
                gCountFlags--
                gBoard[i][j].isShown = true
                //render the icon
                renderCell(location, BOOMMINE)
                elcell.classList.add('selected')
                //after 3 bombs
                if (gLivesCount === 0) {
                    for (var m = 0; m < gBoard.length; m++) {
                        for (var n = 0; n < gBoard[0].length; n++) {
                            //show all the mines
                            if (gBoard[m][n].isMine === true && gBoard[m][n].isShown === false) {
                                var mineloc = {
                                    i: m,
                                    j: n
                                }
                                renderCell(mineloc, MINE)
                                var elMinCel = document.querySelector(`.cell${m}-${n}`)
                                elMinCel.classList.add('selected')
                            }
                        }
                    }
                    GameOver()
                }
//if we click on number
            } else if (gBoard[i][j].minesAroundCount !== 0) {
                gCountShownCell++
                gBoard[i][j].isShown = true
                renderCell(location, gBoard[i][j].minesAroundCount),
                    elcell.classList.add('selected')
                    //if we click on empty cell
            } else {
                gCountShownCell++
                gBoard[i][j].isShown = true
                elcell.classList.add('selected')
            }
        }
        //right button
    } else if (ev.button === 2) {
        if (!(gGame.isOn)) {
            gGame.isOn = true;
            timer()
            console.log('start')
        }
        //we cant click on shown cell
        if (!gBoard[i][j].isShown) {
            // if the cell isnt mark: nark it
            if (!(gBoard[i][j].isMarked) && gCountFlags > 0) {
                gBoard[i][j].isMarked = true
                renderCell(location, FLAG)
                gCountFlags--
                elFlag.innerHTML = 'Flag: ' + gCountFlags
                if (gBoard[i][j].isMine) {
                    gCountMines--
                }
                // if the cell is mark : take it off
            } else if (gBoard[i][j].isMarked) {
                gBoard[i][j].isMarked = false
                renderCell(location, EMPTY)
                gCountFlags++
                if (gBoard[i][j].isMine) {
                    gCountMines++
                }
            }
        }
    }
    checkWin()
}
//put rand mines on the board
function randMines(board, num) {
    var minesLocation = []
    for (var x = 0; x < num; x++) {
        var randi = getRandomInt(0, board.length)
        var randj = getRandomInt(0, board.length)
        if (!board[randi][randj].isMine) {
            board[randi][randj].isMine = true
            board[randi][randj].icon = MINE
            minesLocation.push({
                i: randi,
                j: randj
            })
        } else {
            randMines(board, 1) // if the mine location not empty, find enother
        }
    }
    return minesLocation
}

function timer() {
    var elTime = document.querySelector('.time')
    var startTime = Date.now();
    gGame.secsPassed = setInterval(() => {
        var time = (Date.now() - startTime)/1000 ;
        elTime.innerText = 'timer:' + time;
    }, 100);

}

function restart() {
    var elstart = document.querySelector('.start')
    elstart.style.display = 'none'
    var elStatus = document.querySelector('.status')
    elStatus.innerHTML = ''
    init()
}

function checkWin() {
    if (gCountFlags === 0 && gCountMines === 0 && gNumOfEmptyCell === gCountShownCell) {
        elSmile.src = 'img/victory.jpg'
        var elStatus = document.querySelector('.status')
        elStatus.innerHTML = 'you won!!'
        var elstart = document.querySelector('.start')
        elstart.style.display = 'block'
        clearInterval(gGame.secsPassed)
        return true
    }
}

function GameOver() {
    clearInterval(gGame.secsPassed)
    gGame.secsPassed = null
    gGame.isOn = false
    var elStatus = document.querySelector('.status')
    elStatus.innerHTML = 'game over!'
    var elstart = document.querySelector('.start')
    elstart.style.display = 'block'
    elSmile.src = 'img/sad.jpg'
    return true
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}