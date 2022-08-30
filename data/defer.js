function search() {
	const colors = [ "black", "brown", "blue", "yellow", "green", "orange", "pink", "purple", "red", "white" ];
	const patterns = [ "bend", "bordure", "canton", "pall", "cross_greek", "cross_nordic", "cross_symmetric", "cross_saltire", "quadrisection", "triband_horizontal", "triband_vertical" ]
	let params = { "colors": [], "patterns": [] };

	colors.forEach(color => {
		if (document.getElementById(`color-${color}`).checked === true) params["colors"].push(color);
	});
	patterns.forEach(pattern => {
		if (document.getElementById(`pattern-${pattern}`).checked === true) params["patterns"].push(pattern);
	});
	appendFlags(searchFlag(params), document.getElementById("flagSection"));
	window.scrollTo(0, 0);
}

