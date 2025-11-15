async function loadProjects() {
	const response = await fetch("../data/projects.json");

	if (!response.ok) return false;

	const projects = await response.json();
	const projectContainer = document.querySelector(".projectsContainer");

	projects.forEach(function(project) {
		const projectHolder = document.createElement("section");

		const projectTitle = document.createElement("h3");
		projectTitle.textContent = project.title;

		const projectDescription = document.createElement("p");
		projectDescription.innerHTML = project.description;

		projectHolder.appendChild(projectTitle);

		if (project.link) {
			const projectLink = document.createElement("a");
			projectLink.href = project.link;
			projectLink.target = "_blank";
			projectLink.textContent = "[link]";
			projectLink.style.fontSize = "0.8rem";

			projectHolder.appendChild(projectLink);
		} else {
			const projectLink = document.createElement("p");
			projectLink.textContent = "[no link/referral]";
			projectLink.style.fontSize = "0.8rem";
			projectHolder.appendChild(projectLink);
		}

		projectHolder.appendChild(projectDescription);

		if (project.image) {
			const projectImage = document.createElement("img");

			projectImage.src = project.image;
			projectImage.width = "300px";

			projectHolder.appendChild(projectImage);
		}

		projectContainer.append(projectHolder);
	});
}

async function loadBlogposts() {
	const response = await fetch("../data/blogposts.json");

	if (!response.ok) throw new Error("Não foi possivel carregar os projetos.");

	const blogposts = await response.json();

	if (!(blogposts.length >= 1))
		throw new Error("JSON Vazio, não haverá blogposts.");
	let count = 0;
	blogposts.forEach((blogpost) => {
		const blogWrapper = document.createElement("p");
		blogWrapper.classList.add("blogAnchor");

		blogWrapper.innerHTML = `${++count}. ${blogpost.title}${blogpost.date ? " - " + blogpost.date : ""}`;
		blogWrapper.addEventListener("click", (event) =>
			generatePostView(blogpost),
		);
		document.querySelector(".blogEntries").appendChild(blogWrapper);
	});

	return blogposts;
}

function generatePostView(blogpost) {
	const modal = document.createElement("dialog");
	const tags = document.createElement("small");
	const body = document.querySelector("body");

	if (blogpost.tags.length >= 1)
		blogpost.tags.forEach((_tag) => (tags.textContent += `[${_tag}] `));
	else tags.textContent = "[no-tags]";

	const header = document.createElement("header");
	const leaveButton = document.createElement("small");
	const title = document.createElement("h2");

	header.classList.add("blogpostHeader");
	title.classList.add("sectionHeader");
	title.textContent = blogpost.title;

	leaveButton.textContent = "[leave post]";
	leaveButton.style.cursor = "pointer";
	leaveButton.style.fontSize = "0.9rem";

	header.append(title);
	header.append(leaveButton);

	const section = document.createElement("section");
	section.classList.add("sectionModal");
	if (blogpost.content.length >= 1)
		blogpost.content.forEach((line) => (section.innerHTML += line));

	modal.classList.add("postModal");
	modal.append(header);
	modal.append(tags);
	modal.append(section);

	body.style.transition = "0.2s ease-in-out";
	body.style.filter = "blur(5px)";

	body.append(modal);
	modal.showModal();

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			modal.close();
			modal.remove();
			body.style.filter = "none";
		}
	});

	leaveButton.addEventListener("click", (event) => {
		modal.close();
		body.style.filter = "none";
	});
}

function blogSearchHandler(element) {
	// wip
}

(async function() {
	await loadProjects();
	await loadBlogposts();
	const input = document.getElementsByName("search-input")[0];

	input.addEventListener("input", (event) => blogSearchHandler(input));
})();
