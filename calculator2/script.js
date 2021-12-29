
	let phase = 1; // 1 - pierwszy wektor | 1.5 - wprowadzenie dziaania | 2 - drugi | 3 - wynik
	let vector1 = [];
	let vector2 = [];
	let result = [];
	let present = "";
	let operation;

	var screen = document.getElementById("screen");

	//!!!!!!!!!!FUNCKJE NIE OD PRZYCISKÓW


	var refresh = function () {
		switch (phase) {

			case 1:
			if (vector1.length === 0) {
				screen.innerHTML = "[ " + present + " ]"
			} else {
				screen.innerHTML = "[ " + vector1.join(", ") + ", " + present + " ]"

			}

			break;

			case 1.5:
			screen.innerHTML = "[ " + vector1.join(", ") +  " ] " + operation
			break;


			case 2:
			if (vector2.length === 0) {
				screen.innerHTML = "[ " + vector1.join(", ") +  " ] " + operation + " [ " + present + " ]" 
			} else {
				screen.innerHTML = "[ " + vector1.join(", ") +  " ] " + operation + " [ " + vector2.join(", ") + ", " + present + " ]"

			}
			break;

			case 3:

			if (typeof result === "number") {
				screen.innerHTML = result
			} else {
				screen.innerHTML = "[ " + result.join(", ") +  " ] ";
			}
			break;

		}
	}

	var stringToNumber = function (x) {
		let i = x.indexOf('.');
		if (i === -1) {
			return Number(x)
		}

		let x1 = x.slice(0, i + 1);
		let x2 = x.slice(i+1);


		x2 = x2.split(".").join("")


		let x12 = x1 + x2


		if (x12 === ".") {
			return 0
		}

		return Number(x12)
	}

	var toSecondVector = function () {
		if (phase === 1.5) {
			phase = 2;
		}

		//poniższe if nie pasuje do nazwy funkcji; późno postanowiłem dodać taką funkcjonalność i zauważyłem, że pasuje właśnie w tym miejscu; nazwa funkcji zostaje jaka była wcześniej
		if (phase === 3) {
			vector1 = [];
			vector2 = [];
			present = ""
			phase = 1;
		}

	}

	var setEqualDimensions = function () {

		if (present !== "") {

		present = stringToNumber(present)
		vector2.push(present);
		present = "";

		}


		while (vector1.length > vector2.length) {
			vector2.push(0);
		}

		while (vector1.length < vector2.length) {
			vector1.push(0);
		}
		
	}

	var setThreeDimensions = function () {
		while (vector1.length < 3) {
			vector1.push(0);
		}
		while (vector2.length < 3) {
			vector2.push(0);
		}

	}

	//!!!! FUNKCJE PRZYCISKÓW

	//liczby-znaki-działania-inne

	//liczby


	function f1 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "1"
		}
	}

		function f2 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "2"
		}
	}

			function f3 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "3"
		}
	}

			function f4 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "4"
		}
	}

			function f5 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "5"
		}
	}

			function f6 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "6"
		}
	}

			function f () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += ""
		}
	}

			function f7 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "7"
		}
	}

			function f8 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "8"
		}
	}

			function f9 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "9"
		}
	}

			function f0 () {
		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "0"
		}
	}

	//znaki

	function fDot () {

		toSecondVector();
		if (phase === 1 || phase === 2) {
			present += "."
		}
	}

	function fComma () {

		if (phase === 2 && operation === "x" && vector2.length === 2) {
			return;
		}

		if (phase === 1.5) {
			phase = 2;
			vector2.push(0)
			present = ""
			return;
		}



		if (!(phase === 1 || phase === 2)) {
			return;
		}
		present = stringToNumber(present)
		if (phase === 1) {
			vector1.push(present)
		} 
		if (phase === 2) {
			vector2.push(present)
		}
		present = "";
	}

	function fMinus2 () {

		toSecondVector();

		if (   (phase === 1 || phase === 2)    &&  present.length === 0    )   {
			present +="-";
		}


	}

	// działania

	function fPlus () {
		if (phase === 1) {
			present = stringToNumber(present)
			vector1.push(present)
			present = "";
		}
		if (phase === 3) {
			if (typeof result === "number") {
				vector1 = [result]
			} else {
				vector1 = result;
			}
			vector2 = [];
			phase = 1.5;
		}
		if (phase === 1 || phase === 1.5) {
			phase = 1.5;
			operation = "+";
		}
		
	}

		function fMinus () {
		if (phase === 1) {
			present = stringToNumber(present)
			vector1.push(present)
			present = "";
		}
		if (phase === 3) {
			if (typeof result === "number") {
				vector1 = [result]
			} else {
				vector1 = result;
			}
			vector2 = [];
			phase = 1.5;
		}
		if (phase === 1 || phase === 1.5) {
			phase = 1.5;
			operation = "-";
		}
	}

			function fDotProduct () {
		if (phase === 1) {
			present = stringToNumber(present)
			vector1.push(present)
			present = "";
		}
		if (phase === 3) {
			if (typeof result === "number") {
				vector1 = [result]
			} else {
				vector1 = result;
			}
			vector2 = [];
			phase = 1.5;
		}
		if (phase === 1 || phase === 1.5) {
			phase = 1.5;
			operation = "•";
		}
	}


	function fVectorProduct () {
		if (phase === 1) {

			if (present === "") {

				if (vector1.length > 3) {
				return;
				}	

				if (vector1.length === 0) {
					vector1.push(0);
				}

			} else {
				if (vector1.length > 2) {
					return;
				}
				vector1.push(stringToNumber(present));
				present = ""
			}
			operation = "x"
			phase = 1.5
			
		} else if (phase === 1.5) {
			if (vector1.length < 4) {
				operation = "x"
			}
		} else if (phase === 3) {
			if (result.length < 4) {
				operation = "x"
				phase = 1.5
				vector1 = result;
				vector2 = []
			}
		}
	
	}


	//inne
	function fEquals () {

		if (phase !== 2) {
			return;
		}

		phase = 3

		switch(operation) {

			//DODAWANIE
			case "+":
			setEqualDimensions();
			result = [];
			for (let i = 0; i < vector1.length; i++) {
				result.push(vector1[i] + vector2[i]);
			}
			break;

			//ODEJMOWANIE
			case "-":
			setEqualDimensions();
			result = [];
			for (let i = 0; i < vector1.length; i++) {
				result.push(vector1[i] - vector2[i]);
			}
			break;
			

						//ILOCZYN SKALARNY
			case "•":
			setEqualDimensions();
			result = 0;
			for (let i = 0; i < vector1.length; i++) {
				result += vector1[i] * vector2[i]
			}
			break;


			case "x":
			vector2.push(stringToNumber(present));
			present = "";
			setThreeDimensions();
			result = [];
			result.push(vector1[1] * vector2[2] - vector1[2] * vector2[1])
			result.push(vector1[2] * vector2[0] - vector1[0] * vector2[2])
			result.push(vector1[0] * vector2[1] - vector1[1] * vector2[0])





		}

	}

	function fBackspace () {
		if (present.length && phase !== 1.5 && phase !== 3) {
			present = present.slice(0, present.length - 1)
			return;
		}

		switch (phase) {
			case 1:
			if (vector1.length === 0) {
				return;
			} 
			present = String(vector1[vector1.length - 1]);
			vector1.pop();
			break;

			case 1.5:
			present = String(vector1[vector1.length - 1]);
			vector1.pop();
			phase = 1
			break;

			case 2:
			if (vector2.length === 0) {
				phase = 1.5
			} 
			present = String(vector2[vector2.length - 1]);
			vector2.pop();
			break;

			case 3:
			if (!Array.isArray(result)) {
				vector1 = []
				present = String(result);
				present = present.slice(0, present.length - 1)
			} else {
				present = String(result[result.length - 1])
				present = present.slice(0, present.length - 1)
				result.pop();
				vector1 = result;
			}
			vector2 = [];
			phase = 1;
			break;


		}
	}

	function fC () {
		vector1 = [];
		vector2 = [];
		present = "";
		phase = 1;
	}

	//!!!!! funkcje do przycisków

	let buttons = document.getElementById("buttons")
	buttons.addEventListener('click', refresh, false)

	let button1 = document.getElementById("n1")
	button1.addEventListener('click', f1, false)

	let button2 = document.getElementById("n2")
	button2.addEventListener('click', f2, false)

	let button3 = document.getElementById("n3")
	button3.addEventListener('click', f3, false)

	let button4 = document.getElementById("n4")
	button4.addEventListener('click', f4, false)

	let button5 = document.getElementById("n5")
	button5.addEventListener('click', f5, false)

	let button6 = document.getElementById("n6")
	button6.addEventListener('click', f6, false)

	let button7 = document.getElementById("n7")
	button7.addEventListener('click', f7, false)

	let button8 = document.getElementById("n8")
	button8.addEventListener('click', f8, false)

	let button9 = document.getElementById("n9")
	button9.addEventListener('click', f9, false)

	let button0 = document.getElementById("n0")
	button0.addEventListener('click', f0, false)

	let buttonC = document.getElementById("c")
	buttonC.addEventListener('click', fC, false)

	let buttonBackspace = document.getElementById("backspace")
	buttonBackspace.addEventListener('click', fBackspace, false)

	let buttonDot = document.getElementById("dot")
	buttonDot.addEventListener('click', fDot, false)

	let buttonComma = document.getElementById("comma")
	buttonComma.addEventListener('click', fComma, false)

	let buttonMinus2 = document.getElementById("minus2")
	buttonMinus2.addEventListener('click', fMinus2, false)

	let buttonPlus = document.getElementById("plus")
	buttonPlus.addEventListener('click', fPlus, false)

	let buttonMinus = document.getElementById("minus")
	buttonMinus.addEventListener('click', fMinus, false)

	let buttonDotProduct = document.getElementById("dotProduct")
	buttonDotProduct.addEventListener('click', fDotProduct, false)

	let buttonVectorProduct = document.getElementById("vectorProduct")
	buttonVectorProduct.addEventListener('click', fVectorProduct, false)

	let buttonEquals = document.getElementById("equals")
	buttonEquals.addEventListener('click', fEquals, false)

	//klawiatura

	let keyboard = function (e) {

		if (!e.shiftKey) {
			switch (e.keyCode) {
				case 49:
				f1();
				break;

				case 50:
				f2();
				break;

				case 51:
				f3();
				break;

				case 52:
				f4();
				break;

				case 53:
				f5();
				break;

				case 54:
				f6();
				break;

				case 55:
				f7();
				break;

				case 56:
				f8();
				break;

				case 57:
				f9();
				break;

				case 48:
				f0();
				break;

				case 189:
				fMinus();
				break

				case 187:
				fEquals();
				break;

				case 88:
				fVectorProduct();
				break;

				case 188:
				fComma();
				break;

				case 190:
				fDot();
				break;

				case 8:
				fBackspace();
				break;

				case 67:
				fC();
				break;
			}
		} else {
			switch (e.keyCode) {
				case 189:
				fMinus2();
				break;

				case 187:
				fPlus();
				break;

				case 56:
				fDotProduct();
				break;
			}
		}

		refresh();


	}

	document.addEventListener("keyup", keyboard, false)

	


