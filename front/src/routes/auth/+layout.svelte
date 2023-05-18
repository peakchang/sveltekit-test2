<script>
	import '$src/app.css';
	import '$node_modules/@fortawesome/fontawesome-free/css/all.min.css';
</script>

<svelte:head>
	<!-- SUIT 폰트 CSS -->
	<link
		href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
		rel="stylesheet"
	/>
</svelte:head>
<slot />

<style>
	:global(.suit-font) {
		font-family: 'SUIT';
	}
</style>
