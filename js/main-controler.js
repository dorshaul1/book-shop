'use strict'

function oninit() {
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
              <button onclick="onDetails('${book.id}')" class="details-btn">?</button>
              <button onclick="onReadBook('${book.id}')" class="read-btn">read</button>
              <button onclick="onClickUpdateBook('${book.id}')" class="update-btn">update</button>
              <button onclick="onDeleteBook('${book.id}')" class="delete-btn">delete</button>
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


function openModal() {
    var elModal = document.querySelector('.modal')
    var elBackgroundModal = document.querySelector('.modal-background')
    elBackgroundModal.style.display = 'block'
    elModal.style.display = 'block'
}

function closeModal() {
    var elBackgroundModal = document.querySelector('.modal-background')
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    elBackgroundModal.style.display = 'none'
}

function onClickUpdateBook(id) {
    openModal()
    var book = getBookById(id)
    // console.log('book:', book)
    
    var strHTML = `<button class="close" onclick="closeModal()" class="X">X</button>
    <h2>update</h2>
    <h3></h3>
    <input type="text" name="updateTitle" placeholder="title" required />
    <input type="text" name="updatePrice" placeholder="price" required />
    <button class="confirm" onclick="onUpdateBook(${id})">confirm</button>
    `
    document.querySelector('.modal').innerHTML = strHTML
}

function onUpdateBook(id){
    
    var elName = document.querySelector('input[name=updateTitle]')
    var elPrice = document.querySelector('input[name=updatePrice]')
    var name = elName.value
    console.log('name:', name)
    var price = elPrice.value
    
    updateBook(id,name,price)
    
    // elTitle.value = ''
    // elPrice.value = ''
    // elImg.value = ''
    
    renderBooks()
}


function onReadBook(id) {
    openModal()
    var book = getBookById(id)

    var strHTML = `<button class="close" onclick="closeModal()" class="X">X</button>
    <h3>${book.name}</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi harum voluptatem eius vel, id quis quam at
        vero soluta atque non, ad aut eaque dolore obcaecati voluptatibus nulla vitae minus?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non rerum minima expedita asperiores nesciunt.
        Accusantium sunt voluptatum, laudantium velit dolorum, error voluptate in odio fugiat veniam quaerat,
        dolorem tenetur inventore!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, suscipit. Dolorem laudantium illum
        molestias, est quidem sapiente quam dolore rem laborum fuga quia quisquam aliquid blanditiis? Consectetur
        quidem maiores nisi.
    </p>`

    document.querySelector('.modal').innerHTML = strHTML
}

function onDetails(id) {
    openModal()
    var book = getBookById(id)

    var strHTML = `<button class="close" onclick="closeModal()" class="X">X</button>
    <h2>Details</h2>
    <p>
        Name: ${book.name} </br>
        price: ${book.price}
        <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A laborum voluptas similique. Facere
            laudantium labore nam. Id ipsam earum libero quo! Eaque iste rem natus maxime illum totam inventore qui.
        </div>
    </p>`

    document.querySelector('.modal').innerHTML = strHTML
}