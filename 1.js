const col1 = document.getElementById('col1')
const col2 = document.getElementById('col2')
const repeatButton = document.getElementById('repeatButton')
const noRepeatButton = document.getElementById('noRepeatButton')

repeatButton.addEventListener('click', function () {
main(false)
})


noRepeatButton.addEventListener('click', function () {
main(true)
})


function random100 () {
	return Math.floor( Math.random() * 100 ) + 1
}

function main(repeat) {
	const even = []
	const odd = []
	for (let i = 0; i< 20; i++) {
		let num = random100()
		while (repeat && (even.indexOf(num) !== -1 || odd.indexOf(num) !== -1) ) {
			num = random100()
		}
		if (num % 2 === 0){ 
			even.push(num)
		} else {
			odd.push(num)
		}
	}
	even.sort( (a,b) => a - b )
	odd.sort( (a,b) => a - b )
	col1.innerHTML = even.join('<br />')
	col2.innerHTML = odd.join('<br />')


	return even
}