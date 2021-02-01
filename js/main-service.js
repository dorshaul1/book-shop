'use strict'

const KEY = 'booksDb'


var gBooks

_createBooks()

function getBooks() {
    return gBooks
}

function addBook(name, price) {
    var book = _createBook(name, price)
    if (!name) return
    gBooks.unshift(book)
    _saveBookssToStorage();
}

function deleteBook(bookId) {
    var bookidx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(bookidx, 1)
    _saveBookssToStorage();
}

function updateBook(bookId,name = null,price = null) {
    var bookidx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    // console.log('currBook:', currBook)
    // if(name)

    console.log('Books[bookidx]:', Books[bookidx])
    // gBooks[bookidx].name = name
    // currBook.Price = price
    // currBook.imgUrl = imgUrl
        
    _saveBookssToStorage();

}

function getBookById(bookId) {
    var bookToCheck = gBooks.find(function (book) {
        return book.id === bookId
    })
    return bookToCheck
}

function _createBook(name, price = null, imgUrl = null) {
    return {
        id: makeId(4),
        name: name,
        price: price,
        imgUrl: imgUrl
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 3; i++) {
            var name = 'demo'
            books.push(_createBook(name))
        }
    }
    gBooks = books;
    _saveBookssToStorage();
}


function _saveBookssToStorage() {
    saveToStorage(KEY, gBooks)
}