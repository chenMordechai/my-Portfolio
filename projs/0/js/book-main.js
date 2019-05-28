'use strict'

$(document).ready(init);

function init() {
    createBooks()
    renderBooks()
    console.log(gBooks)
}


function updateRate(val, bookId) {
    var currbBook = getBookById(bookId)
   
    if (val === '-' && currbBook.rate > 0) {
        currbBook.rate--
    } else if (val === '+' && currbBook.rate < 10) {
        currbBook.rate++
    }

    $('.rate').html(currbBook.rate)
    renderBooks()
   
}


function openModal(bookId) {
    var currbBook = getBookById(bookId)
    var strHtml = `name: ${currbBook.name} <br/> 
   price: ${currbBook.price} $ <br/>
    ${currbBook.img} <br/> 
   rate: <span class="rate">${currbBook.rate}</span> 
   `
    $('.modal-body').html(strHtml)
    var buttonHtml = `<button onclick="updateRate('-', '${bookId}')" type="button" class="btn btn-secondary" >-</button>
    <span class="rate">${currbBook.rate}</span>
     <button onclick="updateRate('+','${bookId}')" type="button" class="btn btn-secondary" >+</button>`
     $('.modal-footer').html(buttonHtml)
}
    



function readAndUpdateBook(bookId) {
    var newPrice = +prompt('what is the new price of the book?')
    updateBook(bookId, newPrice)
    renderBooks()
}



function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function readAndAddNewBook() {
    var name = $('.name').val()
    var price = $('.price').val()
    addBook(name, price)
    renderBooks()
}

 

function renderBooks() {
    var books = getBooks()
    var htmlStr = books.map(function (book) {
        return `<tr>
<td class="booksList">${book.id} </td>
<td class="booksList">${book.name} </td>
<td class="booksList">${book.price}$ </td>
<td class="booksList">${book.img}</td>
<td class="booksList">
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="openModal('${book.id}')"class="read">read</button>
<button type="button" class="btn btn-success" onclick="readAndUpdateBook('${book.id}')"class="update"> update</button>
<button type="button" class="btn btn-danger" onclick="onDeleteBook('${book.id}')" class="delete">delete</button>
</td>
<td class="booksList">${book.rate}</td>
</tr>`
    });
    $('tbody').html(htmlStr.join(''));
}
