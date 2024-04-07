<script lang="ts">
	export let dark: boolean;
</script>

<div class="flex items-center justify-center h-full">
	<span class="loader" style="border-top: 3px solid {dark ? '#FFFFFF' : '#000'};"></span>
</div>

<style>
	.loader {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: inline-block;
		border-right: 3px solid transparent;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
