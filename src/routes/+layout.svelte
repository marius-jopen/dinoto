<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import "../app.css";
	import 'aos/dist/aos.css';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';
	import AOS from 'aos';

	onMount(() => {
		AOS.init({
			duration: 700,
			easing: 'ease',
			once: true,
		});
	});
</script>

<svelte:head>
	<title>DINOTO - {$page.data.title}</title>
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
	{/if}
	{#if $page.data.meta_title}
		<meta name="og:title" content={$page.data.meta_title} />
	{/if}
	{#if $page.data.meta_image}
		<meta name="og:image" content={$page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}


</svelte:head>

<main>
	<slot />
</main>

<PrismicPreview {repositoryName} />
