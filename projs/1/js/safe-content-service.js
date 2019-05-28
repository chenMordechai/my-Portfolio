'use strict'

var gUsers;

function createUsers() {
var users =loadFromStorage('users')
if(!users ||!users.length ){
    users =[
        createUser('ziv' , false),
        createUser('yechiel' , false),
        createUser('chen' , true),
    ]
}
gUsers = users
saveUsers()
}


function createUser(name , isAdmin) {
    return {
        name: name,
        password:makePassword(),
        isAdmin:isAdmin,
        lastLogin:'',
    }
}

function saveUsers() {
    saveToStorage('users', gUsers)
}