<script>
	import Galery from '$lib/package/Galery.svelte';

	let photos = [
		'https://source.unsplash.com/random/?city,night',
		'https://source.unsplash.com/random/?city,animal',
		'https://source.unsplash.com/random/?city,energy',
		'https://source.unsplash.com/random/?village',
		'https://source.unsplash.com/random/?bear,night',
		'https://source.unsplash.com/random/?lion,night',
		'https://source.unsplash.com/random/?cat,night',
		'https://source.unsplash.com/random/?city,cat',
		'https://source.unsplash.com/random/?city,elephant',
		'https://source.unsplash.com/random/?city,giraffe',
		'https://source.unsplash.com/random/?penguin,night',
		'https://source.unsplash.com/random/?rat,lion',
		'https://source.unsplash.com/random/?cat,rat',
		'https://source.unsplash.com/random/?storm,night',
		'https://source.unsplash.com/random/?city,day',
		'https://source.unsplash.com/random/?cloud',
		'https://source.unsplash.com/random/?movie',
		'https://source.unsplash.com/random/?light,night',
		'https://source.unsplash.com/random/?netflix,disney',
		'https://source.unsplash.com/random/?scarf',
		'https://source.unsplash.com/random/?playground,clown',
		'https://source.unsplash.com/random/?batman',
		'https://source.unsplash.com/random',
		'https://source.unsplash.com/random/?model',
		'https://source.unsplash.com/random/?shoe',
		'https://source.unsplash.com/random/?hoodie',
		'https://source.unsplash.com/random/?building'
	];
</script>

<div class="p-7">
	<Galery {photos} />
</div>
