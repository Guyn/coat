function initMarkdown() {
	var mdScript = document.createElement("script");
	mdScript.setAttribute("type", "text/javascript");
	mdScript.setAttribute(
		"src",
		"https://cdn.jsdelivr.net/npm/marked/marked.min.js"
	);
	document.getElementsByTagName("head")[0].appendChild(mdScript);
}
function setReadme(i, result) {
	setTimeout(() => {
		if (marked) {
			document.querySelector("body").innerHTML += marked(result);
			i = 10;
		}
		if (i < 10) setReadme(i++, result);
	}, 100);
}
function loadReadme() {
	fetch("./README.md")
		.then((response) => response.text())
		.then((result) => {
			setReadme(0, result);
		});
}

function load() {
	initMarkdown();
	setTimeout(() => {
		loadReadme();
	}, 0);
}
window.onload = load;
