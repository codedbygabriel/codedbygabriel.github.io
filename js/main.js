function savePreferences() {
	const preference = JSON.parse(localStorage.getItem('themePreference'));
	const theme = document.querySelector('body').classList.contains('darkMode');
	
	if (theme)
		localStorage.setItem('themePreference', JSON.stringify('dark'));
	else
		localStorage.setItem('themePreference', JSON.stringify('light'));
}

(function(){
	window.addEventListener('beforeunload', savePreferences);
}())
