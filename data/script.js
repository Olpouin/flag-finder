const flagData = [];
function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		 if (rawFile.readyState === 4 && rawFile.status == "200") {
			  callback(rawFile.responseText);
		 }
	}
	rawFile.send(null);
}

readTextFile("data/flags/json/001.json", function(text){
	var data = JSON.parse(text);
	flagData.push(data);
});

/**
 * Search for a flag.
 * @param {object} search Searching information.
 * @param {Array<("black"|"brown"|"blue"|"yellow"|"green"|"orange"|"pink"|"purple"|"red"|"white")>} search.colors Colors in the flag.
 * @param {Array<("bend"|"bordure"|"canton"|"cross_greek"|"cross_nordic"|"crpss_saltire"|"cross_symmetric"|"pall"|"quadrisection"|"triband_horizontal"|"triband_vertical")>} search.patterns Patterns in the flag.
 * @return {Array<object>}
 */
function searchFlag(search) {
	let foundFlags = [];
	flagData.forEach(flag => {
		let match = true;
		if ("colors" in search) { //SEARCH BY COLOR
			let matchColor = true;
			search["colors"].forEach(searchColor => {
				if (!(flag.colors.includes(searchColor))) matchColor = false;
			});
			if (matchColor === false) match = false;
		}
		if (match == false) return;
		if ("patterns" in search) { //SEARCH BY PATTERN
			let matchPattern = true;
			search["patterns"].forEach(searchPattern => {
				if (!(flag.patterns.includes(searchPattern))) matchPattern = false;
			});
			if (matchPattern === false) match = false;
		}
		if (match == false) return;
		foundFlags.push(flag);
	});
	return foundFlags;
}

/**
 * Creates a new HTML element.
 * @param {string} type Element type : h1, a, div...
 * @param {object} param Parameters
 * @param {string} param.txt Text inside, such as <type>param.txt</type>.
 * @param {string} param.class Class to add.
 * @param {object} param.attr Attributes. Key being type. (key="...")
 * @returns 
 */
 function newElement(type,param = {}) {
	var elem = document.createElement(type);
	if ('txt' in param) elem.innerHTML = param.txt;
	if ('class' in param) elem.classList.add(param.class);
	if ('attr' in param) {
		for (prop in param.attr) {
			elem.setAttribute(prop, param.attr[prop]);
		}
	}
	return elem;
}

function appendFlags(flags, element) {
	outerHTML = "";
	flags.forEach(flag => {
		let flagArticle = newElement("article");
		flagArticle.appendChild(newElement("img", {"attr":{"src":`data/flags/images/${flag.id}.svg`}}));
		flagArticle.appendChild(newElement("h2", { "txt": flag.id }));
		outerHTML += flagArticle.outerHTML;
	});
	element.innerHTML = outerHTML;
}
