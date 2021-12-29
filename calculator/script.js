
		// I - ustawienia wstępne
		const scr = document.getElementById('scr');
		const buttons = document.getElementById('buttons')
		const operationSign = document.getElementById('operationSign')
		const numberField = document.getElementById('numberField')
		let firstNumber = 0, operation;

		// Bug z NaN
	function removeBug() {
			if (scr.textContent === 'Błąd') {
				scr.textContent = ''
			}
	}


		// II - obsługa myszy
		


		buttons.addEventListener('click', function (e) {
			removeBug();
			switch (e.target.dataset.name) {

				case "num":
				addNumber(e.target.innerText);
				break;

				case "operation":
				addOperation(e.target.innerText);
				break;

				case "equals":
				eq2();
				break;



				case "dot":
				addDot();
				break;

				case 'backspace':
				backspace()
				break;

				case 'cancel':
				c();


			}
		})



		// III - obsługa klawiatury


		window.addEventListener('keydown', function (e) {

			switch (e.key) {

				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
				case '0':
				removeBug();
				addNumber(e.key)
				break;

				case '+':
				case '-':
				case '*':
				case '/':
				removeBug();
				addOperation(e.key)
				break;

				case '=':
				removeBug();
				eq2();
				break;

				case '.':
				removeBug();
				addDot();
				break;

				case 'Backspace':
				removeBug();
				backspace();
				break;

				case 'c':
				case 'C':
				removeBug();
				c();
				break;

				//case '':
				
			}
		})



// IV - funkcje przycisków



function addNumber(n) {
	if (scr.textContent.length > 15) {
		return;
	}
	let dotIndex = scr.textContent.indexOf('.');
	if (dotIndex !== -1 && scr.textContent.slice(dotIndex).length > 7) {
		return;
	}
	scr.textContent = deleteZero( scr.textContent + n)
}



function addOperation(n) {
	if (operation === undefined) {
		firstNumber = Number(scr.textContent)
		numberField.textContent = firstNumber;
		scr.textContent = 0;
		operation = n
		operationSign.textContent = n
		
	} else { 
		numberField.textContent = fix(eq());
		firstNumber = fix(eq());
		
	}

	scr.textContent = 0;
	operation = n
	operationSign.textContent = n
}


function eq2() {
	if (operation) {
		scr.textContent = fix(eq());
		operation = undefined;
		numberField.textContent = '\xa0'
		operationSign.textContent = '';
	}
}

function addDot() {
	if (scr.textContent.indexOf('.') === -1) {
		scr.textContent += '.'

	}
}

function backspace() {
	scr.textContent = scr.textContent.slice(0, -1)
	if (scr.textContent === '') {
		scr.textContent = '0'
	}
}

function c() {

	scr.textContent = '';
	numberField.textContent = '\xa0';
	operationSign.textContent = '';
	operation  = undefined;
	firstNumber = 0;

}





// V - funkcje dodatkowe deleteZero i eq


function deleteZero (str) {
	if (str[0] === '0' && str[1] !== '.') {
		return str.slice(1);
	}
	return str;
}


function eq () {
	switch (operation) {
		case '+':
		return firstNumber + Number(scr.textContent);
		break;
		case '-':
		return firstNumber - Number(scr.textContent);
		break;
		case '*':
		return firstNumber * Number(scr.textContent);
		break;
		case '/':
		if (Number(scr.textContent) == 0) {
			return 'Błąd'
		}
		return firstNumber / Number(scr.textContent);
		break;
	}
}


function fix (x) {

	if (x == 'Błąd') {
		return 'Błąd'
	}

	//usuńmy za duże

	if (x > 999999999999999) {
		return 999999999999999
	}

	//sprawdźmy, czy w ogóle jest .
	if (String(x).indexOf('.') === -1) {
		return x;
	}
	console.log(x)
	let y = x.toFixed(7);

	for (let i = 1;  i < 8; i++) {
		if (y[y.length - 1] === '0') {
			y = y.slice(0, y.length -1)
		}
	}

	if (y[y.length - 1] === '.') {
		y = y.slice(0, y.length -1)
	}



console.log(y)
	//po wstępnej obróbce sprawdzamy, czy liczba nie jest za duża
	if (y.length > 16) {
		y = y.substring(0, 17);
	}

	return y

	
}
