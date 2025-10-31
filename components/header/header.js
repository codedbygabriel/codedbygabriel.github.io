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
}

customElements.define('app-header', Header);
