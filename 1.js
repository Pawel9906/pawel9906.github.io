
const col1 = document.getElementById('col1')
const col2 = document.getElementById('col2')
const mainButton = document.getElementById('mainButton')

mainButton.addEventListener('click', main)


function random100 () {
return Math.floor( Math.random() * 100 ) + 1
}

function main() {
const even = []
const odd = []
for (let i = 0; i< 20; i++) {
let num = random100()
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