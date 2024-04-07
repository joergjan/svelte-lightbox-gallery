<script lang="ts">
	import { fade } from 'svelte/transition';
	export let photos: string[] = [];
</script>

<div class="relative z-40" in:fade>
	<div
		class="fixed top-0 left-0 w-screen h-screen bg-gray-800 backdrop-blur-md bg-opacity-80 z-30 transition-opacity duration-300 {activeIndex >=
		0
			? 'block'
			: 'hidden'}"
	/>
	<div class="fixed top-0 left-0 w-screen h-screen z-40">
		<div class="absolute inset-0 flex items-center justify-center">
			<img
				loading="lazy"
				src={photos[activeIndex]}
				alt=""
				class="max-w-full lg:max-w-3xl md:max-w-2xl max-h-[90%] md:max-h-full rounded-sm md:rounded-md md:pb-0 pb-32"
			/>
			<button
				class="absolute md:top-5 md:right-5 md:bottom-auto sm:bottom-12 bottom-24 text-3xl m-4 text-white hover:text-gray-400"
				on:click={close}>&#x2715</button
			>
			<button
				class="absolute md:bottom-1/2 md:left-5 sm:bottom-12 bottom-24 left-4 m-4 text-white hover:text-gray-400 text-3xl"
				on:click={prev}>&#x2329;</button
			>
			<button
				class="absolute md:bottom-1/2 md:right-5 sm:bottom-12 bottom-24 right-4 m-4 text-white hover:text-gray-400 text-3xl"
				on:click={next}
			>
				&#x232a;
			</button>
		</div>
	</div>
</div>
