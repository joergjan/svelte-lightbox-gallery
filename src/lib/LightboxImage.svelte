<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createLoadObserver } from './util'; // utility function to create a load observer (if image has loaded or not)

	import Loader from './Loader.svelte'; // Loading animation

	export let dark: boolean; // dark mode
	export let src: string; // image url

	let loaded: boolean = false; // checks if image has loaded

	// checks if image has loaded
	const onload = createLoadObserver(() => {
		loaded = true;
	});
</script>

<!-- this component shows an animation while the image is loading and then proceeds to show the image -->

{#if !loaded}
	<div class="h-48">
		<Loader {dark} />
	</div>
{:else}
	<img
		in:fade
		{src}
		alt=""
		class="max-w-full lg:max-w-3xl md:max-w-2xl max-h-[90%] md:max-h-full rounded-sm md:rounded-md md:pb-0 pb-32"
	/>
{/if}

<img
	use:onload
	hidden
	{src}
	srcset="{src} 480w, {src} 800w"
	sizes="(max-width: 600px) 480px, 800px"
	alt=""
/>

<style>
	img {
		pointer-events: none;
	}
</style>
