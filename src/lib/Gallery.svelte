<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import { swipe } from 'svelte-gestures';

	import GaleryImage from './GalleryImage.svelte';
	import LightboxImage from './LightboxImage.svelte';

	export let photos: string[] = []; // array of image urls for gallery
	export let amount: number = 0; // amount of images to show in gallery before showing "show more" button
	export let dark: boolean = false; // dark mode
	export let buttonColor: string = 'bg-gray-500 hover:bg-gray-600'; // color of the "show more" button

	let lightboxActive = false; // lightbox is opened / closed
	let activeIndex = 0; // index of the currently shown image in the lightbox
	let showMore = false; // checks if button to show more images is clicked

	onMount(() => {
		window.addEventListener('keyup', (event) => {
			if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
				event.preventDefault();
				event.stopPropagation();
				prev();
			}
			if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
				event.preventDefault();
				event.stopPropagation();
				next();
			}
			if (event.key === 'Escape') {
				event.preventDefault();
				event.stopPropagation();
				close();
			}
		});
	});

	// disable scrolling when lightbox is active
	function disableScroll() {
		if (browser) {
			document.body.style.margin = '0';
			document.body.style.height = '100%';
			document.body.style.overflow = 'hidden';
		}
	}

	// enable scrolling when lightbox is closed
	function enableScroll() {
		if (browser) {
			document.body.style.margin = '';
			document.body.style.height = '';
			document.body.style.overflow = '';
		}
	}

	$: if (lightboxActive) {
		disableScroll();
	} else {
		enableScroll();
	}

	// close the lightbox
	function close() {
		activeIndex = -1;
		lightboxActive = false;
	}

	// show previous image in lightbox
	function prev() {
		activeIndex--;
		if (activeIndex < 0) {
			activeIndex = photos.length - 1;
		}
	}

	// show next image in lightbox
	function next() {
		activeIndex++;
		if (activeIndex >= photos.length) {
			activeIndex = 0;
		}
	}

	// add swipe gesture to lightbox for mobile devices
	function handler(event: { detail: { direction: string } }) {
		if (event.detail.direction === 'left') {
			next();
		} else if (event.detail.direction === 'right') {
			prev();
		}
	}
</script>

<!-- this is the gallery -->

{#if photos.length != 0}
	<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 grid-rows-auto">
		{#each photos.slice(0, showMore ? photos.length : amount > 0 ? amount : photos.length) as src, no}
			<li class="relative hover:scale-[1.03] hover:shadow-lg transition-all duration-300 h-auto">
				<button
					class="absolute top-0 bottom-0 right-0 left-0 inset-0 w-full h-full hover:bg-opacity-75 transition duration-300"
					on:click={() => {
						activeIndex = no;
						lightboxActive = true;
					}}
				></button>
				<span class="sr-only">View image {no + 1}</span>

				<div>
					<GaleryImage {src} {dark} />
				</div>
			</li>
		{/each}
	</ul>

	{#if photos.length > amount && amount > 0}
		{#if !showMore}
			<div class="flex justify-center">
				<button
					class="my-4 group {buttonColor} rounded-md text-white px-3 py-2 flex items-center"
					on:click={() => {
						showMore = true;
					}}
				>
					<p class="group-hover:scale-105">mehr</p>

					<svg
						class="h-6 w-6 ml-1 -mr-1 group-hover:scale-110"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		{/if}
	{/if}
{/if}

{#if lightboxActive}
	<div class="relative z-40" in:fade>
		<div
			class="fixed top-0 left-0 w-screen h-screen backdrop-blur-md bg-opacity-80 z-30 transition-opacity duration-300 {activeIndex >=
			0
				? 'block'
				: 'hidden'}
				 {dark ? 'bg-black' : 'bg-gray-800'}"
		/>
		<div
			use:swipe={{ timeframe: 300, minSwipeDistance: 60, touchAction: 'pan-y' }}
			on:swipe={handler}
			class="fixed top-0 left-0 w-screen h-screen z-40"
		>
			<button
				class="fixed z-30 top-0 left-0 right-0 bottom-0 w-full h-full"
				on:click={() => {
					close();
				}}
			></button>
			<div class="absolute inset-0 flex items-center justify-center">
				<LightboxImage src={photos[activeIndex]} {dark} />
				<div
					class="absolute lg:top-3 z-50 lg:right-3 lg:bottom-auto md:bottom-12 bottom-24 text-3xl text-white hover:text-gray-400"
				>
					<button class="group h-24 w-24 flex items-center justify-center" on:click={close}>
						&#x2715
					</button>
				</div>

				<div
					class="absolute lg:bottom-1/2 z-50 md:bottom-12 left-4 bottom-24 h-24 w-24 flex items-center justify-center"
				>
					<button class="group h-full w-full flex items-center justify-center" on:click={prev}>
						<svg
							class="fill-white group-hover:fill-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							height="30"
							viewBox="0 -960 960 960"
							width="30"
						>
							<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
						</svg>
					</button>
				</div>

				<div
					class="absolute lg:bottom-1/2 z-50 md:bottom-12 right-4 bottom-24 h-24 w-24 flex items-center justify-center"
				>
					<button class="group h-full w-full flex items-center justify-center" on:click={prev}>
						<svg
							class="fill-white group-hover:fill-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							height="30"
							viewBox="0 -960 960 960"
							width="30"
						>
							<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
