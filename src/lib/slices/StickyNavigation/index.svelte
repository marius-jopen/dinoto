<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { Content } from '@prismicio/client';
	import Header from '$lib/components/header.svelte';
	import { textColor } from '$lib/components/color-styles';

	export let slice: Content.StickyNavigationSlice;

	let element;      // Reference for the element being observed
	let intersecting; // Boolean flag for whether the element is in view

	$: styleTextClass = textColor(slice.primary.logoColor);
</script>

<IntersectionObserver {element} bind:intersecting>
	<div bind:this={element}>
		<Header logo={false} style={styleTextClass} items={slice.primary.items} />
	</div>
</IntersectionObserver>

<header class:sticky={!intersecting}>
	{#if !intersecting}
		<Header style={styleTextClass} items={slice.primary.items} />
	{/if}
</header>

<style>
	.sticky {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1000;
	}
</style>
