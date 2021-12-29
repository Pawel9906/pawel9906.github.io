
$("#back").css({visibility:"hidden"});
$("#winner").css({visibility:"hidden"});
$("#sure").css({visibility:"hidden"});


const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const canvas2 = document.getElementById("canvas2")
const context2 = canvas2.getContext("2d")
let width = canvas.width;
let height = canvas.height;
let size = canvas.width / 8;
let font1 = "24px Arial"
let font2 = "12px Arial"
let font3 = "14px Arial"
let fillTextModifier = 40
let board = [ 
[ [1,2], [9,2], 0, 0, 0, 0, [9, 1], [1, 1] ],
[ [2,2], [9,2], 0, 0, 0, 0, [9, 1], [2, 1] ],
[ [3,2], [9,2], 0, 0, 0, 0, [9, 1], [3, 1] ],
[ [4,2], [9,2], 0, 0, 0, 0, [9, 1], [5, 1] ],
[ [5,2], [9,2], 0, 0, 0, 0, [9, 1], [4, 1] ],
[ [3,2], [9,2], 0, 0, 0, 0, [9, 1], [3, 1] ],
[ [2,2], [9,2], 0, 0, 0, 0, [9, 1], [2, 1] ],
[ [1,2], [9,2], 0, 0, 0, 0, [9, 1], [1, 1] ],
];

let formerBoard;

	let phase = 1; // 1 - przed wybraniem bierki; 2 - po wybraniu
	let player = 1;
	let playerX = function () {
		if (player === 1) {
			return -1
		} else {
			return 1
		}
	};

	changePlayer = function () {
		if (player === 1) {
			player = 2;
		} else {
			player = 1;
		}

		if (player === 1) {
			$("#now").text("Teraz tura gracza niebieskiego");
			$("#now").css({color: 'blue', borderColor: 'blue'})


		} else {
			$("#now").text("Teraz tura gracza czerwonego");
			$("#now").css({color: 'red', borderColor: 'red'})

		}

	}




	showSymbol = function (x, y, symbol) {
		context.font = font1;
		if (symbol === "P") {
			context.fillText(symbol, x * size + fillTextModifier * 0.4, y* size + fillTextModifier * 0.95)

		} else {
			context.fillText(symbol, x * size + fillTextModifier * 0.4, y* size + fillTextModifier * 0.75)
		}

		context.font = font2;

		switch (symbol) {
			case "C":
			context.fillText("Chariot", x * size + fillTextModifier * 0.15, y* size + fillTextModifier * 1.1)
			break;
			case "H":
			context.fillText("Horse", x * size + fillTextModifier * 0.2, y* size + fillTextModifier * 1.1)
			break;
			case "E":
			context.fillText("Elephant", x * size + 1, y* size + fillTextModifier * 1.1)
			break;
			case "M":
			context.fillText("Minister", x * size + 5, y* size + fillTextModifier * 1.1)
			break;
			case "K":
			context.font = font3;
			context.lineWidth = fillTextModifier * 0.05
			context.strokeRect(x * size + 3, y * size + 3, fillTextModifier  *1.1, fillTextModifier *1.1)
			context.fillText("King", x * size + fillTextModifier * 0.25, y* size + fillTextModifier * 1.1)
			break;


		}

	}

	clear1 = function () {
		context.clearRect(0,0,width,height);
		for (let i = 0; i < 9; i++) {
			context.fillStyle="black";
			context.fillRect(i * size - 1, 0, 2, canvas.height);
		};

		for (let i = 0; i < 9; i++) {
			context.fillStyle="black";
			context.fillRect(0, i * size - 1, canvas.width, 2);
		};
	}

	clear1();

	clear2 = function () {
		context2.clearRect(0,0,width,height);

	}

	showFigures = function () {

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {

				let place = board[i][j];

				if (place !== 0) {

					if (place[1] === 1) {
						context.fillStyle = "Blue"
						context.strokeStyle = "Blue"
					} else {
						context.fillStyle = "Red"
						context.strokeStyle = "Red"
					}

					switch (place[0]) {
						case 9:
						showSymbol(i, j, "P")
						break;
						case 1:
						showSymbol(i, j, "C")
						break;
						case 2:
						showSymbol(i, j, "H")
						break;
						case 3:
						showSymbol(i, j, "E")
						break;
						case 4:
						showSymbol(i, j, "M")
						break;
						case 5:
						showSymbol(i, j, "K")
						break;


					}





				}

			}

		}
	};

	showFigures();



	paint = function (row, col, color) {
		context2.fillStyle = color;
		context2.fillRect(row * size + 1, col * size + 1, size - 2, size - 2);
	}

	let movementCols = [];
	let movementRows = [];
	let chosen = [];

	const lastRow = function () {
		if (player === 1) {
			return 0
		} else {
			return 7
		}
	}




	let replicate = function (board) {
		let f = [];
		for (let i = 0; i < 8; i++) {
			f[i] = [];
			for (let j = 0; j <8; j++) {
				if (board[i][j] === 0) {
					f[i][j] = 0
				} else {
					f[i][j] = [];
					f[i][j][0] = board[i][j][0];
					f[i][j][1] = board[i][j][1]
				}
			}
		}
		
		return f;
	};



	let getRow = function (x, row) {
		if (x === undefined || x === 0) {
			return undefined;
		} else {
			return x[row]
		}
	}

	let get1 = function (x) {
		if (x === undefined || x === 0) {
			return undefined;
		} else {
			return x[1]
		}
	}



	$(canvas2).click(function (e) {

		let col = Math.floor(e.offsetX / size)
		let row = Math.floor(e.offsetY / size)
		if (phase === 1) {

			if (player === board[col][row][1]) {
				paint(col, row, "blue")
				let unit = board[col][row][0];
				phase = 2;
				$("#notThisOne").css({visibility:"visible"});

				switch (unit) { //tu długi blok pełen opisów ruchów bierek

					case 1:

					let i = 1;   
					//funkcje debugujące








					//PION W GÓRĘ

					i = 1

					while (board[col][row - i] === 0) { 
						paint(col, row - i, "green")
						movementCols.push(col);
						movementRows.push(row - i)
						chosen = [col, row, board[col][row][0]];
						i++
					}

					if (get1(board[col][row - i]) !== player) {
						paint(col, row - i, "red")
						movementCols.push(col);
						movementRows.push(row - i)
						chosen = [col, row, board[col][row][0]];

					}


					//PION W DÓŁ

					i = -1

					while (board[col][row - i] === 0) { 
						paint(col, row - i, "green")
						movementCols.push(col);
						movementRows.push(row - i)
						chosen = [col, row, board[col][row][0]];
						i--
					}

					if (get1(board[col][row - i]) !== player) {
						paint(col, row - i, "red")
						movementCols.push(col);
						movementRows.push(row - i)
						chosen = [col, row, board[col][row][0]];

					}

					//POZIOM W PRAWO

					i = 1

					while (getRow(board[col + i],row) === 0) {

						paint(col + i, row, "green")
						movementCols.push(col + i);
						movementRows.push(row)
						chosen = [col, row, board[col][row][0]];
						i++

					}

					if (getRow(board[col + i], row) && getRow(board[col + i], row)[1] !== player) {
						paint(col + i, row, "red")
						movementCols.push(col + i);
						movementRows.push(row)
						chosen = [col, row, board[col][row][0]];

					}

					//POZIOM W LEWO

					i = 1

					while (getRow(board[col - i],row) === 0) {

						paint(col - i, row, "green")
						movementCols.push(col - i);
						movementRows.push(row)
						chosen = [col, row, board[col][row][0]];
						i++

					}

					if (getRow(board[col - i], row) && getRow(board[col - i], row)[1] !== player) {
						paint(col - i, row, "red")
						movementCols.push(col - i);
						movementRows.push(row)
						chosen = [col, row, board[col][row][0]];

					}





					break;


					case 2:

					let eightPossibilities = [ [2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2] , [-1, 2], [-1, -2]];

					for (let possibility of eightPossibilities) {
						let i = possibility[0];
						let j = possibility[1];


						if (board[col + i] !== undefined && board[col + i][row + j] !== undefined ) {

							if (board[col + i][row + j] === 0) {

								paint(col + i, row + j, "green")
								movementCols.push(col + i);
								movementRows.push(row + j)
								chosen = [col, row, board[col][row][0]];



							} else if (board[col + i][row + j][1] !== player) {

								paint(col + i, row + j, "red")
								movementCols.push(col + i);
								movementRows.push(row + j)
								chosen = [col, row, board[col][row][0]];

							}

						}


					}


					break;




					case 3:
					chosen = [col, row, board[col][row][0]];


					for (let i = -1; i < 2; i +=2) {
						for (let j = -1; j < 2; j +=2) {


								if (board[col + i] && board[col + i][row + j] === 0) { //...pole na ruch
									paint(col + i, row + j, "green")
									movementCols.push(col + i);
									movementRows.push(row + j)


									

								}

								if (board[col + i] && board[col + i][row + j] && board[col + i][row + j][1] !== player) { //bicie

									paint(col + i, row + j, "red")
									movementCols.push(col + i);
									movementRows.push(row + j)


									

								}


								
							}
						}

					if (board[col][row + playerX()] === 0) { //...pole na ruch
						paint(col, row + playerX(), "green")
						movementCols.push(col);
						movementRows.push(row + playerX())
						

						

					}

					if (board[col][row + playerX()] && board[col][row + playerX()][1] !== player) { //bicie w przód
						paint(col, row + playerX(), "red")
						movementCols.push(col);
						movementRows.push(row + playerX())
						

						

					}

					break;



					case 4:
						chosen = [col, row, board[col][row][0]];
					for (let i = -1; i < 2; i +=2) {
						for (let j = -1; j < 2; j +=2) {
							

								if (board[col + i] && board[col + i][row + j] === 0) { //...pole na ruch
									paint(col + i, row + j, "green")
									movementCols.push(col + i);
									movementRows.push(row + j)


									

								}

								if (board[col + i] && board[col + i][row + j] && board[col + i][row + j][1] !== player) { //bicie

									paint(col + i, row + j, "red")
									movementCols.push(col + i);
									movementRows.push(row + j)


									

								}


								
							}
						}
						break;

						case 5:
						chosen = [col, row, board[col][row][0]];

						for (let i = -1; i < 2; i++) {
							for (let j = -1; j < 2; j++) {
								if (!(i === 0 && j === 0 )) {


								if (board[col + i] && board[col + i][row + j] === 0) { //...pole na ruch
									paint(col + i, row + j, "green")
									movementCols.push(col + i);
									movementRows.push(row + j)


								}

								if (board[col + i] && board[col + i][row + j] && board[col + i][row + j][1] !== player) { //bicie

									paint(col + i, row + j, "red")
									movementCols.push(col + i);
									movementRows.push(row + j)


								}


							}
						}
					}
					break;





					case 9: //jest pionek i zaznaczamy kolorem...
					if (board[col][row + playerX()] === 0) { //...pole na ruch
						paint(col, row + playerX(), "green")
						movementCols.push(col);
						movementRows.push(row + playerX())
						

						chosen = [col, row, board[col][row][0]];

					}

					if (board[col - 1] && board[col - 1][row + playerX()][1] && board[col - 1][row + playerX()][1] !== player) { //...pole na bicie
						paint(col - 1, row + playerX(), "red")
						movementCols.push(col - 1);
						movementRows.push(row + playerX())
						;
						chosen = [col, row, board[col][row][0]];

					}

					if (board[col + 1] && board[col + 1][row + playerX()][1] && board[col + 1][row + playerX()][1] !== player) { //... drugiepole na bicie
						paint(col + 1, row + playerX(), "red")
						movementCols.push(col + 1);
						movementRows.push(row + playerX())
						
						chosen = [col, row, board[col][row][0]];

					}


					break;
				}

				
			}


			

	} else { //phase 2


		//kliknięcie na wybraanay cofa wybranie
		if (col === chosen[0] && row === chosen[1]) {
			notThisOne();
			return;
		}

		if (movementCols.indexOf(col) !== -1 && movementRows.indexOf(row) !== -1) {



			if (chosen[2] === 1 &&   chosen[0] !== col && chosen[1] !== row        ) {
				return; //wieża nie bije na ukos
			}


			if (chosen[2] === 2) { //debugujemy ruch konia

				if (    Math.abs(chosen[0] - col) === Math.abs(chosen[1] - row)   ) {
					return;
				}

			}

			if (chosen[2] === 3 && col === chosen[0] && row !== chosen[1] + playerX()) {
				return;
			}

			//żeby król, minister, słoń nie bili swoich

			if (board[col][row][1] === player) {
				return;
			}








			//zapisuje former board


			formerBoard = replicate(board);

			//koniec former board

			board[chosen[0]][chosen[1]] = 0;

			//promocja

			if (chosen[2] === 9 && row === lastRow()) {
				chosen[2] = 4;
			}

			//koniec promocji

			//śmierć króla

			phase = 1; //żeby po zwycięstwie zostawała faza 3

			if (board[col][row][0] === 5) {
				if (player === 1) {
					$("#winner").text("Wygrywa gracz niebieski")
					$("#winner").css({visibility:"visible", color: "blue"});

				} else {
					$("#winner").text("Wygrywa gracz czerwony")
					$("#winner").css({visibility:"visible", color: "red"});
				}
				$("#now").css({visibility: "hidden"});
				phase = 3;
			}

			//koniec śmierci króla
			board[col][row] = [chosen[2], player];
			clear1();
			showFigures();
			clear2();
			changePlayer();
			movementRows = [];
			movementCols = [];


			

			$("#notThisOne").css({visibility:"hidden"});
			$("#back").css({visibility:"visible"});


		}


	}


});

$('body').keydown(function () {
	phase = 1;
	clear1();
	showFigures();
	clear2();

});

$("#notThisOne").css({visibility:"hidden"});

function notThisOne () {
	phase = 1;
	clear2();
	movementRows = [];
	movementCols = [];
	chosen = [];
	$("#notThisOne").css({visibility:"hidden"})

}

$("#notThisOne").click(notThisOne);

$("#back").click(function () {
	if (phase === 3) {
		$("#now").css({visibility: "visible"});


	}
	board = replicate(formerBoard)
	phase = 1;
	clear1();
	clear2();
	showFigures();
	movementRows = [];
	movementCols = [];
	chosen = [];
	$("#back").css({visibility:"hidden"});
	$("#winner").text("");
	changePlayer();

});

$("#reset").click(function () {
	$("#sure").css({visibility:"visible"})
})

$("#yes").click(function () {
	phase = 1;
	player = 1;
	board = [ 
	[ [1,2], [9,2], 0, 0, 0, 0, [9, 1], [1, 1] ],
	[ [2,2], [9,2], 0, 0, 0, 0, [9, 1], [2, 1] ],
	[ [3,2], [9,2], 0, 0, 0, 0, [9, 1], [3, 1] ],
	[ [4,2], [9,2], 0, 0, 0, 0, [9, 1], [5, 1] ],
	[ [5,2], [9,2], 0, 0, 0, 0, [9, 1], [4, 1] ],
	[ [3,2], [9,2], 0, 0, 0, 0, [9, 1], [3, 1] ],
	[ [2,2], [9,2], 0, 0, 0, 0, [9, 1], [2, 1] ],
	[ [1,2], [9,2], 0, 0, 0, 0, [9, 1], [1, 1] ],
	];
	clear1();
	clear2();
	showFigures();
	movementRows = [];
	movementCols = [];
	chosen = [];
	$("#notThisOne").css({visibility:"hidden"});
	$("#back").css({visibility:"hidden"});
	$("#sure").css({visibility:"hidden"});
	$("#winner").css({visibility:"hidden"});
	$("#now").text("Teraz tura gracza niebieskiego");
	$("#now").css({visibility: "visible", color: "blue"});

});

$("#no").click(function () {
	$("#sure").css({visibility:"hidden"})
})







function setCanvasSize() {



    	if (window.innerWidth < 470) {
    		canvas.width = 250
    		canvas.height = 250
    		canvas2.width = 250
    		canvas2.height = 250
    		canvas2.style.bottom = "259px"
			font1 = "18px Arial"
			font2 = "6px Arial"
			font3 = "8px Arial"
			fillTextModifier = 23
    	} else {
    		canvas.width = 400
    		canvas.height = 400
    		canvas2.width = 400
    		canvas2.height = 400
    		canvas2.style.bottom = "409px"
			font1 = "24px Arial"
			font2 = "12px Arial"
			font3 = "14px Arial"
			fillTextModifier = 40
    	}
    	width = canvas.width
			height = canvas.height;
			size = canvas.width / 8;
    	clear1()
    	clear2()
    	showFigures()
     


}


$(document).ready(function(){
    $(window).resize(setCanvasSize);
});


setCanvasSize();

