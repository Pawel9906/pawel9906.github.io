	let players = 2
	const canvas = document.querySelector('canvas')
	const context = canvas.getContext('2d')
	const showSettings = document.getElementById("showSettings")
	const startButton = document.getElementById('startButton')
	const selectColor1 = document.getElementById('selectColor1')
	const selectColor2 = document.getElementById('selectColor2')
	const selectBounce = document.getElementById('selectBounce')
	const radiosPlayers = document.querySelectorAll('input[type="radio"]') //ciekawe, że radios, nie radioes
	const spanRadio = document.getElementById('spanRadio')
	const selectModeSpan = document.getElementById('selectMode')
	const selectMode = document.querySelector('#selectMode select')
	const strips = document.getElementById('strips')
	const settings = document.getElementById('settings')
	let colors1, colors2;


	//
	let width = canvas.width
	let height = canvas.height
	let length = 130

	let bounceType;
	let likeButtons = [];
	let mode = 2;
	
	let x = width/2 - 50
	let y = height/2
	let predictedY = y
	let vx = 4
	let vy = 0
	let vArray = [1.5, 7, 13]
	

let phase = 0 // 0 - przed rozpoczęciem 1 - gra 2 - pauza 3 - koniec

let a = 100
let b = 100
let vp = 4
const keys = {
	w: false,
	s: false,
	p: false,
	l: false
}

let ballDiameter = 5;

spanRadio.addEventListener('click', function (e) {
	if (e.target.value === '1') {
		selectModeSpan.style.visibility = 'visible'
	} else {
		selectModeSpan.style.visibility = 'hidden'
	}
})



function drawBall () {
	context.beginPath()
	context.arc(x, y, ballDiameter, 0, Math.PI * 2, true)
	context.fill()

}

function setColor(color) {
	switch (color) {   //moje nazwy nie odpowiadają dokładnie nazwom JS
		case 'red':
		return ['red','lightpink']
		break;
		case 'orange':
		return ['orange','peachpuff']
		break;
		case 'yellow':
		return ['gold','yellow']
		break;
		case 'green':
		return ['yellowgreen','palegreen']
		break;
		case 'turquoise':
		return ['teal','paleturquoise']
		break;
		case 'blue':
		return ['deepskyblue','skyblue']
		break;
		case 'purple':
		return ['purple','MediumPurple']
		break;
		case 'fuchsia':
		return ['deeppink','pink']
		break;
		case 'brown':
		return ['brown','peru']
		break;
		case 'gray':
		return ['slategray','lightgray']
		break;
	}
}

startButton.addEventListener('click', function () {    


	switch (phase) { 

		case 3: //reset tego, co podczas gry zmienne

		x = width/2 - 50
		y = height/2
		vx = 4
		vy = 0
		predictedY = y
		a = 100
		b = 100



		case 0: //ustawienia początkowe

		color1 = setColor(selectColor1.value)
		color2 = setColor(selectColor2.value)

		bounceType = selectBounce.value

		if (!strips.checked) {
			color1[1] = 'white'
			color2[1] = 'white'

		}

		settings.style.display = 'none'
		showSettings.style.display = 'none'
		selectModeSpan.style.visibility = 'hidden'

		for (let i of radiosPlayers) {
			if (i.checked) {
				players = Number(i.value)
			}
		}

		mode = Number( selectMode.value )

		








		case 2:



		phase = 1
		startButton.textContent = 'Pauza'

		

		timeID = setInterval(function () {
			context.fillStyle = 'black'
			context.clearRect(0, 0, width, height)
			drawBall();
			x += vx
			y += vy

			bounce()



			if (y > height - ballDiameter || y < ballDiameter) {
				vy *= -1
			}



			if (players === 1) {

				if (mode > 1)  {

					if (likeButtons.length > 0) {
						keys.p = false;
						keys.l = false;
						keys[likeButtons.pop()] = true
					} else {
						if (predictedY > b + length * 2 / 3  && vx > 0) {
							keys.l = true
						} else  {
							keys.l = false
						}
						if (predictedY < b + length / 3  && vx > 0) {
							keys.p = true
						} else {
							keys.p = false
						}


						if (keys.p === keys.l && x > width - 30) {

							if (mode === 3) {

								let diffrence = Math.abs(a-b)

								

								if (diffrence > length) {

									

									likeButtons = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']

								}
							}
							




							


							if (likeButtons.length === 0) {
								let r = Math.random()
								if (r < 0.333) {
									likeButtons = ['p','p','p','p','p','p','p','p','p','p','p','p']
								} else if (r > 0.666) {
									likeButtons = ['l','l','l','l','l','l','l','l','l','l','l','l']
								} else {
									likeButtons = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']
								}
							}
						}

						if (mode === 3 && vx < 0) {

							if (Math.abs(  (b + length / 2) - ( height / 2)  ) > 15 ) {

								if (b < (height-length) / 2 ) {
									keys.p = false
									keys.l = true

								} else  {
									keys.p = true
									keys.l = false

								}

							} 





						}

					}

				} else if (mode === 1) {
					if (y > b + length * 2 / 3) {
						keys.l = true
					} else  {
						keys.l = false
					}
					if (y < b + length / 3) {
						keys.p = true
					} else {
						keys.p = false
					}
				}

				


			}



			if (keys.w && !keys.s && a > 0) {
				a -= vp
			} 
			if (!keys.w && keys.s && a + length < height) {
				a += vp
			}
			if (keys.p && !keys.l && b > 0) {
				b -= vp

			} 
			if (!keys.p && keys.l && b + length < height) {
				b += vp
			}

			context.fillStyle = color1[1]
			context.fillRect(0, 0, 10, height)
			context.fillStyle = color2[1]
			context.fillRect(width - 10, 0, 10, height)

			context.fillStyle = color1[0]
			context.fillRect(0, a, 10, length)
			context.fillStyle = color2[0]
			context.fillRect(width - 10, b, 10, length)

		}, 30)

		break;

		case 1:

		clearInterval(timeID)
		phase = 2
		startButton.textContent = 'Start'
		break;


	}


})



document.addEventListener('keydown', function (e) {
	let key =  e.key.toLowerCase();
	
	if (   (key === 'p' || key === 'l') && players === 1) {
		return;
	}
	
	keys[key] = true		
})

document.addEventListener('keyup', function (e) {
	let key = e.key.toLowerCase();
	if (   (key === 'p' || key === 'l') && players === 1) {
		return;
	}

	keys[key] = false	
})




function bounce () {

	switch (bounceType) {
		case "1":
		if (x < ballDiameter + 15) {
			if (y < a  || y > a + length) {

				endGame()


			} else {



				if (keys.w && !keys.s) {
					vy = -vArray[1] 
					vx = vArray[1]
				} else if (!keys.w && keys.s) {
					vy = vArray[1]
					vx = vArray[1]
				} else {
					vx = vArray[2]
					if (vy > 0) {
						vy = vArray[0]
					} else {
						vy = -vArray[0]
					}
				}


					//predictedY

					predictedY = y + vy * ( (width - x) / vx   )
					if (predictedY < 0) {
						predictedY = (predictedY * -1) 
					} 
					if (predictedY > height) {
						predictedY =  2 * height - predictedY
					}



					//koniec


				}
			}
			if (x > width - ballDiameter - 15) {
				likeButtons = []
				if (y < b  || y > b + length) {

					endGame()

				} else {


					if (keys.p && !keys.l) {
						vy = -vArray[1] 
						vx = -vArray[1]
					} else if (!keys.p && keys.l) {
						vy = vArray[1]
						vx = -vArray[1]
					} else {
						vx = -vArray[2]
						if (vy > 0) {
							vy = vArray[0]
						} else {
							vy = -vArray[0]
						}
					}


				}
			}
			break;
			case '2':



			if (x < ballDiameter + 15) {
				if (y < a  || y > a + length) {

					endGame();

				} else {



					if (y < a + length / 3) {
						vy = -vArray[1] 
						vx = vArray[1]

					} else if (y < a + length * 2 / 3) {
						if (vy > 0) {
							vy = vArray[0]
						} else {
							vy = -vArray[0]
						}
						vx = vArray[2]
					} else {
						vy = vArray[1]
						vx = vArray[1]
					}




									//predictedY

									predictedY = y + vy * ( (width - x) / vx   )
									if (predictedY < 0) {
										predictedY = (predictedY * -1) 
									} 
									if (predictedY > height) {
										predictedY =  2 * height - predictedY
									}



					//koniec


				}
			}
			if (x > width - ballDiameter - 15) {
				if (y < b  || y > b + length) {

					endGame()

				} else {

					vx = -vx


					if (y < b + length / 3) {
						vy = -vArray[1]
						vx = -vArray[1]
					} else if (y < b + length * 2 / 3) {
						vx = -vArray[2]
						if (vy > 0) {
							vy = vArray[0]
						} else {
							vy = -vArray[0]
						}
					} else {
						vy = vArray[1]
						vx = -vArray[1]
					}


				}
			}






			break;
		}

	}

	showSettings.addEventListener('click', function () {
	showSettings.style.display = 'none'
	settings.style.display = 'block'
	})


	function endGame () {
		phase = 3
		clearInterval(timeID)
		startButton.textContent = 'Start'
		showSettings.style.display = 'inline'

		settings.style.visibility = 'visible'
		settings.style.display = 'none'
		if (players === 1) {
			selectModeSpan.style.visibility = 'visible'

		}
		
	}


	function getPart(X) {
		if (X < height / 4) {
			return 1
		} else if (X < height / 2) {
			return 2
		}
		return 3
	}






















function setCanvasSize() {


	

	if (window.innerWidth < 450) {
		canvas.setAttribute('width', 200)
		canvas.style.width = '200px'
		canvas.setAttribute('height', 200)
		canvas.style.height = '200px'
		length = 65;
		vArray = [1, 4.666, 8.666]
		vp = 3

	



	} else {
		canvas.setAttribute('width', 400)
		canvas.style.width = '400px'
		canvas.setAttribute('height', 400)
		canvas.style.height = '400px'
		length = 130;
		vArray = [1.5, 7, 13]
		vp = 4

		
	}
	width = canvas.width
	height = canvas.height
	
	



}

setCanvasSize()

let mediaQueryList = window.matchMedia('(max-width: 450px)');

mediaQueryList.addListener(setCanvasSize);