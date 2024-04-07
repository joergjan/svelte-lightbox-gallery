<script lang="ts">
	import Loader from './Loader.svelte';
	import { fade } from 'svelte/transition';
	import { createLoadObserver } from './util';

	export let src: string = '';
	let loaded = false;

	const onload = createLoadObserver(() => {
		loaded = true;
	});
</script>

{#if !loaded}
	<div class="h-48">
		<Loader />
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
