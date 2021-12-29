
	function firstZeroesToSpaces (x, underlined)   {
		let firstNoZero = 0;
		x = String(x)
		while (firstNoZero < x.length && x[firstNoZero] === '0') {
			firstNoZero++
		}

		let spaces = ''
		for (let j = 0; j < firstNoZero; j++) {
			spaces += '&nbsp;'
		}

		if (spaces.length / 5 === x.length) {
			console.log('????')
			return spaces.slice(0, spaces.length - 5) + '0'
		}

		let result = spaces + x.slice(firstNoZero)


		if (!underlined) {
			return result

		} else  {
			
			let index = result.lastIndexOf('&nbsp;')
			if (index === -1) {
				index= 0
			} 
				return result.slice(0, index) + '<span class="underlined">' + result.slice(index) + "</span>"
			
		}
		

	}



	String.prototype.toLength = function (n) {
		let result = String(this)
		while (result.length < n) {
			result = '0' + result
		}
		return result
	}

	function subtract (a, b) {
		let result = String(  BigInt(a) - BigInt(b) )
		return result.toLength(String(a).length)
	}


	const numberA = document.getElementById('numberA')
	const numberB = document.getElementById('numberB')
	const start = document.getElementById('start')
	const resultField = document.getElementById('resultField')
	const startField = document.getElementById('startField')
	const mainField = document.getElementById('mainField')
	const finalField = document.getElementById('finalField')



const nums = ['1','2','3','4','5','6','7','8','9','0', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']


	numberA.addEventListener('keydown', function (e) {
		if (e.key === 'e' || e.key === '-' || e.key === '+' || e.key === '.' || e.key === ',') {
			e.preventDefault();
		}
	})

	numberB.addEventListener('keydown', function (e) {
		if (e.key === 'e' || e.key === '-' || e.key === '+' || e.key === '.' || e.key === ',') {
			e.preventDefault();
		}
	})


	

	start.addEventListener('click', function() {
		

		let a = String(BigInt(numberA.value))
		let b = String(BigInt(numberB.value))

		resultField.textContent = ''
		startField.innerHTML = '<span class="overlined">' + BigInt(a) + '</span>&nbsp;/&nbsp;' + BigInt(b)
		mainField.textContent = ''
		finalField.textContent = ''



		if (a === '' || b === '') {
			startField.innerHTML = ''
			return;
		}

		if (BigInt(b) === 0n) {
			startField.innerHTML = "Nie można dzielić przez 0"
			return;
		}

		if (BigInt(a) === 0n) {
			console.log("!")
			resultField.textContent = '0'
			finalField.textContent = 'Wynik: 0, reszta: 0'
			return;

		}


		if (BigInt(a) < BigInt(b)) {
			resultField.textContent = '0'.toLength(a.length)
			finalField.textContent = 'Wynik: 0, reszta: ' + a

			return;
		}

		let current = a[0]

		while (BigInt(current) < BigInt(b)) {
			current += a[current.length]
			resultField.innerHTML += '0'
		}

		let end = false

		while (!end) {


	

		let toResult =  BigInt(current) / BigInt(b) 
		resultField.innerHTML += toResult
		
		let toSubtract = toResult * BigInt(b)
		mainField.innerHTML +=firstZeroesToSpaces(  (String(toSubtract).toLength(current.length) + '<br/>'), true     )
		let result = subtract(current, toSubtract)
		
		current = result;




		//niepewne

		let possibleRemainder =  BigInt( current +  ( String(a).slice(current.length) )   )

		if (possibleRemainder < b) {
		
			end = true;
			while (resultField.textContent.length < String(a).length) {
				resultField.textContent += '0'
			}
			mainField.innerHTML += firstZeroesToSpaces(     String(possibleRemainder).toLength(a.length)          )
			finalField.innerHTML = 'Wynik: ' + BigInt(resultField.textContent) + ', reszta: ' + possibleRemainder

		} else {


			current += a[current.length]


				while (BigInt(current) < BigInt(b)) {
			current += a[current.length]
			resultField.innerHTML += '0'
				}

				mainField.innerHTML += firstZeroesToSpaces(   current + '<br/>'   )

				}



		}



	})