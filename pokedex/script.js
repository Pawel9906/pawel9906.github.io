//https://pokeapi.co/api/v2/
		const start = document.getElementById('start')
		const search = document.getElementById('search')
		const nameField = document.getElementById('name')
		const numberField = document.getElementById('num')
		const pokemonField = document.getElementById('pokemon')
		const sub = document.getElementById('sub')

		let xhr = new XMLHttpRequest();
		let a;
		let nidoran = false;

		xhr.addEventListener('load', function () {

			if (pokemonField.children[0]) {
			pokemonField.removeChild(pokemonField.children[0])
			}

			

			if (xhr.status === 200) {


			
			let pokemon = JSON.parse(xhr.response)
			let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

			if (name === 'Meowstic-male' || name === 'Indeedee-male') {
				name = name.slice(0, name.length - 5)
			}

			if (name ==='Porygon-z') {
				name = 'Porygon-Z'
			}

			if (  (name.indexOf('-') !== -1) && !nidoran  ) {
				switch (name) {
					case 'Porygon-z':
					name = 'Porygon-Z';
					break;
					case 'Nidoran-f':
					break;				
					default: 
					name = name.slice(0, name.indexOf('-'))
				}

			}

			nameField.textContent = name;
			numberField.textContent = '#' + pokemon.id



			pokemonField.textContent = ''
			let img = new Image();
			img.src = pokemon.sprites.front_default
			pokemonField.appendChild(img)


			if (nidoran) {
				
				sub.textContent = 'Wpisz "Nidoran-f" lub "29" aby uzyskać obrazek samicy Nidorana.'
				

			}



			a = pokemon;
			console.log(name)

			}  else {
				nameField.textContent = "Błąd"
				numberField.textContent = '';
				pokemonField.textContent = 'Brak pokemona o podanej nazwie lub podanym numerze'
			}

		})

		start.addEventListener('click', send)
		search.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				send()
			}
		})

		function send() {
			if (search.value === '') {
				return;
			}

			sub.textContent = ''

			let searchValue = search.value;
			if (searchValue[0] === '#') {
				searchValue = searchValue.slice(1)
			}
			searchValue = searchValue.toLowerCase().trim();

			if (searchValue === '0' || searchValue === 'missingno' || searchValue === 'missingno.') {
				if (pokemonField.children[0]) {
				pokemonField.removeChild(pokemonField.children[0])
				}
				nameField.textContent = 'MissingNo.'
				numberField.textContent = '#0'
				
				sub.textContent = 'MissingNo. nie jest właściwym pokemonem, a pewnym błędem w grze - zobacz https://bulbapedia.bulbagarden.net/wiki/MissingNo.'
				
				return;
			}

			// błędy

			if (searchValue === '??????????' || searchValue === '?' || searchValue === '-----') {
				if (pokemonField.children[0]) {
				pokemonField.removeChild(pokemonField.children[0])
				}
				nameField.textContent = searchValue
				numberField.textContent = ''
				
				sub.textContent = searchValue + ' nie jest właściwym pokemonem, a pewnym błędem w grze - zobacz https://bulbapedia.bulbagarden.net/wiki/'

				switch (searchValue) {
					case '??????????':
					sub.textContent += 'Ten_question_marks'
					break;
					case '?':
					sub.textContent += '%3F_(glitch_Pokémon)'
					break;
					default:
					sub.textContent += searchValue
					break;
				}

				
				return;
			}


			// pokemony o różnych formach

			switch (searchValue) {
				case "shaymin":
				searchValue += "-land"
				break

				case "deoxys":
				searchValue += "-normal"
				break

				case "darmanitan":
				searchValue += "-standard"
				break

				case "giratina":
				searchValue += "-altered"
				break

				case "basculin":
				searchValue += "-red-striped"
				break

				case "tornadus":
				case "thundurus":
				case "landorous":
				searchValue += "incarnate"
				break

				case "keldeo":
				searchValue += "-ordinary"
				break

				case "meloetta":
				searchValue += "-aria"
				break

				case "aegislash":
				searchValue += "-shield"
				break

				case "pumpkaboo":
				searchValue += "-average"
				break

				case "gourgeist":
				searchValue += "-average"
				break

				case "lycanroc":
				searchValue += "-midday"
				break

				case "wishiwashi":
				searchValue += "-solo"
				break

				case "minior":
				searchValue += "-red-meteor"
				break

				case "mimikyu":
				searchValue += "-disguised"
				break

				case "toxtricity":
				searchValue += "-amped"
				break

				case "eiscue":
				searchValue += "-ice"
				break

				case "zacian":
				case "zamazenta":
				searchValue += "-hero"
				break

				case "urshifu":
				searchValue += "-single-strike"
				break

				


			}



			

			let url = 'https://pokeapi.co/api/v2/pokemon/' + searchValue



			if (url === 'https://pokeapi.co/api/v2/pokemon/nidoran') {
				url = 'https://pokeapi.co/api/v2/pokemon/32'
				nidoran = true;
				} else {
					nidoran = false;
					if (url === 'https://pokeapi.co/api/v2/pokemon/nidoran-m') {
						url = 'https://pokeapi.co/api/v2/pokemon/32'
					}
				}

			if (url === 'https://pokeapi.co/api/v2/pokemon/meowstic' || url === 'https://pokeapi.co/api/v2/pokemon/indeedee') {
				url = url + '-male'
				}

			console.log(url)


			
			xhr.open('GET', url)
			
			xhr.send();
		}