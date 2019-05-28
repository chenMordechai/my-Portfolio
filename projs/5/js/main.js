'use strict'


var gTotalNums = 16
var gNums = createNums(gTotalNums);
var gNextNum;
var gplay;
var gTimer;

var elNextNum = document.querySelector('.data.num')

function init() {
    gNums = createNums(gTotalNums)
    gplay = false;
    gNextNum = 1;
    renderBoard(gTotalNums)

}

function choseLevel(elLevel) {
    gTotalNums = elLevel;
    init()
}



function renderBoard(nums) {

    var strHTML = '';
    for (var i = 0; i < Math.sqrt(nums); i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(nums); j++) {

            strHTML += `<td onclick="cellClicked(this)">`
            strHTML += drawNum() + '</td>'
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    elNextNum.innerText += '\n' + gNextNum;
    var elTime = document.querySelector('.data.time')
    elTime.innerText = 'Game Time:\n' + 0;

}


function cellClicked(elNum) {

    if (!gplay) {
        gplay = true;
        timer()
        console.log('stert')
    }
    if (+elNum.innerText === gNextNum) {
        gNextNum++
        elNum.classList.add('click')
        elNextNum.innerText = 'Next Number: ' + '\n' + gNextNum
    }
    if (gNextNum === gTotalNums+1) {
        gplay = false
        clearInterval(gTimer)
        console.log('end')
    }
}


function timer() {
    var elTime = document.querySelector('.data.time')

    var startTime = Date.now();
    gTimer = setInterval(() => {
        var time = (Date.now() - startTime) / 1000;
        elTime.innerText = 'Game Time:\n' + time;
    }, 100);

}

// console.log(drawNum())

function drawNum() {
    var rndIdx = getRandomInteger(0, gNums.length)
    var pickedNum = gNums[rndIdx]
    gNums.splice(rndIdx, 1)
    return pickedNum
}

// console.log(getNums(16))
function createNums(size) {
    var nums = []
    for (var i = 0; i < size; i++) {
        nums.push(i + 1)
    }
    return nums
}

// function getTime() {
//     return new Date().toString().split(' ')[4];
// }

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}