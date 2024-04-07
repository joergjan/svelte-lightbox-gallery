/// <reference types="svelte" />
import { SvelteComponentTyped } from 'svelte';

export interface GalleryProps {
	/**
	 * Array of photo URLs
	 */
	photos: string[];

	/**
	 * Amount of photos to before  "show more" button
	 * 0 => no button, all photos are shown at once
	 */
	amount?: number;

	/**
	 * darkmode (default: false)
	 */
	dark?: boolean;

	/**
	 * show more Button color with tailwind syntax, example: "bg-gray-500 hover:bg-gray-600"
	 */
	buttonColor?: string;
}

export default class Gallery extends SvelteComponentTyped<GalleryProps> {}
