// I - ogólne

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const coordinates = document.getElementById("coordinates")
const firstElement = document.getElementById("first")
const secondElement = document.getElementById("second")
const common = document.getElementById("common")
const euclid = document.getElementById("euclid")
const manhattan = document.getElementById("manhattan")
const vector = document.getElementById("vector")
const chooseType =  document.getElementById("chooseType")

let type = 1 //1 - kartezjański; 2 - biegunowy
let counter = 0;
const degsInRad = 180 / Math.PI;
let radius = 3
let first, second;
let xNow, yNow;

context.font = "18px Arial";


let d = canvas.height

// II - funkcje clearPlane, getAngle, fixAngle, showCommon

const clearPlane = function () {

	context.clearRect(0, 0, d,d);

	context.fillStyle = "black";

	if (type === 1) {

		context.fillText("y", d/2 + 10, 30)
		context.fillText("x", d - 30, d/ 2 + 20)

		context.beginPath();
		context.moveTo(d/2, d);
		context.lineTo(d/2, 0);
		context.lineTo(d/2 + 10, 10);
		context.moveTo(d/2, 0);
		context.lineTo(d/2 - 10, 10);

		context.moveTo(0, d/2);
		context.lineTo(d, d/2);
		context.lineTo(d - 10, d/2 - 10);
		context.moveTo(d, d/2);
		context.lineTo(d - 10, d/2 + 10);
		context.stroke();

	} else {

		context.beginPath();
		context.moveTo(d/2, d/2);
		context.lineTo(d/2, 0);
		context.lineTo(d/2 + 10, 10);
		context.moveTo(d/2, 0);
		context.lineTo(d/2 - 10, 10);
		context.stroke();

		context.beginPath();
		context.arc(d/2, d/2, radius, 0, Math.PI * 2, false);
		context.fill();

		context.fillText("r", d/2 + 10, 30)

	}

};

clearPlane();


getAngle = function (x, y) {
	if (x === 0) {
		if (y > 0) {
			return 0;
		} else if (y < 0) {
			return Math.PI;
		} else {
			return "Nieokreślony";
		}
	} else if (y === 0) {
		if (x > 0) {
			return Math.PI / 2;
		} else {
			return Math.PI * 3 / 2
		}
	} else {


 			if (x > 0 && y > 0) { //pierwsza ćwiartka
 				return Math.abs(Math.PI / 2 - Math.atan(y / x) );
 			} else if (x > 0 && y < 0) { //czwarta
 				return Math.PI + Math.atan(x / y);
 			} else if (x < 0 && y < 0) { // trzecia
 				return Math.PI + Math.atan(x / y);
 			} else { //druga
 				return  Math.PI * 2 + Math.atan(x / y);

 			}
 		}
 	};


 	const fixAngle = function (angle, forVector) {
 		if (!forVector) {
 			if (angle === "Nieokreślony") {
 				return "Nieokreślony";
 			} else if (angle === 0) {
 				return 0;
 			} else {
 				return angle.toFixed(2) + ' rad <br /><span class="deg">= ' + (angle * degsInRad).toFixed(2) + " deg</span>";

 			}
 		} else {
 			if (angle === "Nieokreślony") {
 				return "Nieokreślony]";
 			} else if (angle === 0) {
 				return 0 + "]";
 			} else {
 				return angle.toFixed(2) + ' rad <br /><span class="deg">= ' + (angle * degsInRad).toFixed(2) + " deg]</span>";

 			}

 		}
 	};

 	const showCommon = function () {
 		let vectorX = second.x - first.x;
 		let vectorY = second.y - first.y;

 		common.style.display = "block";
 		let euclideanDistance = Math.sqrt(vectorX ** 2 + vectorY ** 2).toFixed(2);
 		let manhattanDistance = Math.abs(vectorX) + Math.abs(vectorY);
 		euclid.innerHTML = euclideanDistance;
 		manhattan.innerHTML = manhattanDistance;

 		if (type === 1) {

 			vector.innerHTML = "[" + vectorX + ", " + vectorY + "]";
 		} else {
 			let vectorR = euclideanDistance;
 			let vectorϕ = getAngle(vectorX, vectorY);
 			vector.innerHTML = "[" + vectorR + ", " + fixAngle(vectorϕ, true);
 		}
 	};



 // III konstruktor Point






 const Point = function (x, y) {
 	this.x = x - d/2;
 	this.y = d/2 - y;

 	this.altX = x;
 	this.altY = y;
 }

 Point.prototype.draw =  function () {
 	context.fillStyle = "blue";
 	context.beginPath();
 	context.arc(this.altX, this.altY, radius, 0, Math.PI * 2, false);
 	context.fill();
 };

 Point.prototype.write = function (element) {
 	if (type === 1) {
 		element.innerHTML = "X: " + this.x + "<br />Y: " + this.y;
 	} else {
 		let angle = getAngle(this.x, this.y);
 		let fixedAngle = fixAngle(angle, false);
 		let distance = Math.sqrt(this.x ** 2 + this.y ** 2).toFixed(2)
 		element.innerHTML = "r: " + distance + "<br />ϕ: " + fixedAngle;
 	}

 }



// IV - obsługa zdarzeń

chooseType.addEventListener("change", function () {
	type = parseInt(chooseType.value);
	clearPlane();
	first.draw();
	second.draw();
	if (counter > 0) {
		first.write(firstElement);
		if (counter === 2) {
			second.write(secondElement);
			showCommon();
		}
	}
}, true);


canvas.addEventListener("mousemove", function (e) {
	xNow = e.offsetX - d/2;
	yNow = d/2-e.offsetY;
	if (type === 1) {
		coordinates.innerHTML = "X: " + xNow + "<br />Y: " + yNow;
	} else {
		let r = Math.sqrt(xNow ** 2 + yNow ** 2)
		let angle = getAngle(xNow, yNow);
		coordinates.innerHTML = "r: " + r.toFixed(2) + "<br />ϕ: " + fixAngle(angle, false);
	}
}, false);

canvas.addEventListener("click", function (e) {
	counter++;
	if (counter === 3) {
		counter = 1;
	}

	if (counter === 1) {
		clearPlane();
		secondElement.innerHTML = "";
		second = null;
		common.style.display = "none";

		first = new Point(e.offsetX, e.offsetY);
		first.draw();
		first.write(firstElement);

	}

	if (counter === 2) {		
		second = new Point(e.offsetX, e.offsetY);
		second.draw();
		second.write(secondElement);

		showCommon();


	}

}, false);






// RWD



function setCanvasSize() {

	

	if (window.innerWidth < 470) {
		canvas.setAttribute('width', 250)
		canvas.style.width = '250px'
		canvas.setAttribute('height', 250)
		canvas.style.height = '250px'
		radius = 2

	}	else if (window.innerWidth < 700) {
		canvas.setAttribute('width', 400)
		canvas.style.width = '400px'
		canvas.setAttribute('height', 400)
		canvas.style.height = '400px'
		radius = 2


	} else {
		canvas.setAttribute('width', 500)
		canvas.style.width = '500px'
		canvas.setAttribute('height', 500)
		canvas.style.height = '500px'
		radius = 4
	}
			d = canvas.width
		clearPlane()




		secondElement.innerHTML = "";
		second = null;
		common.style.display = "none";

		first = null;
		firstElement.innerHTML = ""
		counter = 0
	



}

setCanvasSize()

window.addEventListener('resize', setCanvasSize)

const mediaQueryList = window.matchMedia('(max-width: 700px)');

mediaQueryList.addListener(setCanvasSize);