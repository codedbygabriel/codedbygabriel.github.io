class Header extends HTMLElement {
	constructor() {
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		try {
			const url = '/components/header/header.html';
			const response = await fetch(url);

			if (!response.ok) throw new Error(`${url} Was Not Fetch`);

			const text = await response.text();

			this.styleSheetsHelper('../../css/main.css', this._shadowRoot);
			this._shadowRoot.innerHTML = text;
		} catch (err) {
			console.error('Trace: ', err);
		} finally {
			this.themeSwitcher();
		}
	}

	async styleSheetsHelper(url, shadow) {
		const styleUrl = url;

		const response = await fetch(styleUrl);
		const text = await response.text();

		const css = new CSSStyleSheet();
		css.replaceSync(text);

		shadow.adoptedStyleSheets.push(css);
	}

	themeSwitcher() {
		const body = document.querySelector('body');
		const small = this._shadowRoot.querySelectorAll('small');
		small[0].style.cursor = 'pointer';

		const title = [
			document.querySelectorAll('h1'),
			this._shadowRoot.querySelectorAll('h1'),
			document.querySelectorAll('h2'),
			document.querySelectorAll('h3'),
			document.querySelectorAll('h4'),
		];

		const text = [
			document.querySelectorAll('p'),
			document.querySelectorAll('address'),
			document.querySelectorAll('a'),
			document.querySelectorAll('small'),
			document.querySelectorAll('summary'),
			document.querySelectorAll('li'),
			small,
		];

		small[0].addEventListener('click', function(event) {
			body.classList.toggle('darkMode');
			text.forEach((_) => _.forEach((el) => el.classList.toggle('darkModeText')));
			title.forEach((_) => _.forEach((el) => el.classList.toggle('darkModeTitle')));

			if (body.classList.contains('darkMode')) {
				small[0].textContent = '[turn on the lights]';
			} else {
				small[0].textContent = '[turn off the lights]';
			}
		});
	}
}

customElements.define('app-header', Header);
