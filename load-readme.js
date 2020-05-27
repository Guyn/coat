function initMarkdown() {
	var mdScript = document.createElement("script");
	mdScript.setAttribute("type", "text/javascript");
	mdScript.setAttribute(
		"src",
		"https://cdn.jsdelivr.net/npm/marked/marked.min.js"
	);
	document.getElementsByTagName("head")[0].appendChild(mdScript);
}

function loadReadme() {
	fetch("./README.md")
		.then((response) => response.text())
		.then(
			(result) => (document.querySelector("body").innerHTML += marked(result))
		);
}

function load() {
	initMarkdown();
	loadReadme();
}
window.onload = load;
