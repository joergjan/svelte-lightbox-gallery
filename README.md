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

### don't forget this!

since this library works with tailwindcss, you have to adjust your tailwind.config.js to include the gallery. Check out the [tailwind documentation](​​https://www.tailwindcss.com/docs/content-configuration#working-with-third-party-libraries)

```typescript
/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-lightbox-gallery/dist/*.svelte'
	]
};
```

![gallery](image.png)
![lightbox](image-1.png)
