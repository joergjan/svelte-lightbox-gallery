/// <reference types="svelte" />
import { SvelteComponentTyped } from 'svelte';

export interface GalleryProps {
	images: Partial<HTMLImageElement>[];
	rowHeight?: number;
	gutter?: number;
	imageComponent?: typeof SvelteComponent;
}

export default class Gallery extends SvelteComponentTyped<GalleryProps, {}, {}> {}
