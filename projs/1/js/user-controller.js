'use strict'

function onInit() {
    isAdmin()

}

function logOut() {
    localStorage.removeItem('user-name:')
}


function isAdmin() {
    if (userDeatels.isAdmin) {
        console.log('is admin')
        
        document.querySelector('.admin').innerHTML = 'Admin'
        document.querySelector('.admin').href = 'admin.html'
    }else{
        document.querySelector('.button-admin').style.display = 'none'
    }
}