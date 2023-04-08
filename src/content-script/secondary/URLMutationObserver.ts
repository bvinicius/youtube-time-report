export default class URLMutationObserver {
	private oldHref: string;

	constructor(private callback: () => void) {
		this.oldHref = document.location.href;
	}

	observe() {
		const mutationObserver = new MutationObserver((mutations) => {
			requestIdleCallback(() => {
				mutations.forEach(() => {
					if (this.oldHref !== document.location.href) {
						this.oldHref = document.location.href;
						this.callback();
					}
				});
			});
		});

		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
}
