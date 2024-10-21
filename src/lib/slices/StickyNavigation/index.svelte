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

<div class="block">
	<IntersectionObserver rootMargin="0px" {element} bind:intersecting>
		<div class="z-1 pb-8 md:pb-0 pt-1" bind:this={element}>
			<div class="hidden md:block">
				<Header sticky logo={false} style={styleTextClass} items={slice.primary.items} />
			</div>
		</div>
	</IntersectionObserver>
</div>

<div class="hidden md:block" class:sticky={!intersecting}>
	{#if !intersecting}
		<Header sticky style={styleTextClass} items={slice.primary.items} />
	{/if}
</div>

<style>
	.sticky {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1000;
	}
</style>
