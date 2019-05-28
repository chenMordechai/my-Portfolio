
var userDeatels= loadFromStorage('username')

document.querySelector('.user-name').innerHTML += userDeatels.name

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
