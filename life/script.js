//ustawienia startowe, funkcje, eventListeners i na końcu funkcja newTurn, oddzielona od innych funkcji

const board = document.querySelector('tbody')
const height = 40
const width = 40
const walls = document.getElementById('walls')
const speed = document.getElementById('speed')
const selectColor = document.getElementById('color')
const start = document.getElementById('start')
const clear = document.getElementById('clear')
let id;
let phase = 1;
let colorOfLife = 'black'

createSquaresInTheBoard();

function createSquaresInTheBoard () {

	for (let i = 0; i < width; i++) {
		let tr = document.createElement('tr')
		for (let j = 0; j < height; j++) {
			let td = document.createElement('td')
			tr.appendChild(td)
		}
		board.appendChild(tr)
	}
}




function createNewBoard () {
	let startOfNewBoard = []
	for (let i = 0; i < height; i++) {
		startOfNewBoard.push([])
	}
	for (let row of startOfNewBoard) {''
		for (let i = 0; i < width; i++) {
			row.push(0)

		}
	}
	return startOfNewBoard
}

function square (y, x) {

	if (walls.value === '0') {

		if (y >= width) {
			y = 0;
		} if (x >= height) {
			x = 0
		}
		if (x < 0) {
			x = height - 1
		}
		if (y < 0) {
			y = width - 1
		}


	} else {

		if (y >= height || x >= width || y < 0 || x < 0) {
			return {style: {}}
		}


	}
	return board.children[y].children[x]
}



selectColor.addEventListener('change', function () {
	colorOfLife = selectColor.value;
	let tds = [...document.querySelectorAll('td')]
	for (let td of tds) {
		if (td.style.backgroundColor !== '' && td.style.backgroundColor !== 'white')  {
			td.style.backgroundColor = colorOfLife
		}
	}
})

walls.addEventListener('change', function () {
	if (walls.value === '1') {
		board.style.border = '5px solid black'
	} else {
		board.style.border = ''
	}
})

start.addEventListener('click', function () {

	if (phase === 1) {				
		id = setInterval(newTurn, speed.value)
		let selectedValues = document.querySelectorAll('.selectedValue')

		if (walls.value === '0') {
			selectedValues[0].textContent = 'Wyłączone'

		} else {
			selectedValues[0].textContent = 'Włączone'

		} 

		selectedValues[1].textContent = speed.value;
				selectedValues[2].textContent =  selectColor.querySelector('[value=' + colorOfLife + ']').innerText //to jest złożone
				clear.style.display = 'none'
				walls.style.display = 'none'
				speed.style.display = 'none'
				selectColor.style.display = 'none'
				phase = 2
				start.textContent = 'Stop'


			} else {
				clearInterval(id)
				let selects = document.querySelectorAll('select')
				let selectedValues = document.querySelectorAll('.selectedValue')
				for (let i = 0; i < selects.length; i++) {
					selects[i].style.display = 'inline';
					selectedValues[i].textContent = ''
				}				
				clear.style.display = 'inline'
				phase = 1
				start.textContent = 'Start'
			}

		})



clear.addEventListener('click', function () {
	board.innerHTML = ''
	createSquaresInTheBoard();
})






board.addEventListener('click', function (e) {

	if (phase === 2 || e.target.tagName !== "TD") {
		return;
	}


	if (e.target.style.backgroundColor === colorOfLife) {
		e.target.style.backgroundColor = 'white'

	} else {
		e.target.style.backgroundColor = colorOfLife
	}

})









function newTurn () {




	let newBoard = createNewBoard();




	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {

			let neighbours = 0
			if (square(i + 1, j - 1).style.backgroundColor === colorOfLife) {
				neighbours++
			}
			if (square(i + 1, j).style.backgroundColor === colorOfLife) {
				neighbours++
			}
			if (square(i + 1, j + 1).style.backgroundColor === colorOfLife) {
				neighbours++
			}
			if (square(i, j + 1).style.backgroundColor === colorOfLife) {
				neighbours++
			}
			if (square(i, j - 1).style.backgroundColor === colorOfLife) {
				neighbours++
			}
			if (square(i - 1, j + 1).style.backgroundColor === colorOfLife) {
				neighbours++
			}
			if (square(i - 1, j).style.backgroundColor === colorOfLife) {
				neighbours++
			}
			if (square(i - 1, j - 1).style.backgroundColor === colorOfLife) {
				neighbours++
			}

			if (square(i, j).style.backgroundColor === colorOfLife) {
				if (neighbours === 2 || neighbours === 3) {
					newBoard[i][j] = 1
				} else {
					newBoard[i][j] = 0
				}
			} else {
				if (neighbours === 3) {
					newBoard[i][j] = 1
				}
			}



		}


	}


	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (newBoard[i][j]) {
				square(i, j).style.backgroundColor = colorOfLife

			} else {
				square(i, j).style.backgroundColor = 'white'

			}
		}
	}


}