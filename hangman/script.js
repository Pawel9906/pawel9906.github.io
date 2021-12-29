


		const v = new Vue({

			el: "#app",
			data: {
				words: ['KOT', 'MYSZ', 'OŚMIORNICA', 'KAŁAMARNICA', 'WIEWIÓRKA'],
				letters: ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Y', 'Z', 'Ź', 'Ż'],
				word: '',
				hiddenWord: '',
				rest: 0,
				image: 0,
				phase: 1,

			},
			methods: {

				newGame: function () {
					v.phase = 1;
					v.image = 0;
					v.hiddenWord = v.words[ Math.floor(Math.random() * v.words.length)  ]
					v.word = ''
					v.rest =  v.hiddenWord.length
					while (v.word.length < v.hiddenWord.length) {
						v.word = v.word + '-'
					}

					for (let button of v.$refs.buttons) {

						button.removeAttribute('disabled')


					}

					
					
				},

				setOffButton: function (button) {
					button.setAttribute('disabled', 'disabled')

				},

				clickLetter: function (e) {
					if (v.phase !== 1) {
						return
					}
					if (e.target.hasAttribute('disabled')) {
						return;
					} else {
						v.setOffButton(e.target)
						let letter = e.target.innerText.toUpperCase();
						v.chooseLetter(letter)




					}
					


				},

				keyboardLetter: function (e) {
					console.log(e.key)
					let letter = e.key.toUpperCase();
					if (v.letters.indexOf(letter) === -1) {
						return
					}
					let button;
					for (let maybeButton of v.$refs.buttons) {
						if (maybeButton.innerText === letter) {
							button = maybeButton
						}
					}
					console.log(button)

					if (button.hasAttribute('disabled')) {
						return;
					} else {
						v.setOffButton(button)
						v.chooseLetter(letter)

					}



				},

				chooseLetter(letter) {

					if (v.hiddenWord.indexOf(letter) === - 1) {
						console.log('nie ma')
						v.image++
						if (v.image === 9) {
							v.phase = 2;


						}

					} else {
						let howMany = 0;
						for (let i = 0; i < v.hiddenWord.length; i++) {
							if (v.hiddenWord[i] === letter) {
								v.word = v.word.slice(0, i) + letter + v.word.slice(i + 1)
								howMany++
							}
						}
						v.rest = v.rest - howMany;

						if (v.rest === 0) {
							v.phase = 3;
						}

					}

				}



			},





		})

		v.newGame();