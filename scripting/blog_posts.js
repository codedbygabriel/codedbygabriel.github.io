(function() {
	function get_projects() {
		fetch('../data/posts.json')
			.then(data => data.json())
			.then(data => set_projects(data))
			.catch(error => console.error(error))

	}

	function set_projects(data) {
		const project_container = document.querySelector('.project-container');
		data.forEach(project => {
			project_container.insertAdjacentHTML('beforeend',
				`
		<div>
			<h3 class="snippets-header">${project.title} <a target="_blank" href="${project.link}"><strong>#</strong></a></h3>
			<small class="small-snipets">${project.content}</small> 
		</div>
		`);
		});
	}

	get_projects();

}())

