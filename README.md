# svelte-lightbox-gallery

```bash
npm i -D svelte-lightbox-gallery
```

## What is svelte-lightbox-gallery?

svelte-lightbox-gallery is an easy to use gallery for your svelte project. it doesn't offer customisation options as npm package, for customisation consider downloading it from my [github repo](https://github.com/joergjan/svelte-image-gallery) and changing it on your own

## Preview

visit [npm.jan-joerg.ch/svelte-lightbox-gallery](https://npm.jan-joerg.ch/svelte-lightbox-gallery)

## Usage

```svelte
<script lang="ts">
	import SvelteGallery from 'svelte-image-gallery/SvelteGallery.svelte';

	let photos: string[] = [
		'https://source.unsplash.com/random/?city,night',
		'https://source.unsplash.com/random/?city,animal',
        ...
	];
</script>

<SvelteGallery {photos} />
```

![gallery](image.png)
![lightbox](image-1.png)
