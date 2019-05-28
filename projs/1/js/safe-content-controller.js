'use strict'

function onInit() {
    createUsers();
    console.log(gUsers)
}


function doLogIn() {
    var userName = document.querySelector('.name').value;
    var userPassword = document.querySelector('.password').value;
    var currUser = gUsers.find(function (user) {
        return user.name === userName && user.password===userPassword;
    })

    if (currUser){
        currUser.lastLogin= getTime();
        console.log(currUser.lastLogin)
        document.querySelector('.logIn').href = 'user.html' ; //make the login to be a herf
        saveUsers()
        saveToStorage('username',currUser);
    } else {document.querySelector('.status').innerHTML = 'Invalid Username / Password'};
}
