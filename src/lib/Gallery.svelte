<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import GaleryImage from './GalleryImage.svelte';
	import LightboxImage from './LightboxImage.svelte';
	import { swipe } from 'svelte-gestures';

	export let photos: string[] = [];
	export let amount: number = 0;
	export let dark: boolean = false;
	export let buttonColor: string = 'bg-gray-500 hover:bg-gray-600';

	let lightboxActive = false;
	let activeIndex = 0;
	let showMore = false;
	let mounted = false;

	let scrollTop: number = 0;
	let scrollLeft: number = 0;

	$: {
		if (lightboxActive) {
			onMount(() => {
				document.body.classList.add('overflow-hidden');
			});
		} else {
			onMount(() => {
				document.body.classList.remove('overflow-hidden');
			});
		}
	}

	function close() {
		activeIndex = -1;
		lightboxActive = false;
	}

	onMount(() => {
		mounted = true;

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

	function disableScroll() {
		if (mounted) {
			scrollTop = window.pageYOffset || window.document.documentElement.scrollTop;
			(scrollLeft = window.pageXOffset || window.document.documentElement.scrollLeft),
				(window.onscroll = function () {
					window.scrollTo(scrollLeft, scrollTop);
				});
		}
	}

	function enableScroll() {
		if (mounted) {
			window.onscroll = function () {};
		}
	}

	$: if (lightboxActive) {
		disableScroll();
	} else {
		enableScroll();
	}

	function prev() {
		activeIndex--;
		if (activeIndex < 0) {
			activeIndex = photos.length - 1;
		}
	}

	function next() {
		activeIndex++;
		if (activeIndex >= photos.length) {
			activeIndex = 0;
		}
	}

	function handler(event: { detail: { direction: string } }) {
		if (event.detail.direction === 'left') {
			next();
		} else if (event.detail.direction === 'right') {
			prev();
		}
	}
</script>

<svelte:head>
	{#if lightboxActive}
		<style>
			::-webkit-scrollbar {
				display: none;
			}

			/* Hide scrollbar for IE, Edge and Firefox */
			html {
				overflow: -moz-scrollbars-none;
				-ms-overflow-style: none; /* IE and Edge */
				scrollbar-width: none; /* Firefox */
			}
		</style>
	{/if}
</svelte:head>

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
				class="fixed z-40 top-0 left-0 right-0 bottom-0 w-full h-full"
				on:click={() => {
					close();
				}}
			></button>
			<div class="absolute inset-0 flex items-center justify-center">
				<LightboxImage src={photos[activeIndex]} {dark} />
				<button
					class="absolute lg:top-5 z-50 lg:right-7 lg:bottom-auto md:bottom-12 bottom-24 text-3xl m-4 text-white hover:text-gray-400"
					on:click={close}>&#x2715</button
				>
				<button
					class="absolute lg:bottom-1/2 z-50 lg:left-5 md:bottom-12 bottom-24 left-4 m-4 text-white hover:text-gray-400 text-3xl"
					on:click={prev}>&#x2329;</button
				>
				<button
					class="absolute lg:bottom-1/2 z-50 lg:right-5 md:bottom-12 bottom-24 right-4 m-4 text-white hover:text-gray-400 text-3xl"
					on:click={next}
				>
					&#x232a;
				</button>
			</div>
		</div>
	</div>
{/if}
