'use strict'

const KEY = 'booksDb'
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gBooks

var gTrans = {
    'book-shop': {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },

    id: {
        en: 'ID',
        he: 'מזהה ייחודי'
    },

    title: {
        en: 'Title',
        he: 'כותרת'
    },

    price: {
        en: 'Price',
        he: 'מחיר'
    },

    actions: {
        en: 'Actions',
        he: 'פעולות'
    },

    delete: {
        en: 'Delete',
        he: 'מחיקה'
    },

    update: {
        en: 'Update',
        he: 'עדכון'
    },

    read: {
        en: 'Read',
        he: 'קריאה'
    },

    details: {
        en: 'Details',
        he: 'פרטים'
    },

    lorem: {
        en: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. A laborum voluptas similique. Facere
            laudantium labore nam. Id ipsam earum libero quo! Eaque iste rem natus maxime illum totam inventore qui.`,
        he: `לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.`
    },

    'big-lorem': {
        en: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi harum voluptatem eius vel, id quis quam at
            vero soluta atque non, ad aut eaque dolore obcaecati voluptatibus nulla vitae minus?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non rerum minima expedita asperiores nesciunt.
            Accusantium sunt voluptatum, laudantium velit dolorum, error voluptate in odio fugiat veniam quaerat,
            dolorem tenetur inventore!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, suscipit. Dolorem laudantium illum
            molestias, est quidem sapiente quam dolore rem laborum fuga quia quisquam aliquid blanditiis? Consectetur
            quidem maiores nisi.`,
        he: `לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.
            לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.
            הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.

`
    }

}

var gCurrLang = 'en';

_createBooks()

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)

}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
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

function updateBook(bookId, name = null, price = null) {
    var bookidx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })

    var currBook = gBooks[bookidx]

    currBook.name = name
    currBook.price = price
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


//translation

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    // if not found return en
    if (!txt) txt = keyTrans['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

// function formatNumOlder(num) {
//     return num.toLocaleString('es')
// }

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS'
    }).format(num);
}