(function() {
	let counter = 0
	let has_hovered = false

	const rdn_emoji = document.querySelector('.rdn_emoji');

	function random_emoji() {
		const variants = ["🐇", "💻", "🐧"];
		const randomInteger = Math.floor(Math.random() * (2 + 1));
		return variants[randomInteger];
	}

	document.addEventListener('keypress', function(event){
		switch (event.key) {
			case "j":
				window.scrollBy(0, 200);
				break;
			case "k":
				window.scrollBy(0, -200);
				break;
		}
	})

	rdn_emoji.addEventListener('mouseover', function(){
		if (!has_hovered) {
			alert("You're too curious, don't try peeking into things")
			has_hovered = true
		} else {
			window.location.assign("https://www.youtube.com/watch?v=6ugtWT_iNqw")	
		}

	})

	setInterval(function() {
		counter += 1
		if (counter > 20 && !has_hovered) {
			rdn_emoji.innerText = `../emojis/hover_me`;
		} else {
			rdn_emoji.innerText = `../emojis/${random_emoji()}`;
		}
	}, 1000);
	
}());

