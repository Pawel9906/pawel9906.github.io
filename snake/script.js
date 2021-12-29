$("#optionsTable").hide();
$("#newGame2").hide();
$("#menu").hide();
$("#helpText").hide();




//!!!!!!!!! WSTĘPNE ZMIENNE

var elementCanvas = document.getElementById("elementCanvas");
var context = elementCanvas.getContext("2d");

var heightInSquares = 50;
var widthInSquares = 50;
var sizeOfSquare = 10;
var height = heightInSquares * sizeOfSquare;
var width = widthInSquares  * sizeOfSquare;

var direction = "prawo";
var colision = {};
context.font = "16px Arial";
var applesNumber = 5;
var minesNumber = 2;
var wasApple = 0;
var changedDirection = false; //debugowanie
var snakeWidth = 1;
var timeBetweenMoves = 100;
var TimeOfTheSetOfMines = 60000;
var startSnakeLength = 3;
var lossOnMine = 100;
var lossOnWall = 100;
var lossOnSnake = 100;
var snakeColor = "Blue";
var minesColor = "Red";
var applesColor = "Green";
var wallsColor = "Gray";
var phase = "menu";













//!!!!!!!!! WSTĘPNE FUNKCJE

var drawWalls = function () {
	context.fillStyle = wallsColor;
	context.fillRect(0, 0, width, sizeOfSquare);
	context.fillRect(0, height - sizeOfSquare, width, sizeOfSquare);
	context.fillRect(0, 0, sizeOfSquare, height);
	context.fillRect(width - sizeOfSquare, 0, sizeOfSquare, height);
}

var drawScore = function () {
	$("#score").text("Długość: " + snake.length);
	if (snake.length < 1) {
		phase = "koniec";
		snake = [];
		apple = [];
		mine = [];
		context.fillStyle = "Purple";
		context.textBaseline = "medium";
		context.textAlign = "center";
		context.font = "60px Arial Black";
		if (width < 400 || height < 120) {
			context.font = "30px Arial Black";
		}
//?   context.clearRect(0, 0, width, height);
context.fillText("Koniec gry", width / 2, height / 2);
$("#newGame2").show();
$("#menu").show();
}
};



//!!!!!!!!! Square


var Square = function (x, y) {
	this.column = x;
	this.row = y;
}

Square.prototype.drawSquare = function (kolor) {
	context.fillStyle = kolor;
	context.fillRect(this.column * sizeOfSquare, this.row * sizeOfSquare, sizeOfSquare, sizeOfSquare);
}

Square.prototype.compare = function (anotherSquare) {
if (anotherSquare) { // debuge
	return (this.column === anotherSquare.column) && (this.row === anotherSquare.row);
} 
}

Square.prototype.colisionWithWall = function () {
	if (this.column === 0 || this.column === widthInSquares - 1 || this.row === 0 || this.row === heightInSquares - 1) {
		return true;
	}
}

Square.prototype.colisionWithSnake = function () { 
	for (let i = 0; i < snake.length; i++) {
		if ( this.compare(snake[i]) ) {
			return true;
		}
	}
};

Square.prototype.teleport = function () {
	this.row = Math.floor(Math.random() * (heightInSquares - 2)) + 1;
	this.column = Math.floor(Math.random() * (widthInSquares - 2)) + 1;

	for (let i = 0; i < snake.length; i++) {
		if (this.compare(snake[i])) {
			this.teleport();
		}
	}

	for (let i = 0; i < apple.length; i++) {
		if (    this.compare(apple[i]) &&  (apple[i].numer !== this.numer)  ) {
			this.teleport();
		}
	}

	for (let i = 0; i < mine.length; i++) {
		if (    this.compare(mine[i]) &&  (mine[i].numer !== this.numer)  ) {
			this.teleport();
		}
	}


//by mine spawnowała się daleko od węża
if (                (this.type === 2) /* główny spójnik */ && (   Math.abs(this.column - head[0].column) < 5 && Math.abs(this.row - head[0].row) < 5   )                  ) {
	this.teleport();
}



}



Square.prototype.avoidFirstRow = function() {
	if (this.row === 2) {
		this.row = Math.floor(Math.random() * (heightInSquares - 2)) + 1 ;
		this.avoidFirstRow();
	}
}



//!!!!!!!!! apple

var apple = [];
var createApples = function() {
	for (let i = 0; i < applesNumber; i++) {
		apple[i] = new Square (  Math.floor(Math.random() * (widthInSquares - 2)) + 1   ,    Math.floor(Math.random() * (heightInSquares - 2)) + 1);
		apple[i].numer = i;
		apple[i].type = 1;
	}
};

//!!!!!!!!! MINY

var mine = [];
var createMines = function() {
	for (let i = 0; i < minesNumber; i++) {
		mine[i] = new Square (  Math.floor(Math.random() * (widthInSquares - 2)) + 1   ,    Math.floor(Math.random() * (heightInSquares - 2)) + 1);
		mine[i].avoidFirstRow();
		mine[i].numer = i;
		mine[i].type = 2;
	}
};

var enterOnMine = function () {
	for (let i = 0; i < snakeWidth; i++) {
		for (let j = 0; j < minesNumber; j++) {

			if (head[i].compare(mine[j])) {
				cutSnake(lossOnMine);
				mine[j].teleport();
				snakeWidth = 1;
			}

		}
	}
};



//!!!!!!!!! snake I JEGO FUNKCJE


var snake = [];
var createSnake = function() {
	for (let i = 0; i < startSnakeLength; i++) {
		snake[i] = new Square(startSnakeLength - i, 2);
	}
};

var cutSnake = function (x) {
	for (let i = 0; i < x; i++) {
		snake.pop();
	}
}


var head = [
snake[0],
new Square(3, 1),
new Square(3, 3)
];

var drawSnake = function () { 
	for (let i = 0; i < snake.length; i++) {
		snake[i].drawSquare(snakeColor);
	}
	if (snakeWidth > 1) {
		head[1].drawSquare(snakeColor);
		head[2].drawSquare(snakeColor);
		if (snakeWidth > 3) {
			head[3].drawSquare(snakeColor);
			head[4].drawSquare(snakeColor);
			if (snakeWidth > 5) {
				head[5].drawSquare(snakeColor);
				head[6].drawSquare(snakeColor);
			}
		}
	}
};



var snakeMove = function() {

if (direction === "prawo") { // Część 1 - head
	head[0] = new Square(snake[0].column + 1, snake[0].row)
	head[1] = new Square(snake[0].column + 1, snake[0].row - 1)
	head[2] = new Square(snake[0].column + 1, snake[0].row + 1)
	head[3] = new Square(snake[0].column + 1, snake[0].row - 2)
	head[4] = new Square(snake[0].column + 1, snake[0].row + 2)
	head[5] = new Square(snake[0].column + 1, snake[0].row - 3)
	head[6] = new Square(snake[0].column + 1, snake[0].row + 3)
} else if (direction === "lewo") {
	head[0] = new Square(snake[0].column - 1,  snake[0].row)
	head[1] = new Square(snake[0].column - 1, snake[0].row - 1)
	head[2] = new Square(snake[0].column - 1, snake[0].row + 1)
	head[3] = new Square(snake[0].column - 1, snake[0].row - 2)
	head[4] = new Square(snake[0].column - 1, snake[0].row + 2)
	head[5] = new Square(snake[0].column - 1, snake[0].row - 3)
	head[6] = new Square(snake[0].column - 1, snake[0].row + 3)
} else if (direction === "dół") {
	head[0] = new Square(snake[0].column, snake[0].row + 1)
	head[1] = new Square(snake[0].column - 1, snake[0].row + 1)
	head[2] = new Square(snake[0].column + 1, snake[0].row + 1)
	head[3] = new Square(snake[0].column - 2, snake[0].row + 1)
	head[4] = new Square(snake[0].column + 2, snake[0].row + 1)
	head[5] = new Square(snake[0].column - 3, snake[0].row + 1)
	head[6] = new Square(snake[0].column + 3, snake[0].row + 1)
} else if (direction === "góra") {
	head[0] = new Square(snake[0].column, snake[0].row - 1)
	head[1] = new Square(snake[0].column - 1, snake[0].row - 1)
	head[2] = new Square(snake[0].column + 1, snake[0].row - 1)
	head[3] = new Square(snake[0].column - 2, snake[0].row - 1)
	head[4] = new Square(snake[0].column + 2, snake[0].row - 1)
	head[5] = new Square(snake[0].column - 3, snake[0].row - 1)
	head[6] = new Square(snake[0].column + 3, snake[0].row - 1)
}

for (let j = 0; j < snakeWidth; j++) {
	if (head[j].colisionWithSnake() || head[j].colisionWithWall()) {
		if (!snake[0].compare(colision)) {
			if (head[0].colisionWithWall()){
				cutSnake(lossOnWall);
			} else {
				cutSnake(lossOnSnake);
			}
			colision = snake[0];
			snakeWidth = 1;
		}
		return;
	}
}

for (let j = 0; j < snakeWidth; j++) {
	for (let i = 0; i < applesNumber; i++) {
		if (head[j].compare(apple[i])) {
			apple[i].teleport();
			wasApple += 1;
		}
	}
}

//?
if (!wasApple) {
	snake.pop();
} else {
	wasApple -= 1;
}

snake.unshift(head[0]);






}



//!!!!!!!!! 3 FUNKCJE KLUCZOWE


var majorPeriod = 0;

var gameLoop = function () {
	context.clearRect(0, 0, width, height);
	drawWalls();
	if (phase === "gra" ) {


		majorPeriod += timeBetweenMoves;

		snakeMove();

		enterOnMine();

changedDirection = false; //debuge
}
for (let i = 0; i < applesNumber; i++) {
	apple[i].drawSquare(applesColor);
}
for (let i = 0; i < minesNumber; i++) {
	mine[i].drawSquare(minesColor);
}
drawSnake();
drawScore();




if (majorPeriod > TimeOfTheSetOfMines) {

	for (let i = 0; i < minesNumber; i++) {
		mine[i].teleport()
	}
	majorPeriod = 0;

}



if (phase === "gra") {
	setTimeout(gameLoop, timeBetweenMoves);
}
};






$("body").keydown(function (event) {


//I grupa klawiszy
if (phase === "gra"){


	if (snake.length > 1) {
		if (event.keyCode === 37 && direction === "prawo") {
			return;
		} else if (event.keyCode === 38 && direction === "dół") {
			return;
		} else if (event.keyCode === 39 && direction === "lewo") {
			return;
		} else if (event.keyCode === 40 && direction === "góra") {
			return;
		}
	}

if (!changedDirection){ //debuge
	if (event.keyCode === 37) {
		direction = "lewo";
changedDirection = true; //debuge
} else  if (event.keyCode === 38) {
	direction = "góra";
changedDirection = true; //debuge
} else  if (event.keyCode === 39) {
	direction = "prawo";
changedDirection = true; //debuge
} else  if (event.keyCode === 40) {
	direction = "dół";
changedDirection = true; //debuge
} 
}


if (event.keyCode === 81) {

	phase = "pauza";

} else if (event.keyCode === 192  && !snake[0].compare(colision)) {
	snakeWidth += 2;
	if (snakeWidth > 7) {
		snakeWidth = 1;
	} 
} else if (event.keyCode === 8) {
	if (snake.length > 1) {
		snake.pop();
	}
} else if (event.keyCode === 49) {
	snakeWidth = 1;
} else if (event.keyCode === 50 && !snake[0].compare(colision)) {
	snakeWidth = 3;
} else if (event.keyCode === 51 && !snake[0].compare(colision)) {
	snakeWidth = 5;
} else if (event.keyCode === 52 && !snake[0].compare(colision)) {
	snakeWidth = 7;
} else if (event.keyCode === 17) {
	snake.reverse();

	if (snake[0].column + 1 === snake[1].column) {
		direction = "lewo"
	} else if (snake[0].column - 1 === snake[1].column) {
		direction = "prawo"
	} else if (snake[0].row - 1 === snake[1].row) {
		direction = "dół"
	} else if (snake[0].row + 1 === snake[1].row) {
		direction = "góra"
	} 


}



} else if (phase === "pauza") { //druga grupa klawiszy

	if (event.keyCode === 81) {
		phase = "gra";
gameLoop(); //!!!!!!!!!!!!!!!!!!! (!)
}


}

});












$(".newGame").click(function () {
	$("#menuTable").hide();
	$("#newGame2").hide();
	$("#menu").hide();
	$("#debug").html('<canvas id="elementCanvas" height=' + height + ' width=' + width + '></canvas>');
	$("#score").text("");
	elementCanvas = document.getElementById("elementCanvas");
	context = elementCanvas.getContext("2d");
	console.log("!");
	phase = "gra";
	direction = "prawo";
	snake = [];
	mine = [];
	apple = [];
	createSnake();
	createApples();
	createMines();
	gameLoop();
});



$("#options").click(function () {
	$("#pNumberOfMines").val(minesNumber);
	$("#pNumberOfApples").val(applesNumber);
	$("#pWidthInSquares").val(widthInSquares);
	$("#pHeigthInSquares").val(heightInSquares);
	$("#pSizeOfSquare").val(sizeOfSquare);
	$("#pLossOnMine").val(lossOnMine);
	$("#pLossOnWall").val(lossOnWall);
	$("#pLossOnSnake").val(lossOnSnake);
	$("#pStartSnakeLength").val(startSnakeLength);
	$("#pTimeOfTheSetOfMines").val(TimeOfTheSetOfMines / 1000);
	$("#pTimeBetweenMoves").val(timeBetweenMoves);
	$("#optionsTable").show();
});

$("#submit").click(function () {
	minesNumber = $("#pNumberOfMines").val();
	applesNumber = $("#pNumberOfApples").val();
	widthInSquares = Number($("#pWidthInSquares").val());
	heightInSquares = Number($("#pHeigthInSquares").val());
	sizeOfSquare = Number($("#pSizeOfSquare").val());
	width = widthInSquares * sizeOfSquare;
	height = heightInSquares * sizeOfSquare;
	lossOnMine = $("#pLossOnMine").val();
	lossOnWall = $("#pLossOnWall").val();
	lossOnSnake = $("#pLossOnSnake").val();
	startSnakeLength = $("#pStartSnakeLength").val();
	TimeOfTheSetOfMines = Number($("#pTimeOfTheSetOfMines").val() * 1000);
	timeBetweenMoves = Number($("#pTimeBetweenMoves").val());

	snakeColor = document.getElementById("pSnakeColor").value;
	applesColor = document.getElementById("pApplesColor").value;
	minesColor = document.getElementById("pMinesColor").value;
	wallsColor = document.getElementById("pWallsColor").value;


	$("#newGame2").css("top", height - 50 + "px");
	$("#menu").css("top", height - 50 + "px");
	if (width < 300) {
		$("#newGame2").css("top", height - 100 + "px");
		$("#menu").css("left", 50 + "px");
	}
	$("#optionsTable").hide();
});

$(".menuForClick").click(function () {
	phase = "menu";
	context.clearRect(0, 0, width, height);
	$("#newGame2").hide();
	$("#menu").hide();
	$("#helpText").hide();
	$("#menuTable").show();
	$("#score").text("");
});

$("#help").click(function () {
	$("#menuTable").hide();
	$("#helpText").show();

});