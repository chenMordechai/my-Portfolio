

var gBooks;



function getBookById(bookId){
  gBooks.find(function (book) {
        return bookId === book.id
    })
}

function getBookIdxById(bookId){
    gBooks.findIndex(function (book) {
        return bookId === book.id
    })
}


function updateBook(bookId, newPrice){
    var book = getBookById(bookId)
    book.price = newPrice
}

function deleteBook(bookId) {
    var bookIdx = getBookIdxById(bookId)
    gBooks.splice(bookIdx, 1)
}


function addBook(name, price){
   gBooks.unshift(createBook(name, imgUrl=`<img src="img/default.jpg">`)) 
   gBooks[0].price = price
}


function getBooks(){
    return gBooks
}



function createBooks() {
    var books = [
        createBook('harry potter', `<img src="img/harry potter.jpg" >` ),
        createBook('Twilight', `<img src="img/twilight.jpg" >`),
        createBook('Da Vinci Code', `<img src="img/da vinci code.jpg" >`),
    ]
    gBooks = books;
}


function createBook(name, imgUrl=`<img src="img/default.jpg">`) {
    return {
        id: makeId(),
        name: name,
        price: getRandomIntInclusive(100, 200),
        img: imgUrl,
        rate:0,
    }
}

