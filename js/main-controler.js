'use strict'

function oninit() {
    doTrans()
    renderBooks()
}

function renderBooks() {
    var books = getBooks()

    var strHTML = books.map(function (book) {
        return `
        <tr>
          <td>${book.id}</td>
          <td>${book.name}</td>
          <td>${book.price}</td>
    
        
          <td><div class="actions">
              <button onclick="onDetails('${book.id}')"class="details-btn btn bg-success text-light rounded-circle" data-toggle="modal" data-target="#exampleModal" onclick="openModalNew()">?</button>
              <button data-trans="read" onclick="onReadBook('${book.id}')" class="read-btn btn bg-primary text-light rounded-pill" data-target="#exampleModal" onclick="openModalNew()">read</button>
              <button data-trans="update" onclick="onClickUpdateBook('${book.id}')" class="update-btn btn bg-warning text-light rounded-pill" data-target="#exampleModal" onclick="openModalNew()">update</button>
              <button data-trans="delete" onclick="onDeleteBook('${book.id}')" class="delete-btn btn bg-danger text-light rounded-pill" data-target="#exampleModal" onclick="openModalNew()">delete</button>
              </div></td>
          </tr>
          `
    })
    document.querySelector('.books').innerHTML = strHTML.join('')

}

function onClickAdd() {
    var elName = document.querySelector('input[name=title]')
    var elPrice = document.querySelector('input[name=price]')
    var name = elName.value
    var price = elPrice.value
    addBook(name, price)
    elName.value = ''
    elPrice.value = ''
    renderBooks()
}

function onDeleteBook(id) {
    deleteBook(id)
    renderBooks()
}

function openModalNew(){
    var $modal = $('.modal')
    $modal.show()
    // $('.fade').css("opacity", "0.5");
    // $modal.css("opacity", "0.5");
}

function closeModalNew(){
    var $modal = $('.modal')
    $modal.hide()
    // $modal.css("opacity", "0.5");
}

function onClickUpdateBook(id) {
    openModalNew()

    var strHTML = `
    <h2 data-trans="update">update</h2>
    <h3></h3>
    <input type="text" name="updateTitle" placeholder="title" required />
    <input type="text" name="updatePrice" placeholder="price" required />
    <button class="confirm" onclick="onUpdateBook('${id}')">confirm</button>
    `
    document.querySelector('.modal-body').innerHTML = strHTML
    doTrans()
}

function onUpdateBook(id) {

    var elName = $('input[name=updateTitle]')
    var elPrice = $('input[name=updatePrice]')
    
    var name = elName.val()
    var price = elPrice.val()

    updateBook(id, name, price)

    renderBooks()
    closeModalNew()
}


function onReadBook(id) {
    openModalNew()
    var book = getBookById(id)

    var strHTML = `
    <h3>${book.name}</h3>
    <p data-trans = "big-lorem">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi harum voluptatem eius vel, id quis quam at
        vero soluta atque non, ad aut eaque dolore obcaecati voluptatibus nulla vitae minus?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non rerum minima expedita asperiores nesciunt.
        Accusantium sunt voluptatum, laudantium velit dolorum, error voluptate in odio fugiat veniam quaerat,
        dolorem tenetur inventore!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, suscipit. Dolorem laudantium illum
        molestias, est quidem sapiente quam dolore rem laborum fuga quia quisquam aliquid blanditiis? Consectetur
        quidem maiores nisi.
    </p>`

    document.querySelector('.modal-body').innerHTML = strHTML
    doTrans()
}

function onDetails(id) {
    openModalNew()
    var book = getBookById(id)

    var strHTML = `
    <h2 data-trans = "details" >Details</h2>
    <p>
       <span data-trans = "title">Name</span>: ${book.name} </br>
       <span data-trans = "price">price</span>: ${book.price}
        <div data-trans = "lorem" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. A laborum voluptas similique. Facere
            laudantium labore nam. Id ipsam earum libero quo! Eaque iste rem natus maxime illum totam inventore qui.
        </div>
    </p>`

    document.querySelector('.modal-body').innerHTML = strHTML
    doTrans()
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);

    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    renderBooks();
    doTrans();
}