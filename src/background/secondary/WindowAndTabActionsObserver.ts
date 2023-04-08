interface TabActionsOptions {
	onTabBlur: () => void;
	onTabFocus: () => void;
	onWindowBlur: () => void;
	onWindowFocus: () => void;
	tabFilterCallback: (tab: chrome.tabs.Tab) => boolean;
}

export default class WindowAndTabActionsObserver {
	private browserWindowId?: number;
	private youtubeTabId?: number;

	private onTabBlur: () => void;
	private onTabFocus: () => void;
	private onWindowBlur: () => void;
	private onWindowFocus: () => void;

	constructor({
		onTabBlur,
		onTabFocus,
		onWindowFocus,
		onWindowBlur,
		tabFilterCallback,
	}: TabActionsOptions) {
		this.onTabBlur = onTabBlur;
		this.onTabFocus = onTabFocus;
		this.onWindowBlur = onWindowBlur;
		this.onWindowFocus = onWindowFocus;

		this.loadCurrentWindow();
		this.loadYoutubeTab(tabFilterCallback);
	}

	observe() {
		chrome.tabs.onActivated.addListener((tabs) =>
			this.handleTabChange(tabs)
		);
		chrome.windows.onFocusChanged.addListener(
			this.handleWindowChange.bind(this)
		);
	}

	unobserve() {
		chrome.tabs.onActivated.removeListener(this.handleTabChange.bind(this));
	}

	private loadYoutubeTab(
		tabFilterCallback: (tab: chrome.tabs.Tab) => boolean
	) {
		chrome.tabs
			.query({ url: '*://*.youtube.com/*' })
			.then((tabs) => tabs.find(tabFilterCallback))
			.then((tab) => {
				if (tab) {
					this.youtubeTabId = tab.id;
				}
			});
	}

	private loadCurrentWindow() {
		chrome.windows.getCurrent().then((window) => {
			this.browserWindowId = window.id;
		});
	}

	private handleTabChange({ tabId }: { tabId: number }) {
		tabId === this.youtubeTabId ? this.onTabFocus() : this.onTabBlur();
	}

	private async handleWindowChange(windowId: number) {
		if (
			windowId === this.browserWindowId &&
			(await this.isYoutubeTabActive())
		) {
			this.onWindowFocus();
		} else {
			this.onWindowBlur();
		}
	}

	private async isYoutubeTabActive() {
		const tabs = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});
		return tabs.some((tab) => tab.id === this.youtubeTabId);
	}
}
