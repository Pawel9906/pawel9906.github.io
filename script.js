const nav = document.querySelector(".part2")
const toggle = document.getElementById("toggle")
document.addEventListener('click', function (e) {
	if (window.innerWidth < 800 && !nav.contains(e.target)) {
		toggle.checked = false;
	}
})