function savePreferences() {
	const theme = document.querySelector('body').classList.contains('darkMode');
	
	if (theme)
		localStorage.setItem('themePreference', JSON.stringify('dark'));
	else
		localStorage.setItem('themePreference', JSON.stringify('light'));
}

async function loadProjects() {
	const response = await fetch('../data/projects.json');
	
	if (!response.ok)
		return false;
	
	const projects = await response.json();
	const projectContainer = document.querySelector('.projectsContainer')

	projects.forEach(function(project){
		const projectHolder = document.createElement('section');

		const projectTitle = document.createElement('h3');
		projectTitle.textContent = project.title;

		const projectDescription = document.createElement('p');
		projectDescription.innerHTML = project.description;

		projectHolder.appendChild(projectTitle);

		if(project.link) {
			const projectLink = document.createElement('a');
			projectLink.href = project.link;
			projectLink.target = '_blank';
			projectLink.textContent = '[link]';
			projectLink.style.fontSize = '0.8rem';
			
			projectHolder.appendChild(projectLink);
		} else {
			const projectLink = document.createElement('p');
			projectLink.textContent = '[no link/referral]';
			projectLink.style.fontSize = '0.8rem';
			projectHolder.appendChild(projectLink);
		} 

		projectHolder.appendChild(projectDescription);

		if (project.image) {
			// const details = document.createElement('details');
			// const summary = document.createElement('summary');
			const projectImage = document.createElement('img');

			projectImage.src = project.image;
			projectImage.width = '300px';

			projectHolder.appendChild(projectImage);
		}

		projectContainer.append(projectHolder);
	})
}

(async function(){
	window.addEventListener('beforeunload', savePreferences);
	await loadProjects()
}())
