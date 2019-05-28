'use strict';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    gQuestsTree = loadFromStorage('tree')
    console.log(gQuestsTree)
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');

        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;

    gPrevQuest = null;
    saveQuest()

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // update the prev, curr global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, res) {
    console.log(newGuessTxt)
    var newQuest = createQuest(newQuestTxt)
    
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
// console.log(newQuest)
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    gPrevQuest[res] = newQuest
    gCurrQuest = gQuestsTree;
    saveQuest()
}



function saveQuest() {
    saveToStorage('tree', gQuestsTree)
}


