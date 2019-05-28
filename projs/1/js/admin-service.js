'use strict'

function getUsersBySort(value){
    if (value === 'Name') sortByName();
    else if (value === 'Last Login') sortByLastLogin();
}


function sortByName(){
    gUsers.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}



function sortByLastLogin(){
    gUsers.sort(function (a, b) {
        return b.lastLogin - a.lastLogin;
    })
}
