function makePassword(length=5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
function getTime() {
    var str = '';
    var time = new Date();
    str += time.getDate() + '.';
    str += Number(time.getUTCMonth()) + 1 + '.';
    str += time.getFullYear() + ' , ';
    str += time.getHours() + ":";
    str += time.getMinutes();

    return str;

}

