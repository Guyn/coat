const setTheme = (file) => {
	if (!file)
		if (localStorage.getItem("coat-theme")) {
			file = localStorage.getItem("coat-theme");
		} else {
			file = "coat-ext";
		}

	document
		.querySelector("link[type='text/css']")
		.setAttribute("href", "/theme/" + file + ".css");
	localStorage.setItem("coat-theme", file);
};

window.onload = setTheme();
