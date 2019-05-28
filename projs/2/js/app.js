'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
    addEvenListeners()
}


function victory() {
    $('.jumbotron').show()
    $('.quest').hide();

}



function addEvenListeners() {
    $('.game-start').click(function () {
        console.log('click')
        //hide the game-start section
        $(this).hide()
        onStartGuessing()
    })

    // $('.response').click(function(){
    //     var res = $(this).data('response')
    //     // console.log('chenchenchen',res)
    //    onUserResponse(res)

    // })
}


function onStartGuessing() {
    renderQuest()
    // show the quest section
    $('.quest').show()
}

function renderQuest() {
    // select the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').text(gCurrQuest.txt)

}

function onUserResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            // alert('Yes, I knew it!');
            // TODO: improve UX
            victory()
        } else {
            $('.quest').hide()
            $('.new-quest').show()
            // alert('I dont know...teach me!')
            // TODO: hide and show new-quest section
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res
        moveToNextQuest( gLastRes);
        renderQuest();
    }
}

function onAddGuess() {
    // Get the inputs' values
    var guess = $('#newGuess').val()
    var quest = $('#newQuest').val()

    addGuess(quest, guess, gLastRes)
    // TODO: Call the service addGuess

    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gCurrQuest = gQuestsTree;
    init()
}