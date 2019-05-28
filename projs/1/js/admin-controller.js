'use strict'

var gUsers;
function onInit() {
    gUsers = loadFromStorage('users')
    console.log(gUsers)

    renderTable()
}


function renderTable() {
    var htmlStr= gUsers.map(function (user) {
        return `<tr>
        <td class="userList">${user.name} </td>
        <td class="userList">${user.password} </td>
        <td class="userList">${user.isAdmin} </td>
        <td class="userList">${user.lastLogin}</td>
        </tr>`
    });
    
    $('tbody').html(htmlStr.join(''));
}

function onSetSort(value) {
    getUsersBySort(value)
    renderTable();
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}