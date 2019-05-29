var gId = 0;
var gProjs;





function getProjById(id) {
    gProjs.find(function (proj) {
        return proj.id ===  id
    })
    
}

// function getProjIdxById(projId) {
//     gProjs.findIndex(function (proj) {
//         return projId === proj.id
//     })
// }




function getProjs() {
    console.log(gProjs)
    return gProjs
}



function creatProjs() {
    var projs = [
        creatProj('Book Shop', 'title'),
        creatProj('Safe Content', 'title'),
        creatProj('Guess Who', 'title'),
        creatProj('Minesweeper', 'title'),
        creatProj('What is in the picture', 'title'),
        creatProj('Touch Numbers', 'title'),

    ]
    gProjs = projs
}



function creatProj(name, title) {
    return {
        id: gId++,
        name: name,
        title: title,
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projs/sokoban",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    }
}