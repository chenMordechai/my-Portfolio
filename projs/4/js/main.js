'use strict'

var gQuests = createQuests();
var gCurrQuestIdx = 0

function init() {
    randerGame()
}

function reStart(){
  randerGame() 
}


function randerGame() {

    var strHTML = '';
    var quest = gQuests[gCurrQuestIdx];
    for (var i = 0; i < quest.opts.length; i++) {
        strHTML += `<div class ="choose" onclick="chooseAnswer(${i})">${quest.opts[i]}</div>`;
    }
    document.querySelector('.picture').innerHTML = `<img src="img/quest.id.jpg'>`
    document.querySelector('.opst').innerHTML = strHTML;
    
}


function chooseAnswer(idx) {
    var elcomment = document.querySelector('.comments')
    elcomment.innerText = ""

    if (idx === gQuests[gCurrQuestIdx].correctOptIndex) {
        gCurrQuestIdx++
        if (gCurrQuestIdx < gQuests.length) {
            var elImg = document.querySelector('.picture')
            elImg.src = `img/${gQuests[gCurrQuestIdx].id}.jpg`
            randerGame()

        } else elcomment.innerText = 'you won!!'

    } else {

        elcomment.innerText = 'try again'
    }
}

function createQuests() {
    return [{
            id: 1,
            opts: ['strabery', 'banana', 'cherry'
         ],
            correctOptIndex: 0,
        },
        {
            id: 2,
            opts: ['Apple', 'orange', 'banna'],
            correctOptIndex: 1,
        },
        {
            id: 3,
            opts: ['cherry', 'watermelon', 'strabery'],
            correctOptIndex: 1,
        }
    ]
}