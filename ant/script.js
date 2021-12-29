

		//ustawienia startowe, eventListeners, funkcje
		
		const board = document.querySelector('tbody')
		
		const height = 60
		const width = 60

		const start = document.getElementById('start')
		const speed = document.getElementById('speed')
		const clear = document.getElementById('clear')
		const startCoordinatesWidth = document.getElementById('startCoordinatesWidth')
		const startCoordinatesHeight = document.getElementById('startCoordinatesHeight')
		const info = document.getElementById('info')
		const coordinates = document.getElementById('coordinates')
		let id;
		let phase = 0;
		let antX = 30, antY = 30;
		startCoordinatesWidth.value = antY
		startCoordinatesHeight.value = antX
		let direction = 2;
		let arrayBoard = [];


		for (let i = 0; i < width; i++) {
			let tr = document.createElement('tr')
			for (let j = 0; j < height; j++) {
				let td = document.createElement('td')
				tr.appendChild(td)

			}
			board.appendChild(tr)
		}

square(antX, antY).style.backgroundColor = 'blue' //to by niby pasowało przed pętlę for, ale w tamtym miejscu nie działa, bo board jest pusta




for (let i = 0; i < height; i++) {
	arrayBoard.push([])
}
for (let row of arrayBoard) {
	for (let i = 0; i < width; i++) {
		row.push([0, 0])
	}
}

arrayBoard[antY][antX] = 2;




startCoordinatesWidth.addEventListener('change', function () {
	if (parseInt(startCoordinatesWidth.value) - 1 < width && parseInt(startCoordinatesWidth.value) > 0) {


		removeBlue();


		arrayBoard[antY][antX] = 0
		square(antY, antX).style.backgroundColor = 'white'
		antY = parseInt(startCoordinatesWidth.value) - 1
		arrayBoard[antY][antX] = 2
		square(antY, antX).style.backgroundColor = 'blue'
		info.textContent = ''



	} 

		
		infoAboutBadCoordinates();
		
	
})

startCoordinatesHeight.addEventListener('change', function () {
	if (parseInt(startCoordinatesHeight.value) - 1 < height && parseInt(startCoordinatesHeight.value) > 0) {

		removeBlue();


		arrayBoard[antY][antX] = 0
		square(antY, antX).style.backgroundColor = 'white'
		antX = parseInt(startCoordinatesHeight.value) - 1
		arrayBoard[antY][antX] = 2
		square(antY, antX).style.backgroundColor = 'blue'

		info.textContent = ''



	} 
		infoAboutBadCoordinates();
	
})


start.addEventListener('click', function () {

	if (phase === 1 || phase === 0) {

		if (info.textContent) {
			return;
		}

		id = setInterval(newTurn, 3)
		id2 = setInterval(showColors, 100)

		coordinates.style.visibility = 'hidden'






		phase = 2
		start.textContent = 'Stop'
	} else {
		clearInterval(id)
		clearInterval(id2)

		startCoordinatesHeight.value = antY
		startCoordinatesWidth.value = antX


		coordinates.style.visibility = 'visible'




		phase = 1
		start.textContent = 'Start'
	}

})

function infoAboutBadCoordinates () {

	let badX = !(parseInt(startCoordinatesWidth.value) - 1 < width && parseInt(startCoordinatesWidth.value) > 0)
	let badY = !(parseInt(startCoordinatesHeight.value) - 1 < height && parseInt(startCoordinatesHeight.value) > 0) 
if (!badX && !badY) {
	info.textContent = ''
} else if (badX && badY) {
	info.textContent = 'Współrzędne X i Y nie należą do dopuszczalnego zakresu'
} else if (badX) {
	info.textContent = 'Współrzędna X nie należy do dopuszczalnego zakresu'
} else if (badY) {
	info.textContent = 'Współrzędna Y nie należy do dopuszczalnego zakresu'
}
}


function square (y, x) {
	if (y >= height || x >= width || y < 0 || x < 0) {
		return {style: {}}
	}
	return board.children[y].children[x]
}

function removeBlue () {

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			if (square(i, j).style.backgroundColor === 'blue') {
				square(i, j).style.backgroundColor = 'white'
			}
		}
	}
}










function showColors() {
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			
			if ( arrayBoard[i][j][1]) {
				square(i, j).style.backgroundColor = 'blue'

			} else {
				if (arrayBoard[i][j][0]) {
					square(i, j).style.backgroundColor = 'black'

				} else {
					square(i, j).style.backgroundColor = 'white'

				}
			}
		}
	}
}



function newTurn () {

	let a = Date.now()

	if (arrayBoard[antY][antX][0] === 0) {
		arrayBoard[antY][antX][0] = 1;
		direction--;
				//console.log('+')
			} else if (arrayBoard[antY][antX][0] === 1) {
				arrayBoard[antY][antX][0] = 0
				direction++;
				//console.log('-')
			}

			arrayBoard[antY][antX][1] = 0


			if (direction < 0) {
				direction = 3
			}
			if (direction > 3) {
				direction = 0;
			}
			
			switch(direction) {

				case 0:
				antX--;
				break;
				case 1:
				antY++;
				break;
				case 2:
				antX++;
				break;
				case 3:
				antY--;
				break;

			}	

			if (antX < 0) {
				antX = height - 1
			}
			if (antX > height - 1) {
				antX = 0
			}
			if (antY < 0) {
				antY = width - 1
			}
			if (antY > width - 1) {
				antY = 0;
			}
			arrayBoard[antY][antX][1] = 1

			



		}