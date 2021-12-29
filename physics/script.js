var PhysicalQuantity = function (value) {
	this.value = value;
	this.new = "";
	this.show = false; 
}

PhysicalQuantity.prototype.actualize = function () {

	if (this === vue.x || this === vue.y) {
		if (parseFloat(this.new) < 1) {
			this.new = '1'
		} else if (parseFloat(this.new) > canvas.width) {
			console.log("+++")
			this.new = canvas.width
		}
	}



	if ( this.new === ""  ) {
		this.value = 0;
	} else if ( !isNaN( parseFloat(this.new) ) ) {
		this.value = parseFloat(this.new);
	}
	this.show = false;
}

var LesserPhysicalQuantity = function (value) {
	this.value = value;
	this.new = ""; 
}

LesserPhysicalQuantity.prototype.actualize = function () {



		if (this === vue.e.x || this === vue.e.y) {
		console.log("!")
		if (parseFloat(this.new) < 1) {
			this.new = '1'
		} else if (parseFloat(this.new) > canvas.width) {
			console.log("+++")
			this.new = canvas.width
		}
	}


	if ( this.new === ""  ) {
		this.value = 0;
	} else if ( !isNaN( parseFloat(this.new) ) ) {
		this.value = parseFloat(this.new);
	}
	this.show = false;
}



var vue = new Vue({ 
	el: '#app',
	data: {
		x: new PhysicalQuantity(100),
		y: new PhysicalQuantity(100),
		r: 5,
		pX: new PhysicalQuantity(0),
		pY: new PhysicalQuantity(0),
		m: new PhysicalQuantity(5),
		q: new PhysicalQuantity(10),
		b: new PhysicalQuantity(0),

		partOfMenu: 1,



		e: {
			show: false,
			type: new LesserPhysicalQuantity("Brak"),
			x: new LesserPhysicalQuantity(0),
			y: new LesserPhysicalQuantity(0),
			ex: new LesserPhysicalQuantity(0),
			ey: new LesserPhysicalQuantity(0),
			q: new LesserPhysicalQuantity(0),
			actualize: function () {
				this.type.value = this.type.new;
				this.x.actualize();
				this.y.actualize();
				this.ex.actualize();
				this.ey.actualize();
				this.q.actualize();
				this.show = false;

			}
		},


		showVx: false,
		showVy: false,

		newVx: "",
		newVy: "",


		draw: false,

		pause: false,

		showEffects: false,


	},
	computed: {
		vX: function () {
			return this.pX.value / this.m.value;
		},
		vY: function () {
			return this.pY.value / this.m.value;
		},
		v: function () {
			return Math.sqrt(this.vX ** 2 + this.vY ** 2);
		},

		p: function () {
			return Math.sqrt(this.pX.value ** 2 + this.pY.value ** 2);
		},

		eK: function () {
			return this.p ** 2 / 2 / this.m.value;
		},


		forceLorentz: function () {
			return this.q.value * this.b.value * this.v;
		},

		radius: function () {
			return this.p / this.q.value / this.b.value;

		},

		radiusShowed: function () {
			if (isNaN(this.radius) || this.forceLorentz === 0) {
				return "-";
			} else {
				return Math.abs(this.radius).toFixed(3);
			}

		},

		period: function () {
			return Math.PI * 2 * this.radius / this.v;
		},


		periodShowed: function () {
					//(period / 40).toFixed(3)
					if (isNaN(this.period) || this.period === Infinity) {
						return "-";
					} else {
						return Math.abs( (this.period / 20) ).toFixed(3) + " s";
					}
				},

				angularVelocity: function () 	{
					return Math.PI * 2 / this.period;
				},

				angularVelocityShowed: function () {
					if (isNaN(this.angularVelocity) || this.angularVelocity === 0) {
						return "-";
					} else {
						return (this.angularVelocity * 20 * 180 / Math.PI).toFixed(1) + " deg / s"
					}
				}



			},

			methods: {

				notE: function (event) {
					if (event.key === "E" || event.key === "e" ) {
						event.preventDefault()
					}
			},

			onlyDigits: function (event) { // ściśle mówiąc, nie tylko cyfry, ale i . ,
				if (event.key === "e" || event.key === "E" || event.key === "+" || event.key === "-") {
					event.preventDefault()
				}

			},
			clear: function () {
				context2.clearRect(0, 0, width, height);
			},

			actualizeM: function () {

					if (vue.m.new == 0) {
						vue.m.value = 0.001;
					} else {
						vue.m.value = parseFloat(vue.m.new);
					}

					vue.m.show = false;

				},

				actualizeE: function () {
					vue.eType = vue.newEtype;
					vue.eX = vue.newEx;
					vue.eY = vue.newEy;
					vue.eQ = vue.newEq;
					vue.eEX = vue.newEex;
					vue.eEY = vue.newEey;
				},

				actualizeVX: function () {
					if ( vue.newVx === "" ) {
						vue.pX.value = 0;
					} else if ( ! isNaN( parseFloat(vue.newVx) ) ) {
						vue.pX.value = parseFloat(vue.newVx) * vue.m.value;
					}
					vue.showVx = false;
				},


				actualizeVY: function () {
					if ( vue.newVy === "" ) {
						vue.pY.value = 0;
					} else if ( ! isNaN( parseFloat(vue.newVy) ) ) {
						vue.pY.value = parseFloat(vue.newVy) * vue.m.value;
					}
					vue.showVy = false;
				},

				circle: function () {
					vue.eType = "Brak";
					vue.q.value = 5
					vue.b.value = 0.01;
					vue.m.value = 5;
					vue.pX.value = 5;
					vue.pY.value = 0;
					vue.x.value = 275;
					vue.y.value = 275;

				},

					elipse: function () {
					vue.e.type.value = "Centralne";
					vue.e.x.value = 300;
					vue.e.y.value = 300;
					vue.e.q.value = -200;

					vue.q.value = 5
					vue.b.value = 0;
					vue.m.value = 5;
					vue.pX.value = 10;
					vue.pY.value = 0;
					vue.x.value = 250;
					vue.y.value = 200;



				},


					mandala: function () {
					vue.e.type.value = "Centralne";
					vue.e.x.value = 300;
					vue.e.y.value = 300;
					vue.e.q.value = -400;

					vue.q.value = 5
					vue.b.value = 0.005;
					vue.m.value = 5;
					vue.pX.value = 10;
					vue.pY.value = 0;
					vue.x.value = 200;
					vue.y.value = 200;



				}
			}



		});

vue.e.type.new = "Brak";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2");
var context2 = canvas2.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var circle = function() {
	context.beginPath();
	context.arc(vue.x.value, vue.y.value, 5, 0, Math.PI * 2);
	context.fill();

};

var clear = function () {
	context.clearRect(0, 0, width, height);
	if (vue.e.type.value === 'Centralne' ) {
		context.fillStyle = "black";
		context.fillRect(vue.e.x.value - 2, vue.e.y.value - 2, 4, 4);
	}

}

var draw = function () {
	if (vue.draw) {
		context2.strokeStyle = "deepskyblue";
		context2.beginPath()
		context2.moveTo(oldX, oldY);
		context2.lineTo(vue.x.value, vue.y.value);
		context2.stroke();
	}
}


var ep = function (x, y, q) {
	var ex = q * vue.eQ / (x - vue.eX);
	ex = Math.abs(ex) * Math.sign(q * vue.q.value)
	var ey = q * vue.eQ / (y - vue.eY);
	ey = Math.abs(ey) * Math.sign(q * vue.q.value)
	return [ex, ey];
}

var angle = function(x1, y1, x2, y2) {
	var dx = x1 - x2
	var dy = y1 - y2
	if (!dx && !dy) {
		return "Nieokreślony";
	} else if (!dx) {
		if (dy < 0) {
			return Math.PI * 3 / 2;
		} else {
			return Math.PI / 2;
		}
	} else if (!dy) {
		if (dx < 0) {
			return Math.PI;
		} else {
			return 0;
		}
	} else if (x1 > x2 && y1 > y2) {
		return Math.atan( dy / dx );
	} else if (x1 < x2 && y1 > y2) {
		return Math.PI + Math.atan( dy / dx );
	} else if (x1 < x2 && y1 < y2) {
		return Math.PI + Math.atan( dy / dx );
	}  else if (x1 > x2 && y1 < y2) {
		return 2 * Math.PI + Math.atan( dy / dx );
	} 
}

var distance = function (x1, y1, x2, y2) {
	return Math.sqrt(  (x1 - x2) ** 2  + (y1 - y2) ** 2   )
}


var oldX, oldY;

	/*
	ZMIANY PĘDU
	 - pole elektrostatyczne
	  - pole magnetyczne

	  */


	  var changeMomentumE = function () {
	  	if (vue.e.type.value === "Centralne") {




	  		var r = distance(vue.x.value,  vue.y.value, vue.e.x.value, vue.e.y.value);
	  		var f = vue.q.value * vue.e.q.value / r ** 2

	  		
	  		


	  		if (r < Math.abs(f) && Math.sign(vue.e.q.value) !== Math.sign(vue.q.value) ) {
	  			vue.pX.value = 0;
	  			vue.pY.value = 0;
	  			vue.x.value = vue.e.x.value;
	  			vue.y.value = vue.e.y.value;
	  		} else {






	  			vue.pX.value += f * Math.cos(angle(vue.x.value, vue.y.value, vue.e.x.value, vue.e.y.value))
	  			vue.pY.value += f * Math.sin(angle(vue.x.value, vue.y.value, vue.e.x.value, vue.e.y.value))
	  		}
	  	}

	  	if (vue.e.type.value === "Jednorodne") {

	  		vue.pX.value += vue.q.value * vue.e.ex.value;
	  		vue.pY.value += vue.q.value * vue.e.ey.value;

	  	}
	  };

	  var changeMomentumM = function () {

	  	if (vue.forceLorentz) {
	  		if (angle(vue.pX.value, vue.pY.value, 0, 0) === "Nieokreślony") {
	  			var newAngle = vue.angularVelocity / 4;
	  		} else {
	  			var newAngle = angle(vue.pX.value, vue.pY.value, 0, 0) + vue.angularVelocity / 4;
	  		}
	  		if (newAngle >= Math.PI * 2) {
	  			newAngle -= Math.PI * 2;
	  		}
	  		var pValue = vue.p;
	  		vue.pX.value = pValue * Math.cos(newAngle);
	  		vue.pY.value = pValue * Math.sin(newAngle);

	  	}


	  };






	/*
	Koniec zmian pędu
	*/

	setInterval(function () {

		clear();
		circle();
		draw();

		if (!vue.pause) {





			var vX = vue.pX.value / vue.m.value;
			var vY = vue.pY.value / vue.m.value;
			oldX = vue.x.value;
			oldY = vue.y.value;
			vue.x.value += vX;
			vue.y.value += vY;
			

			changeMomentumM();
			changeMomentumE();
			changeMomentumM();





			//odbicia
			if (vue.x.value > width || vue.x.value < 0) {
				vue.pX.value *= -1;
			}
			if (vue.y.value > height || vue.y.value < 0) {
				vue.pY.value *= -1;
			}

			changeMomentumM();
			changeMomentumE();
			changeMomentumM();



			//vue.pX -= vue.q * vue.eQ / (vue.x - vue.eX) ** 2

		}







	}, 25);















const newX = document.getElementById('newX')
const newY = document.getElementById('newY')

const newEX = document.getElementById('newEX')
const newEY = document.getElementById('newEY')




setCanvasSize = function () {

	if (window.innerWidth > 700) {
		canvas.width = 600
		canvas.height = 600
		canvas.style.width = '600px'
		canvas.style.height = '600px'
		canvas2.width = 600
		canvas2.height = 600
		canvas2.style.width = '600px'
		canvas2.style.height = '600px'
		canvas2.style.bottom = '623px'

	} else {


		canvas.style.width = '0'
		canvas.style.height = '0'
		canvas2.style.width = '0'
		canvas2.style.height = '0'
		var w =  Math.floor( window.innerWidth/100)  * 100


		canvas.width = w - 100
		canvas.height = w - 100
		canvas.style.width = w - 100 + 'px'
		canvas.style.height = w - 100 + 'px'
		canvas2.width = w - 100
		canvas2.height = w - 100
		canvas2.style.width = w - 100 +'px'
		canvas2.style.height = w - 100 +'px'


		if (window.innerWidth < 300) {
		canvas2.style.bottom = 0
		canvas2.style.right = '115px'

		} else {
			canvas2.style.bottom = w - 100 + 23 +'px'
			canvas2.style.right = 0

		}
	}

	width = canvas.width;
    height = canvas.height;
    newX.setAttribute('max', canvas.width)
    newY.setAttribute('max', canvas.height)
     newEX.setAttribute('max', canvas.width)
    newEY.setAttribute('max', canvas.height)

    while (vue.x.value > width) {
    	vue.x.value -= 10
    }
    while (vue.y.value > height) {
    	vue.y.value -= 10
    }

	

}


window.addEventListener('resize', setCanvasSize)
setCanvasSize()