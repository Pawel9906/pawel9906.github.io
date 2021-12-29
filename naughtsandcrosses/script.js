
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.lineWidth = 2;

var size = 30;


var width = canvas.width;
var height = canvas.height;

var heightInBlocks = height / size;
var widthInBlocks = width / size;





var Block = function(x, y) {
	this.x = x;
	this.y = y;
	this.xInPixels = x * size + 1;
	this.yInPixels = y * size + 1;
	this.state = 0; 
}

Block.prototype.border = function () {
	context.strokeStyle = "gray";
	context.strokeRect(this.xInPixels, this.yInPixels, size, size);
}

var	 distance = Math.floor(0.1 * size);
if (distance < 1) { 
	distance = 1;
}

Block.prototype.X = function () {
	context.strokeStyle = "black";
	context.beginPath();

	context.moveTo(this.xInPixels + distance, this.yInPixels + distance);
	context.lineTo(this.xInPixels - distance + size, this.yInPixels - distance + size);
	context.moveTo(this.xInPixels - distance + size, this.yInPixels + distance);
	context.lineTo(this.xInPixels + distance, this.yInPixels - distance + size);
	context.stroke();

	this.state = 1;


}



Block.prototype.O = function () {
	context.strokeStyle = "black";
	context.beginPath();
	context.arc(this.xInPixels + size / 2, this.yInPixels + size / 2, size / 2 - distance, 0, Math.PI * 2, true);
	context.stroke();


	this.state = 2;

}






var map = [];
for (let i = 0; i < widthInBlocks; i++) {
	let arrayOfBlocks = [];
	for (let j = 0; j < heightInBlocks; j++) {
		let newBlock = new Block(i, j);
		arrayOfBlocks.push(newBlock);
	}
	map.push(arrayOfBlocks);
}


var newGame = function() {
	

	context.clearRect(0, 0, width, height);

	for (let i = 0; i < widthInBlocks; i++) {
		for (let j = 0; j < heightInBlocks; j++) {
			map[i][j].border();
			map[i][j].state = 0;

		}
	}
};
newGame();


var numberOfSigns = 0;





var mapFunction = function(x, y) {

	if (   (x < 0) || (x > widthInBlocks - 1) || (y < 0) || (y > heightInBlocks - 1)   ) {
		return {state: 0};
	} else {
		return map[x][y];
	}


};




$("#canvas").click(function (event) {


			//debugowanie
			if (event.offsetX >= width || event.offsetY >= height) {
				return;
			}
			//koniec debugowania


			let clickX = Math.floor(event.offsetX / size);
			let clickY = Math.floor(event.offsetY / size);
			

			var clickedBlock = map[clickX][clickY];

			if (clickedBlock.state) {
				return;
			} else {

				if (numberOfSigns % 2 === 0) {
					clickedBlock.X();
				} else {
					clickedBlock.O();
				}
				numberOfSigns++;

				let isWin = []; //to będzie tablica tablic obiektów
				for (let i = 0; i < 20; i++) {
					isWin.push([]);
				}

			 //teraz mamy tablicę 20 pustych tablic 






			 //pion

			 for(let i = 0; i < 5; i++) {
			 	for (let j = 0; j < 5; j++) {

			 		isWin[i][j] = mapFunction(clickX, clickY - 4 + j + i);

			 	}
			 }



			 //poziom

			 for(let i = 5; i < 10; i++) {
			 	for (let j = 0; j < 5; j++) {

			 		isWin[i][j] = mapFunction(clickX - 9 + j + i, clickY);

			 	}
			 }





				//skos \

				for(let i = 10; i < 15; i++) {
					for (let j = 0; j < 5; j++) {

						isWin[i][j] = mapFunction(clickX - 14 + j + i, clickY - 14 + j + i);

					}
				}

				



				//skos /

				for(let i = 15; i < 20; i++) {
					for (let j = 0; j < 5; j++) {

						isWin[i][j] = mapFunction(clickX - 19 + j + i, clickY + 19 - j - i);

					}
				}


				

				//!!!!!

				for (let i = 0; i < 20; i++) {

					for (let j = 0; j < 5; j++) {
						if (isWin[i][j] === undefined) {
							isWin[i][j] = {state: 0};
						}
					}



					if (
						isWin[i][0].state  &&
						(isWin[i][0].state === isWin[i][1].state) &&
						(isWin[i][1].state === isWin[i][2].state) &&
						(isWin[i][2].state === isWin[i][3].state) &&
						(isWin[i][3].state === isWin[i][4].state)
						) {

						context.strokeStyle = "deepskyblue";
					context.lineWidth = 5;
					context.beginPath();
					context.moveTo(isWin[i][0].xInPixels + size / 2, isWin[i][0].yInPixels + size / 2);
					context.lineTo(isWin[i][4].xInPixels + size / 2, isWin[i][4].yInPixels + size / 2);
					context.stroke();
					context.lineWidth = 2;
				}
			}
			//!!!!!!!!




		}


	});




$("#newGame").click( newGame);