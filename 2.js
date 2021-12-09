/*
I kontrola localStorage.books
II zmienne odpowiadające elementom HTML
III klasa Book
IV obsługa kliknięcia
V dodanie na stronę wcześniej zapisanych książek 
*/


if (!localStorage.books) {
	localStorage.books = '[]'
}

const titleInput = document.getElementById('titleInput')
const authorInput = document.getElementById('authorInput')
const priorityInput = document.getElementById('priorityInput')
const cathegorySelect = document.getElementById('cathegorySelect')
const booksTable = document.getElementById('booksTable')
const addButton = document.getElementById('addButton')
const errorInfo = document.getElementById('errorInfo')

class Book {

	constructor(title, author, priority, cathegory) {
		this.title = title
		this.author = author
		this.priority = priority
		this.cathegory = cathegory

	}

	show() {
		const tr = document.createElement('tr')

		const titleTd = document.createElement('td')
		titleTd.innerText = this.title
		tr.appendChild(titleTd)

		const authorTd = document.createElement('td')
		authorTd.innerText = this.author
		tr.appendChild(authorTd)

		const priorityTd = document.createElement('td')
		priorityTd.innerText = this.priority
		tr.appendChild(priorityTd)

		const cathegoryTd = document.createElement('td')
		cathegoryTd.innerText = this.cathegory
		tr.appendChild(cathegoryTd)


		booksTable.appendChild(tr)

	}

} 



addButton.addEventListener('click', function () {

//sprawdzenie warunków

if (titleInput.value.length < 1 && authorInput.value.length < 3) {
	errorInfo.textContent = 'Tytuł musi mieć długość min. 1 znaku, a autor - min. 3 znaków'
	setTimeout(function () {
		errorInfo.textContent = ''
	}, 7000)
	return
}


if (titleInput.value.length < 1) {
	errorInfo.textContent = 'Tytuł musi mieć długość min. 1 znaku.'
	setTimeout(function () {
		errorInfo.textContent = ''
	}, 7000)
	return
}


if (authorInput.value.length < 3) {
	errorInfo.textContent = 'Autor musi mieć długość min. 3 znaków'
	setTimeout(function () {
		errorInfo.textContent = ''
	}, 7000)
	return
}




//po sprawdzeniu warunków 

const book = new Book(titleInput.value, authorInput.value, priorityInput.value, cathegorySelect.value)
localStorage.books = localStorage.books.slice(0, -1) // usuwamy ] z końca
if (localStorage.books != '[') {
localStorage.books += ',' // przecinki trzeba tak wprowadzać z uwagi na restrykcyjne wymagania formatu json
}
localStorage.books += JSON.stringify(book) + ']'
book.show()


titleInput.value = ''
authorInput.value = ''



})



//Dzięki temu na początku pokażą się już zapisane

const  protobooks = JSON.parse(localStorage.books)

const books = protobooks.map(function (b) {
	return new Book (b.title, b.author, b.priority, b.cathegory)
})
console.log(books)

books.forEach(function (b) {
	Book.prototype.show.call(b)
})



