// check if an element has loaded (ex: image)
export const createLoadObserver = (handler: { (): void; (this: HTMLElement, ev: Event): any }) => {
	const onload = (el: HTMLElement) => {
		el.addEventListener('load', handler);
	};

	return onload;
};
